'use client';

import { useState } from 'react';
import { BookOpen, Brain, ClipboardList, TrendingUp, RotateCcw, Download } from 'lucide-react';
import FlashcardDeck from '@/app/components/Study/FlashcardDeck';
import QuizPlayer from '@/app/components/Study/QuizPlayer';
import ExportButtons from '@/app/components/Study/ExportButtons';
import { Flashcard, Quiz } from '@/lib/types/study-mode';
import { todosCasosClinicos } from '@/lib/data/casos-clinicos';
import { doencasConsolidadas } from '@/lib/data/doencas/index';
import { useStudyStore } from '@/lib/store/studyStore';

export default function EstudoPage() {
  const [mode, setMode] = useState<'menu' | 'flashcards' | 'quiz'>('menu');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);

  const generateFlashcardsFromCasos = (): Flashcard[] => {
    const cards: Flashcard[] = [];
    
    todosCasosClinicos.forEach(caso => {
      // Mapear dificuldade
      const dificuldadeMap: Record<string, 'facil' | 'medio' | 'dificil'> = {
        'iniciante': 'facil',
        'intermediario': 'medio',
        'avancado': 'dificil',
      };
      const dificuldade = dificuldadeMap[caso.dificuldade] || 'medio';

      // Flashcard sobre diagnóstico
      cards.push({
        id: `caso-${caso.id}-diagnostico`,
        front: `Qual o diagnóstico provável para: ${caso.apresentacao.paciente.nome} (${caso.apresentacao.paciente.idade} anos)?`,
        back: caso.desfecho.diagnosticoFinal,
        categoria: 'caso_clinico',
        tags: [caso.categoria],
        dificuldade,
        fonteId: caso.id,
        masteryLevel: 0,
      });

      // Flashcard sobre tratamento
      cards.push({
        id: `caso-${caso.id}-tratamento`,
        front: `Qual o tratamento de primeira linha para ${caso.titulo}?`,
        back: caso.desfecho.tratamentoRealizado,
        categoria: 'caso_clinico',
        tags: [caso.categoria],
        dificuldade,
        fonteId: caso.id,
        masteryLevel: 0,
      });
    });

    return cards;
  };

  const generateFlashcardsFromDoencas = (): Flashcard[] => {
    const cards: Flashcard[] = [];
    
    doencasConsolidadas.slice(0, 20).forEach(doenca => {
      if (!doenca.titulo || !doenca.quickView) return;

      // Flashcard sobre definição
      cards.push({
        id: `doenca-${doenca.id}-definicao`,
        front: `O que é ${doenca.titulo}?`,
        back: doenca.quickView.definicao,
        categoria: 'doenca',
        tags: [doenca.categoria || 'outros'],
        dificuldade: 'medio',
        fonteId: doenca.id,
        masteryLevel: 0,
      });

      // Flashcard sobre critérios diagnósticos
      if (doenca.quickView.criteriosDiagnosticos && doenca.quickView.criteriosDiagnosticos.length > 0) {
        cards.push({
          id: `doenca-${doenca.id}-criterios`,
          front: `Quais os critérios diagnósticos principais de ${doenca.titulo}?`,
          back: doenca.quickView.criteriosDiagnosticos.join(' • '),
          categoria: 'doenca',
          tags: [doenca.categoria || 'outros'],
          dificuldade: 'medio',
          fonteId: doenca.id,
          masteryLevel: 0,
        });
      }
    });

    return cards;
  };

  const generateQuizFromCasos = (): Quiz => {
    const questoes = todosCasosClinicos.slice(0, 5).flatMap(caso => 
      caso.etapas
        .filter(e => e.pergunta)
        .map((etapa, idx) => ({
          id: `${caso.id}-etapa-${idx}`,
          tipo: 'multipla_escolha' as const,
          enunciado: etapa.pergunta!.enunciado,
          opcoes: etapa.pergunta!.opcoes?.map(op => ({
            id: op.id,
            texto: op.texto,
            correta: op.correta
          })),
          respostaCorreta: etapa.pergunta!.respostaCorreta,
          explicacao: etapa.pergunta!.explicacao,
          pontos: etapa.pergunta!.pontos || 10,
          categoria: caso.categoria,
          tags: [caso.categoria],
        }))
    );

    return {
      id: 'quiz-casos-clinicos',
      titulo: 'Quiz: Casos Clínicos',
      descricao: 'Teste seus conhecimentos sobre casos clínicos da APS',
      questoes: questoes.slice(0, 10),
      categoria: 'casos_clinicos',
      dificuldade: 'medio',
      pontuacaoMaxima: questoes.slice(0, 10).reduce((acc, q) => acc + q.pontos, 0),
    };
  };

  const handleStartFlashcards = () => {
    const casoCards = generateFlashcardsFromCasos();
    const doencaCards = generateFlashcardsFromDoencas();
    setFlashcards([...casoCards, ...doencaCards]);
    setMode('flashcards');
  };

  const handleStartQuiz = () => {
    const quiz = generateQuizFromCasos();
    setCurrentQuiz(quiz);
    setMode('quiz');
  };

  const { flashcardSchedules, recordQuizAttempt } = useStudyStore();

  const handleQuizComplete = (attempt: any) => {
    // Salvar progresso no store
    recordQuizAttempt(attempt.quizId, attempt);
  };

  if (mode === 'flashcards') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Modo Flashcard</h1>
            <button
              onClick={() => setMode('menu')}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Voltar ao Menu
            </button>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FlashcardDeck flashcards={flashcards} mode="due" />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 sticky top-24">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Exportar para Anki
                </h2>
                <ExportButtons flashcards={flashcards} schedules={flashcardSchedules} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'quiz' && currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{currentQuiz.titulo}</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">{currentQuiz.descricao}</p>
            </div>
            <button
              onClick={() => setMode('menu')}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Sair
            </button>
          </div>
          <QuizPlayer quiz={currentQuiz} onComplete={handleQuizComplete} adaptive={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Modo Estudo</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Aprenda e revise com flashcards e quizzes interativos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Flashcards */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Flashcards</h2>
                <p className="text-slate-600 dark:text-slate-400">Sistema de repetição espaçada</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Revise conceitos de doenças, medicamentos e casos clínicos com nosso sistema inteligente de flashcards. 
              O algoritmo adapta as revisões baseado no seu nível de domínio.
            </p>
            <button
              onClick={handleStartFlashcards}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl"
            >
              Começar Flashcards
            </button>
          </div>

          {/* Quiz */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Quiz</h2>
                <p className="text-slate-600 dark:text-slate-400">Teste seus conhecimentos</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Responda questões baseadas nos casos clínicos reais da plataforma. 
              Receba feedback imediato e acompanhe seu progresso.
            </p>
            <button
              onClick={handleStartQuiz}
              className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl"
            >
              Começar Quiz
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <ClipboardList className="w-6 h-6 text-blue-600" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {todosCasosClinicos.length}
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Casos Clínicos</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {doencasConsolidadas.length}
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Doenças</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">0</div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Dias de Estudo</div>
          </div>
        </div>
      </div>
    </div>
  );
}

