import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  bgWhite?: boolean;
}

export default function Section({ id, title, subtitle, children, className, bgWhite = false }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "py-16 px-4 md:px-8",
        bgWhite ? "bg-white" : "bg-gray-50",
        className
      )}
    >
      <div className="max-w-4xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
