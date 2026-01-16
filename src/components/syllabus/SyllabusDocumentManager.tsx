import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaUpload, FaTrash, FaEye } from 'react-icons/fa';
import { getSyllabusTypes } from '@/utils/syllabus-utils';

interface SyllabusDocumentManagerProps {
  department: string;
}

// Academic year options
const academicYears = [
  '2023-2024',
  '2022-2023',
  '2021-2022',
  '2020-2021',
  '2019-2020',
];

// Semester options
const semesters = [
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7',
  'Semester 8',
];

// Regulation options
const regulations = [
  'R20',
  'R19',
  'R16',
  'R13',
  'R10',
];

export function SyllabusDocumentManager({ department }: SyllabusDocumentManagerProps) {
  // States
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [academicYear, setAcademicYear] = useState('2023-2024');
  const [semester, setSemester] = useState('');
  const [regulation, setRegulation] = useState('');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  // Get available syllabus types for this department
  const syllabusTypes = getSyllabusTypes(department);
  
  // Load documents on initial render
  useEffect(() => {
    loadDocuments();
  }, [department]);
  
  // Load documents from API
  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/syllabus_documents?dept=${department}`);
      setDocuments(response.data.documents || []);
    } catch (error: any) {
      setError('Failed to load syllabus documents');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Auto-fill title if empty
      if (!title) {
        const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
        setTitle(fileNameWithoutExtension);
      }
    }
  };
  
  // Validate form data
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!title || title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
    }
    
    if (!type) {
      errors.type = 'Please select a document type';
    }
    
    if (!selectedFile) {
      errors.file = 'Please select a file to upload';
    }
    
    if (!academicYear || !/^\d{4}-\d{4}$/.test(academicYear)) {
      errors.academicYear = 'Academic year must be in format YYYY-YYYY';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      setUploadProgress(0);
      setError(null);
      
      // Step 1: Upload the file
      const formData = new FormData();
      formData.append('file', selectedFile!);
      formData.append('dept', department);
      formData.append('type', type);
      formData.append('academic_year', academicYear);
      
      const uploadResponse = await axios.post('/api/syllabus_documents/upload', formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      });
      
      // Step 2: Create the document record with the file URL
      const documentData = {
        title,
        description: description || null,
        file_url: uploadResponse.data.fileName,
        type,
        academic_year: academicYear,
        semester: semester || null,
        regulation: regulation || null,
        is_active: true,
        department,
      };
      
      await axios.post('/api/syllabus_documents', documentData);
      
      // Reset form
      setTitle('');
      setDescription('');
      setType('');
      setAcademicYear('2023-2024');
      setSemester('');
      setRegulation('');
      setSelectedFile(null);
      setUploadProgress(0);
      
      // Show success message
      alert('Syllabus document uploaded successfully');
      
      // Reload documents
      loadDocuments();
      
      // Switch to manage tab
      setActiveTab('manage');
      
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a document
  const deleteDocument = async (id: number) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`/api/syllabus_documents/${id}`);
      
      // Show success message
      alert('Document deleted successfully');
      
      // Reload documents
      loadDocuments();
    } catch (error: any) {
      setError('Failed to delete document');
    } finally {
      setLoading(false);
    }
  };
  
  // Get display name for document type
  const getTypeDisplayName = (type: string): string => {
    switch (type) {
      case 'btech': return 'B.Tech';
      case 'mtech': return 'M.Tech';
      case 'soc': return 'School of Computing';
      case 'mba': return 'MBA';
      default: return type;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('upload')}
            className={`w-1/2 py-4 px-1 text-center border-b-2 ${
              activeTab === 'upload'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upload Document
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`w-1/2 py-4 px-1 text-center border-b-2 ${
              activeTab === 'manage'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Documents
          </button>
        </nav>
      </div>

      {activeTab === 'upload' && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Syllabus Document</CardTitle>
            <CardDescription>Upload a new syllabus document for {department}</CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Document File (PDF)</label>
                <input 
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="w-full border p-2 rounded-md"
                />
                {formErrors.file && (
                  <p className="text-sm text-red-500">{formErrors.file}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                  className="w-full border p-2 rounded-md"
                />
                {formErrors.title && (
                  <p className="text-sm text-red-500">{formErrors.title}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  className="w-full border p-2 rounded-md"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Document Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    disabled={loading}
                    className="w-full border p-2 rounded-md"
                  >
                    <option value="">Select type</option>
                    {syllabusTypes.map((type) => (
                      <option key={type} value={type}>
                        {getTypeDisplayName(type)}
                      </option>
                    ))}
                  </select>
                  {formErrors.type && (
                    <p className="text-sm text-red-500">{formErrors.type}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Academic Year</label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    disabled={loading}
                    className="w-full border p-2 rounded-md"
                  >
                    {academicYears.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {formErrors.academicYear && (
                    <p className="text-sm text-red-500">{formErrors.academicYear}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Semester (optional)</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    disabled={loading}
                    className="w-full border p-2 rounded-md"
                  >
                    <option value="">Select semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>{sem}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Regulation (optional)</label>
                  <select
                    value={regulation}
                    onChange={(e) => setRegulation(e.target.value)}
                    disabled={loading}
                    className="w-full border p-2 rounded-md"
                  >
                    <option value="">Select regulation</option>
                    {regulations.map((reg) => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {loading ? 'Uploading...' : 'Upload Document'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      {activeTab === 'manage' && (
        <Card>
          <CardHeader>
            <CardTitle>Manage Syllabus Documents</CardTitle>
            <CardDescription>View and manage existing syllabus documents</CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {loading && (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
            
            {!loading && documents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No syllabus documents found
              </div>
            )}
            
            {!loading && documents.length > 0 && (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-sm text-gray-500">
                          {getTypeDisplayName(doc.type)} • {doc.academic_year}
                          {doc.semester && ` • ${doc.semester}`}
                          {doc.regulation && ` • ${doc.regulation}`}
                        </p>
                        {doc.description && (
                          <p className="text-sm mt-1">{doc.description}</p>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <a 
                          href={doc.file_url} 
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
                        >
                          <FaEye className="mr-1" /> View
                        </a>
                        
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
                          disabled={loading}
                        >
                          <FaTrash className="mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
