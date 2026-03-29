import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Midway on High | Columbus\' Premier College Bar',
  description: 'Midway on High - The best college bar on High Street in Columbus, Ohio. Specials, events, and unforgettable nights near Ohio State University.',
  keywords: 'Midway, bar, Columbus, Ohio State, High Street, college bar, specials, drinks, nightlife',
  openGraph: {
    title: 'Midway on High',
    description: 'Columbus\' Premier College Bar on High Street',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
