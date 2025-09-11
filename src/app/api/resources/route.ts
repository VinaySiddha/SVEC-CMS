import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { put, deleteFile } from "@/lib/s3";
import { Resource } from "@/types/resources";

// Mock database for demonstration purposes
let resources: Resource[] = [];

// Validation schema
const resourceSchema = z.object({
  id: z.string(),
  dept: z.string().min(1, { message: "Department is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  regulation: z.string().min(1, { message: "Regulation is required" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  ppt_url: z.string().optional(),
  qbank_url: z.string().optional(),
  old_paper_url: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

// GET all resources
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get("dept");
    const regulation = searchParams.get("regulation");
    const semester = searchParams.get("semester");
    
    // Filter resources based on query parameters
    let filteredResources = [...resources];
    
    if (dept && dept !== "all") {
      filteredResources = filteredResources.filter((resource) => resource.dept === dept);
    }
    
    if (regulation) {
      filteredResources = filteredResources.filter((resource) => resource.regulation === regulation);
    }
    
    if (semester) {
      filteredResources = filteredResources.filter((resource) => resource.semester === semester);
    }
    
    // Sort by created_at (newest first)
    filteredResources.sort((a, b) => {
      return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime();
    });
    
    return NextResponse.json({ resources: filteredResources }, { status: 200 });
  } catch (error) {
    console.error("Error getting resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

// POST a new resource
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const resourceData = Object.fromEntries(formData.entries());
    
    // Handle file uploads
    const pptFile = formData.get("ppt_file") as File;
    const qbankFile = formData.get("qbank_file") as File;
    const oldPaperFile = formData.get("old_paper_file") as File;
    
    let ppt_url = undefined;
    let qbank_url = undefined;
    let old_paper_url = undefined;
    
    // Process PPT file
    if (pptFile && pptFile instanceof File) {
      const fileExtension = pptFile.name.split('.').pop();
      const filename = `resources/ppt/${uuidv4()}.${fileExtension}`;
      ppt_url = await put(pptFile, filename);
    } else if (resourceData.ppt_url) {
      ppt_url = resourceData.ppt_url as string;
    }
    
    // Process Question Bank file
    if (qbankFile && qbankFile instanceof File) {
      const fileExtension = qbankFile.name.split('.').pop();
      const filename = `resources/qbank/${uuidv4()}.${fileExtension}`;
      qbank_url = await put(qbankFile, filename);
    } else if (resourceData.qbank_url) {
      qbank_url = resourceData.qbank_url as string;
    }
    
    // Process Old Paper file
    if (oldPaperFile && oldPaperFile instanceof File) {
      const fileExtension = oldPaperFile.name.split('.').pop();
      const filename = `resources/oldpapers/${uuidv4()}.${fileExtension}`;
      old_paper_url = await put(oldPaperFile, filename);
    } else if (resourceData.old_paper_url) {
      old_paper_url = resourceData.old_paper_url as string;
    }
    
    // Prepare resource data for validation
    const newResourceData = {
      id: uuidv4(),
      dept: resourceData.dept as string,
      title: resourceData.title as string,
      regulation: resourceData.regulation as string,
      semester: resourceData.semester as string,
      subject: resourceData.subject as string,
      ppt_url,
      qbank_url,
      old_paper_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Validate resource data
    const validatedData = resourceSchema.parse(newResourceData);
    
    // Add to mock database
    resources.push(validatedData);
    
    return NextResponse.json(
      { message: "Resource created successfully", resource: validatedData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating resource:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}

// PATCH to update a resource
export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    
    if (!id) {
      return NextResponse.json(
        { error: "Resource ID is required" },
        { status: 400 }
      );
    }
    
    // Find the resource to update
    const resourceIndex = resources.findIndex((r) => r.id === id);
    if (resourceIndex === -1) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }
    
    const existingResource = resources[resourceIndex];
    const resourceData = Object.fromEntries(formData.entries());
    
    // Handle file uploads
    const pptFile = formData.get("ppt_file") as File;
    const qbankFile = formData.get("qbank_file") as File;
    const oldPaperFile = formData.get("old_paper_file") as File;
    
    let ppt_url = existingResource.ppt_url;
    let qbank_url = existingResource.qbank_url;
    let old_paper_url = existingResource.old_paper_url;
    
    // Process PPT file
    if (pptFile && pptFile instanceof File) {
      // Delete old file if exists
      if (existingResource.ppt_url) {
        try {
          await deleteFile(existingResource.ppt_url);
        } catch (e) {
          console.error("Error deleting old PPT file:", e);
        }
      }
      
      const fileExtension = pptFile.name.split('.').pop();
      const filename = `resources/ppt/${uuidv4()}.${fileExtension}`;
      ppt_url = await put(pptFile, filename);
    } else if (resourceData.ppt_url) {
      ppt_url = resourceData.ppt_url as string;
    }
    
    // Process Question Bank file
    if (qbankFile && qbankFile instanceof File) {
      // Delete old file if exists
      if (existingResource.qbank_url) {
        try {
          await deleteFile(existingResource.qbank_url);
        } catch (e) {
          console.error("Error deleting old Question Bank file:", e);
        }
      }
      
      const fileExtension = qbankFile.name.split('.').pop();
      const filename = `resources/qbank/${uuidv4()}.${fileExtension}`;
      qbank_url = await put(qbankFile, filename);
    } else if (resourceData.qbank_url) {
      qbank_url = resourceData.qbank_url as string;
    }
    
    // Process Old Paper file
    if (oldPaperFile && oldPaperFile instanceof File) {
      // Delete old file if exists
      if (existingResource.old_paper_url) {
        try {
          await deleteFile(existingResource.old_paper_url);
        } catch (e) {
          console.error("Error deleting old Paper file:", e);
        }
      }
      
      const fileExtension = oldPaperFile.name.split('.').pop();
      const filename = `resources/oldpapers/${uuidv4()}.${fileExtension}`;
      old_paper_url = await put(oldPaperFile, filename);
    } else if (resourceData.old_paper_url) {
      old_paper_url = resourceData.old_paper_url as string;
    }
    
    // Prepare updated resource data
    const updatedResourceData: Resource = {
      ...existingResource,
      dept: resourceData.dept as string || existingResource.dept,
      title: resourceData.title as string || existingResource.title,
      regulation: resourceData.regulation as string || existingResource.regulation,
      semester: resourceData.semester as string || existingResource.semester,
      subject: resourceData.subject as string || existingResource.subject,
      ppt_url,
      qbank_url,
      old_paper_url,
      updated_at: new Date().toISOString(),
    };
    
    // Validate updated data
    const validatedData = resourceSchema.parse(updatedResourceData);
    
    // Update in mock database
    resources[resourceIndex] = validatedData;
    
    return NextResponse.json(
      { message: "Resource updated successfully", resource: validatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating resource:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 }
    );
  }
}

// DELETE a resource
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "Resource ID is required" },
        { status: 400 }
      );
    }
    
    // Find the resource to delete
    const resourceIndex = resources.findIndex((r) => r.id === id);
    if (resourceIndex === -1) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }
    
    const resourceToDelete = resources[resourceIndex];
    
    // Delete associated files
    if (resourceToDelete.ppt_url) {
      try {
        await deleteFile(resourceToDelete.ppt_url);
      } catch (e) {
        console.error("Error deleting PPT file:", e);
      }
    }
    
    if (resourceToDelete.qbank_url) {
      try {
        await deleteFile(resourceToDelete.qbank_url);
      } catch (e) {
        console.error("Error deleting Question Bank file:", e);
      }
    }
    
    if (resourceToDelete.old_paper_url) {
      try {
        await deleteFile(resourceToDelete.old_paper_url);
      } catch (e) {
        console.error("Error deleting Old Paper file:", e);
      }
    }
    
    // Remove from mock database
    resources.splice(resourceIndex, 1);
    
    return NextResponse.json(
      { message: "Resource deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}
