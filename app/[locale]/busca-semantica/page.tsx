/**
 * SEMANTIC SEARCH PAGE
 * ====================
 *
 * Dedicated page for the semantic search demo with
 * synonym expansion and faceted filtering
 */

import { Metadata } from 'next';
import SemanticSearchPage from '../busca/SemanticSearchPage';

export const metadata: Metadata = {
  title: 'Busca Semantica | Darwin-MFC',
  description: 'Busca inteligente com expansao de sinonimos e abreviacoes medicas',
};

export default function Page() {
  return <SemanticSearchPage />;
}
