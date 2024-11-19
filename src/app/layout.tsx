import type { Metadata } from 'next';

import '@/styles/tailwind.css';

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
      <body className="dark">{children}</body>
    </html>
  );
}
