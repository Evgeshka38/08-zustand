import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';

import NotesClient from './Notes.client';

const PER_PAGE = 12;

const OG_IMAGE =
  'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

interface NotesFilterPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export const generateMetadata = async ({
  params,
}: NotesFilterPageProps): Promise<Metadata> => {
  const { slug } = await params;

  const currentTag = slug[0];
  const filterName =
    currentTag === 'all' ? 'All notes' : currentTag;

  const title = `${filterName} | NoteHub`;
  const description =
    currentTag === 'all'
      ? 'Browse all notes in NoteHub.'
      : `Browse NoteHub notes filtered by ${currentTag}.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: `/notes/filter/${currentTag}`,
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
};

const NotesFilterPage = async ({
  params,
}: NotesFilterPageProps) => {
  const { slug } = await params;

  const currentTag = slug[0];
  const tag =
    currentTag === 'all' ? undefined : currentTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        search: '',
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesFilterPage;