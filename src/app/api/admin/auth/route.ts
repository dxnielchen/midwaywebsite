import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createToken, verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (verifyPassword(password)) {
      const token = createToken();
      return NextResponse.json({ token });
    }
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization');
  const token = auth?.replace('Bearer ', '');
  if (token && verifyToken(token)) {
    return NextResponse.json({ valid: true });
  }
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
