import { readData, DaySpecial, Drink } from '@/lib/data';
import SpecialsClient from './SpecialsClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Specials & Drink Menu | Midway on High',
  description: 'Check out our weekly specials and full drink menu. Unbeatable deals every Wednesday through Saturday.',
};

export default async function SpecialsPage() {
  const specials = await readData<DaySpecial[]>('specials.json');
  const drinks = await readData<Drink[]>('drinks.json');
  return <SpecialsClient specials={specials} drinks={drinks} />;
}
