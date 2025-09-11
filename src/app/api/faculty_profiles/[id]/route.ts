import { NextRequest } from 'next/server';
import { CrudFactory } from '@/lib/crudFactory';
import { entityConfigMap } from '@/lib/entityConfig';

// Create a CRUD handler for faculty profiles
const facultyProfileHandler = new CrudFactory(entityConfigMap.faculty_profiles);

/**
 * GET /api/faculty_profiles/[id]
 * Retrieves a specific faculty profile by ID
 */
export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return facultyProfileHandler.getById(req, { params });
}

/**
 * PUT /api/faculty_profiles/[id]
 * Updates a specific faculty profile by ID
 */
export function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return facultyProfileHandler.update(req, { params });
}

/**
 * DELETE /api/faculty_profiles/[id]
 * Soft deletes a specific faculty profile by ID
 */
export function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return facultyProfileHandler.remove(req, { params });
}
