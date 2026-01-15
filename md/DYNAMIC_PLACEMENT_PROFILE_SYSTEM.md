# Dynamic College Placement Profile System

## Overview
A comprehensive placement officer profile management system with dynamic fields based on real-world placement officer data (inspired by Dr. P N V GOPALA KRISHNA's profile).

## Database Schema

### Table: `college_placement_profiles`

#### Personal Information
- `id` - Primary key
- `college_id` - Foreign key to colleges table
- `first_name` - Officer's first name (64 chars)
- `last_name` - Officer's last name (64 chars)
- `designation` - Job title (128 chars)
- `department` - Department (128 chars)
- `bio` - Professional bio (text)
- `profile_photo` - Photo URL (256 chars)

#### Contact Information
- `contact_email` - Primary email (128 chars, indexed)
- `contact_phone` - Mobile phone (32 chars)
- `office_phone` - Office landline (32 chars)
- `office_extension` - Extension number (16 chars)
- `office_address` - Full address (text)
- `office_room_number` - Room/office number (32 chars)

#### Social Media & Web
- `linkedin_url` - LinkedIn profile (256 chars)
- `twitter_url` - Twitter handle (256 chars)
- `facebook_url` - Facebook profile (256 chars)
- `website_url` - Personal website (256 chars)

#### Professional Information
- `experience_years` - Years of experience (integer)
- `qualifications` - Degrees (B.Tech, M.Tech, PhD, etc.)
- `specialization` - Area of specialization (256 chars)
- `research_interests` - Research focus areas (text)

#### Achievement & Statistics
- `students_placed` - Number of students placed (integer, default 0)
- `average_placement_package` - Average salary in LPA (decimal)
- `highest_package` - Highest package in LPA (decimal)
- `companies_collaborated` - Number of companies (integer, default 0)
- `achievements` - Key achievements (text)
- `awards` - Awards & recognition (text)
- `publications` - Research publications (text)

#### Status & Metadata
- `is_active` - Active status (boolean, default true)
- `join_date` - Date joined (date)
- `created_at` - Record creation timestamp
- `updated_at` - Last update timestamp

## API Endpoints

### GET /api/college-placement-profile
**List all profiles with optional filtering**

**Query Parameters:**
- `college_id` (optional) - Filter by college
- `department` (optional) - Filter by department

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "first_name": "P N V",
      "last_name": "GOPALA KRISHNA",
      "designation": "Associate Professor (Mechanical) & Head - Placements",
      "contact_email": "svectpo@srivasaviengg.ac.in",
      "contact_phone": "9849511367",
      "students_placed": 450,
      "average_placement_package": 6.5,
      "highest_package": 25.0,
      "companies_collaborated": 85,
      ...
    }
  ]
}
```

### POST /api/college-placement-profile
**Create new profile**

**Request Body:**
```json
{
  "college_id": 1,
  "first_name": "P N V",
  "last_name": "GOPALA KRISHNA",
  "designation": "Associate Professor (Mechanical) & Head - Placements",
  "department": "Mechanical Engineering",
  "bio": "Dedicated placement officer...",
  "contact_email": "svectpo@srivasaviengg.ac.in",
  "contact_phone": "9849511367",
  "office_phone": "08818-284355",
  "office_extension": "319",
  "students_placed": 450,
  "average_placement_package": 6.5,
  ...
}
```

### GET /api/college-placement-profile/[id]
**Get specific profile**

### PUT /api/college-placement-profile/[id]
**Update profile**

### DELETE /api/college-placement-profile/[id]
**Soft delete profile (sets is_active to false)**

## React Components

### CollegePlacementProfileForm
**Form with tabbed interface for easy data entry**

Features:
- 4 tabs: Personal, Contact, Professional, Achievements
- Validation using Zod schema
- Dynamic field rendering
- Photo upload support
- Social media URL fields
- Loading states

**Usage:**
```tsx
<CollegePlacementProfileForm 
  defaultValues={profileData}
  onSubmit={handleSubmit}
  isLoading={false}
/>
```

### PlacementProfileCard
**Display profile information in card format**

Features:
- Profile photo with initials fallback
- Quick statistics display
- Contact information with links
- Social media links
- Achievement statistics grid
- Edit/Delete actions
- Responsive design

**Usage:**
```tsx
<PlacementProfileCard 
  profile={profileData}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### CollegePlacementProfileList
**List of profiles with search and filtering**

## Migration & Seeding

