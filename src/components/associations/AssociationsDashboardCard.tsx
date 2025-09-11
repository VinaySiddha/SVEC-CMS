import React from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AssociationsDashboardCardProps {
  deptId: string;
  associationsCount?: number;
}

export default function AssociationsDashboardCard({
  deptId,
  associationsCount = 0,
}: AssociationsDashboardCardProps) {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Associations</CardTitle>
          <CardDescription>
            Student clubs and associations
          </CardDescription>
        </div>
        <div className="rounded-full bg-primary/10 p-2">
          <Users className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{associationsCount}</div>
        <p className="text-xs text-muted-foreground">
          {associationsCount === 1 ? "Association" : "Associations"} in this department
        </p>
        <div className="mt-4">
          <Link href={`/departments/${deptId}/associations`}>
            <Button size="sm" className="w-full">
              Manage Associations
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
