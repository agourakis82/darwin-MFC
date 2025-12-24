import React from "react";
import { Lightbulb, Target, AlertCircle } from "lucide-react";

interface PresenterNotesProps {
  section: string;
}

export function PresenterNotes({ section }: PresenterNotesProps) {
  const notes = getNotesForSection(section);

  return (
    <div className="space-y-4">
      {notes.map((note, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-start gap-2">
            {note.type === "tip" && (
              <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            {note.type === "objective" && (
              <Target className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            )}
            {note.type === "warning" && (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-xs font-semibold text-neutral-900">
                {note.title}
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed mt-1">
                {note.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getNotesForSection(section: string) {
  const notesMap: Record<
    string,
    Array<{ type: "tip" | "objective" | "warning"; title: string; content: string }>
  > = {
    hero: [
      {
        type: "objective",
        title: "Objetivo da Seção",
        content:
          "Estabelecer o tom da aula: rastreio não é 'fazer mais exames', mas fazer os certos. Enfatizar que SUS e sociedades partem da mesma evidência.",
      },
      {
        type: "tip",
        title: "Dica de Apresentação",
        content:
          "Use os 3 cards para criar expectativa: tese, perspectiva e objetivo. Deixe claro que a aula é sobre decisão clínica, não decoreba.",
      },
    ],
    concepts: [
      {
        type: "objective",
        title: "Conceitos Fundamentais",
        content:
          "Diferenciar rastreamento populacional de check-up individual. Introduzir prevenção quaternária como proteção contra excesso.",
      },
      {
        type: "tip",
        title: "Exemplo Prático",
        content:
          "Mencione caso de PSA em massa ou mamografia sem critério como exemplos de quando 'mais' não é melhor.",
      },
      {
        type: "warning",
        title: "Ponto de Atenção",
        content:
          "Estudantes podem confundir rastreio com diagnóstico precoce. Reforce a diferença: rastreio é em assintomáticos.",
      },
    ],
    lifecycle: [
      {
        type: "objective",
        title: "Linha do Tempo",
        content:
          "Mostrar que rastreios seguem janelas de oportunidade ao longo da vida. Do teste do pezinho ao rastreio de fragilidade.",
      },
      {
        type: "tip",
        title: "Interatividade",
        content:
          "Peça aos alunos para clicar nos pontos da timeline. Discuta por que certos rastreios aparecem em certas idades.",
      },
    ],
    dcnt: [
      {
        type: "objective",
        title: "DCNT - Consensos e Divergências",
        content:
          "Mostrar que em DCNT, SUS e sociedades concordam no 'o que', mas divergem no 'quando' e 'quão amplo'.",
      },
      {
        type: "tip",
        title: "Use o Toggle",
        content:
          "Alterne entre as visões SUS, Sociedades e Comparação para mostrar as nuances de cada abordagem.",
      },
      {
        type: "warning",
        title: "Ponto Crítico",
        content:
          "Em DM2, sociedades querem rastrear mais cedo. Discuta custo-benefício e recursos limitados.",
      },
    ],
    cancer: [
      {
        type: "objective",
        title: "Câncer - Campo de Batalha",
        content:
          "Aqui estão as maiores divergências. Mama e próstata são os pontos quentes. Colo é consenso.",
      },
      {
        type: "tip",
        title: "Evidências",
        content:
          "Aponte os badges de evidência (A/B/C). Explique que mesmo com evidência A, pode haver divergência na implementação.",
      },
      {
        type: "warning",
        title: "Decisão Compartilhada",
        content:
          "Enfatize que em mama (40-49 anos) e próstata, a decisão deve ser compartilhada. Não é 'fazer' ou 'não fazer', mas 'discutir'.",
      },
    ],
    infectious: [
      {
        type: "objective",
        title: "Infecções - Consenso",
        content:
          "Aqui SUS e sociedades remam juntos. Foco em ampliar testagem e eliminar como problema de saúde pública.",
      },
      {
        type: "tip",
        title: "Estratégia Opt-out",
        content:
          "Explique que opt-out significa oferecer teste a todos, sem precisar pedir permissão explícita (mas permitindo recusa).",
      },
    ],
    pregnancy: [
      {
        type: "objective",
        title: "Pré-natal Denso",
        content:
          "Gestação concentra muitos rastreios. É uma janela de oportunidade única para mãe e bebê.",
      },
      {
        type: "tip",
        title: "Timeline Visual",
        content:
          "Use a timeline trimestral para mostrar quando cada rastreio acontece. Enfatize a repetição de HIV/sífilis.",
      },
      {
        type: "warning",
        title: "Lacunas",
        content:
          "GBS, aneuploidias e HCV universal ainda não estão no SUS, mas sociedades recomendam. Discuta barreiras de implementação.",
      },
    ],
    mental: [
      {
        type: "objective",
        title: "Saúde Mental",
        content:
          "Rastreio estruturado em depressão (PHQ-9), depressão pós-parto (EPDS) e TEA (M-CHAT).",
      },
      {
        type: "tip",
        title: "Instrumentos",
        content:
          "Mostre que esses são instrumentos validados, não apenas 'conversa'. Mas a sensibilidade clínica continua essencial.",
      },
    ],
    case: [
      {
        type: "objective",
        title: "Caso Clínico Real",
        content:
          "Aqui você deve inserir um paciente real da UBS. Use a tabela comparativa para mostrar SUS vs Sociedades.",
      },
      {
        type: "tip",
        title: "Discussão",
        content:
          "Peça aos alunos para justificar cada decisão. 'Por que seguir SUS aqui?' 'Por que expandir ali?'",
      },
      {
        type: "warning",
        title: "Realismo",
        content:
          "Não use caso perfeito. Mostre lacunas, rastreios atrasados. Isso gera discussão mais rica.",
      },
    ],
    summary: [
      {
        type: "objective",
        title: "Mensagens-Chave",
        content:
          "Reforçar: rastreio é estratégia populacional, SUS e sociedades não são inimigos, APS é lugar de síntese.",
      },
      {
        type: "tip",
        title: "Quiz Final",
        content:
          "Use o quiz para fixação. Pode ser feito em grupo ou individual. Discuta as respostas.",
      },
    ],
  };

  return (
    notesMap[section] || [
      {
        type: "tip",
        title: "Sem notas",
        content: "Não há notas específicas para esta seção.",
      },
    ]
  );
}