import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSignedUrl } from "@/lib/s3";

export async function GET(
  request: NextRequest,
  { params }: { params: { deptId: string; eventId: string } }
) {
  try {
    const { deptId, eventId } = params;
    
    // Fetch the specific event
    const [event] = await db.query(
      `SELECT * FROM events WHERE id = ? AND dept = ?`,
      [eventId, deptId]
    );
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
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
            return {
              ...item,
              url: await getSignedUrl(item.url),
            };
          })
        );
        event.gallery = galleryWithUrls;
      } catch (e) {
        console.error("Error parsing gallery JSON:", e);
        event.gallery = [];
      }
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
