'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Plus, Pencil, Trash2, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ExamSectionHeader } from '@/components/exam-section/ExamSectionHeader';
import { ExamSectionTopHeader } from '@/components/exam-section/ExamSectionTopHeader';

interface ExamNotification {
  sno: number;
  date: string;
  content: string;
  link: string;
  degree: string;
  type: string;
  posteddate: string;
}

const degreeOptions = [
  { value: 'UG', label: 'UG' },
  { value: 'PG', label: 'PG' }
];

const typeOptions = [
  { value: 'Timetables', label: 'Timetables' },
  { value: 'Results', label: 'Results' },
  { value: 'Revaluation Results', label: 'Revaluation Results' },
  { value: 'Fee Notifications', label: 'Fee Notifications' },
  { value: 'Downloads', label: 'Downloads' }
];

export default function JNTUKExamSection() {
  const router = useRouter();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [examData, setExamData] = useState<ExamNotification[]>([]);
  const [timetableData, setTimetableData] = useState<{ UG: ExamNotification[]; PG: ExamNotification[] }>({ UG: [], PG: [] });
  const [showTimetables, setShowTimetables] = useState(false);
  const [formData, setFormData] = useState<Partial<ExamNotification>>({
    content: '',
    degree: '',
    type: '',
    link: '',
    date: new Date().toISOString().split('T')[0],
    posteddate: new Date().toISOString().split('T')[0]
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let pdfLink = formData.link || '';
    if (pdfFile) {
      setUploadingPdf(true);
      const uploadData = new FormData();
      uploadData.append('file', pdfFile);
      uploadData.append('type', formData.type || '');
      uploadData.append('degree', formData.degree || '');
      try {
        const uploadRes = await fetch('/api/exam-section/jntuk-exam-section/upload', {
          method: 'POST',
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        if (uploadJson.success && uploadJson.link) {
          pdfLink = uploadJson.link;
          
          toast.success(`PDF uploaded successfully! (${uploadJson.fileSize}KB)`);
        } else {
          toast.error('PDF upload failed');
          setUploadingPdf(false);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        toast.error('PDF upload error');
        setUploadingPdf(false);
        setIsLoading(false);
        return;
      }
      setUploadingPdf(false);
    }

    try {
      const response = await fetch('/api/exam-section/jntuk-exam-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, link: pdfLink }),
      });

      if (response.ok) {
        toast.success('Notification added successfully');
        setIsAddingNew(false);
        setFormData({
          content: '',
          degree: '',
          type: '',
          link: '',
          date: new Date().toISOString().split('T')[0],
          posteddate: new Date().toISOString().split('T')[0]
        });
        setPdfFile(null);
        // Refresh data
        fetchExamData();
      } else {
        toast.error('Failed to add notification');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchExamData = async () => {
    try {
      const response = await fetch('/api/exam-section/jntuk-exam-section');
      const data = await response.json();
      setExamData(data);
      // Filter timetables for UG and PG - check for both 'timetable' and 'Timetables'
      const ug = data.filter((item: ExamNotification) => 
        (item.type.toLowerCase() === 'timetable' || item.type.toLowerCase() === 'timetables') && 
        item.degree.toUpperCase() === 'UG'
      );
      const pg = data.filter((item: ExamNotification) => 
        (item.type.toLowerCase() === 'timetable' || item.type.toLowerCase() === 'timetables') && 
        item.degree.toUpperCase() === 'PG'
      );
      setTimetableData({ UG: ug, PG: pg });
    } catch (error) {
      toast.error('Failed to fetch exam notifications');
    }
  };

  useEffect(() => {
    fetchExamData();
  }, []);

  const handleDelete = async (sno: number) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      try {
        const response = await fetch('/api/exam-section/jntuk-exam-section', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sno }),
        });

        if (response.ok) {
          toast.success('Notification deleted successfully');
          fetchExamData();
        } else {
          toast.error('Failed to delete notification');
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Exam Section Top Header */}
      <ExamSectionTopHeader showNavigation={true} />

      <div className="p-6">
        <ExamSectionHeader 
          pageTitle="JNTUK Exam Section"
          breadcrumbs={[
            { label: 'Exam Section', isActive: false },
            { label: 'JNTUK Exam Section', isActive: true }
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">JNTUK Exam Section</h1>
          <p className="text-gray-500">Manage JNTUK examination notifications and updates</p>
        </div>

      {/* Add New Button */}
      {!isAddingNew && (
        <Button 
          onClick={() => setIsAddingNew(true)}
          className="mb-6 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Notification
        </Button>
      )}

      {/* Add/Edit Form */}
      {isAddingNew && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={formData.date || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Degree</label>
                  <Select 
                    onValueChange={(value) => setFormData({ ...formData, degree: value })}
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
                  <label className="text-sm font-medium">Type</label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
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
                  <label className="text-sm font-medium">PDF Upload</label>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        const selectedFile = e.target.files[0];
                        
                        // Validate file size (20MB max)
                        if (selectedFile.size > 20 * 1024 * 1024) {
                          toast.error('File size should not exceed 20MB');
                          return;
                        }
                        
                        // Validate file type
                        if (!selectedFile.type.includes('pdf')) {
                          toast.error('Only PDF files are allowed');
                          return;
                        }
                        
                        setPdfFile(selectedFile);
                      } else {
                        setPdfFile(null);
                      }
                    }}
                  />
                  {pdfFile && <span className="text-xs text-gray-500">{pdfFile.name} (Max: 10MB)</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Link (optional)</label>
                  <Input
                    type="url"
                    placeholder="Enter notification link"
                    value={formData.link || ''}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Enter notification content"
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingNew(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? 'Saving...' : 'Save Notification'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Timetables Dropdown */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>JNTUK Timetables</CardTitle>
            <Button variant="outline" onClick={() => setShowTimetables((prev) => !prev)}>
              {showTimetables ? 'Hide' : 'Show'} Timetables
            </Button>
          </div>
        </CardHeader>
        {showTimetables && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">UG Timetables</h4>
                {timetableData.UG.length > 0 ? (
                  <ul className="space-y-2">
                    {timetableData.UG.map((item) => (
                      <li key={item.sno} className="flex items-center gap-2">
                        <span className="text-gray-700 text-sm">{item.content}</span>
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">View</a>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No UG timetables available.</p>
                )}
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">PG Timetables</h4>
                {timetableData.PG.length > 0 ? (
                  <ul className="space-y-2">
                    {timetableData.PG.map((item) => (
                      <li key={item.sno} className="flex items-center gap-2">
                        <span className="text-gray-700 text-sm">{item.content}</span>
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">View</a>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No PG timetables available.</p>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Notifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>JNTUK Exam Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="max-w-[300px]">Content</TableHead>
                  <TableHead>Posted Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examData.map((notification) => (
                  <TableRow key={notification.sno}>
                    <TableCell>{new Date(notification.date).toLocaleDateString()}</TableCell>
                    <TableCell>{notification.degree}</TableCell>
                    <TableCell>{notification.type}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {notification.content}
                    </TableCell>
                    <TableCell>
                      {new Date(notification.posteddate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {notification.link && (
                          <a
                            href={notification.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <LinkIcon className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            setFormData(notification);
                            setIsAddingNew(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(notification.sno)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}