// @ts-nocheck
/**
 * BUSCA INTELIGENTE E INDICADORES DE CONECTIVIDADE
 * Sistema de busca inteligente para emergências e indicadores de conectividade
 * Otimizado para zonas de emergência e áreas remotas
 */

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'protocol' | 'medication' | 'guideline' | 'calculator' | 'contact' | 'location';
  relevance: number;
  context: string;
  urgent: boolean;
  offlineAvailable: boolean;
  lastUsed?: Date;
  tags: string[];
}

export interface ConnectivityIndicator {
  isOnline: boolean;
  connectionType: 'wifi' | 'cellular' | 'ethernet' | 'satellite' | 'unknown';
  strength: 'excellent' | 'good' | 'fair' | 'poor' | 'none' | 'unknown';
  latency: number; // ms
  dataUsage: {
    used: number; // MB
    limit?: number; // MB
  };
  offlineMode: boolean;
  lastSync: Date | null;
  syncStatus: 'idle' | 'syncing' | 'error' | 'complete';
  pendingItems: number;
}

export interface EmergencySearchContext {
  location: string;
  specialty: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  language: string;
  resources: string[];
  offlineMode: boolean;
}

// CONFIGURAÇÃO DE CATEGORIAS DE BUSCA
export const SEARCH_CATEGORIES = {
  protocols: {
    icon: '📋',
    color: 'blue',
    priority: 'high',
    keywords: ['protocolo', 'procedimento', 'emergência', 'risco', 'crítico']
  },
  medications: {
    icon: '💊',
    color: 'green',
    priority: 'critical',
    keywords: ['medicamento', 'dose', 'contraindicação', 'interação']
  },
  guidelines: {
    icon: '📚',
    color: 'purple',
    priority: 'medium',
    keywords: ['diretriz', 'norma', 'recomendação', 'guia']
  },
  calculators: {
    icon: '🔢',
    color: 'orange',
    priority: 'high',
    keywords: ['calculadora', 'dose', 'clearance', 'score', 'avaliação']
  },
  contacts: {
    icon: '📞',
    color: 'red',
    priority: 'critical',
    keywords: ['contato', 'telefone', 'emergência', 'hospital']
  },
  locations: {
    icon: '📍',
    color: 'gray',
    priority: 'medium',
    keywords: ['localização', 'hospital', 'clínica', 'ambulatório']
  }
};

// INDICADORES DE CONECTIVIDADE EM TEMPO REAL
export class ConnectivityManager {
  private indicators: ConnectivityIndicator;
  private listeners: Array<(indicator: ConnectivityIndicator) => void> = [];
  private syncInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.indicators = this.getDefaultIndicator();
    this.setupConnectivityListeners();
    this.startMonitoring();
  }

  private getDefaultIndicator(): ConnectivityIndicator {
    return {
      isOnline: navigator.onLine,
      connectionType: 'unknown',
      strength: 'unknown',
      latency: 0,
      dataUsage: { used: 0 },
      offlineMode: false,
      lastSync: null,
      syncStatus: 'idle',
      pendingItems: 0
    };
  }

  private setupConnectivityListeners(): void {
    // Listener para mudanças de conectividade
    window.addEventListener('online', () => {
      this.updateIndicator({ isOnline: true, syncStatus: 'idle' });
    });

    window.addEventListener('offline', () => {
      this.updateIndicator({ isOnline: false, offlineMode: true, syncStatus: 'idle' });
    });

    // Monitor de conexão (Network Information API)
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateConnection = () => {
        this.updateIndicator({
          connectionType: connection.type || 'unknown',
          strength: this.mapEffectiveType(connection.effectiveType),
          latency: connection.rtt || 0
        });
      };

      connection.addEventListener('change', updateConnection);
      updateConnection();
    }
  }

  private mapEffectiveType(effectiveType: string): ConnectivityIndicator['strength'] {
    switch (effectiveType) {
      case '4g': return 'excellent';
      case '3g': return 'good';
      case '2g': return 'poor';
      case 'slow-2g': return 'poor';
      default: return 'unknown';
    }
  }

  private startMonitoring(): void {
    // Teste de conectividade a cada 30 segundos
    this.syncInterval = setInterval(() => {
      this.testConnectivity();
    }, 30000);
  }

  private async testConnectivity(): Promise<void> {
    if (!this.indicators.isOnline) return;

    const start = Date.now();
    
    try {
      // Teste de ping para servidor local
      const response = await fetch('/api/health', {
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      const latency = Date.now() - start;
      
      this.updateIndicator({
        latency,
        syncStatus: response.ok ? 'complete' : 'error'
      });
    } catch (error) {
      this.updateIndicator({
        syncStatus: 'error'
      });
    }
  }

  private updateIndicator(updates: Partial<ConnectivityIndicator>): void {
    this.indicators = { ...this.indicators, ...updates };
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.indicators));
  }

  public getIndicator(): ConnectivityIndicator {
    return { ...this.indicators };
  }

  public addListener(listener: (indicator: ConnectivityIndicator) => void): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: (indicator: ConnectivityIndicator) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  public startSync(): void {
    if (!this.indicators.isOnline) return;
    
    this.updateIndicator({ syncStatus: 'syncing' });
    
    // Simular sincronização
    setTimeout(() => {
      this.updateIndicator({ 
        syncStatus: 'complete',
        lastSync: new Date(),
        pendingItems: 0
      });
    }, 2000);
  }

  public stop(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  public getStatusSummary(): {
    status: 'online' | 'offline' | 'poor' | 'syncing';
    message: string;
    action?: string;
  } {
    if (!this.indicators.isOnline) {
      return {
        status: 'offline',
        message: 'Sistema offline - dados limitados',
        action: 'Aguardando reconexão...'
      };
    }

    if (this.indicators.syncStatus === 'syncing') {
      return {
        status: 'syncing',
        message: 'Sincronizando dados...',
        action: 'Aguarde...'
      };
    }

    if (this.indicators.strength === 'poor') {
      return {
        status: 'poor',
        message: 'Conexão lenta - funcionalidades limitadas',
        action: 'Considere usar dados móveis'
      };
    }

    return {
      status: 'online',
      message: 'Sistema online - totalmente funcional'
    };
  }
}

