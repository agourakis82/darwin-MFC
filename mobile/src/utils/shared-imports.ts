/**
 * Utilitário para importar código compartilhado do web app
 * 
 * Este arquivo facilita a importação de tipos, utilitários e dados
 * compartilhados entre o app web (Next.js) e o app mobile (React Native).
 * 
 * Nota: Em um setup real, você pode usar ferramentas como:
 * - React Native Web para compartilhar componentes
 * - Babel plugins para resolver paths
 * - Monorepo com workspaces
 */

// Tipos compartilhados
export type { Doenca } from '../../../lib/types/doenca';
export type { Medicamento } from '../../../lib/types/medicamento';
export type { Protocolo } from '../../../lib/types/protocolo';
export type { CasoClinico } from '../../../lib/types/caso-clinico';

// Utilitários compartilhados (adaptados para RN quando necessário)
// export { analyzeSOAPText } from '../../../lib/utils/nlp-soap';
// export { generateDifferentialDiagnosis } from '../../../lib/utils/differential-diagnosis';
// export { checkDrugInteractions } from '../../../lib/utils/drug-interactions';

// Dados compartilhados (apenas leitura no mobile)
// export { doencasConsolidadas } from '../../../lib/data/doencas/index';
// export { todosMedicamentos } from '../../../lib/data/medicamentos/index';

/**
 * Nota sobre compartilhamento de código:
 * 
 * 1. Tipos TypeScript podem ser compartilhados diretamente
 * 2. Utilitários podem precisar de adaptação (ex: localStorage -> AsyncStorage)
 * 3. Componentes React precisam ser reescritos para React Native
 * 4. Dados estáticos podem ser compartilhados, mas devem ser cacheados no mobile
 * 
 * Estratégia recomendada:
 * - Manter tipos e interfaces no diretório `lib/types/`
 * - Adaptar utilitários para funcionar em ambos os ambientes
 * - Criar componentes específicos para mobile em `mobile/src/components/`
 * - Usar serviços de storage para cachear dados no mobile
 */

