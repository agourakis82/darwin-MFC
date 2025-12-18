/**
 * Sistema de Alertas Inteligentes de Interações Medicamentosas
 * Detecta interações em tempo real baseado em prescrições e histórico
 */

import type { Medicamento } from '@/lib/types/medicamento';
import { todosMedicamentos } from '@/lib/data/medicamentos/index';
import type { SOAPData } from '@/app/components/Export/SOAPExport';
import { getConsultationHistory } from './recommendations';

export type GravidadeInteracao = 'contraindicada' | 'grave' | 'moderada' | 'leve' | 'desconhecida';

export interface DrugInteraction {
  medicamento1: {
    id: string;
    nome: string;
  };
  medicamento2: {
    id: string;
    nome: string;
  };
  gravidade: GravidadeInteracao;
  descricao: string;
  mecanismo?: string;
  conduta: string;
  evidencia?: string; // Nível de evidência (ex: "Nível 1 - Evidência forte")
  referencias?: string[];
}

export interface InteractionAlert {
  id: string;
  interaction: DrugInteraction;
  contexto: 'prescricao_atual' | 'historico' | 'ambos';
  prioridade: 'alta' | 'media' | 'baixa';
  timestamp: Date;
}

/**
 * Base de conhecimento de interações medicamentosas
 * Baseado em:
 * - Micromedex Drug Interactions
 * - UpToDate Drug Interactions
 * - RENAME 2024
 * - ANVISA Bulas
 */
