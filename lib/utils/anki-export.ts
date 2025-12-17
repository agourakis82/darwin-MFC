/**
 * ANKI EXPORT - GERAÇÃO DE ARQUIVOS .apkg
 * ========================================
 * 
 * Sistema de exportação de flashcards para formato Anki (.apkg)
 * Baseado na especificação do formato Anki
 * 
 * Nota: .apkg é um arquivo ZIP contendo:
 * - collection.anki2 (banco SQLite)
 * - media (arquivos de mídia)
 * - meta (metadados)
 * 
 * Como não podemos gerar SQLite diretamente no browser,
 * vamos gerar um formato JSON que pode ser convertido para .apkg
 * ou criar um formato compatível usando bibliotecas client-side
 */

import { Flashcard } from '../types/study-mode';
import { ReviewSchedule } from './spaced-repetition';

export interface AnkiCard {
  front: string;
  back: string;
  tags: string[];
  deck: string;
  model: string; // Modelo de card (Basic, Cloze, etc.)
  fields: Record<string, string>; // Campos adicionais
  guid: string; // GUID único do card
}

export interface AnkiDeck {
  name: string;
  cards: AnkiCard[];
  description?: string;
}

/**
 * Converte Flashcard Darwin-MFC para formato Anki
 */
export function convertFlashcardToAnki(
  flashcard: Flashcard,
  schedule?: ReviewSchedule
): AnkiCard {
  // Gerar GUID único baseado no ID do flashcard
  const guid = generateGUID(flashcard.id);

  // Extrair tags do flashcard
  const tags = [
    flashcard.categoria,
    flashcard.dificuldade,
    ...flashcard.tags,
    'darwin-mfc', // Tag comum para identificar origem
  ].filter(Boolean);

  // Determinar deck baseado na categoria
  const deck = `Darwin-MFC::${formatDeckName(flashcard.categoria)}`;

  return {
    front: flashcard.front,
    back: flashcard.back,
    tags,
    deck,
    model: 'Basic', // Modelo básico Anki (Front/Back)
    fields: {
      Front: flashcard.front,
      Back: flashcard.back,
      'Fonte ID': flashcard.fonteId || '',
      'Dificuldade': flashcard.dificuldade,
      'Categoria': flashcard.categoria,
      'Last Review': schedule?.lastReviewed?.toISOString() || '',
      'Next Review': schedule?.nextReview?.toISOString() || '',
      'Interval': schedule?.interval?.toString() || '0',
      'Ease Factor': schedule?.easeFactor?.toString() || '2.5',
      'Repetitions': schedule?.repetitions?.toString() || '0',
    },
    guid,
  };
}

/**
 * Gera GUID único baseado em string
 */
