import { readData, HeroPhoto, SiteConfig } from '@/lib/data';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const photos = await readData<HeroPhoto[]>('hero-photos.json');
  const config = await readData<SiteConfig>('site-config.json');
  return <HomeClient photos={photos} config={config} />;
}
