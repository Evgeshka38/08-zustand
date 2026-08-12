'use client';

import { useRouter } from 'next/navigation';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { ChangeEvent } from 'react';

import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import type {
  CreateNoteData,
  NoteTag,
} from '@/types/note';

import css from './NoteForm.module.css';

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore(state => state.draft);
  const setDraft = useNoteStore(state => state.setDraft);
  const clearDraft = useNoteStore(state => state.clearDraft);

  const createMutation = useMutation({
    mutationFn: createNote,

    onSuccess: async () => {
      clearDraft();

      await queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      router.back();
    },
  });

  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setDraft({
      title: event.target.value,
    });
  };

  const handleContentChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDraft({
      content: event.target.value,
    });
  };

  const handleTagChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setDraft({
      tag: event.target.value as NoteTag,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title');
    const content = formData.get('content');
    const tag = formData.get('tag');

    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      typeof tag !== 'string'
    ) {
      return;
    }

    const note: CreateNoteData = {
      title,
      content,
      tag: tag as NoteTag,
    };

    createMutation.mutate(note);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleTitleChange}
          minLength={3}
          maxLength={50}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleContentChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleTagChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {createMutation.isError && (
        <p className={css.error} role="alert">
          There was an error creating the note.
        </p>
      )}

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={createMutation.isPending}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending
            ? 'Creating...'
            : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;