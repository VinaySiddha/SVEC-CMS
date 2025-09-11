import React from 'react';
import IssuesPage from '@/pages/departments/Issues';

export default function DepartmentIssues({ params }: { params: { dept: string } }) {
  return (
    <div className="container mx-auto py-8">
      <IssuesPage deptId={params.dept} />
    </div>
  );
}
