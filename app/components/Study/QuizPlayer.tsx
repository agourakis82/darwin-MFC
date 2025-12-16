'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, Award } from 'lucide-react';
import { Quiz, QuizQuestion, QuizAttempt, QuizResposta } from '@/lib/types/study-mode';

interface QuizPlayerProps {
  quiz: Quiz;
  onComplete: (attempt: QuizAttempt) => void;
  onExit?: () => void;
}

export default function QuizPlayer({ quiz, onComplete, onExit }: QuizPlayerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionStartTime] = useState(Date.now());

  const question = quiz.questoes[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questoes.length - 1;

  const handleAnswer = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [question.id]: answer
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const finishQuiz = () => {
    const endTime = Date.now();
    const tempoUtilizado = Math.floor((endTime - startTime) / 1000);
    
    const respostas: QuizResposta[] = quiz.questoes.map(q => {
      const resposta = selectedAnswers[q.id];
      const correta = Array.isArray(q.respostaCorreta)
        ? q.respostaCorreta.includes(resposta as string)
        : resposta === q.respostaCorreta;
      
      return {
        questaoId: q.id,
        resposta: resposta || '',
        correta
      };
    });

    const pontuacao = respostas.reduce((acc, r, idx) => 
      acc + (r.correta ? quiz.questoes[idx].pontos : 0), 0
    );
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
    const correctCount = quiz.questoes.filter((q, idx) => {
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
            {Math.round((correctCount / quiz.questoes.length) * 100)}%
          </div>
          <div className="text-xl opacity-90 mb-6">
            {correctCount} de {quiz.questoes.length} questões corretas
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-sm opacity-80 mb-1">Pontuação</div>
              <div className="text-2xl font-bold">
                {quiz.questoes.reduce((acc, q, idx) => {
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
          <span>Questão {currentQuestion + 1} de {quiz.questoes.length}</span>
          <span>{Math.round(((currentQuestion + 1) / quiz.questoes.length) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questoes.length) * 100}%` }}
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
            {question.enunciado}
          </h2>
          {question.tempoEstimado && (
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span>Tempo estimado: {question.tempoEstimado}s</span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.opcoes?.map((opcao) => {
            const isSelected = selectedAnswers[question.id] === opcao.id;
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
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedAnswers[question.id]}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors"
        >
          {isLastQuestion ? 'Finalizar' : 'Próxima'}
        </button>
      </div>
    </div>
  );
}

