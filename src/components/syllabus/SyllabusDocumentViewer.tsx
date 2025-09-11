import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaFileAlt, FaDownload, FaFilter } from 'react-icons/fa';

interface SyllabusDocument {
  id: number;
  title: string;
  description: string | null;
  file_url: string;
  type: string;
  academic_year: string;
  semester: string | null;
  regulation: string | null;
  department: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SyllabusDocumentViewerProps {
  department: string;
  title?: string;
  description?: string;
  showFilters?: boolean;
}

export function SyllabusDocumentViewer({
  department,
  title = 'Syllabus Documents',
  description = 'View and download department syllabus documents',
  showFilters = true,
}: SyllabusDocumentViewerProps) {
  // States
  const [documents, setDocuments] = useState<SyllabusDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<SyllabusDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedRegulation, setSelectedRegulation] = useState<string>('');
  
  // Extract unique values for filters
  const types = [...new Set(documents.map((doc) => doc.type))];
  const years = [...new Set(documents.map((doc) => doc.academic_year))];
  const semesters = [...new Set(documents.filter(doc => doc.semester).map((doc) => doc.semester as string))];
  const regulations = [...new Set(documents.filter(doc => doc.regulation).map((doc) => doc.regulation as string))];
  
  // Load documents on initial render
  useEffect(() => {
    loadDocuments();
  }, [department]);
  
  // Update filtered documents when filters change
  useEffect(() => {
    filterDocuments();
  }, [documents, selectedType, selectedYear, selectedSemester, selectedRegulation]);
  
  // Load documents from API
  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/syllabus_documents?dept=${department}`);
      const docs = response.data.documents || [];
      setDocuments(docs);
    } catch (error: any) {
      console.error('Error loading documents:', error);
      setError('Failed to load syllabus documents');
    } finally {
      setLoading(false);
    }
  };
  
  // Filter documents based on selected options
  const filterDocuments = () => {
    let filtered = [...documents];
    
    if (selectedType) {
      filtered = filtered.filter(doc => doc.type === selectedType);
    }
    
    if (selectedYear) {
      filtered = filtered.filter(doc => doc.academic_year === selectedYear);
    }
    
    if (selectedSemester) {
      filtered = filtered.filter(doc => doc.semester === selectedSemester);
    }
    
    if (selectedRegulation) {
      filtered = filtered.filter(doc => doc.regulation === selectedRegulation);
    }
    
    setFilteredDocuments(filtered);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedType('');
    setSelectedYear('');
    setSelectedSemester('');
    setSelectedRegulation('');
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
  
  // Document list to display (filtered or all)
  const displayDocuments = filteredDocuments.length > 0 ? filteredDocuments : documents;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {showFilters && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FaFilter className="h-4 w-4 mr-2" />
              <h3 className="text-sm font-medium">Filters</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {types.length > 0 && (
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">All Types</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {getTypeDisplayName(type)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {years.length > 0 && (
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Academic Year</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {semesters.length > 0 && (
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Semester</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                  >
                    <option value="">All Semesters</option>
                    {semesters.map((semester) => (
                      <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {regulations.length > 0 && (
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Regulation</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedRegulation}
                    onChange={(e) => setSelectedRegulation(e.target.value)}
                  >
                    <option value="">All Regulations</option>
                    {regulations.map((regulation) => (
                      <option key={regulation} value={regulation}>{regulation}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            {(selectedType || selectedYear || selectedSemester || selectedRegulation) && (
              <div className="mt-2 flex justify-end">
                <button
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
        
        {!loading && !error && displayDocuments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No syllabus documents available
          </div>
        )}
        
        {!loading && !error && displayDocuments.length > 0 && (
          <div className="space-y-4">
            {displayDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <FaFileAlt className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    <p className="text-sm text-gray-500">
                      {getTypeDisplayName(doc.type)} • {doc.academic_year}
                      {doc.semester && ` • ${doc.semester}`}
                      {doc.regulation && ` • ${doc.regulation}`}
                    </p>
                  </div>
                </div>
                
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <FaDownload className="h-4 w-4 mr-1" />
                  <span>Download</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
