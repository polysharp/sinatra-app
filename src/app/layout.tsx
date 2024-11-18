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
      <body className="dark">
        <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-[#252525] bg-[#111111]" />
        <main className="container pt-16">{children}</main>
      </body>
    </html>
  );
}
