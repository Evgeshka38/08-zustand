'use client';

interface NotesFilterErrorProps {
  error: Error;
}

const NotesFilterError = ({
  error,
}: NotesFilterErrorProps) => {
  return (
    <p>
      Could not fetch the list of notes. {error.message}
    </p>
  );
};

export default NotesFilterError;