// SISTEMA DE BUSCA INTELIGENTE
export class EmergencySearchEngine {
  private searchIndex: Map<string, SearchResult[]> = new Map();
  private recentSearches: string[] = [];
  private favorites: string[] = [];

  constructor() {
    this.initializeSearchIndex();
  }

  private initializeSearchIndex(): void {
    // Protocolos de emergência
    const protocols: SearchResult[] = [
      {
        id: 'cardiac-arrest',
        title: 'Parada Cardiorrespiratória',
        description: 'Protocolo completo de RCP para adultos e crianças',
        category: 'protocol',
        relevance: 1.0,
        context: 'emergency',
        urgent: true,
        offlineAvailable: true,
        tags: ['rcp', 'parada', 'cardíaco', 'emergência']
      },
      {
        id: 'trauma-abcde',
        title: 'Avaliação Trauma ABCDE',
        description: 'Protocolo de avaliação primária em trauma',
        category: 'protocol',
        relevance: 0.95,
        context: 'emergency',
        urgent: true,
        offlineAvailable: true,
        tags: ['trauma', 'abcde', 'avaliação', 'emergência']
      },
      {
        id: 'sepsis-recognition',
        title: 'Reconhecimento de Sepse',
        description: 'Identificação precoce e tratamento de sepse',
        category: 'protocol',
        relevance: 0.9,
        context: 'emergency',
        urgent: true,
        offlineAvailable: true,
        tags: ['sepse', 'infecção', 'choque', 'crítico']
      }
    ];

    // Medicamentos
    const medications: SearchResult[] = [
      {
        id: 'adrenaline',
        title: 'Adrenalina (Epinefrina)',
        description: 'Doses, indicações e contraindicações',
        category: 'medication',
        relevance: 0.95,
        context: 'emergency',
        urgent: true,
        offlineAvailable: true,
        tags: ['adrenalina', 'epinefrina', 'dose', 'anafilaxia']
      },
      {
        id: 'paracetamol-pediatric',
        title: 'Paracetamol Pediátrico',
        description: 'Calculadora de doses para crianças',
        category: 'calculator',
        relevance: 0.85,
        context: 'routine',
        urgent: false,
        offlineAvailable: true,
        tags: ['paracetamol', 'pediátrico', 'febre', 'dose']
      }
    ];

    // Adicionar ao índice
    this.searchIndex.set('protocol', protocols);
    this.searchIndex.set('medication', medications);
  }

