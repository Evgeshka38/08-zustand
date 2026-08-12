import type { Metadata } from 'next';

import css from './not-found.module.css';

const OG_IMAGE =
  'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const metadata: Metadata = {
  title: 'Page not found | NoteHub',
  description:
    'The requested NoteHub page does not exist.',
  openGraph: {
    title: 'Page not found | NoteHub',
    description:
      'The requested NoteHub page does not exist.',
    url: '/404',
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

const NotFound = () => {
  return (
    <main>
      <h1 className={css.title}>
        404 - Page not found
      </h1>

      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
};

export default NotFound;