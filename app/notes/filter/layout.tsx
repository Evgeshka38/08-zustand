import type { ReactNode } from 'react';

import css from './LayoutNotes.module.css';

interface NotesFilterLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

const NotesFilterLayout = ({
  children,
  sidebar,
}: NotesFilterLayoutProps) => {
  return (
    <main className={css.container}>
      {sidebar}

      {children}
    </main>
  );
};

export default NotesFilterLayout;