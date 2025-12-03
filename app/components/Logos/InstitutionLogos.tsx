'use client';

interface InstitutionLogosProps {
  institutions: ('SUS' | 'INCA' | 'MS' | 'SBMFC' | 'SBM' | 'FEBRASGO' | 'SBU' | 'SBCP' | 'CONITEC')[];
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'grid';
}

const institutionData = {
  SUS: {
    name: 'Sistema Único de Saúde',
    abbreviation: 'SUS',
    color: '#00A859',
    description: 'Ministério da Saúde - Brasil',
  },
  INCA: {
    name: 'Instituto Nacional de Câncer',
    abbreviation: 'INCA',
    color: '#0066CC',
    description: 'Ministério da Saúde',
  },
  MS: {
    name: 'Ministério da Saúde',
    abbreviation: 'MS',
    color: '#00A859',
    description: 'Governo Federal',
  },
  SBMFC: {
    name: 'Sociedade Brasileira de Medicina de Família e Comunidade',
    abbreviation: 'SBMFC',
    color: '#E67E22',
    description: 'Fundada em 1981',
  },
  SBM: {
    name: 'Sociedade Brasileira de Mastologia',
    abbreviation: 'SBM',
    color: '#E91E63',
    description: 'Fundada em 1959',
  },
  FEBRASGO: {
    name: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia',
    abbreviation: 'FEBRASGO',
    color: '#9C27B0',
    description: 'Fundada em 1959',
  },
  SBU: {
    name: 'Sociedade Brasileira de Urologia',
    abbreviation: 'SBU',
    color: '#2196F3',
    description: 'Fundada em 1926',
  },
  SBCP: {
    name: 'Sociedade Brasileira de Coloproctologia',
    abbreviation: 'SBCP',
    color: '#FF5722',
    description: 'Fundada em 1961',
  },
  CONITEC: {
    name: 'Comissão Nacional de Incorporação de Tecnologias no SUS',
    abbreviation: 'CONITEC',
    color: '#00A859',
    description: 'Ministério da Saúde',
  },
};

export default function InstitutionLogos({ 
  institutions, 
  size = 'md',
  layout = 'horizontal' 
}: InstitutionLogosProps) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-xs',
    md: 'w-24 h-24 text-sm',
    lg: 'w-32 h-32 text-base',
  };

  const containerClasses = layout === 'horizontal' 
    ? 'flex flex-wrap items-center gap-4 justify-center'
    : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

  return (
    <div className={containerClasses}>
      {institutions.map((inst) => {
        const data = institutionData[inst];
        return (
          <div
            key={inst}
            className="flex flex-col items-center gap-2 group cursor-pointer"
            title={data.name}
          >
            {/* Logo Badge */}
            <div
              className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center font-bold text-white shadow-lg apple-transition group-hover:scale-110`}
              style={{ backgroundColor: data.color }}
            >
              <span className="text-center px-2 leading-tight">
                {data.abbreviation}
              </span>
            </div>
            
            {/* Institution Name */}
            <div className="text-center">
              <p className="font-semibold text-sm text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#007aff] dark:group-hover:text-[#5ac8fa] apple-transition">
                {data.abbreviation}
              </p>
              <p className="text-xs text-[#86868b] max-w-[140px]">
                {data.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Component for SUS Structure Diagram
export function SUSStructureDiagram() {
  return (
    <div className="glass-strong rounded-3xl p-8 border border-[#00A859]/20">
      <h3 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-6 text-center">
        Estrutura do Sistema Único de Saúde (SUS)
      </h3>
      
      <div className="space-y-6">
        {/* Nível Federal */}
        <div className="card-base p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: '#00A859' }}>
              <span className="text-sm text-center">MS</span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                Nível Federal
              </h4>
              <p className="text-lg text-[#86868b]">
                Ministério da Saúde - Política Nacional
              </p>
            </div>
          </div>
          <ul className="space-y-2 text-base text-[#1d1d1f] dark:text-[#f5f5f7] ml-20">
            <li>• Formulação de políticas nacionais (PNAB, Programas de Rastreamento)</li>
            <li>• CONITEC - Incorporação de tecnologias</li>
            <li>• INCA - Controle do câncer</li>
            <li>• Financiamento (PAB, PREVINE Brasil)</li>
          </ul>
        </div>

        {/* Nível Estadual */}
        <div className="card-base p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: '#0066CC' }}>
              <span className="text-xs text-center">SES</span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                Nível Estadual
              </h4>
              <p className="text-lg text-[#86868b]">
                Secretarias Estaduais de Saúde
              </p>
            </div>
          </div>
          <ul className="space-y-2 text-base text-[#1d1d1f] dark:text-[#f5f5f7] ml-20">
            <li>• Coordenação regional</li>
            <li>• Regulação de atenção especializada</li>
            <li>• Distribuição de equipamentos (mamógrafos, colonoscópios)</li>
            <li>• Apoio técnico aos municípios</li>
          </ul>
        </div>

        {/* Nível Municipal */}
        <div className="card-base p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: '#E67E22' }}>
              <span className="text-xs text-center">SMS</span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                Nível Municipal
              </h4>
              <p className="text-lg text-[#86868b]">
                Secretarias Municipais de Saúde
              </p>
            </div>
          </div>
          <ul className="space-y-2 text-base text-[#1d1d1f] dark:text-[#f5f5f7] ml-20">
            <li>• Gestão da Atenção Primária (UBS, ESF)</li>
            <li>• Operacionalização dos rastreamentos</li>
            <li>• Sistemas de informação locais</li>
            <li>• Regulação de consultas e exames</li>
          </ul>
        </div>

        {/* Nível da APS */}
        <div className="card-base p-6 border-2 border-[#007aff]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg gradient-apple-blue">
              <span className="text-xs text-center">APS</span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-[#007aff] dark:text-[#5ac8fa]">
                Atenção Primária à Saúde
              </h4>
              <p className="text-lg text-[#86868b]">
                Unidades Básicas de Saúde - Medicina de Família
              </p>
            </div>
          </div>
          <ul className="space-y-2 text-base text-[#1d1d1f] dark:text-[#f5f5f7] ml-20">
            <li>• <strong>Porta de entrada preferencial do sistema</strong></li>
            <li>• Coordenação do cuidado e longitudinalidade</li>
            <li>• Rastreamento oportunístico integrado</li>
            <li>• Médico de família, enfermeiro, ACS, técnicos</li>
            <li>• <em>Ordenadora da Rede de Atenção à Saúde</em> (PNAB 2017)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

