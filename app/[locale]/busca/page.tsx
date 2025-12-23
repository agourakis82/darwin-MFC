/**
 * SEARCH PAGE
 * ===========
 *
 * Dedicated search page with advanced features
 * Full-screen search experience with filters and analytics
 */

import { Metadata } from 'next';
import SearchPage from './SearchPage';

export const metadata: Metadata = {
  title: 'Busca | Darwin-MFC',
  description: 'Busque medicamentos, doenças, protocolos clínicos, calculadoras e casos clínicos',
};

export default function Page() {
  return <SearchPage />;
}
