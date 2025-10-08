import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Simple test API working',
    data: {
      departments: [
        {
          code: 'cse-ai',
          name: 'Computer Science & AI',
          totalRecords: 0,
          modules: [
            { name: 'faculty', count: 0, tableName: 'cse_ai_faculty' },
            { name: 'staff', count: 0, tableName: 'cse_ai_staff' }
          ],
          moduleCount: 2
        }
      ]
    }
  });
}