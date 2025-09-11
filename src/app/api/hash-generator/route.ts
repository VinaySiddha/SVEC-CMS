import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }
    
    // Use 10 rounds for bcrypt (standard)
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    
    return NextResponse.json({ hash });
  } catch (error) {
    console.error('Error generating hash:', error);
    return NextResponse.json(
      { error: 'Failed to generate hash' },
      { status: 500 }
    );
  }
}
