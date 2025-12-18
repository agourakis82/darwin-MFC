/**
 * Serviço de Sincronização Offline
 * Gerencia cache local e sincronização bidirecional
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export interface SyncStatus {
  isOnline: boolean;
  lastSync: Date | null;
  pendingChanges: number;
  isSyncing: boolean;
}

export interface SyncableData {
  id: string;
  type: 'disease' | 'medication' | 'protocol' | 'soap' | 'flashcard';
  data: any;
  lastModified: Date;
  version: number;
}

/**
 * Chaves de armazenamento
 */
const STORAGE_KEYS = {
  DISEASES: '@darwin_mfc:diseases',
  MEDICATIONS: '@darwin_mfc:medications',
  PROTOCOLS: '@darwin_mfc:protocols',
  SOAP_NOTES: '@darwin_mfc:soap_notes',
  FLASHCARDS: '@darwin_mfc:flashcards',
  SYNC_STATUS: '@darwin_mfc:sync_status',
  PENDING_CHANGES: '@darwin_mfc:pending_changes',
};

/**
 * Serviço de sincronização offline
 */
export class OfflineSyncService {
  private syncListeners: Array<(status: SyncStatus) => void> = [];
  private currentStatus: SyncStatus = {
    isOnline: false,
    lastSync: null,
    pendingChanges: 0,
    isSyncing: false,
  };

  constructor() {
    this.initializeNetworkListener();
    this.loadSyncStatus();
  }

  /**
   * Inicializa listener de status de rede
   */
  private initializeNetworkListener() {
    NetInfo.addEventListener(state => {
      const wasOnline = this.currentStatus.isOnline;
      this.currentStatus.isOnline = state.isConnected ?? false;

      if (!wasOnline && this.currentStatus.isOnline) {
        // Reconectou - iniciar sincronização
        this.sync();
      }

      this.notifyListeners();
    });
  }

  /**
   * Carrega status de sincronização do storage
   */
  private async loadSyncStatus() {
    try {
      const statusJson = await AsyncStorage.getItem(STORAGE_KEYS.SYNC_STATUS);
      if (statusJson) {
        const status = JSON.parse(statusJson);
        this.currentStatus = {
          ...this.currentStatus,
          lastSync: status.lastSync ? new Date(status.lastSync) : null,
          pendingChanges: status.pendingChanges || 0,
        };
      }
    } catch (error) {
      console.error('Erro ao carregar status de sincronização:', error);
    }
  }

  /**
   * Salva status de sincronização
   */
  private async saveSyncStatus() {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SYNC_STATUS,
        JSON.stringify({
          lastSync: this.currentStatus.lastSync?.toISOString(),
          pendingChanges: this.currentStatus.pendingChanges,
        })
      );
    } catch (error) {
      console.error('Erro ao salvar status de sincronização:', error);
    }
  }

  /**
   * Adiciona listener de mudanças de status
   */
  addSyncListener(listener: (status: SyncStatus) => void) {
    this.syncListeners.push(listener);
    return () => {
      this.syncListeners = this.syncListeners.filter(l => l !== listener);
    };
  }

  /**
   * Notifica listeners
   */
  private notifyListeners() {
    this.syncListeners.forEach(listener => listener(this.currentStatus));
  }

  /**
   * Obtém status atual
   */
  getStatus(): SyncStatus {
    return { ...this.currentStatus };
  }

  /**
   * Cacheia dados localmente
   */
  async cacheData<T>(key: string, data: T[]): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Erro ao cachear dados em ${key}:`, error);
      throw error;
    }
  }

  /**
   * Carrega dados do cache
   */
  async loadCachedData<T>(key: string): Promise<T[] | null> {
    try {
      const dataJson = await AsyncStorage.getItem(key);
      if (dataJson) {
        return JSON.parse(dataJson);
      }
      return null;
    } catch (error) {
      console.error(`Erro ao carregar dados de ${key}:`, error);
      return null;
    }
  }

  /**
   * Adiciona mudança pendente
   */
  async addPendingChange(change: SyncableData): Promise<void> {
    try {
      const pending = await this.loadCachedData<SyncableData>(STORAGE_KEYS.PENDING_CHANGES) || [];
      pending.push(change);
      await this.cacheData(STORAGE_KEYS.PENDING_CHANGES, pending);
      this.currentStatus.pendingChanges = pending.length;
      await this.saveSyncStatus();
      this.notifyListeners();
    } catch (error) {
      console.error('Erro ao adicionar mudança pendente:', error);
    }
  }

  /**
   * Sincroniza dados (quando online)
   */
  async sync(): Promise<void> {
    if (!this.currentStatus.isOnline || this.currentStatus.isSyncing) {
      return;
    }

    this.currentStatus.isSyncing = true;
    this.notifyListeners();

    try {
      // Carregar mudanças pendentes
      const pending = await this.loadCachedData<SyncableData>(STORAGE_KEYS.PENDING_CHANGES) || [];

      // Sincronizar cada mudança
      for (const change of pending) {
        await this.syncChange(change);
      }

      // Limpar mudanças pendentes após sincronização bem-sucedida
      await AsyncStorage.removeItem(STORAGE_KEYS.PENDING_CHANGES);
      this.currentStatus.pendingChanges = 0;
      this.currentStatus.lastSync = new Date();
      await this.saveSyncStatus();

      // Sincronizar dados do servidor (pull)
      await this.pullUpdates();
    } catch (error) {
      console.error('Erro durante sincronização:', error);
    } finally {
      this.currentStatus.isSyncing = false;
      this.notifyListeners();
    }
  }

  /**
   * Sincroniza uma mudança específica
   */
  private async syncChange(change: SyncableData): Promise<void> {
    // TODO: Implementar chamada à API real
    // Por enquanto, apenas simula
    console.log('Sincronizando mudança:', change);
  }

  /**
   * Puxa atualizações do servidor
   */
  private async pullUpdates(): Promise<void> {
    // TODO: Implementar pull de atualizações do servidor
    console.log('Puxando atualizações do servidor...');
  }

  /**
   * Limpa cache
   */
  async clearCache(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.DISEASES,
        STORAGE_KEYS.MEDICATIONS,
        STORAGE_KEYS.PROTOCOLS,
        STORAGE_KEYS.SOAP_NOTES,
        STORAGE_KEYS.FLASHCARDS,
      ]);
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    }
  }
}

/**
 * Instância singleton
 */
export const offlineSyncService = new OfflineSyncService();

