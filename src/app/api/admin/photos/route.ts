import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, HeroPhoto } from '@/lib/data';
import { verifyToken } from '@/lib/auth';

const FILE = 'hero-photos.json';

function checkAuth(req: NextRequest): boolean {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  return !!token && verifyToken(token);
}

export async function GET() {
  const photos = await readData<HeroPhoto[]>(FILE);
  return NextResponse.json(photos);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const photo = await req.json();
  const photos = await readData<HeroPhoto[]>(FILE);
  photos.push(photo);
  await writeData(FILE, photos);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const update = await req.json();
  const photos = await readData<HeroPhoto[]>(FILE);
  const index = photos.findIndex((p) => p.id === update.id);
  if (index !== -1) {
    photos[index] = { ...photos[index], ...update };
    await writeData(FILE, photos);
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const photos = await readData<HeroPhoto[]>(FILE);
  const filtered = photos.filter((p) => p.id !== id);
  await writeData(FILE, filtered);
  return NextResponse.json({ success: true });
}
