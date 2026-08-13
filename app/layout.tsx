import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Roboto } from 'next/font/google';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { OG_IMAGE, SITE_URL } from '@/lib/constants';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub is a simple and efficient application for managing personal notes.',

  openGraph: {
    title: 'NoteHub',
    description:
      'NoteHub is a simple and efficient application for managing personal notes.',
    url: `${SITE_URL}`,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const RootLayout = ({
  children,
  modal,
}: RootLayoutProps) => {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />

          {children}

          {modal}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;