const INTERACTION_DATABASE: Array<{
  medicamento1: string; // ID ou classe terapêutica
  medicamento2: string;
  gravidade: GravidadeInteracao;
  descricao: string;
  mecanismo?: string;
  conduta: string;
  tipo: 'especifica' | 'classe'; // específica ou por classe terapêutica
}> = [
  // Anticoagulantes
  {
    medicamento1: 'warfarina',
    medicamento2: 'aspirina',
    gravidade: 'grave',
    descricao: 'Aumento significativo do risco de sangramento',
    mecanismo: 'Ambos antiagregantes/anticoagulantes - efeito aditivo',
    conduta: 'Evitar associação ou monitorar INR rigorosamente. Considerar profilaxia gastroprotetora.',
    tipo: 'especifica',
  },
  {
    medicamento1: 'warfarina',
    medicamento2: 'acido-acetilsalicilico',
    gravidade: 'grave',
    descricao: 'Risco aumentado de sangramento',
    mecanismo: 'Efeito aditivo na inibição da coagulação',
    conduta: 'Evitar ou monitorar INR semanalmente',
    tipo: 'especifica',
  },
  {
    medicamento1: 'warfarina',
    medicamento2: 'diclofenaco',
    gravidade: 'grave',
    descricao: 'Aumento do risco de sangramento gastrointestinal',
    mecanismo: 'AINEs inibem agregação plaquetária e podem causar lesão GI',
    conduta: 'Evitar associação. Se necessário, usar IBP profilático.',
    tipo: 'especifica',
  },
  {
    medicamento1: 'warfarina',
    medicamento2: 'classe:antibiotico',
    gravidade: 'moderada',
    descricao: 'Muitos antibióticos podem potencializar efeito da warfarina',
    mecanismo: 'Alteração no metabolismo hepático da warfarina',
    conduta: 'Monitorar INR durante e após tratamento antibiótico',
    tipo: 'classe',
  },
  
  // Antiagregantes
  {
    medicamento1: 'acido-acetilsalicilico',
    medicamento2: 'diclofenaco',
    gravidade: 'moderada',
    descricao: 'Risco aumentado de sangramento gastrointestinal',
    mecanismo: 'Efeito aditivo na inibição de COX',
    conduta: 'Evitar uso concomitante prolongado. Considerar gastroproteção.',
    tipo: 'especifica',
  },
  {
    medicamento1: 'classe:antiagregante',
    medicamento2: 'classe:anti_inflamatorio',
    gravidade: 'moderada',
    descricao: 'Risco de sangramento aumentado',
    mecanismo: 'Efeitos sinérgicos na inibição de agregação plaquetária',
    conduta: 'Monitorar sinais de sangramento. Considerar gastroproteção.',
    tipo: 'classe',
  },
  
  // IECA e BRAs
  {
    medicamento1: 'captopril',
    medicamento2: 'espironolactona',
    gravidade: 'grave',
    descricao: 'Risco aumentado de hipercalemia',
    mecanismo: 'Ambos aumentam potássio sérico',
    conduta: 'Monitorar potássio sérico. Evitar em DRC avançada.',
    tipo: 'especifica',
  },
  {
    medicamento1: 'classe:ieca',
    medicamento2: 'classe:diuretico_poupador_potassio',
    gravidade: 'grave',
    descricao: 'Risco de hipercalemia grave',
    mecanismo: 'Efeito aditivo na retenção de potássio',
    conduta: 'Monitorar potássio sérico regularmente. Contraindicado em DRC estágio 4-5.',
    tipo: 'classe',
  },
  {
    medicamento1: 'classe:ieca',
    medicamento2: 'lítio',
    gravidade: 'moderada',
    descricao: 'Aumento dos níveis séricos de lítio com risco de toxicidade',
    mecanismo: 'IECA reduz excreção renal de lítio',
    conduta: 'Monitorar níveis séricos de lítio. Ajustar dose se necessário.',
    tipo: 'classe',
  },
  
  // Beta-bloqueadores
  {
    medicamento1: 'classe:betabloqueador',
    medicamento2: 'verapamil',
    gravidade: 'grave',
    descricao: 'Risco de bradicardia severa e bloqueio atrioventricular',
    mecanismo: 'Efeito aditivo na condução cardíaca',
    conduta: 'Evitar associação. Se necessário, monitorar ECG.',
    tipo: 'classe',
  },
  {
    medicamento1: 'propranolol',
    medicamento2: 'classe:antidiabetico',
    gravidade: 'moderada',
    descricao: 'Beta-bloqueadores podem mascarar sintomas de hipoglicemia',
    mecanismo: 'Bloqueio de receptores beta-adrenérgicos',
    conduta: 'Monitorar glicemia cuidadosamente. Orientar paciente sobre sintomas.',
    tipo: 'especifica',
  },
  
  // Metformina
  {
    medicamento1: 'metformina',
    medicamento2: 'classe:contraste_iodado',
    gravidade: 'grave',
    descricao: 'Risco de acidose láctica',
    mecanismo: 'Contraste pode causar insuficiência renal aguda',
    conduta: 'Suspender metformina 48h antes e após exame com contraste iodado.',
    tipo: 'classe',
  },
  
  // Digoxina
  {
    medicamento1: 'digoxina',
    medicamento2: 'furosemida',
    gravidade: 'moderada',
    descricao: 'Hipocalemia aumenta risco de toxicidade da digoxina',
    mecanismo: 'Diuréticos de alça podem causar hipocalemia',
    conduta: 'Monitorar potássio e níveis de digoxina. Suplementar potássio se necessário.',
    tipo: 'especifica',
  },
  {
    medicamento1: 'digoxina',
    medicamento2: 'classe:antibiotico',
    gravidade: 'moderada',
    descricao: 'Alguns antibióticos podem aumentar níveis de digoxina',
    mecanismo: 'Alteração no metabolismo ou absorção',
    conduta: 'Monitorar níveis séricos de digoxina durante tratamento.',
    tipo: 'classe',
  },
  
  // Antidepressivos
  {
    medicamento1: 'classe:antidepressivo',
    medicamento2: 'classe:ansiolitico',
    gravidade: 'moderada',
    descricao: 'Risco aumentado de sedação e depressão do SNC',
    mecanismo: 'Efeito aditivo na depressão do sistema nervoso central',
    conduta: 'Monitorar sedação excessiva. Orientar sobre atividades que requerem atenção.',
    tipo: 'classe',
  },
  {
    medicamento1: 'fluoxetina',
    medicamento2: 'classe:antipsicotico',
    gravidade: 'moderada',
    descricao: 'Pode aumentar níveis de antipsicóticos atípicos',
    mecanismo: 'Inibição do CYP2D6',
    conduta: 'Monitorar efeitos adversos. Pode ser necessário ajuste de dose.',
    tipo: 'especifica',
  },
  
  // Antiepilépticos
  {
    medicamento1: 'fenitoina',
    medicamento2: 'classe:anticoncepcional',
    gravidade: 'moderada',
    descricao: 'Fenitoina pode diminuir eficácia de contraceptivos hormonais',
    mecanismo: 'Indução enzimática do CYP3A4',
    conduta: 'Recomendar método contraceptivo adicional (barreira).',
    tipo: 'especifica',
  },
  {
    medicamento1: 'carbamazepina',
    medicamento2: 'classe:anticoncepcional',
    gravidade: 'moderada',
    descricao: 'Carbamazepina pode diminuir eficácia de contraceptivos hormonais',
    mecanismo: 'Indução enzimática do CYP3A4',
    conduta: 'Recomendar método contraceptivo adicional.',
    tipo: 'especifica',
  },
  
  // Corticosteroides
  {
    medicamento1: 'prednisona',
    medicamento2: 'classe:antidiabetico',
    gravidade: 'moderada',
    descricao: 'Corticoides podem aumentar glicemia',
    mecanismo: 'Aumento da resistência à insulina',
    conduta: 'Monitorar glicemia. Pode ser necessário ajuste de dose de antidiabético.',
    tipo: 'especifica',
  },
  {
    medicamento1: 'classe:corticoide',
    medicamento2: 'classe:anti_hipertensivo',
    gravidade: 'leve',
    descricao: 'Corticoides podem aumentar pressão arterial',
    mecanismo: 'Retenção de sódio e água',
    conduta: 'Monitorar pressão arterial. Ajustar anti-hipertensivo se necessário.',
    tipo: 'classe',
  },
  
  // Álcool com medicamentos
  {
    medicamento1: 'classe:ansiolitico',
    medicamento2: 'alcool',
    gravidade: 'grave',
    descricao: 'Depressão severa do SNC com risco de parada respiratória',
    mecanismo: 'Efeito sinérgico na depressão do sistema nervoso central',
    conduta: 'Contraindicado uso concomitante de álcool. Orientar paciente.',
    tipo: 'classe',
  },
  {
    medicamento1: 'metronidazol',
    medicamento2: 'alcool',
    gravidade: 'grave',
    descricao: 'Reação tipo dissulfiram (náusea, vômito, rubor)',
    mecanismo: 'Inibição da aldeído desidrogenase',
    conduta: 'Evitar álcool durante tratamento e 48h após.',
    tipo: 'especifica',
  },
  
  // Antibióticos e pílulas
  {
    medicamento1: 'rifampicina',
    medicamento2: 'classe:anticoncepcional',
    gravidade: 'moderada',
    descricao: 'Rifampicina pode diminuir eficácia de contraceptivos hormonais',
    mecanismo: 'Indução enzimática',
    conduta: 'Recomendar método contraceptivo adicional.',
    tipo: 'especifica',
  },
  
  // Estatinas
  {
    medicamento1: 'classe:hipolipemiante',
    medicamento2: 'classe:antifungico',
    gravidade: 'moderada',
    descricao: 'Alguns antifúngicos podem aumentar risco de miopatia por estatinas',
    mecanismo: 'Inibição do CYP3A4',
    conduta: 'Monitorar CK e sintomas musculares. Considerar suspender estatina temporariamente.',
    tipo: 'classe',
  },
];

