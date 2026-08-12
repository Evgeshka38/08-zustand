import axios from 'axios';

import type { CreateNoteData, Note } from '@/types/note';

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const noteHubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async ({
  page,
  perPage,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await noteHubApi.get<FetchNotesResponse>(
    '/notes',
    {
      params: {
        page,
        perPage,
        search,
        ...(tag ? { tag } : {}),
      },
    },
  );

  return response.data;
};

export const fetchNoteById = async (
  noteId: string,
): Promise<Note> => {
  const response = await noteHubApi.get<Note>(
    `/notes/${noteId}`,
  );

  return response.data;
};

export const createNote = async (
  note: CreateNoteData,
): Promise<Note> => {
  const response = await noteHubApi.post<Note>('/notes', note);

  return response.data;
};

export const deleteNote = async (
  noteId: string,
): Promise<Note> => {
  const response = await noteHubApi.delete<Note>(
    `/notes/${noteId}`,
  );

  return response.data;
};