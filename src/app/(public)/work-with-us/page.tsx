import { readData, SiteConfig } from '@/lib/data';
import WorkWithUsClient from './WorkWithUsClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Work With Us | Midway on High',
  description: 'Join the Midway on High team! Apply to work at Columbus\' best college bar or become a brand ambassador.',
};

export default async function WorkWithUsPage() {
  const config = await readData<SiteConfig>('site-config.json');
  return (
    <WorkWithUsClient
      workFormUrl={config.workFormUrl}
      ambassadorFormUrl={config.ambassadorFormUrl}
    />
  );
}
