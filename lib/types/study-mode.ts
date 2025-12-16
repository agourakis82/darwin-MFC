/**
 * TIPOS PARA MODO ESTUDO - DARWIN-MFC
 * ====================================
 * 
 * Sistema de flashcards e quiz para estudo
 */

import { CasoClinico } from './caso-clinico';
import { Doenca } from './doenca';

// =============================================================================
// FLASHCARD
// =============================================================================

export interface Flashcard {
  id: string;
  front: string; // Pergunta ou conceito
  back: string; // Resposta ou explicação
  categoria: 'doenca' | 'medicamento' | 'caso_clinico' | 'protocolo';
  tags: string[];
  dificuldade: 'facil' | 'medio' | 'dificil';
  fonteId?: string; // ID da doença/caso/medicamento origem
  lastReviewed?: Date;
  masteryLevel: number; // 0-5 (Sistema de repetição espaçada)
  nextReview?: Date;
}

// =============================================================================
// QUIZ
// =============================================================================

export interface QuizQuestion {
  id: string;
  tipo: 'multipla_escolha' | 'verdadeiro_falso' | 'matching' | 'preenchimento';
  enunciado: string;
  opcoes?: OpcaoQuiz[];
  respostaCorreta: string | string[];
  explicacao: string;
  pontos: number;
  categoria: string;
  tags: string[];
  tempoEstimado?: number; // em segundos
}

export interface OpcaoQuiz {
  id: string;
  texto: string;
  correta: boolean;
}

export interface Quiz {
  id: string;
  titulo: string;
  descricao: string;
  questoes: QuizQuestion[];
  categoria: 'doencas' | 'medicamentos' | 'casos_clinicos' | 'protocolos' | 'geral';
  dificuldade: 'facil' | 'medio' | 'dificil';
  tempoTotal?: number; // em minutos
  pontuacaoMaxima: number;
}

// =============================================================================
// PROGRESSO DE ESTUDO
// =============================================================================

export interface StudyProgress {
  userId?: string;
  flashcards: {
    flashcardId: string;
    masteryLevel: number; // 0-5
    lastReviewed: Date;
    nextReview: Date;
    reviewCount: number;
    correctCount: number;
    incorrectCount: number;
  }[];
  quizzes: {
    quizId: string;
    attempts: QuizAttempt[];
    bestScore: number;
    lastAttempt?: Date;
  }[];
  streak: number; // Dias consecutivos estudando
  totalStudyTime: number; // em minutos
  lastStudyDate?: Date;
}

export interface QuizAttempt {
  quizId: string;
  timestamp: Date;
  respostas: QuizResposta[];
  pontuacao: number;
  tempoUtilizado: number; // em segundos
  porcentagemAcerto: number;
}

export interface QuizResposta {
  questaoId: string;
  resposta: string | string[];
  correta: boolean;
  tempoGasto?: number;
}

// =============================================================================
// GERADOR DE FLASHCARDS
// =============================================================================

export interface FlashcardGenerator {
  generateFromDoenca(doenca: Doenca): Flashcard[];
  generateFromCaso(caso: CasoClinico): Flashcard[];
  generateFromMedicamento(medicamento: any): Flashcard[];
}

