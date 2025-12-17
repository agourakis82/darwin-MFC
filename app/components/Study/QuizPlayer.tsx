'use client';

import { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, XCircle, Clock, Award, TrendingUp, TrendingDown } from 'lucide-react';
import { Quiz, QuizQuestion, QuizAttempt, QuizResposta } from '@/lib/types/study-mode';
import { 
  initializeAdaptiveState, 
  updateAdaptiveState, 
  selectNextQuestion,
  calculatePerformanceScore,
  getPerformanceFeedback,
  AdaptiveQuizState,
  Difficulty
} from '@/lib/utils/adaptive-quiz';

interface QuizPlayerProps {
  quiz: Quiz;
  onComplete: (attempt: QuizAttempt) => void;
  onExit?: () => void;
  adaptive?: boolean; // Se deve usar modo adaptativo
}

export default function QuizPlayer({ quiz, onComplete, onExit, adaptive = true }: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [adaptiveState, setAdaptiveState] = useState<AdaptiveQuizState>(
    () => initializeAdaptiveState(quiz.dificuldade)
  );
  const [remainingQuestions, setRemainingQuestions] = useState<QuizQuestion[]>(quiz.questoes);

  // Get current question (adaptive or sequential)
  const currentQuestion = useMemo(() => {
    if (adaptive && remainingQuestions.length > 0) {
      return selectNextQuestion(remainingQuestions, adaptiveState) || remainingQuestions[0];
    }
    return quiz.questoes[currentQuestionIndex];
  }, [adaptive, remainingQuestions, adaptiveState, currentQuestionIndex, quiz.questoes]);

  const isLastQuestion = remainingQuestions.length === 1 || currentQuestionIndex === quiz.questoes.length - 1;

  const handleAnswer = (answer: string) => {
    const newSelectedAnswers = {
      ...selectedAnswers,
      [currentQuestion.id]: answer
    };
    setSelectedAnswers(newSelectedAnswers);
    setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion.id]));
  };

  const handleNext = () => {
    // Calculate time spent on current question
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    
    // Check if answer was correct
    const resposta = selectedAnswers[currentQuestion.id];
    const wasCorrect = Array.isArray(currentQuestion.respostaCorreta)
      ? currentQuestion.respostaCorreta.includes(resposta as string)
      : resposta === currentQuestion.respostaCorreta;

    // Update adaptive state if enabled
    if (adaptive) {
      const newState = updateAdaptiveState(adaptiveState, wasCorrect, timeSpent);
      setAdaptiveState(newState);
      
      // Remove answered question from remaining
      setRemainingQuestions(prev => prev.filter(q => q.id !== currentQuestion.id));
    }

    // Move to next question or finish
    if (isLastQuestion || (adaptive && remainingQuestions.length === 1)) {
      finishQuiz();
    } else {
      if (adaptive) {
        // Reset question start time for next question
        setQuestionStartTime(Date.now());
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setQuestionStartTime(Date.now());
      }
    }
  };

  const finishQuiz = () => {
    const endTime = Date.now();
    const tempoUtilizado = Math.floor((endTime - startTime) / 1000);
    
    // Get all questions that were answered (for adaptive, use answered set)
    const allQuestions = adaptive 
      ? [...answeredQuestions].map(id => quiz.questoes.find(q => q.id === id)).filter(Boolean) as QuizQuestion[]
      : quiz.questoes;
    
    const respostas: QuizResposta[] = allQuestions.map(q => {
      const resposta = selectedAnswers[q.id];
      const correta = Array.isArray(q.respostaCorreta)
        ? q.respostaCorreta.includes(resposta as string)
        : resposta === q.respostaCorreta;
      
      // Calculate time spent per question (approximate)
      const questionTime = tempoUtilizado / allQuestions.length;
      
      return {
        questaoId: q.id,
        resposta: resposta || '',
        correta,
        tempoGasto: questionTime,
      };
    });

    // Find question points for each response
    const pontuacao = respostas.reduce((acc, r) => {
      const question = allQuestions.find(q => q.id === r.questaoId);
      return acc + (r.correta ? (question?.pontos || 0) : 0);
    }, 0);
    const porcentagemAcerto = (respostas.filter(r => r.correta).length / respostas.length) * 100;

    const attempt: QuizAttempt = {
      quizId: quiz.id,
      timestamp: new Date(),
      respostas,
      pontuacao,
      tempoUtilizado,
      porcentagemAcerto
    };

    setShowResults(true);
    onComplete(attempt);
  };

  if (showResults) {
    const allAnsweredQuestions = adaptive 
      ? [...answeredQuestions].map(id => quiz.questoes.find(q => q.id === id)).filter(Boolean) as QuizQuestion[]
      : quiz.questoes;
    
    const correctCount = allAnsweredQuestions.filter((q) => {
      const resposta = selectedAnswers[q.id];
      const correta = Array.isArray(q.respostaCorreta)
        ? q.respostaCorreta.includes(resposta as string)
        : resposta === q.respostaCorreta;
      return correta;
    }).length;

    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white text-center">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Quiz Concluído!</h2>
          <div className="text-6xl font-bold mb-2">
            {Math.round((correctCount / allAnsweredQuestions.length) * 100)}%
          </div>
          <div className="text-xl opacity-90 mb-6">
            {correctCount} de {allAnsweredQuestions.length} questões corretas
          </div>
          {adaptive && (
            <div className="mt-4 p-4 bg-white/20 rounded-lg">
              <div className="text-sm opacity-90 mb-2">
                {getPerformanceFeedback(adaptiveState)}
              </div>
              <div className="flex items-center justify-center gap-4 text-sm">
                <span>Dificuldade final: {adaptiveState.currentDifficulty}</span>
                <span>Score: {Math.round(calculatePerformanceScore(adaptiveState))}/100</span>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-sm opacity-80 mb-1">Pontuação</div>
              <div className="text-2xl font-bold">
                {allAnsweredQuestions.reduce((acc, q) => {
                  const resposta = selectedAnswers[q.id];
                  const correta = Array.isArray(q.respostaCorreta)
                    ? q.respostaCorreta.includes(resposta as string)
                    : resposta === q.respostaCorreta;
                  return acc + (correta ? q.pontos : 0);
                }, 0)} / {quiz.pontuacaoMaxima}
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-sm opacity-80 mb-1">Tempo</div>
              <div className="text-2xl font-bold">
                {Math.floor((Date.now() - startTime) / 1000 / 60)}min
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
          <span>
            Questão {adaptive ? answeredQuestions.size + 1 : currentQuestionIndex + 1} de {adaptive ? remainingQuestions.length + answeredQuestions.size : quiz.questoes.length}
            {adaptive && (
              <span className="ml-2 text-xs">(Dificuldade: {adaptiveState.currentDifficulty})</span>
            )}
          </span>
          <span>
            {Math.round(((adaptive ? answeredQuestions.size + 1 : currentQuestionIndex + 1) / (adaptive ? remainingQuestions.length + answeredQuestions.size : quiz.questoes.length)) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${((adaptive ? answeredQuestions.size + 1 : currentQuestionIndex + 1) / (adaptive ? remainingQuestions.length + answeredQuestions.size : quiz.questoes.length)) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl mb-6">
        <div className="mb-6">
          <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            {quiz.categoria.toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {currentQuestion.enunciado}
          </h2>
          {currentQuestion.tempoEstimado && (
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span>Tempo estimado: {currentQuestion.tempoEstimado}s</span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.opcoes?.map((opcao) => {
            const isSelected = selectedAnswers[currentQuestion.id] === opcao.id;
            return (
              <button
                key={opcao.id}
                onClick={() => handleAnswer(opcao.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100'
                    : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-600'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium">{opcao.texto}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        {!adaptive && (
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Anterior
          </button>
        )}
        {adaptive && <div />}
        <button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestion.id]}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors"
        >
          {isLastQuestion ? 'Finalizar' : 'Próxima'}
        </button>
      </div>
    </div>
  );
}

