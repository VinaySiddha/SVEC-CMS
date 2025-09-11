import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { put, deleteFile, listFiles } from "@/lib/s3";
import { Event, GalleryItem } from "@/types/events";

// Mock database for demonstration purposes
let events: Event[] = [];

// Validation schema
const eventSchema = z.object({
  id: z.string(),
  dept: z.string().min(1, { message: "Department is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  category: z.enum(["cultural", "sports", "community"], {
    message: "Category must be either cultural, sports, or community",
  }),
  date: z.string().min(1, { message: "Date is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  proof_url: z.string().optional(),
  gallery: z.array(z.object({
    url: z.string(),
    caption: z.string().optional(),
  })).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

// GET all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get("dept");
    const category = searchParams.get("category");
    
    // Filter events based on query parameters
    let filteredEvents = [...events];
    
    if (dept) {
      filteredEvents = filteredEvents.filter((event) => event.dept === dept);
    }
    
    if (category) {
      filteredEvents = filteredEvents.filter((event) => event.category === category);
    }
    
    return NextResponse.json({ events: filteredEvents }, { status: 200 });
  } catch (error) {
    console.error("Error getting events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST a new event
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const eventData = Object.fromEntries(formData.entries());
    
    // Handle file upload for proof
    const proofFile = formData.get("proof_file") as File;
    let proof_url = undefined;
    
    if (proofFile && proofFile instanceof File) {
      const fileExtension = proofFile.name.split('.').pop();
      const filename = `events/proof/${uuidv4()}.${fileExtension}`;
      proof_url = await put(proofFile, filename);
    } else if (eventData.proof_url) {
      proof_url = eventData.proof_url as string;
    }
    
    // Handle gallery files
    const galleryItems: GalleryItem[] = [];
    if (eventData.gallery) {
      if (typeof eventData.gallery === 'string') {
        try {
          const parsedGallery = JSON.parse(eventData.gallery as string);
          if (Array.isArray(parsedGallery)) {
            galleryItems.push(...parsedGallery);
          }
        } catch (e) {
          console.error("Error parsing gallery JSON:", e);
        }
      }
    }
    
    // Gallery files from form
    const galleryFiles = formData.getAll("gallery_files") as File[];
    for (const file of galleryFiles) {
      if (file instanceof File) {
        const fileExtension = file.name.split('.').pop();
        const filename = `events/gallery/${uuidv4()}.${fileExtension}`;
        const url = await put(file, filename);
        galleryItems.push({ url, caption: "" });
      }
    }
    
    // Prepare event data for validation
    const newEventData: any = {
      id: uuidv4(),
      dept: eventData.dept,
      title: eventData.title,
      category: eventData.category,
      date: eventData.date,
      description: eventData.description,
      proof_url,
      gallery: galleryItems,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Validate event data
    const validatedData = eventSchema.parse(newEventData);
    
    // Add to mock database
    events.push(validatedData);
    
    return NextResponse.json(
      { message: "Event created successfully", event: validatedData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

// PATCH to update an event
export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    
    if (!id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    // Find the event to update
    const eventIndex = events.findIndex((e) => e.id === id);
    if (eventIndex === -1) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    const existingEvent = events[eventIndex];
    const eventData = Object.fromEntries(formData.entries());
    
    // Handle file upload for proof
    const proofFile = formData.get("proof_file") as File;
    let proof_url = existingEvent.proof_url;
    
    if (proofFile && proofFile instanceof File) {
      // Delete old proof file if exists
      if (existingEvent.proof_url) {
        try {
          await deleteFile(existingEvent.proof_url);
        } catch (e) {
          console.error("Error deleting old proof file:", e);
        }
      }
      
      const fileExtension = proofFile.name.split('.').pop();
      const filename = `events/proof/${uuidv4()}.${fileExtension}`;
      proof_url = await put(proofFile, filename);
    } else if (eventData.proof_url) {
      proof_url = eventData.proof_url as string;
    }
    
    // Handle gallery files
    let galleryItems: GalleryItem[] = [];
    
    // Keep existing gallery if available
    if (existingEvent.gallery) {
      if (typeof existingEvent.gallery === 'string') {
        try {
          galleryItems = JSON.parse(existingEvent.gallery);
        } catch (e) {
          console.error("Error parsing existing gallery:", e);
        }
      } else {
        galleryItems = existingEvent.gallery as GalleryItem[];
      }
    }
    
    // Handle new gallery data from form
    if (eventData.gallery) {
      if (typeof eventData.gallery === 'string') {
        try {
          galleryItems = JSON.parse(eventData.gallery as string);
        } catch (e) {
          console.error("Error parsing gallery JSON:", e);
        }
      }
    }
    
    // Add new gallery files
    const galleryFiles = formData.getAll("gallery_files") as File[];
    for (const file of galleryFiles) {
      if (file instanceof File) {
        const fileExtension = file.name.split('.').pop();
        const filename = `events/gallery/${uuidv4()}.${fileExtension}`;
        const url = await put(file, filename);
        galleryItems.push({ url, caption: "" });
      }
    }
    
    // Prepare updated event data
    const updatedEventData: any = {
      ...existingEvent,
      dept: eventData.dept || existingEvent.dept,
      title: eventData.title || existingEvent.title,
      category: eventData.category || existingEvent.category,
      date: eventData.date || existingEvent.date,
      description: eventData.description || existingEvent.description,
      proof_url,
      gallery: galleryItems,
      updated_at: new Date().toISOString(),
    };
    
    // Validate updated data
    const validatedData = eventSchema.parse(updatedEventData);
    
    // Update in mock database
    events[eventIndex] = validatedData;
    
    return NextResponse.json(
      { message: "Event updated successfully", event: validatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE an event
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    // Find the event to delete
    const eventIndex = events.findIndex((e) => e.id === id);
    if (eventIndex === -1) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    const eventToDelete = events[eventIndex];
    
    // Delete associated files
    if (eventToDelete.proof_url) {
      try {
        await deleteFile(eventToDelete.proof_url);
      } catch (e) {
        console.error("Error deleting proof file:", e);
      }
    }
    
    // Delete gallery files
    if (eventToDelete.gallery) {
      let galleryItems: GalleryItem[] = [];
      
      if (typeof eventToDelete.gallery === 'string') {
        try {
          galleryItems = JSON.parse(eventToDelete.gallery);
        } catch (e) {
          console.error("Error parsing gallery for deletion:", e);
        }
      } else {
        galleryItems = eventToDelete.gallery as GalleryItem[];
      }
      
      for (const item of galleryItems) {
        try {
          await deleteFile(item.url);
        } catch (e) {
          console.error("Error deleting gallery item:", e);
        }
      }
    }
    
    // Remove from mock database
    events.splice(eventIndex, 1);
    
    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
