import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

interface AcademicCalendar {
  id: number;
  date: string;
  type: 'UG' | 'PG';
  title: string;
  description: string | null;
  document_url: string;
  created_at: string;
  updated_at: string;
}

export async function GET(request: NextRequest) {
  try {
    // Query the academic_calendars table
    const query = 'SELECT * FROM academic_calendars ORDER BY date DESC';
    
    const dbResult = await db.query(query);
    let rows: AcademicCalendar[] = [];
    
    if (Array.isArray(dbResult)) {
      rows = Array.isArray(dbResult[0]) ? dbResult[0] : dbResult;
    } else if (dbResult && typeof dbResult === 'object' && 'rows' in dbResult) {
      rows = (dbResult as any).rows;
    }

    // Group by UG and PG
    const calendars = {
      ug: (rows || []).filter(calendar => calendar.type === 'UG'),
      pg: (rows || []).filter(calendar => calendar.type === 'PG')
    };

    return NextResponse.json(calendars);
  } catch (error) {
    console.error('Error fetching academic calendars:', error);
    
    // Return mock data if database fails
    const mockCalendars = {
      ug: [
        {
          id: 1,
          date: '2024-03-01',
          type: 'UG' as const,
          title: 'Academic Calendar 2023-24 Odd Semester',
          description: 'Academic Calendar for UG courses odd semester 2023-24',
          document_url: '/documents/academic-calendar-ug-odd-2023-24.pdf',
          created_at: '2023-08-01T00:00:00Z',
          updated_at: '2023-08-01T00:00:00Z'
        },
        {
          id: 2,
          date: '2024-01-15',
          type: 'UG' as const,
          title: 'Academic Calendar 2023-24 Even Semester',
          description: 'Academic Calendar for UG courses even semester 2023-24',
          document_url: '/documents/academic-calendar-ug-even-2023-24.pdf',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ],
      pg: [
        {
          id: 3,
          date: '2024-03-01',
          type: 'PG' as const,
          title: 'Academic Calendar 2023-24 PG Odd Semester',
          description: 'Academic Calendar for PG courses odd semester 2023-24',
          document_url: '/documents/academic-calendar-pg-odd-2023-24.pdf',
          created_at: '2023-08-01T00:00:00Z',
          updated_at: '2023-08-01T00:00:00Z'
        },
        {
          id: 4,
          date: '2024-01-15',
          type: 'PG' as const,
          title: 'Academic Calendar 2023-24 PG Even Semester',
          description: 'Academic Calendar for PG courses even semester 2023-24',
          document_url: '/documents/academic-calendar-pg-even-2023-24.pdf',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ]
    };
    
    return NextResponse.json(mockCalendars);
  }
}