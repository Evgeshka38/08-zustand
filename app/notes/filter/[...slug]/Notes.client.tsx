'use client';

import { useState } from 'react';
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';

import css from '../../notes.module.css';

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSearch = useDebouncedCallback(
    (value: string) => {
      setSearch(value.trim());
      setPage(1);
    },
    500,
  );

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    updateSearch(value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
        tag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <header className={css.toolbar}>
          <SearchBox
            value={searchInput}
            onChange={handleSearchChange}
          />

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          )}

          <button
            type="button"
            className={css.button}
            onClick={handleOpenModal}
          >
            Create note +
          </button>
        </header>

        {isLoading && <Loader />}

        {isError && (
          <ErrorMessage message="There was an error loading notes." />
        )}

        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}

        {!isLoading && !isError && notes.length === 0 && (
          <p>No notes found.</p>
        )}

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <NoteForm onCancel={handleCloseModal} />
          </Modal>
        )}
      </div>
    </main>
  );
};

export default NotesClient;