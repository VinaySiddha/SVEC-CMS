import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { put, deleteFile } from "@/lib/s3";
import { Hackathon, Winner } from "@/types/hackathons";

// Mock database for demonstration purposes
let hackathons: Hackathon[] = [];

// Validation schema
const hackathonSchema = z.object({
  id: z.string(),
  dept: z.string().min(1, { message: "Department is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  level: z.enum(["Internal", "State", "National", "International"], {
    message: "Level must be either Internal, State, National, or International",
  }),
  position: z.string().min(1, { message: "Position is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  proof_url: z.string().optional(),
  winners: z.array(z.object({
    name: z.string(),
    role: z.string().optional(),
    photo_url: z.string().optional(),
  })).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

// GET all hackathons
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get("dept");
    const level = searchParams.get("level");
    
    // Filter hackathons based on query parameters
    let filteredHackathons = [...hackathons];
    
    if (dept && dept !== "all") {
      filteredHackathons = filteredHackathons.filter((hackathon) => hackathon.dept === dept);
    }
    
    if (level) {
      filteredHackathons = filteredHackathons.filter((hackathon) => hackathon.level === level);
    }
    
    // Sort by date (newest first)
    filteredHackathons.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return NextResponse.json({ hackathons: filteredHackathons }, { status: 200 });
  } catch (error) {
    console.error("Error getting hackathons:", error);
    return NextResponse.json(
      { error: "Failed to fetch hackathons" },
      { status: 500 }
    );
  }
}

// POST a new hackathon
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const hackathonData = Object.fromEntries(formData.entries());
    
    // Handle file upload for proof
    const proofFile = formData.get("proof_file") as File;
    let proof_url = undefined;
    
    if (proofFile && proofFile instanceof File) {
      const fileExtension = proofFile.name.split('.').pop();
      const filename = `hackathons/proof/${uuidv4()}.${fileExtension}`;
      proof_url = await put(proofFile, filename);
    } else if (hackathonData.proof_url) {
      proof_url = hackathonData.proof_url as string;
    }
    
    // Handle winners
    let winners: Winner[] = [];
    if (hackathonData.winners) {
      if (typeof hackathonData.winners === 'string') {
        try {
          winners = JSON.parse(hackathonData.winners as string);
          
          // Process winner photos if any
          const winnerFileIndices = formData.getAll("winner_file_indices").map(idx => parseInt(idx.toString()));
          const winnerFiles = formData.getAll("winner_files") as File[];
          
          for (let i = 0; i < winnerFiles.length; i++) {
            const file = winnerFiles[i];
            const index = winnerFileIndices[i];
            
            if (file instanceof File && winners[index]) {
              const fileExtension = file.name.split('.').pop();
              const filename = `hackathons/winners/${uuidv4()}.${fileExtension}`;
              winners[index].photo_url = await put(file, filename);
            }
          }
        } catch (e) {
          console.error("Error parsing winners JSON:", e);
        }
      }
    }
    
    // Prepare hackathon data for validation
    const newHackathonData = {
      id: uuidv4(),
      dept: hackathonData.dept as string,
      title: hackathonData.title as string,
      level: hackathonData.level as "Internal" | "State" | "National" | "International",
      position: hackathonData.position as string,
      date: hackathonData.date as string,
      proof_url,
      winners,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Validate hackathon data
    const validatedData = hackathonSchema.parse(newHackathonData);
    
    // Add to mock database
    hackathons.push(validatedData);
    
    return NextResponse.json(
      { message: "Hackathon created successfully", hackathon: validatedData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hackathon:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create hackathon" },
      { status: 500 }
    );
  }
}

// PATCH to update a hackathon
export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    
    if (!id) {
      return NextResponse.json(
        { error: "Hackathon ID is required" },
        { status: 400 }
      );
    }
    
    // Find the hackathon to update
    const hackathonIndex = hackathons.findIndex((h) => h.id === id);
    if (hackathonIndex === -1) {
      return NextResponse.json(
        { error: "Hackathon not found" },
        { status: 404 }
      );
    }
    
    const existingHackathon = hackathons[hackathonIndex];
    const hackathonData = Object.fromEntries(formData.entries());
    
    // Handle file upload for proof
    const proofFile = formData.get("proof_file") as File;
    let proof_url = existingHackathon.proof_url;
    
    if (proofFile && proofFile instanceof File) {
      // Delete old proof file if exists
      if (existingHackathon.proof_url) {
        try {
          await deleteFile(existingHackathon.proof_url);
        } catch (e) {
          console.error("Error deleting old proof file:", e);
        }
      }
      
      const fileExtension = proofFile.name.split('.').pop();
      const filename = `hackathons/proof/${uuidv4()}.${fileExtension}`;
      proof_url = await put(proofFile, filename);
    } else if (hackathonData.proof_url) {
      proof_url = hackathonData.proof_url as string;
    }
    
    // Handle winners
    let winners: Winner[] = [];
    
    // Parse existing winners
    if (existingHackathon.winners) {
      if (typeof existingHackathon.winners === 'string') {
        try {
          winners = JSON.parse(existingHackathon.winners);
        } catch (e) {
          console.error("Error parsing existing winners:", e);
        }
      } else {
        winners = existingHackathon.winners as Winner[];
      }
    }
    
    // Update with new winners if provided
    if (hackathonData.winners) {
      try {
        winners = JSON.parse(hackathonData.winners as string);
        
        // Process winner photos if any
        const winnerFileIndices = formData.getAll("winner_file_indices").map(idx => parseInt(idx.toString()));
        const winnerFiles = formData.getAll("winner_files") as File[];
        
        for (let i = 0; i < winnerFiles.length; i++) {
          const file = winnerFiles[i];
          const index = winnerFileIndices[i];
          
          if (file instanceof File && winners[index]) {
            // Delete old photo if exists
            if (winners[index].photo_url) {
              try {
                await deleteFile(winners[index].photo_url!);
              } catch (e) {
                console.error("Error deleting old winner photo:", e);
              }
            }
            
            const fileExtension = file.name.split('.').pop();
            const filename = `hackathons/winners/${uuidv4()}.${fileExtension}`;
            winners[index].photo_url = await put(file, filename);
          }
        }
      } catch (e) {
        console.error("Error parsing winners JSON:", e);
      }
    }
    
    // Prepare updated hackathon data
    const updatedHackathonData: Hackathon = {
      ...existingHackathon,
      dept: hackathonData.dept as string || existingHackathon.dept,
      title: hackathonData.title as string || existingHackathon.title,
      level: hackathonData.level as "Internal" | "State" | "National" | "International" || existingHackathon.level,
      position: hackathonData.position as string || existingHackathon.position,
      date: hackathonData.date as string || existingHackathon.date,
      proof_url,
      winners,
      updated_at: new Date().toISOString(),
    };
    
    // Validate updated data
    const validatedData = hackathonSchema.parse(updatedHackathonData);
    
    // Update in mock database
    hackathons[hackathonIndex] = validatedData;
    
    return NextResponse.json(
      { message: "Hackathon updated successfully", hackathon: validatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating hackathon:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update hackathon" },
      { status: 500 }
    );
  }
}

// DELETE a hackathon
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "Hackathon ID is required" },
        { status: 400 }
      );
    }
    
    // Find the hackathon to delete
    const hackathonIndex = hackathons.findIndex((h) => h.id === id);
    if (hackathonIndex === -1) {
      return NextResponse.json(
        { error: "Hackathon not found" },
        { status: 404 }
      );
    }
    
    const hackathonToDelete = hackathons[hackathonIndex];
    
    // Delete associated files
    if (hackathonToDelete.proof_url) {
      try {
        await deleteFile(hackathonToDelete.proof_url);
      } catch (e) {
        console.error("Error deleting proof file:", e);
      }
    }
    
    // Delete winner photos
    if (hackathonToDelete.winners) {
      let winners: Winner[] = [];
      
      if (typeof hackathonToDelete.winners === 'string') {
        try {
          winners = JSON.parse(hackathonToDelete.winners);
        } catch (e) {
          console.error("Error parsing winners for deletion:", e);
        }
      } else {
        winners = hackathonToDelete.winners as Winner[];
      }
      
      for (const winner of winners) {
        if (winner.photo_url) {
          try {
            await deleteFile(winner.photo_url);
          } catch (e) {
            console.error("Error deleting winner photo:", e);
          }
        }
      }
    }
    
    // Remove from mock database
    hackathons.splice(hackathonIndex, 1);
    
    return NextResponse.json(
      { message: "Hackathon deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting hackathon:", error);
    return NextResponse.json(
      { error: "Failed to delete hackathon" },
      { status: 500 }
    );
  }
}
