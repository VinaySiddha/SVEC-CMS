'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Award, Building, Calendar } from 'lucide-react';

interface Faculty {
  id: number;
  name: string;
  email?: string;
  qualification: string;
  designation: string;
  specialization?: string;
  experience_years?: number;
  bio?: string;
  status?: string;
}

interface Achievement {
  id: number;
  title: string;
  faculty_name?: string;
  student_name?: string;
  achievement_date: string;
  description?: string;
  status?: string;
}

interface Lab {
  id: number;
  lab_name: string;
  lab_area?: number;
  equipment_count?: number;
  description?: string;
  status?: string;
}

interface Workshop {
  id: number;
  title: string;
  duration?: string;
  start_date: string;
  end_date?: string;
  description?: string;
  status?: string;
}

interface DepartmentData {
  faculty: Faculty[];
  labs: Lab[];
  facultyAchievements: Achievement[];
  studentAchievements: Achievement[];
  workshops: Workshop[];
}

export default function PublicDepartmentPage() {
  const params = useParams();
  const dept = params.dept as string;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DepartmentData>({
    faculty: [],
    labs: [],
    facultyAchievements: [],
    studentAchievements: [],
    workshops: []
  });

  useEffect(() => {
    if (dept) {
      fetchDepartmentData();
    }
  }, [dept]);

  const fetchDepartmentData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/public/departments/${dept}`);
      
      if (response.ok) {
        const result = await response.json();
        setData(result.data || {
          faculty: [],
          labs: [],
          facultyAchievements: [],
          studentAchievements: [],
          workshops: []
        });
      } else {
        console.error('Failed to fetch department data');
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
    } finally {
      setLoading(false);
    }
  };

  const departmentNames: { [key: string]: string } = {
    'cse': 'Computer Science and Engineering',
    'aiml': 'Artificial Intelligence and Machine Learning',
    'cseai': 'Computer Science and Engineering (AI)',
    'cseds': 'Computer Science and Engineering (Data Science)',
    'cst': 'Computer Science and Technology',
    'ece': 'Electronics and Communication Engineering',
    'eee': 'Electrical and Electronics Engineering',
    'mech': 'Mechanical Engineering',
    'civil': 'Civil Engineering',
    'mba': 'Master of Business Administration',
    'bsh': 'Basic Sciences and Humanities'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-blue-900">
          {departmentNames[dept] || dept.toUpperCase()} Department
        </h1>
        <p className="text-lg text-muted-foreground">
          Shri Vishnu Engineering College for Women
        </p>
      </div>

      <Tabs defaultValue="faculty" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="faculty" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Faculty
          </TabsTrigger>
          <TabsTrigger value="labs" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Labs
          </TabsTrigger>
          <TabsTrigger value="faculty-achievements" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Faculty Achievements
          </TabsTrigger>
          <TabsTrigger value="student-achievements" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Student Achievements
          </TabsTrigger>
          <TabsTrigger value="workshops" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Workshops
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faculty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Faculty Members
              </CardTitle>
              <CardDescription>
                Meet our distinguished faculty members
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.faculty && data.faculty.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.faculty.map((faculty) => (
                    <Card key={faculty.id} className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{faculty.name}</h3>
                        <p className="text-sm text-muted-foreground">{faculty.designation}</p>
                        <p className="text-sm"><strong>Qualification:</strong> {faculty.qualification}</p>
                        {faculty.email && (
                          <p className="text-sm"><strong>Email:</strong> {faculty.email}</p>
                        )}
                        {faculty.specialization && (
                          <p className="text-sm"><strong>Specialization:</strong> {faculty.specialization}</p>
                        )}
                        {faculty.experience_years && (
                          <p className="text-sm"><strong>Experience:</strong> {faculty.experience_years} years</p>
                        )}
                        {faculty.bio && (
                          <p className="text-sm text-muted-foreground">{faculty.bio}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No faculty information available at the moment.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Laboratories
              </CardTitle>
              <CardDescription>
                Our state-of-the-art laboratory facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.labs && data.labs.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {data.labs.map((lab) => (
                    <Card key={lab.id} className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{lab.lab_name}</h3>
                        {lab.lab_area && (
                          <p className="text-sm"><strong>Area:</strong> {lab.lab_area} sq ft</p>
                        )}
                        {lab.equipment_count && (
                          <p className="text-sm"><strong>Equipment:</strong> {lab.equipment_count} items</p>
                        )}
                        {lab.description && (
                          <p className="text-sm text-muted-foreground">{lab.description}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No laboratory information available at the moment.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty-achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Faculty Achievements
              </CardTitle>
              <CardDescription>
                Recognition and awards received by our faculty
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.facultyAchievements && data.facultyAchievements.length > 0 ? (
                <div className="space-y-4">
                  {data.facultyAchievements.map((achievement) => (
                    <Card key={achievement.id} className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{achievement.title}</h3>
                        <p className="text-sm"><strong>Faculty:</strong> {achievement.faculty_name}</p>
                        <p className="text-sm"><strong>Date:</strong> {new Date(achievement.achievement_date).toLocaleDateString()}</p>
                        {achievement.description && (
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No faculty achievements available at the moment.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="student-achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Student Achievements
              </CardTitle>
              <CardDescription>
                Outstanding accomplishments by our students
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.studentAchievements && data.studentAchievements.length > 0 ? (
                <div className="space-y-4">
                  {data.studentAchievements.map((achievement) => (
                    <Card key={achievement.id} className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{achievement.title}</h3>
                        <p className="text-sm"><strong>Student:</strong> {achievement.student_name}</p>
                        <p className="text-sm"><strong>Date:</strong> {new Date(achievement.achievement_date).toLocaleDateString()}</p>
                        {achievement.description && (
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No student achievements available at the moment.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workshops" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Workshops & Events
              </CardTitle>
              <CardDescription>
                Professional development and training programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.workshops && data.workshops.length > 0 ? (
                <div className="space-y-4">
                  {data.workshops.map((workshop) => (
                    <Card key={workshop.id} className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{workshop.title}</h3>
                        {workshop.duration && (
                          <p className="text-sm"><strong>Duration:</strong> {workshop.duration}</p>
                        )}
                        <p className="text-sm"><strong>Start Date:</strong> {new Date(workshop.start_date).toLocaleDateString()}</p>
                        {workshop.end_date && (
                          <p className="text-sm"><strong>End Date:</strong> {new Date(workshop.end_date).toLocaleDateString()}</p>
                        )}
                        {workshop.description && (
                          <p className="text-sm text-muted-foreground">{workshop.description}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No workshops available at the moment.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
