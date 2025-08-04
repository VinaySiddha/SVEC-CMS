import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MediaPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Management</CardTitle>
        <CardDescription>
          Upload, organize, and manage your media files.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Media library functionality will be implemented here.</p>
      </CardContent>
    </Card>
  );
}
