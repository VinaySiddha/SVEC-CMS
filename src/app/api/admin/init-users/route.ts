import { NextRequest, NextResponse } from 'next/server';
import { initializeAdminUsers } from '@/../scripts/init-department-admins';

export async function POST(request: NextRequest) {
  try {
    // Add basic security check (you might want to add authentication)
    const { authorization } = await request.json();
    
    if (authorization !== 'INIT_ADMIN_USERS_SECRET_2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initializeAdminUsers();

    return NextResponse.json({
      success: true,
      message: 'Department admin users initialized successfully',
      credentials: {
        superAdmin: {
          username: 'super_admin',
          password: 'SuperAdmin@2024',
          role: 'super_admin',
          access: 'Full system access'
        },
        departments: [
          { dept: 'cse-ai', username: 'cseai_admin', password: 'CSEAIAdmin@2024' },
          { dept: 'ece', username: 'ece_admin', password: 'ECEAdmin@2024' },
          { dept: 'civil', username: 'civil_admin', password: 'CivilAdmin@2024' },
          { dept: 'mech', username: 'mech_admin', password: 'MechAdmin@2024' },
          { dept: 'cse', username: 'cse_admin', password: 'CSEAdmin@2024' },

          { dept: 'eee', username: 'eee_admin', password: 'EEEAdmin@2024' },
          { dept: 'mba', username: 'mba_admin', password: 'MBAAdmin@2024' },
          { dept: 'bsh', username: 'bsh_admin', password: 'BSHAdmin@2024' },
          { dept: 'ect', username: 'ect_admin', password: 'ECTAdmin@2024' },
          { dept: 'aiml', username: 'aiml_admin', password: 'AIMLAdmin@2024' },
          { dept: 'cse-ds', username: 'cseds_admin', password: 'CSEDSAdmin@2024' }
        ],
        security: {
          note: 'Please change all default passwords after first login',
          recommendation: 'Store credentials securely and enable audit logging'
        }
      }
    });

  } catch (error) {
    console.error('Failed to initialize admin users:', error);
    return NextResponse.json(
      { error: 'Failed to initialize admin users', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Admin initialization endpoint',
    usage: 'POST with authorization key to initialize department admin users',
    departments: [
      'cse-ai', 'ece', 'civil', 'mech', 'cse', 'eee', 'mba', 'bsh', 'ect', 'aiml', 'cse-ds'
    ]
  });
}