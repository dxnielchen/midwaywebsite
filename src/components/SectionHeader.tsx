'use client';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 sm:mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
        {title}
      </h2>
      <div className={`divider mb-4 ${align === 'center' ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className="text-white/50 text-base sm:text-lg max-w-lg mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
