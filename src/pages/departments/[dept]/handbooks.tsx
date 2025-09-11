import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handbook } from '@/types/handbooks';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function DepartmentHandbooksPage() {
  const router = useRouter();
  const { deptId } = router.query;
  
  const [handbooks, setHandbooks] = useState<Handbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [departmentName, setDepartmentName] = useState('');
  
  // Map of department IDs to names
  const departmentMap: Record<string, string> = {
    'cse': 'Computer Science Engineering',
    'ece': 'Electronics & Communication Engineering',
    'eee': 'Electrical & Electronics Engineering',
    'mech': 'Mechanical Engineering',
    'civil': 'Civil Engineering',
    'it': 'Information Technology',
    'aiml': 'Artificial Intelligence & Machine Learning',
    'ds': 'Data Science',
  };

  useEffect(() => {
    if (deptId && typeof deptId === 'string') {
      setDepartmentName(departmentMap[deptId] || deptId.toUpperCase());
      fetchHandbooks(deptId);
    }
  }, [deptId]);

  const fetchHandbooks = async (departmentId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/handbooks?dept=${departmentId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch handbooks');
      }
      
      const data = await response.json();
      setHandbooks(data);
    } catch (error) {
      console.error('Error fetching handbooks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">{departmentName} Handbooks</h1>
        <p className="text-muted-foreground">
          Course handbooks and curriculum documents for {departmentName} students
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      ) : handbooks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-16 w-16 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">No handbooks available</h3>
            <p className="mt-2 text-muted-foreground text-center max-w-md">
              There are currently no handbooks available for this department. Please check back later.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {handbooks.map((handbook) => (
            <Card key={handbook.id} className="flex flex-col overflow-hidden">
              <CardHeader className="flex-1 pb-4">
                <CardTitle className="text-xl">{handbook.title}</CardTitle>
                <p className="text-sm text-muted-foreground">Edition: {handbook.edition}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex space-x-2">
                  <a 
                    href={handbook.document_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                  </a>
                  <a 
                    href={handbook.document_url} 
                    download={`${handbook.title}-${handbook.edition}.pdf`}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
