'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, ZoomIn, ExternalLink, Download } from 'lucide-react';

interface InfographicCardProps {
  src: string;
  alt: string;
  title: string;
  source: string;
  sourceUrl?: string;
  description?: string;
}

/**
 * Componente para exibir infográficos oficiais baixados do Ministério da Saúde e INCA
 */
export function InfographicCard({ src, alt, title, source, sourceUrl, description }: InfographicCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="glass-strong rounded-3xl p-6 hover:shadow-xl apple-transition group">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Imagem */}
          <div 
            className="relative lg:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top group-hover:scale-105 apple-transition"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 apple-transition flex items-center justify-center opacity-0 group-hover:opacity-100">
              <ZoomIn className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Conteúdo */}
          <div className="lg:w-2/3 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3">
                {title}
              </h3>
              {description && (
                <p className="text-base text-[#86868b] mb-4 leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-[#86868b]">
                <span className="font-medium">Fonte:</span> {source}
              </div>
              <div className="flex gap-2">
                {sourceUrl && (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 apple-transition"
                    title="Acessar fonte original"
                  >
                    <ExternalLink className="w-5 h-5 text-[#007aff]" />
                  </a>
                )}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 apple-transition"
                  title="Ampliar imagem"
                >
                  <ZoomIn className="w-5 h-5 text-[#007aff]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Zoom */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 apple-transition"
          >
            <X className="w-8 h-8 text-white" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] overflow-auto">
            <Image
              src={src}
              alt={alt}
              width={1754}
              height={6000}
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Infográfico: Sífilis no Brasil
 * Fonte: Ministério da Saúde - SVSA
 */
export function InfographicSifilis() {
  return (
    <InfographicCard
      src="/infographics/sifilis-brasil.png"
      alt="Infográfico Sífilis no Brasil - Ministério da Saúde"
      title="Sífilis no Brasil"
      source="Ministério da Saúde - SVSA (2025)"
      sourceUrl="https://www.gov.br/saude/pt-br/composicao/svsa/infograficos/sifilis.png"
      description="Representação visual sobre dados epidemiológicos, formas de transmissão, diagnóstico e prevenção da sífilis no Brasil. Dados oficiais do Sistema de Vigilância em Saúde."
    />
  );
}

/**
 * Infográfico: HPV - Vacinação e Prevenção
 * Fonte: Ministério da Saúde - SVSA
 */
export function InfographicHPV() {
  return (
    <InfographicCard
      src="/infographics/hpv-vacinacao.png"
      alt="Infográfico HPV Vacinação e Prevenção - Ministério da Saúde"
      title="HPV - Vacinação e Prevenção"
      source="Ministério da Saúde - SVSA (2025)"
      sourceUrl="https://www.gov.br/saude/pt-br/composicao/svsa/infograficos/infografico-hpv.png"
      description="Informações sobre o Papilomavírus Humano (HPV), sua relação com o câncer de colo do útero, cobertura vacinal e recomendações de prevenção. Fundamental para o contexto do rastreamento oncológico."
    />
  );
}

/**
 * Infográfico: Hanseníase - Conhecer e Cuidar
 * Fonte: Ministério da Saúde - SVSA
 */
export function InfographicHanseniase() {
  return (
    <InfographicCard
      src="/infographics/hanseniase.png"
      alt="Infográfico Hanseníase no Brasil - Ministério da Saúde"
      title="Hanseníase: Conhecer e Cuidar"
      source="Ministério da Saúde - SVSA (2025)"
      sourceUrl="https://www.gov.br/saude/pt-br/composicao/svsa/infograficos/hanseniase.png"
      description="Sinais, sintomas e prevenção da Hanseníase no Brasil. A APS é fundamental na detecção precoce e acompanhamento dos casos, sendo uma das prioridades de rastreamento em grupos de risco."
    />
  );
}

/**
 * Infográfico: Hanseníase em Números
 * Fonte: Ministério da Saúde - SVSA
 */
export function InfographicHanseniaseNumeros() {
  return (
    <InfographicCard
      src="/infographics/hanseniase-numeros.png"
      alt="Infográfico Hanseníase em Números - Ministério da Saúde"
      title="Hanseníase em Números"
      source="Ministério da Saúde - SVSA (2025)"
      sourceUrl="https://www.gov.br/saude/pt-br/composicao/svsa/infograficos/hanseniase-em-numeros.png"
      description="Dados epidemiológicos da Hanseníase no Brasil: incidência, prevalência, distribuição geográfica e indicadores de acompanhamento."
    />
  );
}

/**
 * Infográfico: Violência contra as Mulheres
 * Fonte: Ministério da Saúde - SVSA
 */
export function InfographicViolenciaMulheres() {
  return (
    <InfographicCard
      src="/infographics/violencia-mulheres.png"
      alt="Infográfico Violência contra as Mulheres - Ministério da Saúde"
      title="Violência contra as Mulheres"
      source="Ministério da Saúde - SVSA (2025)"
      sourceUrl="https://www.gov.br/saude/pt-br/composicao/svsa/infograficos/violencia-contra-as-mulheres.png"
      description="Dados sobre violência doméstica e de gênero no Brasil. A APS desempenha papel crucial no rastreamento oportunístico e notificação de casos de violência."
    />
  );
}

/**
 * Infográfico: Panorama da Dengue no Brasil
 * Fonte: Ministério da Saúde - SVSA
 */
export function InfographicDengue() {
  return (
    <InfographicCard
      src="/infographics/dengue-brasil.png"
      alt="Infográfico Panorama da Dengue no Brasil - Ministério da Saúde"
      title="Panorama da Dengue no Brasil"
      source="Ministério da Saúde - SVSA (2025)"
      sourceUrl="https://www.gov.br/saude/pt-br/composicao/svsa/infograficos/infografico-dengue.png"
      description="História, sazonalidade, sinais, sintomas e prevenção da Dengue no Brasil. Vigilância epidemiológica e papel da APS no manejo de casos."
    />
  );
}

/**
 * Infográfico: Rastreamento Câncer de Mama (INCA)
 * Fonte: INCA - Instituto Nacional de Câncer
 */
export function InfographicRastreamentoMama() {
  return (
    <InfographicCard
      src="/infographics/inca-rastreamento-mama-40-49.jpg"
      alt="Ferramenta de Apoio à Decisão no Rastreamento do Câncer de Mama - INCA"
      title="Rastreamento do Câncer de Mama (40-49 anos)"
      source="INCA - Instituto Nacional de Câncer (2023)"
      sourceUrl="https://www.inca.gov.br/publicacoes/infograficos/ferramenta-de-apoio-decisao-no-rastreamento-do-cancer-de-mama"
      description="Ferramenta oficial do INCA para apoio à decisão compartilhada no rastreamento mamográfico em mulheres de 40-49 anos. Apresenta riscos e benefícios para uso em consulta médica na APS."
    />
  );
}

/**
 * Grid de todos os infográficos oficiais
 */
export function OfficialInfographicsGrid() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 tracking-tight">
          Infográficos Oficiais
        </h2>
        <p className="text-lg text-[#86868b] max-w-3xl mx-auto">
          Materiais educativos e informativos do Ministério da Saúde e INCA, 
          com dados epidemiológicos atualizados para uso em capacitação e comunicação na APS.
        </p>
      </div>

      <div className="grid gap-8">
        <InfographicRastreamentoMama />
        <InfographicHPV />
        <InfographicSifilis />
        <InfographicHanseniase />
        <InfographicViolenciaMulheres />
      </div>
    </div>
  );
}

/**
 * Grid de infográficos para a página de Câncer
 */
export function CancerInfographicsGrid() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 tracking-tight">
          Materiais Oficiais do INCA e Ministério da Saúde
        </h2>
        <p className="text-lg text-[#86868b] max-w-3xl mx-auto">
          Infográficos oficiais para apoio à decisão clínica e comunicação com pacientes na APS.
        </p>
      </div>

      <div className="grid gap-8">
        <InfographicRastreamentoMama />
        <InfographicHPV />
      </div>
    </div>
  );
}

/**
 * Grid de infográficos para a página de Outros Rastreamentos
 */
export function OutrosInfographicsGrid() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 tracking-tight">
          Infográficos Oficiais - Outros Rastreamentos
        </h2>
        <p className="text-lg text-[#86868b] max-w-3xl mx-auto">
          Materiais do Ministério da Saúde sobre doenças e condições rastreadas na APS.
        </p>
      </div>

      <div className="grid gap-8">
        <InfographicSifilis />
        <InfographicHanseniase />
        <InfographicHanseniaseNumeros />
        <InfographicViolenciaMulheres />
        <InfographicDengue />
      </div>
    </div>
  );
}

