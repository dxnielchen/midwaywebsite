import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, DaySpecial } from '@/lib/data';
import { verifyToken } from '@/lib/auth';

const FILE = 'specials.json';

function checkAuth(req: NextRequest): boolean {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  return !!token && verifyToken(token);
}

export async function GET() {
  const specials = await readData<DaySpecial[]>(FILE);
  return NextResponse.json(specials);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const specials = await req.json();
  await writeData(FILE, specials);
  return NextResponse.json({ success: true });
}
