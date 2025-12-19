/**
 * Export/Import XML
 * Formato estruturado para intercâmbio de dados
 */

import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';

export interface XMLExportOptions {
  pretty?: boolean; // Formatação com indentação
  includeMetadata?: boolean;
  rootElement?: string; // Nome do elemento raiz
}

/**
 * Escapa caracteres XML especiais
 */
function escapeXML(text: string | number | undefined | null): string {
  if (text === null || text === undefined) return '';
  const str = String(text);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Cria elemento XML
 */
function createXMLElement(
  name: string,
  content: string | null,
  attributes: Record<string, string> = {},
  indent: string = ''
): string {
  const attrs = Object.entries(attributes)
    .map(([key, value]) => ` ${key}="${escapeXML(value)}"`)
    .join('');
  
  if (content === null || content === '') {
    return `${indent}<${name}${attrs} />`;
  }
  
  return `${indent}<${name}${attrs}>${escapeXML(content)}</${name}>`;
}

/**
 * Exporta doenças para XML
 */
export function exportDiseasesToXML(
  diseases: Partial<Doenca>[],
  options: XMLExportOptions = {}
): string {
  const indent = options.pretty ? '  ' : '';
  const rootElement = options.rootElement || 'diseases';
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  
  if (options.includeMetadata) {
    xml += createXMLElement('metadata', null, {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      source: 'Darwin-MFC',
      format: 'xml',
    }, '');
    xml += '\n';
  }
  
  xml += `<${rootElement}>\n`;
  
  diseases.forEach(disease => {
    xml += `${indent}<disease id="${escapeXML(disease.id || '')}">\n`;
    
    if (disease.titulo) {
      xml += `${indent}${indent}${createXMLElement('title', disease.titulo)}\n`;
    }
    
    if (disease.categoria) {
      xml += `${indent}${indent}${createXMLElement('category', disease.categoria)}\n`;
    }
    
    if (disease.cid10 && disease.cid10.length > 0) {
      xml += `${indent}${indent}<cid10>\n`;
      disease.cid10.forEach(cid => {
        xml += `${indent}${indent}${indent}${createXMLElement('code', cid)}\n`;
      });
      xml += `${indent}${indent}</cid10>\n`;
    }
    
    if (disease.ciap2 && disease.ciap2.length > 0) {
      xml += `${indent}${indent}<ciap2>\n`;
      disease.ciap2.forEach(ciap => {
        xml += `${indent}${indent}${indent}${createXMLElement('code', ciap)}\n`;
      });
      xml += `${indent}${indent}</ciap2>\n`;
    }
    
    if (disease.snomedCT) {
      xml += `${indent}${indent}${createXMLElement('snomedCT', disease.snomedCT)}\n`;
    }
    
    if (disease.doid) {
      xml += `${indent}${indent}${createXMLElement('doid', disease.doid)}\n`;
    }
    
    if (disease.umlsCui) {
      xml += `${indent}${indent}${createXMLElement('umlsCui', disease.umlsCui)}\n`;
    }
    
    if (disease.quickView) {
      xml += `${indent}${indent}<quickView>\n`;
      
      if (disease.quickView.definicao) {
        xml += `${indent}${indent}${indent}${createXMLElement('definicao', disease.quickView.definicao)}\n`;
      }
      
      if (disease.quickView.criteriosDiagnosticos && disease.quickView.criteriosDiagnosticos.length > 0) {
        xml += `${indent}${indent}${indent}<criteriosDiagnosticos>\n`;
        disease.quickView.criteriosDiagnosticos.forEach(criterio => {
          xml += `${indent}${indent}${indent}${indent}${createXMLElement('criterio', criterio)}\n`;
        });
        xml += `${indent}${indent}${indent}</criteriosDiagnosticos>\n`;
      }
      
      if (disease.quickView.redFlags && disease.quickView.redFlags.length > 0) {
        xml += `${indent}${indent}${indent}<redFlags>\n`;
        disease.quickView.redFlags.forEach(flag => {
          xml += `${indent}${indent}${indent}${indent}${createXMLElement('flag', flag)}\n`;
        });
        xml += `${indent}${indent}${indent}</redFlags>\n`;
      }
      
      xml += `${indent}${indent}</quickView>\n`;
    }
    
    xml += `${indent}</disease>\n`;
  });
  
  xml += `</${rootElement}>`;
  
  return xml;
}

/**
 * Exporta medicamentos para XML
 */
export function exportMedicationsToXML(
  medications: Medicamento[],
  options: XMLExportOptions = {}
): string {
  const indent = options.pretty ? '  ' : '';
  const rootElement = options.rootElement || 'medications';
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  
  if (options.includeMetadata) {
    xml += createXMLElement('metadata', null, {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      source: 'Darwin-MFC',
      format: 'xml',
    }, '');
    xml += '\n';
  }
  
  xml += `<${rootElement}>\n`;
  
  medications.forEach(med => {
    xml += `${indent}<medication id="${escapeXML(med.id || '')}">\n`;
    
    xml += `${indent}${indent}${createXMLElement('nomeGenerico', med.nomeGenerico || '')}\n`;
    
    if (med.nomesComerciais && med.nomesComerciais.length > 0) {
      xml += `${indent}${indent}<nomesComerciais>\n`;
      med.nomesComerciais.forEach(nome => {
        xml += `${indent}${indent}${indent}${createXMLElement('nome', nome)}\n`;
      });
      xml += `${indent}${indent}</nomesComerciais>\n`;
    }
    
    if (med.classeTerapeutica) {
      xml += `${indent}${indent}${createXMLElement('classeTerapeutica', med.classeTerapeutica)}\n`;
    }
    
    if (med.subclasse) {
      xml += `${indent}${indent}${createXMLElement('subclasse', med.subclasse)}\n`;
    }
    
    if (med.atcCode) {
      xml += `${indent}${indent}${createXMLElement('atcCode', med.atcCode)}\n`;
    }
    
    if (med.rxNormCui) {
      xml += `${indent}${indent}${createXMLElement('rxNormCui', med.rxNormCui)}\n`;
    }
    
    if (med.drugBankId) {
      xml += `${indent}${indent}${createXMLElement('drugBankId', med.drugBankId)}\n`;
    }
    
    if (med.snomedCT) {
      const snomedValue = Array.isArray(med.snomedCT) ? med.snomedCT.join('; ') : med.snomedCT;
      xml += `${indent}${indent}${createXMLElement('snomedCT', snomedValue)}\n`;
    }
    
    if (med.apresentacoes && med.apresentacoes.length > 0) {
      xml += `${indent}${indent}<apresentacoes>\n`;
      med.apresentacoes.forEach(ap => {
        xml += `${indent}${indent}${indent}<apresentacao>\n`;
        xml += `${indent}${indent}${indent}${indent}${createXMLElement('forma', ap.forma)}\n`;
        xml += `${indent}${indent}${indent}${indent}${createXMLElement('concentracao', ap.concentracao)}\n`;
        xml += `${indent}${indent}${indent}${indent}${createXMLElement('disponivelSUS', ap.disponivelSUS ? 'true' : 'false')}\n`;
        xml += `${indent}${indent}${indent}</apresentacao>\n`;
      });
      xml += `${indent}${indent}</apresentacoes>\n`;
    }
    
    xml += `${indent}</medication>\n`;
  });
  
  xml += `</${rootElement}>`;
  
  return xml;
}

/**
 * Importa doenças de XML (parse básico)
 */
export function importDiseasesFromXML(xmlString: string): Partial<Doenca>[] {
  // Parse XML básico usando DOMParser (browser) ou regex simples
  // Para produção, considerar usar uma biblioteca XML parser
  
  const diseases: Partial<Doenca>[] = [];
  
  // Regex simples para extrair doenças (não é parser completo, mas funcional para casos simples)
  const diseaseMatches = xmlString.matchAll(/<disease[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/disease>/g);
  
  for (const match of diseaseMatches) {
    const id = match[1];
    const content = match[2];
    
    const disease: Partial<Doenca> = {
      id,
    };
    
    // Extrai título
    const titleMatch = content.match(/<title>([^<]*)<\/title>/);
    if (titleMatch) disease.titulo = titleMatch[1];
    
    // Extrai categoria
    const categoryMatch = content.match(/<category>([^<]*)<\/category>/);
    if (categoryMatch) disease.categoria = categoryMatch[1] as any;
    
    // Extrai CID-10
    const cid10Matches = content.matchAll(/<cid10>[\s\S]*?<code>([^<]*)<\/code>[\s\S]*?<\/cid10>/g);
    const cid10Codes: string[] = [];
    for (const cidMatch of cid10Matches) {
      cid10Codes.push(cidMatch[1]);
    }
    if (cid10Codes.length > 0) disease.cid10 = cid10Codes;
    
    // Extrai CIAP-2
    const ciap2Matches = content.matchAll(/<ciap2>[\s\S]*?<code>([^<]*)<\/code>[\s\S]*?<\/ciap2>/g);
    const ciap2Codes: string[] = [];
    for (const ciapMatch of ciap2Matches) {
      ciap2Codes.push(ciapMatch[1]);
    }
    if (ciap2Codes.length > 0) disease.ciap2 = ciap2Codes;
    
    // Extrai SNOMED-CT
    const snomedMatch = content.match(/<snomedCT>([^<]*)<\/snomedCT>/);
    if (snomedMatch) disease.snomedCT = snomedMatch[1];
    
    diseases.push(disease);
  }
  
  return diseases;
}

/**
 * Importa medicamentos de XML (parse básico)
 */
export function importMedicationsFromXML(xmlString: string): Partial<Medicamento>[] {
  const medications: Partial<Medicamento>[] = [];
  
  const medicationMatches = xmlString.matchAll(/<medication[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/medication>/g);
  
  for (const match of medicationMatches) {
    const id = match[1];
    const content = match[2];
    
    const medication: Partial<Medicamento> = {
      id,
    };
    
    // Extrai nome genérico
    const nomeMatch = content.match(/<nomeGenerico>([^<]*)<\/nomeGenerico>/);
    if (nomeMatch) medication.nomeGenerico = nomeMatch[1];
    
    // Extrai classe terapêutica
    const classeMatch = content.match(/<classeTerapeutica>([^<]*)<\/classeTerapeutica>/);
    if (classeMatch) medication.classeTerapeutica = classeMatch[1] as any;
    
    // Extrai ATC Code
    const atcMatch = content.match(/<atcCode>([^<]*)<\/atcCode>/);
    if (atcMatch) medication.atcCode = atcMatch[1];
    
    medications.push(medication);
  }
  
  return medications;
}

