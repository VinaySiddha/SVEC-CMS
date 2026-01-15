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
import { Eye, Trash2, Upload, Edit2 } from 'lucide-react';
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
  posted_date?: string;
  postedDate?: string;
}

export default function RSACPage() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [items, setItems] = useState<RSACItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    content: '',
    degree: '',
    type: ''
  });

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/exam-section/rsac');
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      
      // Transform data to match component expectations
      const transformedData = Array.isArray(data) ? data.map((item: any) => ({
        ...item,
        date: item.date || new Date().toISOString().split('T')[0],
        postedDate: item.posted_date || item.postedDate || new Date().toISOString()
      })) : [];
      
      setItems(transformedData);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to fetch items');
      setItems([]);
    }
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
    
    // Validate required fields
    if (!formData.date) {
      toast.error('Please select a date');
      return;
    }
    if (!formData.content) {
      toast.error('Please enter content');
      return;
    }
    if (!formData.degree) {
      toast.error('Please select a degree');
      return;
    }
    if (!formData.type) {
      toast.error('Please select a type');
      return;
    }
    if (!editingId && !file) {
      toast.error('Please select a PDF file');
      return;
    }

    setLoading(true);
    try {
      // First upload the file
      const fileData = new FormData();
      if (file) fileData.append('file', file);
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
          date: formData.date,
          content: formData.content,
          degree: formData.degree,
          type: formData.type,
          link: url
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

  const handleEdit = (item: RSACItem) => {
    // Convert date to YYYY-MM-DD format for the input field
    const dateStr = typeof item.date === 'string'
      ? item.date.includes('T')
        ? item.date.split('T')[0]
        : item.date
      : new Date(item.date).toISOString().split('T')[0];
    
    setEditingId(item.id);
    setFormData({
      date: dateStr,
      content: item.content,
      degree: item.degree,
      type: item.type
    });
    setFile(null);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      date: '',
      content: '',
      degree: '',
      type: ''
    });
    setFile(null);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingId) return;

    setLoading(true);
    try {
      let updateData: any = {
        ...formData,
        id: editingId
      };

      // If a new file is selected, upload it
      if (file) {
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
        updateData.link = url;
        toast.success(`PDF uploaded successfully! (${fileSize}KB)`);
      }

      // Update the RSAC entry
      const response = await fetch('/api/exam-section/rsac', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error('Failed to update entry');

      toast.success('Item updated successfully');
      
      // Reset form and refresh list
      handleCancel();
      fetchItems();

    } catch (error) {
      toast.error('Failed to update item');
    } finally {
      setLoading(false);
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

      {/* Add/Edit Form */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={editingId ? handleUpdateSubmit : handleSubmit} className="space-y-6">
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
                <Label htmlFor="file">PDF Document {editingId && <span className="text-xs text-gray-500">(Optional - leave empty to keep existing file)</span>}</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required={!editingId}
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
                  {editingId ? 'Updating...' : 'Uploading...'}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {editingId ? 'Update Item' : 'Add Item'}
                </span>
              )}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
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
                      <TableCell>{item.postedDate ? new Date(item.postedDate as string | number | Date).toLocaleDateString() : 'N/A'}</TableCell>
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
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(item)}
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
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