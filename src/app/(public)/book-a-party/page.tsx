import { readData, PartyPhoto, SiteConfig } from '@/lib/data';
import BookPartyClient from './BookPartyClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Book a Party | Midway on High',
  description: 'Book your next party or event at Midway on High. Birthdays, celebrations, and private events in Columbus.',
};

export default async function BookPartyPage() {
  const photos = await readData<PartyPhoto[]>('party-photos.json');
  const config = await readData<SiteConfig>('site-config.json');
  return <BookPartyClient photos={photos} bookingUrl={config.bookingUrl} />;
}
