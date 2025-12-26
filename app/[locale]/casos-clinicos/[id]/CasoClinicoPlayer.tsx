'use client';

import { useState, useCallback } from 'react';
import { Link } from '@/i18n/routing';
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, 
  User, FileText, Stethoscope, FlaskConical, 
  Target, Pill, TrendingUp, GraduationCap,
  Trophy, RotateCcw, Home, Lightbulb
} from 'lucide-react';
import { CasoClinico, EtapaCaso } from '@/lib/types/caso-clinico';

interface Props {
  caso: CasoClinico;
}

const tipoEtapaIcons: Record<string, React.ElementType> = {
  anamnese: User,
  exame_fisico: Stethoscope,
  exames_complementares: FlaskConical,
  diagnostico: Target,
  tratamento: Pill,
  acompanhamento: TrendingUp,
  educacao: GraduationCap
};

const tipoEtapaNomes: Record<string, string> = {
  anamnese: 'Anamnese',
  exame_fisico: 'Exame Físico',
  exames_complementares: 'Exames Complementares',
  diagnostico: 'Diagnóstico',
  tratamento: 'Tratamento',
  acompanhamento: 'Acompanhamento',
  educacao: 'Educação'
};

export default function CasoClinicoPlayer({ caso }: Props) {
  const [etapaAtual, setEtapaAtual] = useState(-1); // -1 = apresentação
  const [respostas, setRespostas] = useState<Record<string, { resposta: string; correta: boolean }>>({});
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [pontuacaoTotal, setPontuacaoTotal] = useState(0);
  const [casoFinalizado, setCasoFinalizado] = useState(false);

  const etapa = etapaAtual >= 0 ? caso.etapas[etapaAtual] : null;
  const progresso = ((etapaAtual + 1) / caso.etapas.length) * 100;

  const verificarResposta = useCallback(() => {
    if (!etapa?.pergunta || !respostaSelecionada) return;

    const correta = respostaSelecionada === etapa.pergunta.respostaCorreta;
    
    setRespostas(prev => ({
      ...prev,
      [etapa.id]: { resposta: respostaSelecionada, correta }
    }));

    if (correta && etapa.pergunta.pontos) {
      setPontuacaoTotal(prev => prev + etapa.pergunta!.pontos!);
    }

    setMostrarFeedback(true);
  }, [etapa, respostaSelecionada]);

  const proximaEtapa = useCallback(() => {
    setRespostaSelecionada(null);
    setMostrarFeedback(false);
    
    if (etapaAtual < caso.etapas.length - 1) {
      setEtapaAtual(prev => prev + 1);
    } else {
      setCasoFinalizado(true);
    }
  }, [etapaAtual, caso.etapas.length]);

  const reiniciarCaso = useCallback(() => {
    setEtapaAtual(-1);
    setRespostas({});
    setRespostaSelecionada(null);
    setMostrarFeedback(false);
    setPontuacaoTotal(0);
    setCasoFinalizado(false);
  }, []);

  // Tela de Desfecho
  if (casoFinalizado) {
    const acertos = Object.values(respostas).filter(r => r.correta).length;
    const total = Object.keys(respostas).length;
    const percentual = total > 0 ? Math.round((acertos / total) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Resultado */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className={`p-8 text-center text-white ${percentual >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-amber-500 to-orange-600'}`}>
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Caso Concluído!</h1>
              <p className="text-xl opacity-90">{percentual}% de acertos ({acertos}/{total})</p>
              <p className="text-lg mt-2">Pontuação: {pontuacaoTotal} pontos</p>
            </div>
          </div>

          {/* Desfecho */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">📋 Desfecho do Caso</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-1">Diagnóstico Final</h3>
                <p className="dark:text-neutral-300">{caso.desfecho.diagnosticoFinal}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-green-600 mb-1">Tratamento Realizado</h3>
                <p className="dark:text-neutral-300">{caso.desfecho.tratamentoRealizado}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-purple-600 mb-1">Evolução</h3>
                <p className="dark:text-neutral-300">{caso.desfecho.evolucao}</p>
              </div>
            </div>
          </div>

          {/* Lições */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-green-600">
                <Lightbulb className="w-5 h-5" />
                Lições Principais
              </h2>
              <ul className="space-y-2">
                {caso.desfecho.licoesPrincipais.map((licao, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm dark:text-neutral-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {licao}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                Erros Comuns a Evitar
              </h2>
              <ul className="space-y-2">
                {caso.desfecho.errosComuns.map((erro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm dark:text-neutral-300">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    {erro}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={reiniciarCaso}
              className="px-6 py-3 bg-neutral-200 dark:bg-neutral-700 rounded-xl flex items-center gap-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Refazer Caso
            </button>
            <Link
              href="/casos-clinicos"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              Ver Outros Casos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Header com progresso */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link href="/casos-clinicos" className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Voltar</span>
            </Link>
            <div className="text-sm font-medium dark:text-white">
              {etapaAtual < 0 ? 'Apresentação' : `Etapa ${etapaAtual + 1} de ${caso.etapas.length}`}
            </div>
            <div className="text-sm text-neutral-500">
              {pontuacaoTotal} pts
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
              style={{ width: `${Math.max(5, progresso)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Apresentação do Caso */}
        {etapaAtual < 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white">
              <h1 className="text-2xl font-bold mb-1">{caso.titulo}</h1>
              <p className="opacity-90">{caso.subtitulo}</p>
            </div>
            
            <div className="p-6">
              {/* Dados do paciente */}
              <div className="flex items-start gap-4 mb-6 p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {caso.apresentacao.paciente.sexo === 'M' ? '👨' : '👩'}
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{caso.apresentacao.paciente.nome}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {caso.apresentacao.paciente.idade} anos, {caso.apresentacao.paciente.sexo === 'M' ? 'masculino' : 'feminino'}
                  </p>
                  {caso.apresentacao.paciente.profissao && (
                    <p className="text-sm text-neutral-500">{caso.apresentacao.paciente.profissao}</p>
                  )}
                </div>
              </div>

              {/* QP e HDA */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-blue-600 mb-1">Queixa Principal</h3>
                  <p className="text-lg dark:text-white">"{caso.apresentacao.queixaPrincipal}"</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-blue-600 mb-1">História da Doença Atual</h3>
                  <p className="dark:text-neutral-300 leading-relaxed">{caso.apresentacao.historiaDoencaAtual}</p>
                </div>
              </div>

              {/* Objetivos */}
              <div className="mt-6 pt-6 border-t dark:border-neutral-700">
                <h3 className="font-semibold mb-3 dark:text-white">🎯 Objetivos de Aprendizagem</h3>
                <div className="flex flex-wrap gap-2">
                  {caso.objetivosAprendizagem.map((obj, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                      {obj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Iniciar */}
              <button
                onClick={() => setEtapaAtual(0)}
                className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                Iniciar Caso
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : etapa && (
          /* Etapa do Caso */
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">
            {/* Header da Etapa */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center gap-3">
              {(() => {
                const Icon = tipoEtapaIcons[etapa.tipo] || FileText;
                return <Icon className="w-6 h-6" />;
              })()}
              <div>
                <h2 className="font-bold">{etapa.titulo}</h2>
                <p className="text-sm opacity-80">{tipoEtapaNomes[etapa.tipo]}</p>
              </div>
            </div>

            <div className="p-6">
              {/* Conteúdo */}
              <p className="dark:text-neutral-300 mb-4">{etapa.conteudo.texto}</p>

              {/* Dados estruturados */}
              {etapa.conteudo.dados && (
                <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(etapa.conteudo.dados).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">{key}:</span>
                        <span className="font-medium dark:text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dicas */}
              {etapa.conteudo.dicas && !mostrarFeedback && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-2">💡 Dicas</p>
                  <ul className="list-disc list-inside text-sm text-amber-600 dark:text-amber-300">
                    {etapa.conteudo.dicas.map((dica, i) => (
                      <li key={i}>{dica}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pergunta */}
              {etapa.pergunta && (
                <div className="mt-6 pt-6 border-t dark:border-neutral-700">
                  <h3 className="font-bold mb-4 dark:text-white">{etapa.pergunta.enunciado}</h3>
                  
                  <div className="space-y-2">
                    {etapa.pergunta.opcoes?.map(opcao => {
                      const isSelected = respostaSelecionada === opcao.id;
                      const respostaAnterior = respostas[etapa.id];
                      const showResult = mostrarFeedback;
                      
                      let bgClass = 'bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700';
                      
                      if (showResult) {
                        if (opcao.correta) {
                          bgClass = 'bg-green-100 dark:bg-green-900/30 border-green-500';
                        } else if (isSelected && !opcao.correta) {
                          bgClass = 'bg-red-100 dark:bg-red-900/30 border-red-500';
                        }
                      } else if (isSelected) {
                        bgClass = 'bg-blue-100 dark:bg-blue-900/30 border-blue-500';
                      }

                      return (
                        <button
                          key={opcao.id}
                          onClick={() => !mostrarFeedback && setRespostaSelecionada(opcao.id)}
                          disabled={mostrarFeedback}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgClass} ${
                            isSelected && !mostrarFeedback ? 'border-blue-500' : 'border-transparent'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-white dark:bg-neutral-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {opcao.id.toUpperCase()}
                            </span>
                            <span className="dark:text-white">{opcao.texto}</span>
                            {showResult && opcao.correta && (
                              <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
                            )}
                            {showResult && isSelected && !opcao.correta && (
                              <XCircle className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {mostrarFeedback && (
                    <div className={`mt-4 p-4 rounded-xl ${
                      respostas[etapa.id]?.correta 
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    }`}>
                      <p className={`font-semibold mb-2 ${
                        respostas[etapa.id]?.correta ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                      }`}>
                        {respostas[etapa.id]?.correta ? '✅ Correto!' : '❌ Incorreto'}
                      </p>
                      <p className="text-sm dark:text-neutral-300">{etapa.pergunta.explicacao}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-4 mt-6">
                {!mostrarFeedback && etapa.pergunta && (
                  <button
                    onClick={verificarResposta}
                    disabled={!respostaSelecionada}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  >
                    Verificar Resposta
                  </button>
                )}
                
                {(mostrarFeedback || !etapa.pergunta) && (
                  <button
                    onClick={proximaEtapa}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                  >
                    {etapaAtual < caso.etapas.length - 1 ? 'Próxima Etapa' : 'Ver Desfecho'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

