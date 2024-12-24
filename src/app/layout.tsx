import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import AuthButton from '@/components/auth-button';
import { Providers } from '@/components/providers';
import { ModeToggle } from '@/components/theme-toggle';

import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nextjs Starter by efr',
  description:
    'Next.js starter template with TypeScript, Tailwind CSS, and many more cool stuff.',
  icons: [{ rel: 'icon', url: '/favicon.png' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col gap-2">
            <header className="flex items-center justify-end gap-2 p-4">
              <ModeToggle />

              <AuthButton />
            </header>

            <main className="flex flex-1 items-center justify-center">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