### 1. Create Table
```bash
cd /f/svec-cms/migrations
node migrate-college-placement-profile.js
```

**Output:**
```
✓ Created college_placement_profiles table with enhanced fields
```

### 2. Seed Sample Data
```bash
node seed-placement-profiles.js
```

**Output:**
```
✓ Inserted profile: P N V GOPALA KRISHNA
✓ Inserted profile: Dr. R SRINIVAS
✓ Inserted profile: Prof. K VENKATA RAMAN
✓ Inserted profile: Dr. A KRISHNAMURTHY
✓ Inserted profile: Ms. P LAKSHMI

✅ Successfully seeded 5 placement profiles!
```

## Sample Data

### Dr. P N V GOPALA KRISHNA
- **Designation**: Associate Professor (Mechanical) & Head - Placements
- **Department**: Mechanical Engineering
- **Email**: svectpo@srivasaviengg.ac.in
- **Phone**: 9849511367
- **Office**: 08818-284355 (Ext: 319)
- **Students Placed**: 450
- **Average Package**: ₹6.5 LPA
- **Highest Package**: ₹25 LPA
- **Companies**: 85+

### Other Profiles
- Dr. R SRINIVAS (CSE) - 520 placements
- Prof. K VENKATA RAMAN (ECE) - 380 placements
- Dr. A KRISHNAMURTHY (Civil) - 290 placements
- Ms. P LAKSHMI (EEE) - 310 placements

## Dynamic Fields Included

### Contact Information
- Primary and secondary email
- Mobile and office phone with extension
- Physical office address and room number
- Geographic location data

### Social Media Integration
- LinkedIn profile link
- Twitter handle
- Facebook profile
- Personal website

### Professional Metrics
- Years of experience
- Qualifications and certifications
- Area of specialization
- Research interests and focus

### Placement Success Metrics
- Total students placed
- Average package offered
- Highest package achieved
- Number of companies collaborated
- Key achievements documented
- Awards and recognition
- Publications and research output

### Temporal Data
- Join date with the institution
- Profile creation timestamp
- Last update timestamp
- Active status tracking

## Features

✅ **Comprehensive Profile Management**
- Full placement officer details
- Professional achievements tracking
- Social media integration

✅ **Advanced Search & Filtering**
- Filter by college
- Filter by department
- Search by name or specialty

✅ **Beautiful UI Components**
- Card layout with photo
- Tabbed form for organized data entry
- Achievement statistics display
- Social media links

✅ **Database Optimization**
- Indexed queries for performance
- Soft delete for data retention
- Automatic timestamps

✅ **Scalability**
- Supports multiple colleges
- Handles multiple officers per college
- Extensible for additional fields

## Usage Examples

### Add New Placement Officer
```tsx
const handleAddProfile = async (data) => {
  const response = await fetch('/api/college-placement-profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log('Profile created:', result.id);
};
```

### Display Officer Profile
```tsx
const profiles = await fetch(
  '/api/college-placement-profile?college_id=1'
);
const data = await profiles.json();

data.data.map(profile => (
  <PlacementProfileCard key={profile.id} profile={profile} />
))
```

### Update Profile
```tsx
const handleUpdate = async (id, data) => {
  await fetch(`/api/college-placement-profile/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};
```

## Future Enhancements

1. **Profile Analytics**
   - Placement statistics dashboard
   - Year-over-year comparison
   - Department performance analysis

2. **Photo Gallery**
   - Multiple photos per profile
   - Timeline of photos
   - Event documentation

3. **Student Testimonials**
   - Link testimonials to officers
   - Rating system
   - Success stories

4. **Integration Features**
   - Resume builder integration
   - Interview scheduling
   - Feedback system

5. **Reporting**
   - Performance reports
   - Placement trends
   - Export capabilities (PDF/Excel)

## Technical Stack

- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Form Validation**: Zod
- **UI Components**: React + Shadcn
- **Styling**: Tailwind CSS
- **State Management**: React Hook Form

## Related Files

- Schema: `migrations/migrate-college-placement-profile.js`
- Seed Data: `migrations/seed-placement-profiles.js`
- Form: `src/components/forms/CollegePlacementProfileForm.tsx`
- Card: `src/components/cards/PlacementProfileCard.tsx`
- List: `src/components/lists/CollegePlacementProfileList.tsx`
- API (List/Create): `src/app/api/college-placement-profile/route.ts`
- API (Get/Update/Delete): `src/app/api/college-placement-profile/[id]/route.ts`
