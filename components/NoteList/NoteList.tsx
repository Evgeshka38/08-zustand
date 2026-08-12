'use client';

import Link from 'next/link';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';

import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => {
        const isDeleting =
          deleteMutation.isPending &&
          deleteMutation.variables === note.id;

        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>

            <p className={css.content}>{note.content}</p>

            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>

              <div className={css.actions}>
                <Link
                  href={`/notes/${note.id}`}
                  className={css.link}
                >
                  View details
                </Link>

                <button
                  type="button"
                  className={css.button}
                  onClick={() =>
                    deleteMutation.mutate(note.id)
                  }
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;