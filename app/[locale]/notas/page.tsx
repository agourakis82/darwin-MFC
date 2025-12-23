/**
 * NOTAS PAGE
 * ==========
 *
 * Route: /notas
 * Main notes page
 */

import { Metadata } from 'next';
import NotesPage from './NotesPage';

export const metadata: Metadata = {
  title: 'Notas | Darwin-MFC',
  description: 'Sistema de notas offline-first para organizar estudos e anotações clínicas',
};

export default function Page() {
  return <NotesPage />;
}
