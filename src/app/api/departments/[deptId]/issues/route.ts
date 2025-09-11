import { NextRequest, NextResponse } from 'next/server';
import { 
  createIssuesTable, 
  getIssues, 
  createIssue, 
  getIssue, 
  updateIssue, 
  deleteIssue 
} from '@/utils/issue-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    const deptId = params.deptId;
    const issueId = request.nextUrl.searchParams.get('id');

    if (issueId) {
      // Get a specific issue
      const result = await getIssue(deptId, issueId);
      if (result.success) {
        return NextResponse.json(result);
      } else {
        return NextResponse.json(result, { status: 404 });
      }
    } else {
      // Get all issues for the department
      const result = await getIssues(deptId);
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error('Error in issues API:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    const deptId = params.deptId;
    const formData = await request.formData();
    
    // Extract issue data
    const issue = formData.get('issue') as string;
    const date = formData.get('date') as string;
    const document = formData.get('document') as File | null;

    if (!issue || !date) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = { issue, date };
    const result = await createIssue(deptId, data, document || undefined);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error('Error in issues API:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    const deptId = params.deptId;
    const formData = await request.formData();
    
    const issueId = formData.get('id') as string;
    const issue = formData.get('issue') as string;
    const date = formData.get('date') as string;
    const document = formData.get('document') as File | null;

    if (!issueId || !issue || !date) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = { issue, date };
    const result = await updateIssue(deptId, issueId, data, document || undefined);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 404 });
    }
  } catch (error) {
    console.error('Error in issues API:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    const deptId = params.deptId;
    const { searchParams } = new URL(request.url);
    const issueId = searchParams.get('id');

    if (!issueId) {
      return NextResponse.json(
        { success: false, message: 'Issue ID is required' },
        { status: 400 }
      );
    }

    const result = await deleteIssue(deptId, issueId);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 404 });
    }
  } catch (error) {
    console.error('Error in issues API:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
