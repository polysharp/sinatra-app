import type { Metadata } from 'next';

import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: 'Sinatra',
  description: 'Sinatra optimized your website SEO',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <header className="sticky top-0 h-16 border-b border-[#414141] bg-[#1e1e1e]" />
        <main>{children}</main>
      </body>
    </html>
  );
}
