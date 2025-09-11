"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Association, AssociationEvent } from "@/types/associations";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import LoadingSpinner from "@/components/LoadingSpinner";
import { format } from "date-fns";
import { CalendarIcon, FileText, ExternalLink } from "lucide-react";

export default function DepartmentAssociationsPage() {
  const params = useParams<{ deptId: string }>();
  const deptId = params?.deptId || "";
  const [loading, setLoading] = useState(true);
  const [associations, setAssociations] = useState<Association[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deptName, setDeptName] = useState("Department");

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        setLoading(true);
        
        // Fetch department info
        const deptResponse = await fetch(`/api/departments/${deptId}`);
        if (deptResponse.ok) {
          const deptData = await deptResponse.json();
          setDeptName(deptData.department?.name || "Department");
        }
        
        // Fetch associations
        const response = await fetch(`/api/departments/${deptId}/associations`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch associations");
        }
        
        const data = await response.json();
        
        // Parse gallery JSON if it's a string
        const parsedAssociations = data.associations.map((assoc: any) => {
          if (typeof assoc.gallery === 'string') {
            try {
              assoc.gallery = JSON.parse(assoc.gallery);
            } catch (e) {
              assoc.gallery = [];
            }
          }
          return assoc;
        });
        
        setAssociations(parsedAssociations || []);
      } catch (error: any) {
        console.error("Error fetching associations:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (deptId) {
      fetchAssociations();
    }
  }, [deptId]);

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto py-16 px-4">
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-7xl mx-auto py-16 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-500 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  if (associations.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-6">
          {deptName} Associations & Clubs
        </h1>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium mb-2">No associations found</h2>
          <p className="text-gray-500">
            This department currently has no listed associations or clubs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-2">
        {deptName} Associations & Clubs
      </h1>
      <p className="text-gray-500 mb-8">
        Student clubs and professional associations in the department
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {associations.map((association) => (
          <AssociationCard key={association.id} association={association} />
        ))}
      </div>
    </div>
  );
}

function AssociationCard({ association }: { association: Association }) {
  // Find events with upcoming dates
  const today = new Date();
  const events = Array.isArray(association.gallery) ? association.gallery : [];
  
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate < today;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle>{association.name}</CardTitle>
        <CardDescription className="font-medium">
          {association.role}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-700 mb-6">{association.description}</p>

        {(upcomingEvents.length > 0 || pastEvents.length > 0) && (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="upcoming">
                Upcoming Events ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past Events ({pastEvents.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  No upcoming events scheduled
                </p>
              ) : (
                upcomingEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="past" className="space-y-4">
              {pastEvents.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  No past events to display
                </p>
              ) : (
                pastEvents.slice(0, 3).map((event, index) => (
                  <EventCard key={index} event={event} />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      
      {association.proof_url && (
        <CardFooter className="bg-gray-50 p-4 border-t">
          <a
            href={association.proof_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center text-sm"
          >
            <FileText className="h-4 w-4 mr-2" />
            View association documentation
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </CardFooter>
      )}
    </Card>
  );
}

function EventCard({ event }: { event: AssociationEvent }) {
  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();
  
  return (
    <Card className={`border ${isPast ? 'border-gray-200' : 'border-primary/20'}`}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{event.title}</CardTitle>
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="h-3 w-3 mr-1" />
          {format(eventDate, "MMMM d, yyyy")}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-gray-600">{event.description}</p>
        
        {event.image_url && (
          <div className="mt-3">
            <img
              src={event.image_url}
              alt={event.title}
              className="rounded-md w-full h-auto max-h-48 object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
