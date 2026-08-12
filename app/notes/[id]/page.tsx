import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';

import NoteDetailsClient from './NoteDetails.client';


interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: NoteDetailsPageProps): Promise<Metadata> => {
  const { id } = await params;

  const note = await fetchNoteById(id);

  const title = `${note.title} | NoteHub`;

  const description =
    note.content.length > 150
      ? `${note.content.slice(0, 147)}...`
      : note.content;

  return {
    title,
    description,

    openGraph: {
  title,
  description,
  url: `/notes/${id}`,
  images: [
    'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  ],
},
  };
};

const NoteDetailsPage = async ({
  params,
}: NoteDetailsPageProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;