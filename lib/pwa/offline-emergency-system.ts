// @ts-nocheck
/**
 * SISTEMA PWA OFFLINE-FIRST PARA EMERGÊNCIA
 * Sistema completo offline-first para zonas de emergência e áreas remotas
 * Otimizado para medicine de família em situações críticas
 */

export interface OfflineData {
  id: string;
  type: 'protocol' | 'medication' | 'guideline' | 'calculator' | 'emergency_contact';
  data: any;
  region: string;
  version: string;
  lastUpdated: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  size: number; // bytes
  tags: string[];
}

export interface OfflineCacheConfig {
  maxSize: number; // bytes
  priorityOrder: string[]; // tipos em ordem de prioridade
  regions: string[]; // regiões para cache
  criticalData: string[]; // IDs de dados críticos
  syncInterval: number; // minutos
  autoCleanup: boolean;
}

export interface EmergencyOfflineData {
  protocols: {
    cardiac: string[]; // IDs dos protocolos
    trauma: string[];
    sepsis: string[];
    pediatric: string[];
    obstetric: string[];
    respiratory: string[];
  };
  medications: {
    emergency: string[]; // RXCUIs críticos
    pediatric: string[];
    obstetric: string[];
  };
  guidelines: {
    brasil: string[];
    grecia: string[];
    haiti: string[];
    syria: string[];
  };
  calculators: string[]; // IDs das calculadoras
  emergency_contacts: {
    brasil: string[];
    grecia: string[];
    haiti: string[];
    syria: string[];
  };
}

export interface ConnectivityStatus {
  isOnline: boolean;
  connectionType: 'wifi' | 'cellular' | 'ethernet' | 'unknown';
  effectiveType: '4g' | '3g' | '2g' | 'slow-2g' | 'unknown';
  downlink: number; // Mbps
  rtt: number; // ms
  saveData: boolean;
  lastSync: Date | null;
  pendingSync: number;
}

export interface SyncStatus {
  isSyncing: boolean;
  progress: number; // 0-100
  currentItem: string;
  estimatedTime: number; // segundos restantes
  errors: string[];
  successCount: number;
  lastSyncTime: Date | null;
}

// CONFIGURAÇÃO PADRÃO PARA EMERGÊNCIA
export const DEFAULT_OFFLINE_CONFIG: OfflineCacheConfig = {
  maxSize: 500 * 1024 * 1024, // 500MB
  priorityOrder: [
    'emergency_contact',
    'protocol',
    'medication', 
    'guideline',
    'calculator'
  ],
  regions: ['brasil', 'grecia', 'haiti', 'syria'],
  criticalData: [
    'cardiac-arrest-001',
    'trauma-abcde-001',
    'sepsis-recognition-001',
    'pediatric-dehydration-001',
    'obstetric-eclampsia-001'
  ],
  syncInterval: 60, // 1 hora
  autoCleanup: true
};

// DADOS CRÍTICOS PARA EMERGÊNCIA
export const EMERGENCY_OFFLINE_DATA: EmergencyOfflineData = {
  protocols: {
    cardiac: [
      'cardiac-arrest-001',
      'acute-myocardial-infarction-001',
      'cardiac-arrhythmia-001'
    ],
    trauma: [
      'trauma-abcde-001',
      'traumatic-brain-injury-001',
      'spinal-injury-001'
    ],
    sepsis: [
      'sepsis-recognition-001',
      'septic-shock-001',
      'severe-infection-001'
    ],
    pediatric: [
      'pediatric-dehydration-001',
      'pediatric-fever-001',
      'pediatric-seizure-001'
    ],
    obstetric: [
      'obstetric-eclampsia-001',
      'obstetric-hemorrhage-001',
      'obstetric-pregnancy-001'
    ],
    respiratory: [
      'respiratory-failure-001',
      'asthma-exacerbation-001',
      'copd-exacerbation-001'
    ]
  },
  medications: {
    emergency: [
      '314422', // Adrenalina
      '3115',   // Amiodarona
      '5640',   // Paracetamol
      '8601',   // Omeprazol
      '1191'    // Insulina
    ],
    pediatric: [
      'paracetamol-pediatric',
      'ibuprofen-pediatric',
      'amoxicillin-pediatric'
    ],
    obstetric: [
      'magnesium-sulfate',
      'labetalol',
      'oxytocin'
    ]
  },
  guidelines: {
    brasil: [
      'sus-prenatal-protocol',
      'sus-emergency-protocol',
      'sus-pediatric-protocol'
    ],
    grecia: [
      'grecia-cardiac-protocol',
      'grecia-emergency-protocol'
    ],
    haiti: [
      'haiti-conflict-medicine',
      'haiti-emergency-protocol'
    ],
    syria: [
      'syria-war-medicine',
      'syria-emergency-protocol'
    ]
  },
  calculators: [
    'pediatric-dosing',
    'clearance-calculator',
    'emergency-dosing',
    'dehydration-calculator'
  ],
  emergency_contacts: {
    brasil: ['192-samu', '193-bombeiros', '190-policia'],
    grecia: ['166-ekab', '199-fire'],
    haiti: ['118-police'],
    syria: ['110-civil-defence', '114-red-crescent']
  }
};

