import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Append to bookings log
    const bookingsDir = path.join(process.cwd(), 'src', 'data');
    const bookingsFile = path.join(bookingsDir, 'bookings.json');

    let bookings: unknown[] = [];
    try {
      const raw = await fs.readFile(bookingsFile, 'utf-8');
      bookings = JSON.parse(raw);
    } catch {
      // File doesn't exist yet
    }

    bookings.push({
      ...data,
      id: `booking-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    });

    await fs.writeFile(bookingsFile, JSON.stringify(bookings, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to submit booking' }, { status: 500 });
  }
}
