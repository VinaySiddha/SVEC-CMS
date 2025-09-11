import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";
import { put as uploadToS3, getSignedUrl, deleteFile } from "@/lib/s3";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
const ACCEPTED_DOC_TYPES = [...ACCEPTED_IMAGE_TYPES, "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

/**
 * Validates a file for size and type
 */
function validateFile(file: File, allowedTypes: string[]) {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "File is too large. Maximum size is 5MB." };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Invalid file type." };
  }
  
  return { valid: true };
}

/**
 * Get all events for a department
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    const deptId = params.deptId;
    
    // Fetch all events for the department
    const events = await db.query(
      `SELECT * FROM events WHERE dept = ? ORDER BY date DESC, created_at DESC`,
      [deptId]
    );
    
    // Process the events to add signed URLs for any stored files
    const processedEvents = await Promise.all(
      events.map(async (event: any) => {
        // Add signed URL for the proof document if it exists
        if (event.proof_url) {
          event.proof_url = await getSignedUrl(event.proof_url);
        }
        
        // Parse gallery JSON if it exists and add signed URLs for images
        if (event.gallery) {
          try {
            const gallery = JSON.parse(event.gallery);
            const galleryWithUrls = await Promise.all(
              gallery.map(async (item: any) => {
                if (item.url) {
                  return {
                    ...item,
                    url: await getSignedUrl(item.url),
                  };
                }
                return item;
              })
            );
            event.gallery = galleryWithUrls;
          } catch (e) {
            console.error("Error parsing gallery JSON:", e);
            event.gallery = [];
          }
        } else {
          event.gallery = [];
        }
        
        return event;
      })
    );

    return NextResponse.json({ events: processedEvents });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

/**
 * Create a new event
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    // Authenticate the user
    const user = await auth();
    if (!user || !user.isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const deptId = params.deptId;
    const formData = await request.formData();
    
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;
    const proofFile = formData.get("proof_file") as File | null;
    
    // Validate required fields
    if (!title || !category || !date || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Validate category
    if (!["cultural", "sports", "community"].includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }
    
    // Generate a unique ID for the new event
    const eventId = uuidv4();
    const timestamp = Date.now();
    
    // Process proof file if provided
    let proofUrl = null;
    if (proofFile) {
      const validation = validateFile(proofFile, ACCEPTED_DOC_TYPES);
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        );
      }
      
      const fileExt = proofFile.name.split(".").pop();
      const fileName = `events/${deptId}/${eventId}/proof_${timestamp}.${fileExt}`;
      proofUrl = await uploadToS3(proofFile, fileName);
    }
    
    // Process gallery images
    const gallery = [];
    const galleryNewCount = Number(formData.get("galleryNewCount") || 0);
    
    // Handle new gallery images
    for (let i = 0; i < galleryNewCount; i++) {
      const imageFile = formData.get(`gallery_new_${i}`) as File | null;
      if (imageFile) {
        const validation = validateFile(imageFile, ACCEPTED_IMAGE_TYPES);
        if (!validation.valid) {
          return NextResponse.json(
            { error: `Gallery image ${i+1}: ${validation.error}` },
            { status: 400 }
          );
        }
        
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `events/${deptId}/${eventId}/gallery_${timestamp}_${i}.${fileExt}`;
        const imageUrl = await uploadToS3(imageFile, fileName);
        
        gallery.push({
          url: imageUrl,
          caption: formData.get(`gallery_new_${i}_caption`) || "",
        });
      }
    }
    
    // Insert the new event into the database
    await db.query(
      `INSERT INTO events (id, dept, title, category, date, description, proof_url, gallery)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        eventId,
        deptId,
        title,
        category,
        date,
        description,
        proofUrl,
        gallery.length > 0 ? JSON.stringify(gallery) : null,
      ]
    );
    
    return NextResponse.json({ 
      success: true,
      message: "Event created successfully", 
      eventId 
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

/**
 * Update an existing event
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    // Authenticate the user
    const user = await auth();
    if (!user || !user.isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const deptId = params.deptId;
    const formData = await request.formData();
    
    const eventId = formData.get("id") as string;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;
    const proofFile = formData.get("proof_file") as File | null;
    
    // Validate required fields
    if (!eventId || !title || !category || !date || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Validate category
    if (!["cultural", "sports", "community"].includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }
    
    // Fetch the existing event to get current files
    const [existingEvent] = await db.query(
      `SELECT proof_url, gallery FROM events WHERE id = ? AND dept = ?`,
      [eventId, deptId]
    );
    
    if (!existingEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    const timestamp = Date.now();
    
    // Handle the proof file update
    let proofUrl = existingEvent.proof_url;
    if (proofFile) {
      const validation = validateFile(proofFile, ACCEPTED_DOC_TYPES);
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        );
      }
      
      const fileExt = proofFile.name.split(".").pop();
      const fileName = `events/${deptId}/${eventId}/proof_${timestamp}.${fileExt}`;
      proofUrl = await uploadToS3(proofFile, fileName);
    }
    
    // Process gallery
    let gallery = [];
    
    // Handle existing gallery items
    const galleryExistingCount = Number(formData.get("galleryExistingCount") || 0);
    for (let i = 0; i < galleryExistingCount; i++) {
      const existingItemJson = formData.get(`gallery_existing_${i}`);
      if (existingItemJson) {
        try {
          const existingItem = JSON.parse(existingItemJson as string);
          if (existingItem.url) {
            gallery.push({
              url: existingItem.url,
              caption: existingItem.caption || "",
            });
          }
        } catch (e) {
          console.error("Error parsing existing gallery item:", e);
        }
      }
    }
    
    // Handle new gallery items
    const galleryNewCount = Number(formData.get("galleryNewCount") || 0);
    for (let i = 0; i < galleryNewCount; i++) {
      const imageFile = formData.get(`gallery_new_${i}`) as File | null;
      if (imageFile) {
        const validation = validateFile(imageFile, ACCEPTED_IMAGE_TYPES);
        if (!validation.valid) {
          return NextResponse.json(
            { error: `Gallery image ${i+1}: ${validation.error}` },
            { status: 400 }
          );
        }
        
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `events/${deptId}/${eventId}/gallery_${timestamp}_${i}.${fileExt}`;
        const imageUrl = await uploadToS3(imageFile, fileName);
        
        gallery.push({
          url: imageUrl,
          caption: formData.get(`gallery_new_${i}_caption`) || "",
        });
      }
    }
    
    // Update the event in the database
    await db.query(
      `UPDATE events 
       SET title = ?, category = ?, date = ?, description = ?, proof_url = ?, gallery = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND dept = ?`,
      [
        title,
        category,
        date,
        description,
        proofUrl,
        gallery.length > 0 ? JSON.stringify(gallery) : null,
        eventId,
        deptId,
      ]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: "Event updated successfully",
      eventId
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

/**
 * Delete an event
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    // Authenticate the user
    const user = await auth();
    if (!user || !user.isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const deptId = params.deptId;
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("id");
    
    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    // Fetch the event to get file paths before deleting
    const [event] = await db.query(
      `SELECT proof_url, gallery FROM events WHERE id = ? AND dept = ?`,
      [eventId, deptId]
    );
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    // Delete the event from the database
    await db.query(
      `DELETE FROM events WHERE id = ? AND dept = ?`,
      [eventId, deptId]
    );
    
    // Clean up files in S3 (optional, can be handled by a separate cleanup process)
    try {
      if (event.proof_url) {
        await deleteFile(event.proof_url);
      }
      
      if (event.gallery) {
        const gallery = JSON.parse(event.gallery);
        for (const item of gallery) {
          if (item.url) {
            await deleteFile(item.url);
          }
        }
      }
    } catch (error) {
      console.error("Error deleting files from S3:", error);
      // Continue with the response even if file deletion fails
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Event deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