function generateGUID(input: string): string {
  // Gerar GUID determinístico baseado no ID
  // Usando uma função hash simples
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Formatar como GUID (sem realmente ser UUID, mas compatível)
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hex.substring(0, 8)}-${hex.substring(8, 16) || '0000'}-4000-8000-${hex.substring(16, 28) || '000000000000'}`.substring(0, 36);
}

/**
 * Formata nome de categoria para nome de deck
 */
function formatDeckName(categoria: string): string {
  const names: Record<string, string> = {
    'doenca': 'Doenças',
    'medicamento': 'Medicamentos',
    'caso_clinico': 'Casos Clínicos',
    'protocolo': 'Protocolos',
  };
  return names[categoria] || categoria.charAt(0).toUpperCase() + categoria.slice(1);
}

/**
 * Agrupa flashcards por deck
 */
export function groupFlashcardsByDeck(
  flashcards: Flashcard[],
  schedules?: Record<string, ReviewSchedule>
): Record<string, AnkiCard[]> {
  const decks: Record<string, AnkiCard[]> = {};

  flashcards.forEach(flashcard => {
    const ankiCard = convertFlashcardToAnki(
      flashcard,
      schedules?.[flashcard.id]
    );
    
    if (!decks[ankiCard.deck]) {
      decks[ankiCard.deck] = [];
    }
    decks[ankiCard.deck].push(ankiCard);
  });

  return decks;
}

/**
 * Gera formato JSON para export Anki (compatível com AnkiImport)
 */
export function generateAnkiJSON(ankiCards: AnkiCard[]): string {
  // Formato compatível com Anki Import (JSON)
  const ankiFormat = ankiCards.map(card => ({
    front: card.front,
    back: card.back,
    tags: card.tags.join(' '),
    deck: card.deck,
    model: card.model,
  }));

  return JSON.stringify(ankiFormat, null, 2);
}

/**
 * Gera formato CSV para import Anki
 */
export function generateAnkiCSV(ankiCards: AnkiCard[]): string {
  // Formato CSV compatível com Anki Import
  const headers = ['Front', 'Back', 'Tags', 'Deck'];
  const rows = ankiCards.map(card => [
    escapeCSV(card.front),
    escapeCSV(card.back),
    card.tags.join(' '),
    card.deck,
  ]);

  return [headers.join('\t'), ...rows.map(row => row.join('\t'))].join('\n');
}

/**
 * Escapa caracteres especiais para CSV
 */
function escapeCSV(text: string): string {
  if (text.includes('\t') || text.includes('\n') || text.includes('"')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

/**
 * Gera texto formatado para colar no Anki (via Add Cards)
 */
export function generateAnkiTextFormat(ankiCards: AnkiCard[]): string {
  return ankiCards.map((card, index) => {
    return `Card ${index + 1}:
Front: ${card.front}
Back: ${card.back}
Tags: ${card.tags.join(', ')}
Deck: ${card.deck}
---
`;
  }).join('\n');
}

/**
 * Exporta flashcards como arquivo (browser download)
 */
export function exportFlashcardsAsAnki(
  flashcards: Flashcard[],
  schedules?: Record<string, ReviewSchedule>,
  format: 'json' | 'csv' | 'txt' = 'json'
): void {
  const decks = groupFlashcardsByDeck(flashcards, schedules);
  const allCards = Object.values(decks).flat();

  let content: string;
  let filename: string;
  let mimeType: string;

  switch (format) {
    case 'csv':
      content = generateAnkiCSV(allCards);
      filename = `darwin-mfc-flashcards-${new Date().toISOString().split('T')[0]}.csv`;
      mimeType = 'text/csv';
      break;
    case 'txt':
      content = generateAnkiTextFormat(allCards);
      filename = `darwin-mfc-flashcards-${new Date().toISOString().split('T')[0]}.txt`;
      mimeType = 'text/plain';
      break;
    case 'json':
    default:
      content = generateAnkiJSON(allCards);
      filename = `darwin-mfc-flashcards-${new Date().toISOString().split('T')[0]}.json`;
      mimeType = 'application/json';
      break;
  }

  // Criar blob e fazer download
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Gera instruções para import no Anki
 */
export function getAnkiImportInstructions(format: 'json' | 'csv' | 'txt'): string {
  const instructions: Record<string, string> = {
    csv: `
1. Abra o Anki
2. Vá em File > Import
3. Selecione o arquivo CSV exportado
4. Configure:
   - Type: Basic (front/back)
   - Allow HTML: Sim
   - Field 1: Front
   - Field 2: Back
   - Tags: Coluna Tags
   - Deck: Coluna Deck
5. Clique em Import
    `,
    json: `
1. Use uma extensão do Anki ou ferramenta de importação JSON
2. Ou converta para CSV primeiro usando um conversor online
3. Siga as instruções do CSV acima
    `,
    txt: `
1. Copie o conteúdo do arquivo TXT
2. No Anki, vá em Add Cards
3. Cole o conteúdo (formato pode precisar de ajuste manual)
4. Ajuste tags e decks conforme necessário
    `,
  };

  return instructions[format] || instructions.csv;
}

