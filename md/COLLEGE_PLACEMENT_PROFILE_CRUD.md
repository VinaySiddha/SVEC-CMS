# College Placement Profile CRUD Implementation

## Features
- College placement profile table migration
- API endpoints for create, read, update, delete
- React form for add/edit
- React list for view/search

## Usage
1. Run migration:
   ```bash
   node migrations/migrate-college-placement-profile.js
   ```
2. Use `/api/college-placement-profile` for list/create
3. Use `/api/college-placement-profile/[id]` for read/update/delete
4. Use `CollegePlacementProfileForm` and `CollegePlacementProfileList` components in your dashboard

## Fields
- college_id
- placement_officer
- contact_email
- contact_phone
- achievements
- profile_photo

## Example
```tsx
<CollegePlacementProfileForm onSubmit={...} />
<CollegePlacementProfileList />
```
