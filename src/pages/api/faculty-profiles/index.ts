import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import { fileStorage } from '@/lib/file-storage';
import { createModuleHandler, BaseEntity, ModuleDataManager } from '@/lib/module-handler';

// Faculty Profile entity
export interface FacultyProfile extends BaseEntity {
  name: string;
  designation: string;
  qualification: string;
  experience: number;
  specializations: string;
  email: string;
  photo: string;
  cv?: string;
}

// Mock database for faculty profiles
let mockFacultyProfiles: FacultyProfile[] = [
  {
    id: '1',
    dept: 'cse',
    name: 'Dr. John Smith',
    designation: 'Professor',
    qualification: 'Ph.D. Computer Science',
    experience: 15,
    specializations: 'Machine Learning, Database Systems',
    email: 'john.smith@example.com',
    photo: '/uploads/cse/faculty_profiles/sample-photo.jpg',
    cv: '/uploads/cse/faculty_profiles/sample-cv.pdf',
    status: 'approved',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    dept: 'cse',
    name: 'Dr. Jane Doe',
    designation: 'Associate Professor',
    qualification: 'Ph.D. Artificial Intelligence',
    experience: 10,
    specializations: 'Deep Learning, Computer Vision',
    email: 'jane.doe@example.com',
    photo: '/uploads/cse/faculty_profiles/sample-photo2.jpg',
    status: 'pending',
    created_at: '2023-01-02T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
  },
  {
    id: '3',
    dept: 'ece',
    name: 'Dr. Robert Johnson',
    designation: 'Professor',
    qualification: 'Ph.D. Electronics',
    experience: 18,
    specializations: 'VLSI Design, Signal Processing',
    email: 'robert.johnson@example.com',
    photo: '/uploads/ece/faculty_profiles/sample-photo3.jpg',
    status: 'approved',
    created_at: '2023-01-03T00:00:00Z',
    updated_at: '2023-01-03T00:00:00Z',
  },
];

// Database operations for faculty profiles
const facultyProfilesDb: ModuleDataManager<FacultyProfile> = {
  async list(dept?: string): Promise<FacultyProfile[]> {
    if (dept) {
      return mockFacultyProfiles.filter(profile => profile.dept === dept);
    }
    return mockFacultyProfiles;
  },
  
  async getById(id: string): Promise<FacultyProfile | null> {
    return mockFacultyProfiles.find(profile => profile.id === id) || null;
  },
  
  async create(data: Omit<FacultyProfile, 'id' | 'created_at' | 'updated_at'>): Promise<FacultyProfile> {
    const now = new Date().toISOString();
    
    const profile: FacultyProfile = {
      id: randomUUID(),
      ...data,
      created_at: now,
      updated_at: now,
    };
    
    mockFacultyProfiles.push(profile);
    return profile;
  },
  
  async update(id: string, data: Partial<FacultyProfile>): Promise<FacultyProfile | null> {
    const index = mockFacultyProfiles.findIndex(profile => profile.id === id);
    if (index === -1) return null;
    
    const profile = mockFacultyProfiles[index];
    const updatedProfile = {
      ...profile,
      ...data,
      updated_at: new Date().toISOString(),
    };
    
    mockFacultyProfiles[index] = updatedProfile;
    return updatedProfile;
  },
  
  async delete(id: string): Promise<boolean> {
    const initialLength = mockFacultyProfiles.length;
    mockFacultyProfiles = mockFacultyProfiles.filter(profile => profile.id !== id);
    return mockFacultyProfiles.length < initialLength;
  }
};

// Process file uploads for faculty profiles
async function processFileUploads(files: any, formData: any, dept: string): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  
  // Process photo upload
  if (files.photo) {
    const photo = Array.isArray(files.photo) ? files.photo[0] : files.photo;
    result.photo = await fileStorage.saveFile(photo, dept, 'faculty_profiles');
  }
  
  // Process CV upload
  if (files.cv) {
    const cv = Array.isArray(files.cv) ? files.cv[0] : files.cv;
    result.cv = await fileStorage.saveFile(cv, dept, 'faculty_profiles');
  }
  
  return result;
}

// Create the handler
export default createModuleHandler<FacultyProfile>('faculty_profiles', facultyProfilesDb, {
  processFileUploads,
});
