import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data');

export async function readData<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDir, filename);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function writeData<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Types
export interface HeroPhoto {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export interface Drink {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export interface SpecialPeriod {
  id: string;
  time: string;
  title: string;
  description: string;
  image: string;
}

export interface DaySpecial {
  id: string;
  day: string;
  periods: SpecialPeriod[];
}

export interface PartyPhoto {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: Record<string, string>;
  social: {
    instagram: string;
    twitter: string;
    tiktok: string;
  };
  bookingUrl: string;
  workFormUrl: string;
  ambassadorFormUrl: string;
  instagramEmbedUrl: string;
}
