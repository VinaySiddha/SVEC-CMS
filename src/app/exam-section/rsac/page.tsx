'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { ExamSectionHeader } from '@/components/exam-section/ExamSectionHeader';
import { ExamSectionTopHeader } from '@/components/exam-section/ExamSectionTopHeader';

// Define type options based on category
const typeOptions = [
  { value: 'syllabus', label: 'Syllabus' },
  { value: 'regulations', label: 'Regulations' },
  { value: 'academic-calendar', label: 'Academic Calendar' }
];

const degreeOptions = [
  { value: 'UG', label: 'Undergraduate (UG)' },
  { value: 'PG', label: 'Postgraduate (PG)' }
];

interface RSACItem {
  id: number;
  date: string;
  content: string;
  link: string;
  degree: string;
  type: string;
  postedDate: string;
}

export default function RSACPage() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [items, setItems] = useState<RSACItem[]>([]);
  const [formData, setFormData] = useState({
    date: '',
    content: '',
    degree: '',
    type: ''
  });

  const fetchItems = async () => {
    let isMounted = true; // Track if the component is mounted

    try {
      const response = await fetch('/api/exam-section/rsac');
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      if (isMounted) {
        setItems(data); // Only update state if the component is still mounted
      }
    } catch (error) {
      if (isMounted) {
        toast.error('Failed to fetch items');
      }
    }

    return () => {
      isMounted = false; // Cleanup function to prevent state updates after unmount
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file size (20MB max original size)
      if (selectedFile.size > 20 * 1024 * 1024) {
        toast.error('File size should not exceed 20MB');
        return;
      }
      
      // Validate file type
      if (!selectedFile.type.includes('pdf')) {
        toast.error('Only PDF files are allowed');
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a PDF file');
      return;
    }

    setLoading(true);
    try {
      // First upload the file
      const fileData = new FormData();
      fileData.append('file', file);
      fileData.append('type', formData.type);
      fileData.append('degree', formData.degree);
      
      const uploadResponse = await fetch('/api/exam-section/rsac/upload', {
        method: 'POST',
        body: fileData,
      });
      
      if (!uploadResponse.ok) throw new Error('Failed to upload file');
      const { url, fileSize } = await uploadResponse.json();

      toast.success(`PDF uploaded successfully! (${fileSize}KB)`);

      // Then create the RSAC entry
      const response = await fetch('/api/exam-section/rsac', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          link: url,
          postedDate: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error('Failed to create entry');

      toast.success('Item added successfully');
      
      // Reset form and refresh list
      setFormData({
        date: '',
        content: '',
        degree: '',
        type: ''
      });
      setFile(null);
      fetchItems();

    } catch (error) {
      toast.error('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/exam-section/rsac?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete item');

      toast.success('Item deleted successfully');
      fetchItems();
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  // Fetch items on mount
  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchItems = async () => {
      try {
        const response = await fetch('/api/exam-section/rsac');
        if (!response.ok) throw new Error('Failed to fetch items');
        const data = await response.json();
        if (isMounted) {
          setItems(data); // Only update state if the component is still mounted
        }
      } catch (error) {
        if (isMounted) {
          toast.error('Failed to fetch items');
        }
      }
    };

    fetchItems(); // Call the async function immediately

    return () => {
      isMounted = false; // Cleanup function to prevent state updates after unmount
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Exam Section Top Header */}
      <ExamSectionTopHeader showNavigation={true} />

      <div className="container mx-auto p-6 space-y-8">
        <ExamSectionHeader 
          pageTitle="RSAC Management"
          breadcrumbs={[
            { label: 'Exam Section', isActive: false },
            { label: 'RSAC Management', isActive: true }
          ]}
        />

        <h1 className="text-2xl font-bold text-gray-800">RSAC Management</h1>

      {/* Add Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  name="type"
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange(value, 'type')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Select
                  name="degree"
                  value={formData.degree}
                  onValueChange={(value) => handleSelectChange(value, 'degree')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {degreeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">PDF Document</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                <p className="text-sm text-gray-500">Max size: 10MB</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                placeholder="Enter description or title"
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4 animate-spin" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Add Item
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Items List */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Uploaded Items</h2>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Posted Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No items found. Add one to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                      <TableCell>{item.content}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.degree}</TableCell>
                      <TableCell>{new Date(item.postedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.open(item.link, '_blank')}
                            title="View PDF"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}