import type { Metadata } from 'next';

import '@/styles/tailwind.css';
import { Toaster } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Sinatra',
  description: 'Sinatra optimized your website SEO',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="dark">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
