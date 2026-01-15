'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiGet, apiDelete } from '@/lib/api';
import { MODULES_FIELD_CONFIG } from '@/config/module-fields';
import { 
  ArrowLeft,
  Search, 
  Edit, 
  Trash2,
  Plus,
  Eye,
  Download,
  Upload,
  Filter,
  MoreVertical
} from 'lucide-react';

interface TableRecord {
  [key: string]: any;
}

export default function ModuleManagePage() {
  const params = useParams() as { dept: string; module: string };
  const searchParams = useSearchParams() as URLSearchParams;
  
  const deptCode = params?.dept as string;
  const moduleName = params?.module as string;
  const tableName = searchParams?.get('table') || `${deptCode}_${moduleName}`;
  
  const [records, setRecords] = useState<TableRecord[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [displayColumns, setDisplayColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 10;

  // Get module configuration
  const moduleConfig = (MODULES_FIELD_CONFIG as any)[deptCode]?.[moduleName];

  useEffect(() => {
    if (tableName) {
      fetchTableData();
    }
  }, [tableName, currentPage]);

  useEffect(() => {
    // Determine which columns to display
    if (moduleConfig && columns.length > 0) {
      // Show displayField first, then other searchable fields, then first few columns
      const priorityColumns = new Set<string>();
      
      // Add display field
      if (moduleConfig.displayField && columns.includes(moduleConfig.displayField)) {
        priorityColumns.add(moduleConfig.displayField);
      }
      
      // Add searchable fields
      if (moduleConfig.searchableFields) {
        moduleConfig.searchableFields.slice(0, 3).forEach((field: string) => {
          if (columns.includes(field)) {
            priorityColumns.add(field);
          }
        });
      }
      
      // Add first few columns if needed
      for (const col of columns) {
        if (priorityColumns.size >= 5) break;
        if (col !== 'id' && !col.includes('url') && !col.includes('created') && !col.includes('updated')) {
          priorityColumns.add(col);
        }
      }
      
      setDisplayColumns(Array.from(priorityColumns));
    } else {
      // Fallback: show first 6 columns excluding id and timestamp columns
      const filtered = columns.filter(col => 
        col !== 'id' && !col.includes('created') && !col.includes('updated')
      ).slice(0, 6);
      setDisplayColumns(filtered);
    }
  }, [columns, moduleConfig]);

  const fetchTableData = async () => {
    try {
      setLoading(true);
      const response = await apiGet(
        `/api/admin/tables/${tableName}?page=${currentPage}&limit=${recordsPerPage}&search=${searchTerm}`
      );
      const data = await response.json();
      
      if (data.success) {
        setRecords(data.data.records);
        setColumns(data.data.columns);
        setTotalRecords(data.data.total);
      } else {
        console.error('Failed to fetch table data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchTableData();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    
    try {
      const response = await apiDelete(`/api/admin/tables/${tableName}/${id}`);
      
      if (response.ok) {
        fetchTableData(); // Refresh data
      } else {
        alert('Failed to delete record');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Error deleting record');
    }
  };

  const formatColumnName = (column: string) => {
    return column.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatCellValue = (value: any, column: string) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (column.includes('date') || column.includes('time')) {
      return new Date(value).toLocaleDateString();
    }
    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 50) + '...';
    }
    return value.toString();
  };

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const breadcrumb = `${deptCode.toUpperCase()} > ${moduleName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Loading...</h1>
            <p className="text-gray-600">Loading module data...</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {moduleName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h1>
            <p className="text-gray-600">{breadcrumb} • Table: {tableName}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button 
            size="sm"
            onClick={() => window.location.href = `${window.location.pathname}/add${window.location.search}`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 flex space-x-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <Badge variant="outline">
          {totalRecords} total records
        </Badge>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Records</CardTitle>
          <CardDescription>
            Manage all records in the {tableName} table
          </CardDescription>
        </CardHeader>
        <CardContent>
          {records.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    {displayColumns.map((column) => (
                      <th key={column} className="text-left py-3 px-4 font-medium text-gray-900">
                        {formatColumnName(column)}
                      </th>
                    ))}
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={record.id || index} className="border-b hover:bg-gray-50">
                      {displayColumns.map((column) => (
                        <td key={column} className="py-3 px-4 text-sm">
                          {formatCellValue(record[column], column)}
                        </td>
                      ))}
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.location.href = `${window.location.pathname}/${record.id}${window.location.search}`}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.location.href = `${window.location.pathname}/${record.id}/edit${window.location.search}`}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => record.id && handleDelete(record.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📄</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'No records match your search criteria.' : 'This table is empty.'}
              </p>
              <Button 
                onClick={() => window.location.href = `${window.location.pathname}/add${window.location.search}`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Record
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, totalRecords)} of {totalRecords} records
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            <span className="flex items-center px-3 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}