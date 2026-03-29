import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, SiteConfig } from '@/lib/data';
import { verifyToken } from '@/lib/auth';

const FILE = 'site-config.json';

function checkAuth(req: NextRequest): boolean {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  return !!token && verifyToken(token);
}

export async function GET() {
  const config = await readData<SiteConfig>(FILE);
  return NextResponse.json(config);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const config = await req.json();
  await writeData(FILE, config);
  return NextResponse.json({ success: true });
}
