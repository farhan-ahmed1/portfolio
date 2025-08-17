import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui';

interface RelatedLink {
  title: string;
  description: string;
  href: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

export function RelatedLinks({ title = 'Explore More', links }: RelatedLinksProps) {
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link, index) => (
          <Card key={index} className="p-6 transition-all hover:shadow-lg">
            <Link href={link.href} className="group">
              <h3 className="mb-2 font-semibold group-hover:text-blue-600 dark:group-hover:text-emerald-400">
                {link.title}
              </h3>
              <p className="mb-3 text-sm text-muted-foreground">{link.description}</p>
              <div className="flex items-center text-sm font-medium text-blue-600 transition-transform group-hover:translate-x-1 dark:text-emerald-400">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
