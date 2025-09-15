'use client';

import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  // Dashboard modules
  const modules = [
    {
      name: 'Faculty Profiles',
      description: 'Manage faculty member information and profiles',
      icon: 'person',
      href: '/dashboard/departments/faculty-profiles',
      color: 'bg-blue-500'
    },
    {
      name: 'Board of Studies',
      description: 'Manage Board of Studies members and meeting minutes',
      icon: 'board',
      href: '/dashboard/departments/board-of-studies',
      color: 'bg-indigo-500'
    },
    {
      name: 'Events',
      description: 'Add and manage department events and activities',
      icon: 'event',
      href: '/dashboard/departments/events',
      color: 'bg-green-500'
    },
    {
      name: 'Announcements',
      description: 'Post important announcements for students and faculty',
      icon: 'announcement',
      href: '/dashboard/departments/announcements',
      color: 'bg-yellow-500'
    },
    {
      name: 'Gallery',
      description: 'Upload and organize department photos and videos',
      icon: 'image',
      href: '/dashboard/departments/gallery',
      color: 'bg-purple-500'
    },
    {
      name: 'Achievements',
      description: 'Showcase student and faculty achievements',
      icon: 'trophy',
      href: '/dashboard/departments/achievements',
      color: 'bg-red-500'
    }
  ];

  const renderIcon = (iconName: string, color: string) => {
    const iconColor = `text-${color.split('-')[1]}-100`;
    
    switch (iconName) {
      case 'person':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case 'board':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1-4a1 1 0 000 2h4a1 1 0 100-2H8z" clipRule="evenodd" />
          </svg>
        );
      case 'event':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      case 'announcement':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
          </svg>
        );
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'trophy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a1 1 0 011-1h8a1 1 0 011 1v1h2a2 2 0 012 2v2a2 2 0 01-1.341 1.888l-.01.003-2.011 1.148 1.08 3.241A2 2 0 0115 12h-2a2 2 0 01-2-2v-1H9v1a2 2 0 01-2 2H5a2 2 0 01-1.777-1.084l-1.492-2.984A1 1 0 013 7V5a2 2 0 012-2h2v-.998z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Department Dashboard</h1>
      
      {/* Welcome message */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to the Department CMS</h2>
        <p className="text-gray-600">
          Use this dashboard to manage your department's content. Select one of the modules below to get started.
        </p>
      </div>
      
      {/* Module cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <Link key={index} href={module.href}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className={`${module.color} p-4 flex items-center justify-center`}>
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  {renderIcon(module.icon, module.color)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{module.name}</h3>
                <p className="text-gray-600">{module.description}</p>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                <span className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                  Manage
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
