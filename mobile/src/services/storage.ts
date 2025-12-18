/**
 * Serviço de Armazenamento Local
 * Abstração sobre AsyncStorage para tipos específicos
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Doenca } from '../../../lib/types/doenca';
import type { Medicamento } from '../../../lib/types/medicamento';

const STORAGE_KEYS = {
  DISEASES: '@darwin_mfc:diseases',
  MEDICATIONS: '@darwin_mfc:medications',
  PROTOCOLS: '@darwin_mfc:protocols',
  SOAP_NOTES: '@darwin_mfc:soap_notes',
  FLASHCARDS: '@darwin_mfc:flashcards',
  STUDY_PROGRESS: '@darwin_mfc:study_progress',
  USER_PREFERENCES: '@darwin_mfc:user_preferences',
};

/**
 * Serviço de armazenamento local
 */
export class StorageService {
  /**
   * Salva doenças
   */
  async saveDiseases(diseases: Partial<Doenca>[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.DISEASES, JSON.stringify(diseases));
  }

  /**
   * Carrega doenças
   */
  async loadDiseases(): Promise<Partial<Doenca>[] | null> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.DISEASES);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Salva medicamentos
   */
  async saveMedications(medications: Medicamento[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.MEDICATIONS, JSON.stringify(medications));
  }

  /**
   * Carrega medicamentos
   */
  async loadMedications(): Promise<Medicamento[] | null> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.MEDICATIONS);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Salva dados genéricos
   */
  async save<T>(key: string, data: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Carrega dados genéricos
   */
  async load<T>(key: string): Promise<T | null> {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Remove dados
   */
  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  /**
   * Limpa todo o storage
   */
  async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
}

/**
 * Instância singleton
 */
export const storageService = new StorageService();

