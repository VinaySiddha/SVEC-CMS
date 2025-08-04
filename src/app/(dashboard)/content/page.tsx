import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContentPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management</CardTitle>
        <CardDescription>
          Create, edit, and manage your articles and blog posts here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content editor functionality will be implemented here.</p>
      </CardContent>
    </Card>
  );
}
