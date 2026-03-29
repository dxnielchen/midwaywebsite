import { readData, SiteConfig } from '@/lib/data';
import ContactClient from './ContactClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact Us | Midway on High',
  description: 'Get in touch with Midway on High. Find us at 1728 N High St, Columbus, OH.',
};

export default async function ContactPage() {
  const config = await readData<SiteConfig>('site-config.json');
  return <ContactClient config={config} />;
}