// GERENCIADOR PRINCIPAL OFFLINE
export class OfflineEmergencyManager {
  private config: OfflineCacheConfig;
  private db: IDBDatabase | null = null;
  private serviceWorker: ServiceWorker | null = null;
  private connectivityStatus: ConnectivityStatus;
  private syncStatus: SyncStatus;
  private isInitialized = false;

  constructor(config: OfflineCacheConfig = DEFAULT_OFFLINE_CONFIG) {
    this.config = config;
    this.connectivityStatus = {
      isOnline: navigator.onLine,
      connectionType: 'unknown',
      effectiveType: 'unknown',
      downlink: 0,
      rtt: 0,
      saveData: false,
      lastSync: null,
      pendingSync: 0
    };
    this.syncStatus = {
      isSyncing: false,
      progress: 0,
      currentItem: '',
      estimatedTime: 0,
      errors: [],
      successCount: 0,
      lastSyncTime: null
    };

    this.setupConnectivityListeners();
    this.setupServiceWorker();
  }

  /**
   * Inicializa o sistema offline
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Abrir IndexedDB
      await this.openIndexedDB();
      
      // Registrar Service Worker
      await this.registerServiceWorker();
      
      // Carregar dados críticos
      await this.loadCriticalData();
      
      // Configurar sincronização periódica
      this.setupPeriodicSync();
      
      this.isInitialized = true;
      console.log('Sistema offline-first inicializado com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar sistema offline:', error);
      throw error;
    }
  }

  /**
   * Abre IndexedDB para armazenamento local
   */
  private async openIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('DarwinMFCEmergency', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Criar object stores
        if (!db.objectStoreNames.contains('offlineData')) {
          const store = db.createObjectStore('offlineData', { keyPath: 'id' });
          store.createIndex('type', 'type', { unique: false });
          store.createIndex('region', 'region', { unique: false });
          store.createIndex('priority', 'priority', { unique: false });
          store.createIndex('lastUpdated', 'lastUpdated', { unique: false });
        }

        if (!db.objectStoreNames.contains('syncQueue')) {
          db.createObjectStore('syncQueue', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'key' });
        }
      };
    });
  }

  /**
   * Registra Service Worker para cache offline
   */
  private async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        this.serviceWorker = registration.active;
        console.log('Service Worker registrado com sucesso');
      } catch (error) {
        console.error('Erro ao registrar Service Worker:', error);
      }
    }
  }

  /**
   * Carrega dados críticos para funcionamento offline
   */
  private async loadCriticalData(): Promise<void> {
    const criticalItems: OfflineData[] = [];

    // Carregar protocolos de emergência
    for (const category of Object.keys(EMERGENCY_OFFLINE_DATA.protocols)) {
      const protocolIds = EMERGENCY_OFFLINE_DATA.protocols[category as keyof typeof EMERGENCY_OFFLINE_DATA.protocols];
      for (const protocolId of protocolIds) {
        criticalItems.push({
          id: `protocol-${protocolId}`,
          type: 'protocol',
          data: await this.fetchProtocolData(protocolId),
          region: 'all',
          version: '1.0.0',
          lastUpdated: new Date(),
          priority: 'critical',
          size: 1024,
          tags: ['emergency', category]
        });
      }
    }

    // Carregar medicamentos de emergência
    for (const rxcui of EMERGENCY_OFFLINE_DATA.medications.emergency) {
      criticalItems.push({
        id: `medication-${rxcui}`,
        type: 'medication',
        data: await this.fetchMedicationData(rxcui),
        region: 'all',
        version: '1.0.0',
        lastUpdated: new Date(),
        priority: 'critical',
        size: 512,
        tags: ['medication', 'emergency']
      });
    }

    // Salvar no IndexedDB
    await this.saveOfflineData(criticalItems);
  }

  /**
   * Busca dados de protocolo (simulado)
   */
  private async fetchProtocolData(protocolId: string): Promise<any> {
    // Em produção, buscaria de API ou arquivos estáticos
    return {
      id: protocolId,
      name: `Protocolo ${protocolId}`,
      steps: [],
      regionalAdaptations: []
    };
  }

  /**
   * Busca dados de medicamento (simulado)
   */
  private async fetchMedicationData(rxcui: string): Promise<any> {
    // Em produção, buscaria de API ou arquivos estáticos
    return {
      rxcui,
      name: `Medicamento ${rxcui}`,
      dosage: 'Conforme necessário',
      contraindications: []
    };
  }

  /**
   * Salva dados offline no IndexedDB
   */
  private async saveOfflineData(items: OfflineData[]): Promise<void> {
    if (!this.db) throw new Error('IndexedDB não inicializado');

    const transaction = this.db.transaction(['offlineData'], 'readwrite');
    const store = transaction.objectStore('offlineData');

    for (const item of items) {
      await new Promise<void>((resolve, reject) => {
        const request = store.put(item);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
  }

  /**
   * Configura listeners de conectividade
   */
  private setupConnectivityListeners(): void {
    const updateStatus = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      
      this.connectivityStatus = {
        isOnline: navigator.onLine,
        connectionType: connection?.type || 'unknown',
        effectiveType: connection?.effectiveType || 'unknown',
        downlink: connection?.downlink || 0,
        rtt: connection?.rtt || 0,
        saveData: connection?.saveData || false,
        lastSync: this.connectivityStatus.lastSync,
        pendingSync: this.connectivityStatus.pendingSync
      };

      if (this.connectivityStatus.isOnline && this.connectivityStatus.pendingSync > 0) {
        this.syncPendingData();
      }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    
    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', updateStatus);
    }

    updateStatus();
  }

  /**
   * Configura sincronização periódica
   */
  private setupPeriodicSync(): void {
    setInterval(() => {
      if (this.connectivityStatus.isOnline) {
        this.syncPendingData();
      }
    }, this.config.syncInterval * 60 * 1000);
  }

  /**
   * Configura Service Worker
   */
  private setupServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'CACHE_UPDATED') {
          console.log('Cache atualizado via Service Worker');
        }
      });
    }
  }

  /**
   * Sincroniza dados pendentes
   */
  async syncPendingData(): Promise<void> {
    if (this.syncStatus.isSyncing || !this.connectivityStatus.isOnline) {
      return;
    }

    this.syncStatus.isSyncing = true;
    this.syncStatus.progress = 0;
    this.syncStatus.errors = [];
    this.syncStatus.successCount = 0;

    try {
      // Buscar dados pendentes do IndexedDB
      const pendingItems = await this.getPendingSyncItems();
      
      for (let i = 0; i < pendingItems.length; i++) {
        const item = pendingItems[i];
        this.syncStatus.currentItem = item.id;
        this.syncStatus.progress = (i / pendingItems.length) * 100;

        try {
          await this.syncItem(item);
          this.syncStatus.successCount++;
        } catch (error) {
          this.syncStatus.errors.push(`${item.id}: ${error}`);
        }
      }

      this.syncStatus.lastSyncTime = new Date();
      this.connectivityStatus.lastSync = new Date();
      this.connectivityStatus.pendingSync = 0;

    } catch (error) {
      console.error('Erro durante sincronização:', error);
    } finally {
      this.syncStatus.isSyncing = false;
    }
  }

  /**
   * Busca itens pendentes de sincronização
   */
  private async getPendingSyncItems(): Promise<any[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['syncQueue'], 'readonly');
      const store = transaction.objectStore('syncQueue');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Sincroniza item individual
   */
  private async syncItem(item: any): Promise<void> {
    // Implementação de sincronização
    // Em produção, faria PUT/POST para APIs
    console.log(`Sincronizando item: ${item.id}`);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  /**
   * Busca dados offline
   */
  async getOfflineData(id: string): Promise<any> {
    if (!this.db) throw new Error('IndexedDB não inicializado');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['offlineData'], 'readonly');
      const store = transaction.objectStore('offlineData');
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result?.data || null);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Verifica se dados estão disponíveis offline
   */
  async isDataAvailableOffline(id: string): Promise<boolean> {
    try {
      const data = await this.getOfflineData(id);
      return data !== null;
    } catch {
      return false;
    }
  }

  /**
   * Limpa cache quando necessário
   */
  async cleanupCache(): Promise<void> {
    if (!this.config.autoCleanup || !this.db) return;

    // Implementar limpeza baseada em LRU ou prioridade
    console.log('Limpando cache...');
  }

  /**
   * Obtém status de conectividade
   */
  getConnectivityStatus(): ConnectivityStatus {
    return { ...this.connectivityStatus };
  }

  /**
   * Obtém status de sincronização
   */
  getSyncStatus(): SyncStatus {
    return { ...this.syncStatus };
  }

  /**
   * Força sincronização manual
   */
  async forceSync(): Promise<void> {
    if (this.connectivityStatus.isOnline) {
      await this.syncPendingData();
    } else {
      throw new Error('Sem conectividade para sincronização');
    }
  }

  /**
   * Obtém estatísticas do cache
   */
  async getCacheStats(): Promise<{
    totalItems: number;
    totalSize: number;
    criticalItems: number;
    lastSync: Date | null;
  }> {
    if (!this.db) {
      return { totalItems: 0, totalSize: 0, criticalItems: 0, lastSync: null };
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['offlineData'], 'readonly');
      const store = transaction.objectStore('offlineData');
      const request = store.getAll();

      request.onsuccess = () => {
        const items = request.result as OfflineData[];
        const totalItems = items.length;
        const totalSize = items.reduce((sum, item) => sum + item.size, 0);
        const criticalItems = items.filter(item => item.priority === 'critical').length;

        resolve({
          totalItems,
          totalSize,
          criticalItems,
          lastSync: this.connectivityStatus.lastSync
        });
      };

      request.onerror = () => reject(request.error);
    });
  }
}

// Instância global
export const offlineEmergencyManager = new OfflineEmergencyManager();

// Export para compatibilidade
export default offlineEmergencyManager;