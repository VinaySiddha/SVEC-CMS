/**
 * Faculty Research Modules - Data Display Components
 * Display research data in formatted tables/cards
 */

'use client';

import React from 'react';
import {
  ResearchVertical,
  ResearchSupervisor,
  JournalPublication,
  ConferencePublication,
  Patent,
  BookPublication,
  CareerAdvancement,
  InteractionOutsideWorld,
  MODULE_LABELS,
  ModuleType,
} from '@/types/facultyModules';

// Research Verticals Display
export const ResearchVerticalsDisplay: React.FC<{ data: ResearchVertical[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No research verticals added yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{MODULE_LABELS[ModuleType.RESEARCH_VERTICALS]}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-lg text-blue-600">{item.vertical_name}</h4>
            {item.description && <p className="text-gray-600 mt-2 text-sm">{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

// Research Supervisors Display
export const ResearchSupervisorsDisplay: React.FC<{ data: ResearchSupervisor[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No research supervisors added yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{MODULE_LABELS[ModuleType.RESEARCH_SUPERVISORS]}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Scholar Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Dates</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{item.scholar_name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.status === 'On Going' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {item.start_date && `${new Date(item.start_date).toLocaleDateString()}`}
                  {item.completion_date && ` - ${new Date(item.completion_date).toLocaleDateString()}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Journal Publications Display
export const JournalPublicationsDisplay: React.FC<{ data: JournalPublication[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No journal publications added yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{MODULE_LABELS[ModuleType.JOURNAL_PUBLICATIONS]}</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white border border-gray-300 rounded-lg p-4">
            <h4 className="font-bold text-blue-600">{item.paper_title}</h4>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Journal:</strong> {item.journal_name}
            </p>
            {item.publication_year && (
              <p className="text-sm text-gray-600">
                <strong>Year:</strong> {item.publication_year}
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {item.volume_number && <span className="text-xs bg-gray-100 px-2 py-1 rounded">Vol {item.volume_number}</span>}
              {item.issue_number && <span className="text-xs bg-gray-100 px-2 py-1 rounded">Issue {item.issue_number}</span>}
              {item.impact_factor && <span className="text-xs bg-gray-100 px-2 py-1 rounded">IF: {item.impact_factor}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Conference Publications Display
export const ConferencePublicationsDisplay: React.FC<{ data: ConferencePublication[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No conference publications added yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{MODULE_LABELS[ModuleType.CONFERENCE_PUBLICATIONS]}</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white border border-gray-300 rounded-lg p-4">
            <h4 className="font-bold text-blue-600">{item.paper_title}</h4>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Conference:</strong> {item.conference_name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Authors:</strong> {item.faculty_names.join(', ')}
            </p>
            {item.conference_location && (
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {item.conference_location}
              </p>
            )}
            {item.publication_year && (
              <p className="text-sm text-gray-600">
                <strong>Year:</strong> {item.publication_year}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Patents Display
export const PatentsDisplay: React.FC<{ data: Patent[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No patents added yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{MODULE_LABELS[ModuleType.PATENTS]}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">Patent Title</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Patent No.</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 font-semibold">{item.patent_title}</td>
                <td className="border border-gray-300 px-3 py-2">{item.patent_number || 'N/A'}</td>
                <td className="border border-gray-300 px-3 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.status === 'Granted' ? 'bg-green-100 text-green-800' :
                    item.status === 'Published' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600">
                  {item.publication_date ? new Date(item.publication_date).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Book Publications Display
export const BookPublicationsDisplay: React.FC<{ data: BookPublication[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No book publications added yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{MODULE_LABELS[ModuleType.BOOK_PUBLICATIONS]}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">Book Title</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Authors</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Publisher</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 font-semibold">{item.book_title}</td>
                <td className="border border-gray-300 px-3 py-2 text-xs">{item.authors.join(', ')}</td>
                <td className="border border-gray-300 px-3 py-2">{item.publisher_name || 'N/A'}</td>
                <td className="border border-gray-300 px-3 py-2">{item.publication_year || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Career Advancements Display
export const CareerAdvancementsDisplay: React.FC<{ data: CareerAdvancement[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No career advancements added yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{MODULE_LABELS[ModuleType.CAREER_ADVANCEMENTS]}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">Institute</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Degree</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Dates</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 font-semibold text-xs">{item.institute_name}</td>
                <td className="border border-gray-300 px-3 py-2">{item.degree_pursuing}</td>
                <td className="border border-gray-300 px-3 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.degree_status === 'Pursuing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.degree_status}
                  </span>
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600 text-xs">
                  {new Date(item.joining_date).toLocaleDateString()}
                  {item.completion_date && ` - ${new Date(item.completion_date).toLocaleDateString()}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Interaction Outside World Display
export const InteractionOutsideWorldDisplay: React.FC<{ data: InteractionOutsideWorld[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No interactions added yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{MODULE_LABELS[ModuleType.INTERACTION_OUTSIDE_WORLD]}</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-blue-600">{item.title}</h4>
                <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {item.interaction_type}
                </span>
              </div>
            </div>
            {item.description && <p className="text-sm text-gray-700 mt-2">{item.description}</p>}
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
              {item.organization_name && <p><strong>Organization:</strong> {item.organization_name}</p>}
              {item.interaction_date && <p><strong>Date:</strong> {new Date(item.interaction_date).toLocaleDateString()}</p>}
              {item.location && <p><strong>Location:</strong> {item.location}</p>}
              {item.participants_count && <p><strong>Participants:</strong> {item.participants_count}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
