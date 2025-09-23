import React from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reportedBy: string;
  reportedDate: string;
  assignedTo?: string;
  resolvedDate?: string;
}

interface IssuesPageProps {
  deptId?: string;
}

const IssuesPage: React.FC<IssuesPageProps> = ({ deptId }) => {
  const [issues] = React.useState<Issue[]>([
    {
      id: 1,
      title: 'Website Loading Issue',
      description: 'The department website is loading slowly',
      status: 'open',
      priority: 'medium',
      reportedBy: 'John Doe',
      reportedDate: '2024-01-15',
    },
    {
      id: 2,
      title: 'Faculty Profile Update',
      description: 'Need to update faculty profile information',
      status: 'in-progress',
      priority: 'low',
      reportedBy: 'Jane Smith',
      reportedDate: '2024-01-10',
      assignedTo: 'Admin Team',
    },
    {
      id: 3,
      title: 'Database Connection Error',
      description: 'Intermittent database connection issues',
      status: 'resolved',
      priority: 'high',
      reportedBy: 'Tech Team',
      reportedDate: '2024-01-05',
      assignedTo: 'IT Support',
      resolvedDate: '2024-01-08',
    },
  ]);

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'open':
        return 'text-red-600 bg-red-100';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'closed':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'critical':
        return 'text-red-800 bg-red-200';
      case 'high':
        return 'text-orange-800 bg-orange-200';
      case 'medium':
        return 'text-yellow-800 bg-yellow-200';
      case 'low':
        return 'text-blue-800 bg-blue-200';
      default:
        return 'text-gray-800 bg-gray-200';
    }
  };

  const getStatusIcon = (status: Issue['status']) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {deptId ? deptId.toUpperCase() : 'Department'} Issues
        </h1>
        <p className="text-gray-600">
          Track and manage department-related issues and requests
        </p>
      </div>

      <div className="grid gap-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {issue.title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      issue.status
                    )}`}
                  >
                    {getStatusIcon(issue.status)}
                    {issue.status.replace('-', ' ')}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      issue.priority
                    )}`}
                  >
                    {issue.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{issue.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium">Reported By:</span>
                <br />
                {issue.reportedBy}
              </div>
              <div>
                <span className="font-medium">Reported Date:</span>
                <br />
                {issue.reportedDate}
              </div>
              {issue.assignedTo && (
                <div>
                  <span className="font-medium">Assigned To:</span>
                  <br />
                  {issue.assignedTo}
                </div>
              )}
              {issue.resolvedDate && (
                <div>
                  <span className="font-medium">Resolved Date:</span>
                  <br />
                  {issue.resolvedDate}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {issues.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No issues found
          </h3>
          <p className="text-gray-500">
            There are currently no issues reported for this department.
          </p>
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
