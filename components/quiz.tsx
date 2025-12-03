import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question:
      "Qual é a principal diferença entre rastreamento populacional e check-up individual?",
    options: [
      "Rastreamento é feito apenas em hospitais",
      "Rastreamento é baseado em evidência de redução de morbimortalidade em grupos definidos",
      "Check-up é mais barato que rastreamento",
      "Não há diferença significativa",
    ],
    correct: 1,
    explanation:
      "Rastreamento populacional é uma estratégia de saúde pública baseada em evidências científicas para grupos específicos, diferente de check-ups individuais que podem não ter base em evidência.",
  },
  {
    question:
      "Em relação ao rastreio de câncer de mama, qual é a principal divergência entre SUS e sociedades médicas?",
    options: [
      "SUS não recomenda mamografia",
      "Sociedades recomendam iniciar aos 50 anos, SUS aos 40",
      "SUS recomenda mamografia bienal 50-74 anos; sociedades recomendam anual a partir dos 40",
      "Não há divergência significativa",
    ],
    correct: 2,
    explanation:
      "O SUS prioriza mamografia bienal dos 50-74 anos (com acesso a partir dos 40 em decisão compartilhada), enquanto sociedades médicas defendem rastreio anual a partir dos 40 anos para todas as mulheres.",
  },
  {
    question: "O conceito de prevenção quaternária refere-se a:",
    options: [
      "Quatro níveis de prevenção em saúde",
      "Proteger o paciente do excesso de prevenção e iatrogenia",
      "Prevenção de doenças quaternárias",
      "Quarta fase do rastreamento",
    ],
    correct: 1,
    explanation:
      "Prevenção quaternária é proteger o paciente do excesso de medicina, incluindo sobrediagnóstico e iatrogenia causados por rastreamentos desnecessários.",
  },
  {
    question:
      "Em relação ao rastreio de câncer de próstata com PSA, a posição do SUS/INCA é:",
    options: [
      "Rastreio universal anual a partir dos 50 anos",
      "Não recomenda rastreio populacional de rotina; orienta decisão compartilhada 55-69 anos",
      "Rastreio obrigatório a partir dos 45 anos",
      "Contra qualquer tipo de rastreio",
    ],
    correct: 1,
    explanation:
      "O SUS/INCA não recomenda rastreio populacional de rotina com PSA devido aos riscos de sobrediagnóstico, mas orienta decisão compartilhada na faixa de 55-69 anos.",
  },
  {
    question:
      "Qual rastreio neonatal NÃO faz parte do teste do pezinho ampliado no SUS?",
    options: [
      "Fenilcetonúria (PKU)",
      "Hipotireoidismo congênito",
      "Síndrome de Down",
      "Fibrose cística",
    ],
    correct: 2,
    explanation:
      "O teste do pezinho rastreia doenças metabólicas e genéticas tratáveis como PKU, hipotireoidismo, fibrose cística, entre outras. Síndrome de Down não é rastreada pelo teste do pezinho.",
  },
];

interface QuizModalProps {
  onClose: () => void;
}

export function QuizModal({ onClose }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-strong rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="p-8 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Quiz Interativo
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-200 rounded-lg transition glass"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!quizComplete ? (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between text-base text-neutral-700 mb-3 font-semibold">
                  <span>
                    Questão {currentQuestion + 1} de {QUIZ_QUESTIONS.length}
                  </span>
                  <span>Pontuação: {score}</span>
                </div>
                <div className="h-3 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-emerald-600 transition-all shadow-lg"
                    style={{
                      width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xl font-bold text-neutral-900">
                  {question.question}
                </h3>

                <div className="space-y-4">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrectAnswer = index === question.correct;
                    const showCorrect = showExplanation && isCorrectAnswer;
                    const showIncorrect = showExplanation && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full text-left p-5 rounded-xl border-2 transition font-medium shadow-md ${
                          showCorrect
                            ? "border-green-600 bg-green-50 shadow-green-200"
                            : showIncorrect
                            ? "border-red-600 bg-red-50 shadow-red-200"
                            : isSelected
                            ? "border-blue-600 bg-blue-50 shadow-blue-200"
                            : "border-neutral-300 hover:border-blue-400 hover:bg-neutral-50 hover:shadow-lg"
                        } ${selectedAnswer !== null ? "cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base md:text-lg">{option}</span>
                          {showCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          )}
                          {showIncorrect && (
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-xl shadow-lg ${
                      isCorrect ? "glass border-2 border-green-400 bg-green-50/50" : "glass border-2 border-amber-400 bg-amber-50/50"
                    }`}
                  >
                    <p className="text-base font-bold mb-2">
                      {isCorrect ? "✓ Correto!" : "✗ Incorreto"}
                    </p>
                    <p className="text-base text-neutral-800 font-medium">
                      {question.explanation}
                    </p>
                  </motion.div>
                )}

                {showExplanation && (
                  <button
                    onClick={handleNext}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition text-lg"
                  >
                    {currentQuestion < QUIZ_QUESTIONS.length - 1
                      ? "Próxima Questão"
                      : "Ver Resultado"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center space-y-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-4xl font-bold text-white">
                  {score}/{QUIZ_QUESTIONS.length}
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-3 text-neutral-900">
                  Quiz Concluído!
                </h3>
                <p className="text-neutral-700 text-lg font-medium">
                  Você acertou {score} de {QUIZ_QUESTIONS.length} questões
                  {score === QUIZ_QUESTIONS.length && " - Perfeito! 🎉"}
                  {score >= QUIZ_QUESTIONS.length * 0.7 &&
                    score < QUIZ_QUESTIONS.length &&
                    " - Muito bem! 👏"}
                  {score < QUIZ_QUESTIONS.length * 0.7 && " - Continue estudando! 📚"}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-4 px-6 glass border-2 border-neutral-300 text-neutral-900 rounded-xl font-bold hover:border-neutral-400 hover:shadow-lg transition"
                >
                  Refazer Quiz
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}