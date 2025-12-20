/**
 * Utilitários para localização de protocolos
 */

import { adaptProtocol, getLocalizedGuideline } from '../i18n/protocol-localization';
import type { Locale } from '@/i18n/config';
import type { Protocolo } from '../types/protocolo';
import { todosProtocolosFlowchart } from '../data/protocolos-flowchart';

/**
 * Obtém protocolo localizado
 */
export function getLocalizedProtocol(protocolId: string, locale: Locale): Protocolo | undefined {
  const protocol = todosProtocolosFlowchart.find(p => p.id === protocolId);
  if (!protocol) return undefined;
  return adaptProtocol(protocol, locale);
}

/**
 * Obtém todos os protocolos localizados
 */
export function getAllLocalizedProtocols(locale: Locale): Protocolo[] {
  return todosProtocolosFlowchart.map(p => adaptProtocol(p, locale));
}

/**
 * Obtém nome da diretriz localizada
 */
export { getLocalizedGuideline };

