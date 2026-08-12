import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';

import NotesClient from './Notes.client';

const PER_PAGE = 12;

interface NotesFilterPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

const NotesFilterPage = async ({
  params,
}: NotesFilterPageProps) => {
  const { slug } = await params;

  const currentTag = slug[0];
  const tag = currentTag === 'all' ? undefined : currentTag;

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