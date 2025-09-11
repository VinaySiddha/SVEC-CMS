"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ACHIEVEMENT_TYPES } from '@/utils/faculty-achievements-utils';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AchievementForm({ achievementId }: { achievementId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deptParam = searchParams ? searchParams.get('dept') : null;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<{id: string, name: string}[]>([]);
  
  const [formData, setFormData] = useState({
    dept: deptParam || '',
    type: '',
    title: '',
    description: '',
    approved: false,
    proof_url: '',
  });
  
  const [proofFile, setProofFile] = useState<File | null>(null);
  
  // Fetch departments for dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments');
        if (!response.ok) throw new Error('Failed to fetch departments');
        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to load departments. Please try again later.');
      }
    };
    
    fetchDepartments();
  }, []);
  
  // If editing, fetch existing achievement data
  useEffect(() => {
    const fetchAchievementData = async () => {
      if (!achievementId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/faculty-achievements/${achievementId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch achievement: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        setFormData({
          dept: data.dept || '',
          type: data.type || '',
          title: data.title || '',
          description: data.description || '',
          approved: Boolean(data.approved),
          proof_url: data.proof_url || '',
        });
      } catch (err) {
        console.error('Error fetching achievement data:', err);
        setError('Failed to load achievement data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (achievementId) {
      fetchAchievementData();
    }
  }, [achievementId]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, approved: checked }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProofFile(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validate form data
      if (!formData.dept || !formData.type || !formData.title || !formData.description) {
        setError('Please fill all required fields');
        setIsSubmitting(false);
        return;
      }
      
      if (!achievementId && !proofFile) {
        setError('Please upload a proof document');
        setIsSubmitting(false);
        return;
      }
      
      // Create form data for submission
      const submissionFormData = new FormData();
      submissionFormData.append('dept', formData.dept);
      submissionFormData.append('type', formData.type);
      submissionFormData.append('title', formData.title);
      submissionFormData.append('description', formData.description);
      submissionFormData.append('approved', String(formData.approved));
      
      if (proofFile) {
        submissionFormData.append('proof_file', proofFile);
      }
      
      // Determine if creating new or updating
      const url = achievementId 
        ? `/api/faculty-achievements/${achievementId}` 
        : '/api/faculty-achievements';
      
      const method = achievementId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: submissionFormData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit achievement');
      }
      
      toast.success(
        achievementId ? 'Achievement updated successfully!' : 'Achievement added successfully!'
      );
      
      // Redirect to achievements management page
      router.push('/administration/manage-faculty-achievements');
      
    } catch (err: any) {
      console.error('Error submitting achievement:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{achievementId ? 'Edit Faculty Achievement' : 'Add New Faculty Achievement'}</CardTitle>
        <CardDescription>
          {achievementId 
            ? 'Update the details of an existing faculty achievement' 
            : 'Add a new faculty achievement record'}
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="dept">Department</Label>
            <Select 
              value={formData.dept} 
              onValueChange={(value: string) => handleSelectChange('dept', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger id="dept">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Achievement Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: string) => handleSelectChange('type', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select achievement type" />
              </SelectTrigger>
              <SelectContent>
                {ACHIEVEMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Achievement Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter achievement title"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide details about the achievement"
              rows={4}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="proof_file">Proof Document</Label>
            <Input
              id="proof_file"
              name="proof_file"
              type="file"
              onChange={handleFileChange}
              disabled={isSubmitting}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            {formData.proof_url && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Current file: 
                  <a 
                    href={formData.proof_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    View
                  </a>
                </p>
                <p className="text-xs text-gray-400">Upload a new file to replace</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="approved" 
              checked={formData.approved}
              onCheckedChange={handleCheckboxChange}
              disabled={isSubmitting}
            />
            <Label htmlFor="approved" className="cursor-pointer">
              Approved for public display
            </Label>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push('/administration/manage-faculty-achievements')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoadingSpinner className="mr-2" size="sm" />
                {achievementId ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              achievementId ? 'Update Achievement' : 'Save Achievement'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
