import React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TrainingsDashboardCardProps {
  deptId: string;
  trainingsCount?: number;
}

export default function TrainingsDashboardCard({
  deptId,
  trainingsCount = 0,
}: TrainingsDashboardCardProps) {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Trainings</CardTitle>
          <CardDescription>
            Professional development courses
          </CardDescription>
        </div>
        <div className="rounded-full bg-primary/10 p-2">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{trainingsCount}</div>
        <p className="text-xs text-muted-foreground">
          {trainingsCount === 1 ? "Training" : "Trainings"} completed
        </p>
        <div className="mt-4">
          <Link href={`/departments/${deptId}/trainings`}>
            <Button size="sm" className="w-full">
              Manage Trainings
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
