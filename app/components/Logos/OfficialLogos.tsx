'use client';

import Image from 'next/image';

/**
 * Componente de Logos Oficiais das Instituições
 * 
 * REFERÊNCIA: Manual de Identidade Visual do SUS (Versão 1.1 / abr. 2024)
 * Disponível em: /Manual de Identidade Visual - SUS - IDV.pdf
 * 
 * CORES OFICIAIS DO SUS:
 * - Azul Escuro Pantone 287C
 * - CMYK: C100 M70 Y0 K0
 * - RGB: R0 G91 B170 (#005BAA)
 * 
 * TIPOGRAFIA: Helvetica (Bold, Roman, Light) / Verdana (auxiliar)
 * 
 * Logos baixadas de fontes oficiais e SeekLogo
 */

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Logo oficial do SUS - SVG real do Wikimedia Commons
 * Fonte: https://commons.wikimedia.org/wiki/File:SUS_apenas_preenchimento.svg
 * Domínio público (Governo Brasileiro)
 */
export function LogoSUS({ size = 140, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative bg-white rounded-2xl p-4 shadow-lg flex items-center justify-center"
        style={{ width: size, height: size * 0.6 }}
      >
        <Image
          src="/logos/sus-logo.svg"
          alt="Logo do Sistema Único de Saúde - SUS"
          width={size * 0.85}
          height={size * 0.45}
          className="object-contain"
          priority
        />
      </div>
      <p className="text-sm text-[#86868b] mt-3 text-center font-medium">
        Sistema Único de Saúde
      </p>
    </div>
  );
}

/**
 * Logo do Ministério da Saúde - Estilizado com base no padrão oficial
 * Cor oficial: #005BAA (Pantone 287C)
 */