/**
 * Verifica se um medicamento pertence a uma classe terapêutica
 */
function medicamentoPertenceAClasse(medicamento: Medicamento, classe: string): boolean {
  if (classe.startsWith('classe:')) {
    const classeSemPrefix = classe.replace('classe:', '');
    return medicamento.classeTerapeutica === classeSemPrefix;
  }
  return false;
}

/**
 * Encontra todas as interações entre dois medicamentos
 */
function findInteractionsBetween(
  med1: Medicamento,
  med2: Medicamento
): DrugInteraction[] {
  const interactions: DrugInteraction[] = [];
  
  INTERACTION_DATABASE.forEach(interactionRule => {
    let match1 = false;
    let match2 = false;
    
    // Verifica se med1 corresponde ao primeiro medicamento da regra
    if (interactionRule.tipo === 'especifica') {
      match1 = med1.id === interactionRule.medicamento1 || 
               med1.nomeGenerico.toLowerCase() === interactionRule.medicamento1.toLowerCase();
    } else {
      match1 = medicamentoPertenceAClasse(med1, interactionRule.medicamento1);
    }
    
    // Verifica se med2 corresponde ao segundo medicamento da regra
    if (interactionRule.tipo === 'especifica') {
      match2 = med2.id === interactionRule.medicamento2 || 
               med2.nomeGenerico.toLowerCase() === interactionRule.medicamento2.toLowerCase();
    } else {
      match2 = medicamentoPertenceAClasse(med2, interactionRule.medicamento2);
    }
    
    // Verifica interação bidirecional
    if (match1 && match2) {
      interactions.push({
        medicamento1: { id: med1.id, nome: med1.nomeGenerico },
        medicamento2: { id: med2.id, nome: med2.nomeGenerico },
        gravidade: interactionRule.gravidade,
        descricao: interactionRule.descricao,
        mecanismo: interactionRule.mecanismo,
        conduta: interactionRule.conduta,
      });
    } else if (match2 && match1) {
      // Interação reversa (med2 -> med1)
      interactions.push({
        medicamento1: { id: med2.id, nome: med2.nomeGenerico },
        medicamento2: { id: med1.id, nome: med1.nomeGenerico },
        gravidade: interactionRule.gravidade,
        descricao: interactionRule.descricao,
        mecanismo: interactionRule.mecanismo,
        conduta: interactionRule.conduta,
      });
    }
  });
  
  // Também verifica interações definidas nos dados do medicamento
  med1.interacoes?.forEach(interacao => {
    if (interacao.medicamento) {
      // Tenta encontrar o medicamento na lista
      const medEncontrado = todosMedicamentos.find(m => 
        m.nomeGenerico.toLowerCase().includes(interacao.medicamento.toLowerCase()) ||
        m.id === interacao.medicamento.toLowerCase().replace(/\s+/g, '-')
      );
      
      if (medEncontrado && medEncontrado.id === med2.id) {
        interactions.push({
          medicamento1: { id: med1.id, nome: med1.nomeGenerico },
          medicamento2: { id: med2.id, nome: med2.nomeGenerico },
          gravidade: interacao.gravidade,
          descricao: interacao.efeito || 'Interação medicamentosa',
          conduta: interacao.conduta || 'Monitorar paciente',
        });
      }
    }
  });
  
  return interactions;
}

