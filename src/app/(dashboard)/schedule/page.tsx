import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SchedulePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Scheduler</CardTitle>
        <CardDescription>
          Plan and automate your content publishing schedule.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Scheduling tool will be implemented here.</p>
      </CardContent>
    </Card>
  );
}
