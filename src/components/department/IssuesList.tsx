import React, { useState } from 'react';
import { Issue } from '@/types/issues';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { AlertCircle, Download, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface IssuesListProps {
  issues: Issue[];
  deptId: string;
  onEditIssue: (issue: Issue) => void;
  onRefresh: () => void;
}

export function IssuesList({ issues, deptId, onEditIssue, onRefresh }: IssuesListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDeleteIssue = async (issueId: string) => {
    setIsDeleting(issueId);
    try {
      const response = await fetch(`/api/departments/${deptId}/issues?id=${issueId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Issue deleted successfully');
        onRefresh();
      } else {
        toast.error(result.message || 'Failed to delete issue');
      }
    } catch (error) {
      console.error('Error deleting issue:', error);
      toast.error('Failed to delete issue');
    } finally {
      setIsDeleting(null);
    }
  };

  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No issues found</h3>
        <p className="text-sm text-muted-foreground mt-2">
          No issues have been recorded for this department yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <Card key={issue.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">
                {issue.issue}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M8 2C8.55228 2 9 1.55228 9 1C9 0.447715 8.55228 0 8 0C7.44772 0 7 0.447715 7 1C7 1.55228 7.44772 2 8 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8 9C8.55228 9 9 8.55229 9 8C9 7.44771 8.55228 7 8 7C7.44772 7 7 7.44771 7 8C7 8.55229 7.44772 9 8 9Z"
                        fill="currentColor"
                      />
                      <path
                        d="M9 15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15C7 14.4477 7.44772 14 8 14C8.55228 14 9 14.4477 9 15Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditIssue(issue)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {issue.document_url && (
                    <DropdownMenuItem
                      onClick={() => window.open(issue.document_url, '_blank')}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Document
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDeleteIssue(issue.id)}
                    disabled={isDeleting === issue.id}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isDeleting === issue.id ? 'Deleting...' : 'Delete'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Date: {format(new Date(issue.date), 'PPP')}</span>
              {issue.document_url && (
                <a
                  href={issue.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 text-blue-500 hover:underline flex items-center"
                >
                  <Download className="mr-1 h-3 w-3" />
                  View Document
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