/**
 * Encontra medicamento por nome (genérico ou comercial)
 */
function findMedicationByName(name: string): Medicamento | null {
  const normalized = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  
  return todosMedicamentos.find(med => {
    if (med.id.toLowerCase() === normalized || 
        med.nomeGenerico.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalized) {
      return true;
    }
    
    if (med.nomesComerciais?.some(nc => 
      nc.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalized
    )) {
      return true;
    }
    
    return false;
  }) || null;
}

/**
 * Extrai lista de medicamentos de um SOAP
 */
function extractMedicationsFromSOAP(soapData: Partial<SOAPData>): Medicamento[] {
  const medications: Medicamento[] = [];
  const medicationNames = new Set<string>();
  
  // Extrai da prescrição atual
  soapData.plano?.prescricoes?.forEach(presc => {
    if (presc.medicamento && !medicationNames.has(presc.medicamento.toLowerCase())) {
      medicationNames.add(presc.medicamento.toLowerCase());
      const med = findMedicationByName(presc.medicamento);
      if (med) {
        medications.push(med);
      }
    }
  });
  
  // Extrai do texto (usando NLP básico)
  const fullText = [
    soapData.subjetivo || '',
    soapData.objetivo?.exameFisico || '',
    soapData.plano?.orientacoes?.join(' ') || '',
  ].join(' ').toLowerCase();
  
  todosMedicamentos.forEach(med => {
    if (medicationNames.has(med.nomeGenerico.toLowerCase())) return;
    
    // Verifica se o nome genérico aparece no texto
    if (fullText.includes(med.nomeGenerico.toLowerCase())) {
      medicationNames.add(med.nomeGenerico.toLowerCase());
      medications.push(med);
      return;
    }
    
    // Verifica nomes comerciais
    if (med.nomesComerciais?.some(nc => fullText.includes(nc.toLowerCase()))) {
      medicationNames.add(med.nomeGenerico.toLowerCase());
      medications.push(med);
    }
  });
  
  return medications;
}

/**
 * Analisa interações na prescrição atual do SOAP
 */
export function analyzeCurrentSOAPInteractions(
  soapData: Partial<SOAPData>
): InteractionAlert[] {
  const medications = extractMedicationsFromSOAP(soapData);
  const alerts: InteractionAlert[] = [];
  const seenInteractions = new Set<string>();
  
  // Verifica todas as combinações de medicamentos
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i];
      const med2 = medications[j];
      
      const interactions = findInteractionsBetween(med1, med2);
      
      interactions.forEach(interaction => {
        // Cria chave única para evitar duplicatas
        const key = [med1.id, med2.id].sort().join('::');
        if (seenInteractions.has(key)) return;
        seenInteractions.add(key);
        
        // Determina prioridade baseada na gravidade
        let prioridade: 'alta' | 'media' | 'baixa' = 'media';
        if (interaction.gravidade === 'contraindicada' || interaction.gravidade === 'grave') {
          prioridade = 'alta';
        } else if (interaction.gravidade === 'leve') {
          prioridade = 'baixa';
        }
        
        alerts.push({
          id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          interaction,
          contexto: 'prescricao_atual',
          prioridade,
          timestamp: new Date(),
        });
      });
    }
  }
  
  // Ordena por prioridade e gravidade
  return alerts.sort((a, b) => {
    const priorityOrder = { alta: 3, media: 2, baixa: 1 };
    const severityOrder = { contraindicada: 5, grave: 4, moderada: 3, leve: 2, desconhecida: 1 };
    
    if (priorityOrder[a.prioridade] !== priorityOrder[b.prioridade]) {
      return priorityOrder[b.prioridade] - priorityOrder[a.prioridade];
    }
    
    return severityOrder[b.interaction.gravidade] - severityOrder[a.interaction.gravidade];
  });
}

