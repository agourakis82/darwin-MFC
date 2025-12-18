/**
 * Vídeos Educacionais
 * Conteúdo multimídia para capacitação e educação continuada
 */

import type { EducationalVideoData } from '@/app/components/Multimedia/EducationalVideo';

export const educationalVideos: EducationalVideoData[] = [
  {
    id: 'video-aps-basics',
    title: 'Atenção Primária à Saúde: Fundamentos e Práticas',
    description:
      'Vídeo introdutório sobre os princípios da APS, organização do trabalho em equipe e abordagem integral do paciente.',
    videoUrl: '/videos/aps-basics.mp4',
    thumbnailUrl: '/thumbnails/aps-basics.jpg',
    duration: 1800, // 30 minutos
    category: 'Capacitação',
    author: 'Ministério da Saúde',
    date: '2024-01-15',
    tags: ['APS', 'Fundamentos', 'Capacitação'],
  },
  {
    id: 'video-soap-notes',
    title: 'Documentação Clínica: SOAP Notes na Prática',
    description:
      'Tutorial prático sobre como preencher corretamente notas SOAP, incluindo exemplos e casos clínicos reais.',
    videoUrl: '/videos/soap-notes.mp4',
    thumbnailUrl: '/thumbnails/soap-notes.jpg',
    duration: 1200, // 20 minutos
    category: 'Documentação',
    author: 'Darwin-MFC',
    date: '2024-02-01',
    tags: ['SOAP', 'Documentação', 'Prática Clínica'],
  },
  {
    id: 'video-rastreamento-cancer',
    title: 'Rastreamento de Câncer na APS: Protocolos e Evidências',
    description:
      'Revisão dos protocolos de rastreamento de câncer recomendados pelo SUS, incluindo critérios de elegibilidade e seguimento.',
    videoUrl: '/videos/rastreamento-cancer.mp4',
    thumbnailUrl: '/thumbnails/rastreamento-cancer.jpg',
    duration: 2400, // 40 minutos
    category: 'Rastreamento',
    author: 'INCA',
    date: '2024-01-20',
    tags: ['Câncer', 'Rastreamento', 'SUS'],
  },
  {
    id: 'video-interacoes-medicamentosas',
    title: 'Interações Medicamentosas: Identificação e Prevenção',
    description:
      'Como identificar e prevenir interações medicamentosas na prática clínica, com foco em medicamentos de uso comum na APS.',
    videoUrl: '/videos/interacoes-medicamentosas.mp4',
    thumbnailUrl: '/thumbnails/interacoes-medicamentosas.jpg',
    duration: 1500, // 25 minutos
    category: 'Farmacologia',
    author: 'ANVISA',
    date: '2024-02-10',
    tags: ['Farmacologia', 'Interações', 'Segurança'],
  },
  {
    id: 'video-diagnostico-diferencial',
    title: 'Diagnóstico Diferencial: Abordagem Sistemática',
    description:
      'Metodologia para construção de diagnóstico diferencial, incluindo uso de árvores de decisão e critérios diagnósticos.',
    videoUrl: '/videos/diagnostico-diferencial.mp4',
    thumbnailUrl: '/thumbnails/diagnostico-diferencial.jpg',
    duration: 2100, // 35 minutos
    category: 'Diagnóstico',
    author: 'SBMFC',
    date: '2024-01-30',
    tags: ['Diagnóstico', 'Metodologia', 'Clínica'],
  },
];

/**
 * Vídeos por categoria
 */
export function getVideosByCategory(category: string): EducationalVideoData[] {
  return educationalVideos.filter(video => video.category === category);
}

/**
 * Vídeos relacionados
 */
export function getRelatedVideos(videoId: string, limit: number = 3): EducationalVideoData[] {
  const video = educationalVideos.find(v => v.id === videoId);
  if (!video) return [];

  // Busca vídeos da mesma categoria ou com tags similares
  return educationalVideos
    .filter(v => v.id !== videoId)
    .filter(v => {
      if (v.category === video.category) return true;
      if (video.tags && v.tags) {
        return video.tags.some(tag => v.tags!.includes(tag));
      }
      return false;
    })
    .slice(0, limit);
}

