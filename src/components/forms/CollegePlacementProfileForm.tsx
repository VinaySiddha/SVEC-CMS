import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const placementProfileSchema = z.object({
  college_id: z.number().positive('College is required'),
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  designation: z.string().min(3, 'Designation is required'),
  department: z.string().optional(),
  bio: z.string().optional(),
  profile_photo: z.string().url().optional().or(z.literal('')),
  
  // Contact Information
  contact_email: z.string().email('Valid email is required'),
  contact_phone: z.string().min(10, 'Valid phone is required'),
  office_phone: z.string().optional(),
  office_extension: z.string().optional(),
  
  // Office Address
  office_address: z.string().optional(),
  office_room_number: z.string().optional(),
  
  // Social Media
  linkedin_url: z.string().url().optional().or(z.literal('')),
  twitter_url: z.string().url().optional().or(z.literal('')),
  facebook_url: z.string().url().optional().or(z.literal('')),
  website_url: z.string().url().optional().or(z.literal('')),
  
  // Professional Information
  experience_years: z.number().min(0).optional(),
  qualifications: z.string().optional(),
  specialization: z.string().optional(),
  research_interests: z.string().optional(),
  
  // Achievements
  students_placed: z.number().min(0).optional().default(0),
  average_placement_package: z.number().optional(),
  highest_package: z.number().optional(),
  companies_collaborated: z.number().min(0).optional().default(0),
  achievements: z.string().optional(),
  awards: z.string().optional(),
  publications: z.string().optional(),
  
  join_date: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof placementProfileSchema>;

interface CollegePlacementProfileFormProps {
  defaultValues?: Partial<ProfileFormValues>;
  onSubmit: (data: ProfileFormValues) => void;
  isLoading?: boolean;
}

export default function CollegePlacementProfileForm({ 
  defaultValues, 
  onSubmit,
  isLoading = false 
}: CollegePlacementProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(placementProfileSchema),
    defaultValues: {
      students_placed: 0,
      companies_collaborated: 0,
      ...defaultValues,
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Placement Officer Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  {...form.register('first_name')} 
                  placeholder="First Name *" 
                  className="col-span-1"
                />
                <Input 
                  {...form.register('last_name')} 
                  placeholder="Last Name *" 
                  className="col-span-1"
                />
              </div>
              <Input 
                {...form.register('designation')} 
                placeholder="Designation *" 
              />
              <Input 
                {...form.register('department')} 
                placeholder="Department" 
              />
              <Textarea 
                {...form.register('bio')} 
                placeholder="Professional Bio" 
                rows={4}
              />
              <Input 
                {...form.register('profile_photo')} 
                placeholder="Profile Photo URL" 
                type="url"
              />
              <Input 
                {...form.register('join_date')} 
                type="date"
                placeholder="Join Date"
              />
            </TabsContent>

            {/* Contact Information Tab */}
            <TabsContent value="contact" className="space-y-4">
              <Input 
                {...form.register('contact_email')} 
                placeholder="Email *" 
                type="email"
              />
              <Input 
                {...form.register('contact_phone')} 
                placeholder="Mobile Phone *" 
              />
              <Input 
                {...form.register('office_phone')} 
                placeholder="Office Phone" 
              />
              <Input 
                {...form.register('office_extension')} 
                placeholder="Extension (e.g., 319)" 
              />
              <Textarea 
                {...form.register('office_address')} 
                placeholder="Office Address" 
                rows={3}
              />
              <Input 
                {...form.register('office_room_number')} 
                placeholder="Room Number" 
              />
              
              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-4">Social Media Links</h3>
                <div className="space-y-4">
                  <Input 
                    {...form.register('linkedin_url')} 
                    placeholder="LinkedIn URL" 
                    type="url"
                  />
                  <Input 
                    {...form.register('twitter_url')} 
                    placeholder="Twitter URL" 
                    type="url"
                  />
                  <Input 
                    {...form.register('facebook_url')} 
                    placeholder="Facebook URL" 
                    type="url"
                  />
                  <Input 
                    {...form.register('website_url')} 
                    placeholder="Personal Website URL" 
                    type="url"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Professional Information Tab */}
            <TabsContent value="professional" className="space-y-4">
              <Input 
                {...form.register('experience_years', { valueAsNumber: true })} 
                placeholder="Years of Experience" 
                type="number"
                min="0"
              />
              <Textarea 
                {...form.register('qualifications')} 
                placeholder="Qualifications (B.Tech, M.Tech, PhD, etc.)" 
                rows={3}
              />
              <Input 
                {...form.register('specialization')} 
                placeholder="Specialization" 
              />
              <Textarea 
                {...form.register('research_interests')} 
                placeholder="Research Interests / Areas of Expertise" 
                rows={3}
              />
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  {...form.register('students_placed', { valueAsNumber: true })} 
                  placeholder="Students Placed" 
                  type="number"
                  min="0"
                />
                <Input 
                  {...form.register('companies_collaborated', { valueAsNumber: true })} 
                  placeholder="Companies Collaborated" 
                  type="number"
                  min="0"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  {...form.register('average_placement_package', { valueAsNumber: true })} 
                  placeholder="Avg Package (LPA)" 
                  type="number"
                  step="0.1"
                  min="0"
                />
                <Input 
                  {...form.register('highest_package', { valueAsNumber: true })} 
                  placeholder="Highest Package (LPA)" 
                  type="number"
                  step="0.1"
                  min="0"
                />
              </div>
              <Textarea 
                {...form.register('achievements')} 
                placeholder="Key Achievements" 
                rows={3}
              />
              <Textarea 
                {...form.register('awards')} 
                placeholder="Awards & Recognition" 
                rows={3}
              />
              <Textarea 
                {...form.register('publications')} 
                placeholder="Publications & Research Papers" 
                rows={3}
              />
            </TabsContent>
          </Tabs>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
