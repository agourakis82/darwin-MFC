'use client';

import { Link } from '@/i18n/routing';
import { PageContainer } from '@/app/components/Layout/Containers';
import {
  Heart, Users, Scale, Building2, Map, MessageSquare,
  ChevronRight, BookOpen, Shield, Target, Layers, Network,
  Stethoscope, Home, RefreshCw, FileText
} from 'lucide-react';

export default function SUSPage() {
  return (
    <PageContainer className="py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
              Sistema Único de Saúde
            </h1>
            <p className="text-lg text-[#86868b]">
              Fundamentos, Princípios e Organização da APS no Brasil
            </p>
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-6 border border-green-500/30">
          <p className="text-base text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
            O <strong>Sistema Único de Saúde (SUS)</strong> é o sistema público de saúde brasileiro, criado pela Constituição Federal de 1988. 
            Fundamenta-se nos princípios de <strong>universalidade, equidade e integralidade</strong>, organizando-se de forma 
            <strong> descentralizada, regionalizada e com participação social</strong>.
          </p>
        </div>
      </div>

      {/* Princípios Doutrinários */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-8 flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500" />
          Princípios Doutrinários
        </h2>
        <p className="text-[#86868b] mb-6">
          Os três pilares fundamentais que norteiam todas as ações e serviços de saúde no SUS.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-strong rounded-2xl p-6 hover:shadow-xl transition-all border-l-4 border-blue-500">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              Universalidade
            </h3>
            <p className="text-[#86868b] text-sm leading-relaxed">
              A saúde é direito de todos e dever do Estado. Todos os cidadãos brasileiros, independentemente de 
              condição social, econômica, raça, religião ou qualquer outro fator, têm direito ao acesso às ações 
              e serviços de saúde.
            </p>
            <div className="mt-4 p-3 bg-blue-500/10 rounded-xl text-sm">
              <strong>Art. 196 CF/88:</strong> "A saúde é direito de todos e dever do Estado..."
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6 hover:shadow-xl transition-all border-l-4 border-emerald-500">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
              <Scale className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              Equidade
            </h3>
            <p className="text-[#86868b] text-sm leading-relaxed">
              Tratar desigualmente os desiguais, investindo mais onde a necessidade é maior. A equidade busca 
              diminuir as desigualdades, oferecendo mais para quem mais precisa, de acordo com as especificidades 
              de cada grupo.
            </p>
            <div className="mt-4 p-3 bg-emerald-500/10 rounded-xl text-sm">
              <strong>Conceito:</strong> Justiça distributiva adaptada às necessidades de saúde de cada indivíduo e grupo.
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6 hover:shadow-xl transition-all border-l-4 border-purple-500">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              Integralidade
            </h3>
            <p className="text-[#86868b] text-sm leading-relaxed">
              A pessoa deve ser considerada como um todo, em suas dimensões biopsicossociais. O sistema deve 
              oferecer ações de promoção, prevenção, tratamento e reabilitação de forma articulada e contínua.
            </p>
            <div className="mt-4 p-3 bg-purple-500/10 rounded-xl text-sm">
              <strong>Dimensões:</strong> Integralidade vertical (níveis de atenção) e horizontal (equipe multiprofissional).
            </div>
          </div>
        </div>
      </section>

      {/* Princípios Organizativos */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-8 flex items-center gap-3">
          <Building2 className="w-8 h-8 text-amber-500" />
          Princípios Organizativos
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-subtle rounded-2xl p-5">
            <Map className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-lg font-bold mb-2">Descentralização</h3>
            <p className="text-sm text-[#86868b]">
              Redistribuição de poder e responsabilidades entre as três esferas de governo (União, Estados, Municípios), 
              com direção única em cada esfera.
            </p>
          </div>

          <div className="glass-subtle rounded-2xl p-5">
            <Network className="w-8 h-8 text-teal-500 mb-3" />
            <h3 className="text-lg font-bold mb-2">Regionalização</h3>
            <p className="text-sm text-[#86868b]">
              Organização dos serviços em regiões de saúde para garantir integralidade e economia de escala. 
              Hierarquização por níveis de complexidade.
            </p>
          </div>

          <div className="glass-subtle rounded-2xl p-5">
            <MessageSquare className="w-8 h-8 text-pink-500 mb-3" />
            <h3 className="text-lg font-bold mb-2">Participação Social</h3>
            <p className="text-sm text-[#86868b]">
              A população participa através dos Conselhos de Saúde (permanentes) e Conferências de Saúde (periódicas), 
              garantindo o controle social das políticas de saúde.
            </p>
          </div>
        </div>
      </section>

      {/* Atributos da APS */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-8 flex items-center gap-3">
          <Stethoscope className="w-8 h-8 text-blue-600" />
          Atributos da Atenção Primária à Saúde
        </h2>
        <p className="text-[#86868b] mb-6">
          Baseado nos trabalhos de Barbara Starfield, os atributos essenciais e derivados que caracterizam uma APS de qualidade.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Atributos Essenciais */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Atributos Essenciais
            </h3>
            
            <div className="glass-strong rounded-xl p-4 border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-600 dark:text-blue-400">1. Acesso de Primeiro Contato</h4>
              <p className="text-sm text-[#86868b] mt-1">
                A APS deve ser a porta de entrada preferencial do sistema, acessível e utilizada como primeiro recurso 
                para cada novo problema de saúde.
              </p>
            </div>

            <div className="glass-strong rounded-xl p-4 border-l-4 border-emerald-500">
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400">2. Longitudinalidade</h4>
              <p className="text-sm text-[#86868b] mt-1">
                Acompanhamento do paciente ao longo do tempo, independentemente de doenças específicas. 
                Relação terapêutica duradoura com a equipe de saúde.
              </p>
            </div>

            <div className="glass-strong rounded-xl p-4 border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-600 dark:text-purple-400">3. Integralidade</h4>
              <p className="text-sm text-[#86868b] mt-1">
                Oferta de serviços que atendam às necessidades mais comuns da população, incluindo promoção, 
                prevenção, cura e reabilitação.
              </p>
            </div>

            <div className="glass-strong rounded-xl p-4 border-l-4 border-amber-500">
              <h4 className="font-bold text-amber-600 dark:text-amber-400">4. Coordenação do Cuidado</h4>
              <p className="text-sm text-[#86868b] mt-1">
                Capacidade de integrar todo cuidado recebido em outros níveis de atenção, garantindo continuidade 
                e evitando duplicação de serviços.
              </p>
            </div>
          </div>

          {/* Atributos Derivados */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-teal-500" />
              Atributos Derivados
            </h3>

            <div className="glass-strong rounded-xl p-4 border-l-4 border-teal-500">
              <h4 className="font-bold text-teal-600 dark:text-teal-400">5. Orientação Familiar</h4>
              <p className="text-sm text-[#86868b] mt-1">
                Considera o contexto familiar para avaliação das necessidades de saúde. A família como unidade de 
                cuidado e recursos.
              </p>
            </div>

            <div className="glass-strong rounded-xl p-4 border-l-4 border-pink-500">
              <h4 className="font-bold text-pink-600 dark:text-pink-400">6. Orientação Comunitária</h4>
              <p className="text-sm text-[#86868b] mt-1">
                Reconhecimento das necessidades de saúde da comunidade através de dados epidemiológicos e contato 
                direto com a população adstrita.
              </p>
            </div>

            <div className="glass-strong rounded-xl p-4 border-l-4 border-indigo-500">
              <h4 className="font-bold text-indigo-600 dark:text-indigo-400">7. Competência Cultural</h4>
              <p className="text-sm text-[#86868b] mt-1">
                Adaptação do cuidado às características culturais da população, respeitando crenças, valores e 
                comportamentos relacionados à saúde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PNAB */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-8 flex items-center gap-3">
          <FileText className="w-8 h-8 text-green-600" />
          Política Nacional de Atenção Básica (PNAB 2017)
        </h2>

        <div className="glass-strong rounded-2xl p-6 mb-6">
          <p className="text-[#86868b] leading-relaxed">
            A <strong>PNAB (Portaria nº 2.436/2017)</strong> estabelece a revisão de diretrizes para a organização 
            da Atenção Básica no âmbito do SUS. Define a Atenção Básica como o conjunto de ações de saúde individuais, 
            familiares e coletivas realizadas no primeiro nível de atenção do sistema de saúde.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-subtle rounded-2xl p-5">
            <Home className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Equipe de Saúde da Família (eSF)</h3>
            <p className="text-sm text-[#86868b] mb-3">
              Composição mínima: médico, enfermeiro, técnico/auxiliar de enfermagem, ACS.
            </p>
            <ul className="text-xs text-[#86868b] space-y-1">
              <li>• População adstrita: 2.000 a 3.500 pessoas</li>
              <li>• Carga horária mínima: 40h semanais</li>
              <li>• Território definido com adscrição</li>
            </ul>
          </div>

          <div className="glass-subtle rounded-2xl p-5">
            <Users className="w-10 h-10 text-purple-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Equipe Multiprofissional (eMulti)</h3>
            <p className="text-sm text-[#86868b] mb-3">
              Substituiu o NASF-AB. Apoio matricial às equipes de atenção básica.
            </p>
            <ul className="text-xs text-[#86868b] space-y-1">
              <li>• Psicólogo, nutricionista, fisioterapeuta</li>
              <li>• Assistente social, educador físico</li>
              <li>• Farmacêutico, fonoaudiólogo</li>
            </ul>
          </div>

          <div className="glass-subtle rounded-2xl p-5">
            <Stethoscope className="w-10 h-10 text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Atribuições do Médico de Família</h3>
            <p className="text-sm text-[#86868b] mb-3">
              Principais atribuições conforme PNAB 2017:
            </p>
            <ul className="text-xs text-[#86868b] space-y-1">
              <li>• Atendimento clínico individual e familiar</li>
              <li>• Procedimentos ambulatoriais</li>
              <li>• Visitas domiciliares</li>
              <li>• Atividades de educação em saúde</li>
              <li>• Coordenação do cuidado</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
          Navegue pelos Módulos
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/doencas" className="glass-subtle rounded-xl p-4 hover:shadow-lg transition-all group">
            <BookOpen className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="font-bold group-hover:text-blue-600">Doenças da APS</h3>
            <p className="text-xs text-[#86868b]">Condições clínicas</p>
          </Link>
          
          <Link href="/medicamentos" className="glass-subtle rounded-xl p-4 hover:shadow-lg transition-all group">
            <Shield className="w-8 h-8 text-emerald-500 mb-2" />
            <h3 className="font-bold group-hover:text-emerald-600">Bulário RENAME</h3>
            <p className="text-xs text-[#86868b]">Medicamentos essenciais</p>
          </Link>
          
          <Link href="/protocolos" className="glass-subtle rounded-xl p-4 hover:shadow-lg transition-all group">
            <FileText className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="font-bold group-hover:text-purple-600">Protocolos</h3>
            <p className="text-xs text-[#86868b]">Algoritmos de conduta</p>
          </Link>
          
          <Link href="/calculadoras" className="glass-subtle rounded-xl p-4 hover:shadow-lg transition-all group">
            <Target className="w-8 h-8 text-amber-500 mb-2" />
            <h3 className="font-bold group-hover:text-amber-600">Calculadoras</h3>
            <p className="text-xs text-[#86868b]">Ferramentas clínicas</p>
          </Link>
        </div>
      </section>

      {/* References */}
      <section className="mt-16 glass-subtle rounded-2xl p-6">
        <h3 className="font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">📚 Referências</h3>
        <ul className="text-sm text-[#86868b] space-y-2">
          <li>• Brasil. Constituição da República Federativa do Brasil de 1988. Art. 196-200.</li>
          <li>• Brasil. Lei nº 8.080/1990 - Lei Orgânica da Saúde.</li>
          <li>• Brasil. Lei nº 8.142/1990 - Participação da comunidade na gestão do SUS.</li>
          <li>• Brasil. Portaria nº 2.436/2017 - Política Nacional de Atenção Básica (PNAB).</li>
          <li>• Starfield B. Atenção Primária: equilíbrio entre necessidades de saúde, serviços e tecnologia. Brasília: MS/UNESCO, 2002.</li>
          <li>• Gusso G, Lopes JMC. Tratado de Medicina de Família e Comunidade. 3ª ed. Porto Alegre: Artmed, 2024.</li>
        </ul>
      </section>
    </PageContainer>
  );
}

