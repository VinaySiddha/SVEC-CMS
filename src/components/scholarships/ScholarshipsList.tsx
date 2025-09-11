"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useToast } from "../ui/use-toast";
import LoadingSpinner from "../LoadingSpinner";
import { FileText, Trash2, Download } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface ScholarshipData {
  id: number;
  academic_year: string;
  category: 'Merit' | 'Topper' | 'Other';
  student_name: string;
  amount: number;
  proof_url: string | null;
}

interface ScholarshipsListProps {
  deptId: string;
  isAdmin?: boolean;
  onRefresh?: () => void;
}

export default function ScholarshipsList({ deptId, isAdmin = false, onRefresh }: ScholarshipsListProps) {
  const [scholarships, setScholarships] = useState<ScholarshipData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { toast } = useToast();

  // Fetch scholarships on component mount
  useEffect(() => {
    fetchScholarships();
  }, [deptId]);

  // Function to fetch scholarships
  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/departments/${deptId}/scholarships`);
      if (!response.ok) {
        throw new Error('Failed to fetch scholarships');
      }
      
      const data = await response.json();
      setScholarships(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load scholarships');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle scholarship deletion
  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    setDeleteId(id);
    
    try {
      const response = await fetch(`/api/departments/${deptId}/scholarships/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete scholarship');
      }
      
      // Remove the deleted scholarship from the state
      setScholarships(scholarships.filter(scholarship => scholarship.id !== id));
      
      toast({
        title: "Success",
        description: "Scholarship deleted successfully",
        variant: "default",
      });
      
      // Call onRefresh if provided
      if (onRefresh) {
        onRefresh();
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || 'An error occurred while deleting the scholarship',
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  // Format amount as currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (scholarships.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No scholarships found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scholarship Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Academic Year</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Proof</TableHead>
                {isAdmin && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {scholarships.map((scholarship) => (
                <TableRow key={scholarship.id}>
                  <TableCell>{scholarship.academic_year}</TableCell>
                  <TableCell>{scholarship.student_name}</TableCell>
                  <TableCell>{scholarship.category}</TableCell>
                  <TableCell>{formatAmount(scholarship.amount)}</TableCell>
                  <TableCell>
                    {scholarship.proof_url ? (
                      <a 
                        href={`/uploads/scholarships/${scholarship.proof_url}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" /> View
                      </a>
                    ) : (
                      <span className="text-gray-400">No proof</span>
                    )}
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="ml-2">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Scholarship</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this scholarship record? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(scholarship.id)}
                              disabled={isDeleting && deleteId === scholarship.id}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {isDeleting && deleteId === scholarship.id ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
