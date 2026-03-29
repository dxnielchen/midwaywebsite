import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, Drink } from '@/lib/data';
import { verifyToken } from '@/lib/auth';

const FILE = 'drinks.json';

function checkAuth(req: NextRequest): boolean {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  return !!token && verifyToken(token);
}

export async function GET() {
  const drinks = await readData<Drink[]>(FILE);
  return NextResponse.json(drinks);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const drinks = await req.json();
  await writeData(FILE, drinks);
  return NextResponse.json({ success: true });
}