  public search(
    query: string, 
    context: EmergencySearchContext,
    limit: number = 10
  ): SearchResult[] {
    if (!query.trim()) return [];

    const normalizedQuery = query.toLowerCase().trim();
    const results: Array<SearchResult & { score: number }> = [];

    // Buscar em todas as categorias
    this.searchIndex.forEach((items, category) => {
      items.forEach(item => {
        const score = this.calculateRelevance(normalizedQuery, item, context);
        if (score > 0.3) {
          results.push({ ...item, score });
        }
      });
    });

    // Ordenar por relevância e urgência
    const sortedResults = results
      .sort((a, b) => {
        // Priorizar itens urgentes
        if (a.urgent && !b.urgent) return -1;
        if (!a.urgent && b.urgent) return 1;
        
        // Depois por relevância
        return b.score - a.score;
      })
      .slice(0, limit)
      .map(({ score, ...item }) => item);

    // Salvar busca recente
    this.addToRecentSearches(normalizedQuery);

    return sortedResults;
  }

  private calculateRelevance(
    query: string, 
    item: SearchResult, 
    context: EmergencySearchContext
  ): number {
    let score = 0;

    // Relevância do título (peso alto)
    if (item.title.toLowerCase().includes(query)) {
      score += 0.4;
    }

    // Relevância das tags (peso médio)
    const matchingTags = item.tags.filter(tag => 
      tag.toLowerCase().includes(query)
    );
    score += matchingTags.length * 0.2;

    // Relevância da descrição (peso baixo)
    if (item.description.toLowerCase().includes(query)) {
      score += 0.15;
    }

    // Contexto da situação
    if (context.urgency === 'critical' && item.urgent) {
      score += 0.2;
    }

    // Disponibilidade offline
    if (context.offlineMode && item.offlineAvailable) {
      score += 0.15;
    }

    // Especialidade médica
    if (context.specialty && item.tags.includes(context.specialty)) {
      score += 0.1;
    }

    // Usos recentes (favoritar)
    if (this.favorites.includes(item.id)) {
      score += 0.1;
    }

    return Math.min(score, 1.0);
  }

  private addToRecentSearches(query: string): void {
    this.recentSearches = [
      query,
      ...this.recentSearches.filter(q => q !== query)
    ].slice(0, 10);
  }

  public getRecentSearches(): string[] {
    return [...this.recentSearches];
  }

  public getFavorites(): SearchResult[] {
    const allItems: SearchResult[] = [];
    this.searchIndex.forEach(items => allItems.push(...items));
    
    return allItems.filter(item => this.favorites.includes(item.id));
  }

  public toggleFavorite(itemId: string): void {
    const index = this.favorites.indexOf(itemId);
    if (index >= 0) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(itemId);
    }
  }

  public getSuggestions(query: string, limit: number = 5): string[] {
    if (!query.trim()) return [];

    const suggestions: string[] = [];
    const normalizedQuery = query.toLowerCase();

    // Sugestões baseadas em buscas recentes
    this.recentSearches.forEach(search => {
      if (search.startsWith(normalizedQuery) && !suggestions.includes(search)) {
        suggestions.push(search);
      }
    });

    // Sugestões baseadas em palavras-chave populares
    const popularKeywords = [
      'parada cardíaca', 'trauma', 'sepse', 'febre', 'dor',
      'adrenalina', 'paracetamol', 'hemorragia', 'choque'
    ];

    popularKeywords.forEach(keyword => {
      if (keyword.startsWith(normalizedQuery) && !suggestions.includes(keyword)) {
        suggestions.push(keyword);
      }
    });

    return suggestions.slice(0, limit);
  }

  public getOfflineItems(): SearchResult[] {
    const offlineItems: SearchResult[] = [];
    this.searchIndex.forEach(items => {
      items.forEach(item => {
        if (item.offlineAvailable) {
          offlineItems.push(item);
        }
      });
    });
    return offlineItems;
  }

  public getUrgentItems(): SearchResult[] {
    const urgentItems: SearchResult[] = [];
    this.searchIndex.forEach(items => {
      items.forEach(item => {
        if (item.urgent) {
          urgentItems.push(item);
        }
      });
    });
    return urgentItems;
  }
}

// Gerenciadores globais
let connectivityManagerInstance: ConnectivityManager | null = null;
let emergencySearchEngineInstance: EmergencySearchEngine | null = null;

// Instâncias globais lazy-loaded
export const getConnectivityManager = (): ConnectivityManager => {
  if (!connectivityManagerInstance) {
    connectivityManagerInstance = new ConnectivityManager();
  }
  return connectivityManagerInstance;
};

export const getEmergencySearchEngine = (): EmergencySearchEngine => {
  if (!emergencySearchEngineInstance) {
    emergencySearchEngineInstance = new EmergencySearchEngine();
  }
  return emergencySearchEngineInstance;
};

// Exports
export default {
  ConnectivityManager,
  EmergencySearchEngine,
  getConnectivityManager,
  getEmergencySearchEngine,
  SEARCH_CATEGORIES
};