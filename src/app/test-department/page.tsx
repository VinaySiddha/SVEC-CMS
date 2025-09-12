'use client';

import { useEffect, useState } from 'react';

interface Faculty {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  dept: string;
  qualifications?: string;
  experience?: string;
  image?: string;
}

interface Lab {
  id: number;
  lab_name: string;
  location?: string;
  capacity?: number;
  equipment?: string;
  dept: string;
}

interface Achievement {
  id: number;
  title: string;
  description?: string;
  date?: string;
  dept: string;
}

interface Workshop {
  id: number;
  title: string;
  description?: string;
  date_from?: string;
  date_to?: string;
  dept: string;
}

interface DepartmentData {
  faculty: Faculty[];
  labs: Lab[];
  facultyAchievements: Achievement[];
  studentAchievements: Achievement[];
  workshops: Workshop[];
}

export default function TestDepartmentPage() {
  const [data, setData] = useState<DepartmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/public/departments/CSE');
        if (!response.ok) {
          throw new Error('Failed to fetch department data');
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!data) return <div className="p-8">No data found</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Test Department Data - CSE</h1>
      
      {/* Faculty Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Faculty ({data.faculty.length})</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.faculty.map((faculty) => (
            <div key={faculty.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{faculty.name}</h3>
              <p className="text-gray-600">{faculty.position}</p>
              <p className="text-sm text-gray-500">{faculty.email}</p>
              <p className="text-sm text-gray-500">{faculty.phone}</p>
              {faculty.qualifications && (
                <p className="text-sm mt-2"><strong>Qualifications:</strong> {faculty.qualifications}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Labs Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Labs ({data.labs.length})</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.labs.map((lab) => (
            <div key={lab.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{lab.lab_name}</h3>
              {lab.location && <p className="text-gray-600">{lab.location}</p>}
              {lab.capacity && <p className="text-sm text-gray-500">Capacity: {lab.capacity}</p>}
              {lab.equipment && <p className="text-sm mt-2">{lab.equipment}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Faculty Achievements */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Faculty Achievements ({data.facultyAchievements.length})</h2>
        <div className="space-y-4">
          {data.facultyAchievements.map((achievement) => (
            <div key={achievement.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{achievement.title}</h3>
              {achievement.description && <p className="text-gray-600 mt-2">{achievement.description}</p>}
              {achievement.date && <p className="text-sm text-gray-500 mt-2">Date: {achievement.date}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Student Achievements */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Student Achievements ({data.studentAchievements.length})</h2>
        <div className="space-y-4">
          {data.studentAchievements.map((achievement) => (
            <div key={achievement.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{achievement.title}</h3>
              {achievement.description && <p className="text-gray-600 mt-2">{achievement.description}</p>}
              {achievement.date && <p className="text-sm text-gray-500 mt-2">Date: {achievement.date}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Workshops */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Workshops ({data.workshops.length})</h2>
        <div className="space-y-4">
          {data.workshops.map((workshop) => (
            <div key={workshop.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{workshop.title}</h3>
              {workshop.description && <p className="text-gray-600 mt-2">{workshop.description}</p>}
              <div className="text-sm text-gray-500 mt-2">
                {workshop.date_from && <span>From: {workshop.date_from}</span>}
                {workshop.date_to && <span> | To: {workshop.date_to}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