export function LogoMS({ size = 140, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative bg-[#005BAA] rounded-2xl p-5 shadow-lg flex items-center justify-center"
        style={{ width: size, height: size * 0.6 }}
      >
        <div className="text-center">
          <div className="text-white font-bold text-2xl tracking-tight">MS</div>
          <div className="text-white/90 text-[10px] mt-1 leading-tight">Ministério da<br/>Saúde</div>
        </div>
      </div>
      <p className="text-sm text-[#86868b] mt-3 text-center font-medium">
        Ministério da Saúde
      </p>
    </div>
  );
}

/**
 * Logo do INCA - Instituto Nacional de Câncer
 */
export function LogoINCA({ size = 140, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative bg-[#0066CC] rounded-2xl p-6 shadow-lg flex items-center justify-center"
        style={{ width: size, height: size * 0.7 }}
      >
        <div className="text-center">
          <div className="text-white font-bold text-3xl tracking-tight">INCA</div>
          <div className="text-white/90 text-xs mt-1">Instituto Nacional</div>
          <div className="text-white/90 text-xs">de Câncer</div>
        </div>
      </div>
      <p className="text-sm text-[#86868b] mt-3 text-center font-medium">
        Instituto Nacional de Câncer
      </p>
    </div>
  );
}

/**
 * Logo da CONITEC
 */
export function LogoCONITEC({ size = 140, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative bg-[#005BAA] rounded-2xl p-6 shadow-lg flex items-center justify-center"
        style={{ width: size, height: size * 0.7 }}
      >
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 border-3 border-white rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="text-white font-bold text-xl tracking-tight">CONITEC</div>
          <div className="text-white/80 text-[8px] mt-1 leading-tight">Comissão Nacional de<br/>Incorporação de Tecnologias</div>
        </div>
      </div>
      <p className="text-sm text-[#86868b] mt-3 text-center font-medium">
        CONITEC
      </p>
    </div>
  );
}

/**
 * Logo da SBMFC - Sociedade Brasileira de Medicina de Família e Comunidade
 */
export function LogoSBMFC({ size = 140, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-2xl p-6 shadow-lg flex items-center justify-center"
        style={{ width: size, height: size * 0.7 }}
      >
        <div className="text-center">
          {/* Ícone de casa/família */}
          <svg className="w-12 h-12 mx-auto mb-2 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5L18 10v9H6v-9l6-4.5z"/>
            <path d="M12 12a2 2 0 100 4 2 2 0 000-4z"/>
          </svg>
          <div className="text-white font-bold text-xl tracking-tight">SBMFC</div>
        </div>
      </div>
      <p className="text-sm text-[#86868b] mt-3 text-center font-medium max-w-[160px]">
        Medicina de Família e Comunidade
      </p>
    </div>
  );
}

/**
 * Logo da SBM - Sociedade Brasileira de Mastologia
 */
export function LogoSBM({ size = 140, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-2xl p-6 shadow-lg flex items-center justify-center"
        style={{ width: size, height: size * 0.7 }}
      >
        <div className="text-center">
          {/* Laço rosa */}
          <svg className="w-12 h-12 mx-auto mb-2 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div className="text-white font-bold text-2xl tracking-tight">SBM</div>
        </div>
      </div>
      <p className="text-sm text-[#86868b] mt-3 text-center font-medium">
        Sociedade Brasileira de Mastologia
      </p>
    </div>
  );
}

/**
 * Logo da FEBRASGO
 */
export function LogoFEBRASGO({ size = 140, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative bg-gradient-to-br from-[#9C27B0] to-[#7B1FA2] rounded-2xl p-6 shadow-lg flex items-center justify-center"
        style={{ width: size, height: size * 0.7 }}
      >
        <div className="text-center">
          {/* Símbolo feminino */}
          <svg className="w-12 h-12 mx-auto mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="5"/>
            <line x1="12" y1="13" x2="12" y2="21"/>
            <line x1="9" y1="18" x2="15" y2="18"/>
          </svg>
          <div className="text-white font-bold text-lg tracking-tight">FEBRASGO</div>
        </div>
      </div>
      <p className="text-sm text-[#86868b] mt-3 text-center font-medium max-w-[160px]">
        Ginecologia e Obstetrícia
      </p>
    </div>
  );
}

/**
 * Logo da SBU - Sociedade Brasileira de Urologia
 */
export function LogoSBU({ size = 140, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative bg-gradient-to-br from-[#2196F3] to-[#1976D2] rounded-2xl p-6 shadow-lg flex items-center justify-center"
        style={{ width: size, height: size * 0.7 }}
      >
        <div className="text-center">
          {/* Símbolo masculino */}
          <svg className="w-12 h-12 mx-auto mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="10" cy="14" r="5"/>
            <line x1="14" y1="10" x2="21" y2="3"/>
            <line x1="21" y1="3" x2="21" y2="9"/>
            <line x1="21" y1="3" x2="15" y2="3"/>
          </svg>
          <div className="text-white font-bold text-2xl tracking-tight">SBU</div>
        </div>
      </div>
      <p className="text-sm text-[#86868b] mt-3 text-center font-medium">
        Sociedade Brasileira de Urologia
      </p>
    </div>
  );
}

/**
 * Logo da SBCP - Sociedade Brasileira de Coloproctologia
 */
export function LogoSBCP({ size = 140, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative bg-gradient-to-br from-[#FF5722] to-[#E64A19] rounded-2xl p-6 shadow-lg flex items-center justify-center"
        style={{ width: size, height: size * 0.7 }}
      >
        <div className="text-center">
          {/* Ícone estilizado */}
          <svg className="w-12 h-12 mx-auto mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8"/>
            <path d="M4 12c2 2 4 2 6 0s4-2 6 0"/>
          </svg>
          <div className="text-white font-bold text-xl tracking-tight">SBCP</div>
        </div>
      </div>
      <p className="text-sm text-[#86868b] mt-3 text-center font-medium">
        Coloproctologia
      </p>
    </div>
  );
}

// Component Grid para exibir múltiplas logos
interface LogosGridProps {
  size?: number;
  logos: ('SUS' | 'MS' | 'INCA' | 'SBMFC' | 'SBM' | 'FEBRASGO' | 'SBU' | 'SBCP' | 'CONITEC')[];
}

export function LogosGrid({ size = 140, logos }: LogosGridProps) {
  const logoComponents: Record<string, React.ComponentType<LogoProps>> = {
    SUS: LogoSUS,
    MS: LogoMS,
    INCA: LogoINCA,
    SBMFC: LogoSBMFC,
    SBM: LogoSBM,
    FEBRASGO: LogoFEBRASGO,
    SBU: LogoSBU,
    SBCP: LogoSBCP,
    CONITEC: LogoCONITEC,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center py-8">
      {logos.map((logoName) => {
        const LogoComponent = logoComponents[logoName];
        if (!LogoComponent) return null;
        return (
          <div key={logoName} className="transform transition-all duration-300 hover:scale-105">
            <LogoComponent size={size} />
          </div>
        );
      })}
    </div>
  );
}

// Exportação default para compatibilidade
export default LogosGrid;
