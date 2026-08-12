import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Roboto } from 'next/font/google';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import './globals.css';

const OG_IMAGE =
  'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://08-zustand-roan-six.vercel.app'),

  title: 'NoteHub',
  description:
    'NoteHub is a simple and efficient application for managing personal notes.',

  openGraph: {
    title: 'NoteHub',
    description:
      'NoteHub is a simple and efficient application for managing personal notes.',
    url: '/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
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