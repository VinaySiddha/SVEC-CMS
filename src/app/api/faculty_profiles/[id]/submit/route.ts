import { NextRequest } from 'next/server';
import { CrudFactory } from '@/lib/crudFactory';
import { entityConfigMap } from '@/lib/entityConfig';

// Create a CRUD handler for faculty profiles
const facultyProfileHandler = new CrudFactory(entityConfigMap.faculty_profiles);

/**
 * POST /api/faculty_profiles/[id]/submit
 * Submits a faculty profile for approval
 */
export function POST(req: NextRequest, { params }: { params: { id: string } }) {
  return facultyProfileHandler.submitForApproval(req, { params });
}