/**
 * Analisa interações considerando histórico de consultas
 */
export function analyzeInteractionsWithHistory(
  currentSOAP: Partial<SOAPData>,
  historyLimit: number = 10
): InteractionAlert[] {
  const currentAlerts = analyzeCurrentSOAPInteractions(currentSOAP);
  const historyAlerts: InteractionAlert[] = [];
  
  const history = getConsultationHistory().slice(0, historyLimit);
  
  // Extrai medicamentos do histórico
  const historicalMedications = new Set<string>();
  history.forEach(consultation => {
    consultation.soapData.plano?.prescricoes?.forEach(presc => {
      if (presc.medicamento) {
        historicalMedications.add(presc.medicamento.toLowerCase());
      }
    });
  });
  
  // Verifica interações entre medicamentos atuais e históricos
  const currentMedications = extractMedicationsFromSOAP(currentSOAP);
  
  currentMedications.forEach(currentMed => {
    historicalMedications.forEach(histMedName => {
      const histMed = findMedicationByName(histMedName);
      if (!histMed) return;
      
      const interactions = findInteractionsBetween(currentMed, histMed);
      interactions.forEach(interaction => {
        historyAlerts.push({
          id: `alert-history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          interaction,
          contexto: 'historico',
          prioridade: interaction.gravidade === 'grave' || interaction.gravidade === 'contraindicada' ? 'alta' : 'media',
          timestamp: new Date(),
        });
      });
    });
  });
  
  // Combina e remove duplicatas
  const allAlerts = [...currentAlerts, ...historyAlerts];
  const uniqueAlerts = new Map<string, InteractionAlert>();
  
  allAlerts.forEach(alert => {
    const key = `${alert.interaction.medicamento1.id}::${alert.interaction.medicamento2.id}`;
    const existing = uniqueAlerts.get(key);
    
    if (!existing || alert.prioridade === 'alta') {
      uniqueAlerts.set(key, alert);
    }
  });
  
  return Array.from(uniqueAlerts.values()).sort((a, b) => {
    const priorityOrder = { alta: 3, media: 2, baixa: 1 };
    return priorityOrder[b.prioridade] - priorityOrder[a.prioridade];
  });
}

/**
 * Obtém cor e ícone baseado na gravidade
 */
export function getInteractionSeverityStyle(gravidade: GravidadeInteracao): {
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
} {
  switch (gravidade) {
    case 'contraindicada':
      return {
        color: 'text-red-700 dark:text-red-300',
        bgColor: 'bg-red-50 dark:bg-red-950/30',
        borderColor: 'border-red-500 dark:border-red-700',
        icon: '🚫',
      };
    case 'grave':
      return {
        color: 'text-orange-700 dark:text-orange-300',
        bgColor: 'bg-orange-50 dark:bg-orange-950/30',
        borderColor: 'border-orange-500 dark:border-orange-700',
        icon: '⚠️',
      };
    case 'moderada':
      return {
        color: 'text-amber-700 dark:text-amber-300',
        bgColor: 'bg-amber-50 dark:bg-amber-950/30',
        borderColor: 'border-amber-500 dark:border-amber-700',
        icon: '⚡',
      };
    case 'leve':
      return {
        color: 'text-blue-700 dark:text-blue-300',
        bgColor: 'bg-blue-50 dark:bg-blue-950/30',
        borderColor: 'border-blue-500 dark:border-blue-700',
        icon: 'ℹ️',
      };
    default:
      return {
        color: 'text-neutral-700 dark:text-neutral-300',
        bgColor: 'bg-neutral-50 dark:bg-neutral-900/30',
        borderColor: 'border-neutral-500 dark:border-neutral-700',
        icon: '❓',
      };
  }
}

