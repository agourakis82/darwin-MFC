/**
 * SYNC MANAGER
 * =============
 *
 * Manages bidirectional sync between local state (Zustand) and Supabase
 * Implements offline-first architecture with conflict resolution
 */

import { supabase } from '../supabase/client';
import { getUser } from '../supabase/auth';
import type { Database } from '../supabase/types';

type Tables = Database['public']['Tables'];

export interface SyncOptions {
  /**
   * Enable automatic background sync
   */
  autoSync?: boolean;

  /**
   * Sync interval in milliseconds (default: 30 seconds)
   */
  syncInterval?: number;

  /**
   * Enable offline mode
   */
  offlineMode?: boolean;
}

export interface SyncResult {
  success: boolean;
  synced: number;
  conflicts: number;
  errors: string[];
}

/**
 * Sync Manager for offline-first data synchronization
 */
export class SyncManager {
  private syncInterval?: NodeJS.Timeout;
  private options: Required<SyncOptions>;
  private isSyncing = false;

  constructor(options: SyncOptions = {}) {
    this.options = {
      autoSync: options.autoSync ?? true,
      syncInterval: options.syncInterval ?? 30000, // 30 seconds
      offlineMode: options.offlineMode ?? false,
    };

    if (this.options.autoSync) {
      this.startAutoSync();
    }
  }

  // ==============================================
  // AUTO SYNC
  // ==============================================

  /**
   * Start automatic background sync
   */
  startAutoSync() {
    if (this.syncInterval) {
      return; // Already running
    }

    this.syncInterval = setInterval(() => {
      this.syncAll();
    }, this.options.syncInterval);
  }

  /**
   * Stop automatic background sync
   */
  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = undefined;
    }
  }

  // ==============================================
  // SYNC OPERATIONS
  // ==============================================

  /**
   * Sync all user data
   */
  async syncAll(): Promise<SyncResult> {
    if (this.isSyncing) {
      return { success: false, synced: 0, conflicts: 0, errors: ['Sync already in progress'] };
    }

    this.isSyncing = true;
    const result: SyncResult = {
      success: true,
      synced: 0,
      conflicts: 0,
      errors: [],
    };

    try {
      const user = await getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Sync each data type
      await this.syncPreferences(user.id, result);
      await this.syncProgress(user.id, result);
      await this.syncFavorites(user.id, result);
      await this.syncNotes(user.id, result);
      await this.syncXP(user.id, result);

    } catch (error) {
      result.success = false;
      result.errors.push(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.isSyncing = false;
    }

    return result;
  }

  // ==============================================
  // PREFERENCES SYNC
  // ==============================================

  private async syncPreferences(userId: string, result: SyncResult) {
    try {
      // Get local preferences from Zustand store
      const localPrefs = this.getLocalPreferences();

      // Get remote preferences
      const { data: remotePrefs, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        throw error;
      }

      if (!remotePrefs) {
        // No remote data, upload local
        await this.uploadPreferences(userId, localPrefs);
        result.synced++;
      } else {
        // Merge with conflict resolution (remote wins for preferences)
        this.updateLocalPreferences(remotePrefs);
        result.synced++;
      }
    } catch (error) {
      result.errors.push(`Preferences sync failed: ${error}`);
    }
  }

  // ==============================================
  // PROGRESS SYNC
  // ==============================================

  private async syncProgress(userId: string, result: SyncResult) {
    try {
      // Get local progress
      const localProgress = this.getLocalProgress();

      // Get remote progress
      const { data: remoteProgress, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      // Merge progress (local changes override remote if more recent)
      const merged = this.mergeProgress(localProgress, remoteProgress || []);

      // Upload changed items
      for (const item of merged.toUpload) {
        await supabase
          .from('user_progress')
          .upsert({
            user_id: userId,
            ...item,
          });
        result.synced++;
      }

      // Update local with remote changes
      for (const item of merged.toUpdate) {
        this.updateLocalProgress(item);
        result.synced++;
      }

      result.conflicts += merged.conflicts;

    } catch (error) {
      result.errors.push(`Progress sync failed: ${error}`);
    }
  }

  // ==============================================
  // FAVORITES SYNC
  // ==============================================

  private async syncFavorites(userId: string, result: SyncResult) {
    try {
      const localFavorites = this.getLocalFavorites();

      const { data: remoteFavorites, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      // Simple merge: union of local and remote
      const merged = this.mergeFavorites(localFavorites, remoteFavorites || []);

      // Upload new favorites
      for (const item of merged.toUpload) {
        await supabase
          .from('favorites')
          .upsert({
            user_id: userId,
            ...item,
          });
        result.synced++;
      }

      // Update local
      for (const item of merged.toUpdate) {
        this.updateLocalFavorites(item);
        result.synced++;
      }

    } catch (error) {
      result.errors.push(`Favorites sync failed: ${error}`);
    }
  }

  // ==============================================
  // NOTES SYNC
  // ==============================================

  private async syncNotes(userId: string, result: SyncResult) {
    try {
      const localNotes = this.getLocalNotes();

      const { data: remoteNotes, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      // Merge notes (most recent wins)
      const merged = this.mergeNotes(localNotes, remoteNotes || []);

      for (const item of merged.toUpload) {
        await supabase
          .from('notes')
          .upsert({
            user_id: userId,
            ...item,
          });
        result.synced++;
      }

      for (const item of merged.toUpdate) {
        this.updateLocalNotes(item);
        result.synced++;
      }

      result.conflicts += merged.conflicts;

    } catch (error) {
      result.errors.push(`Notes sync failed: ${error}`);
    }
  }

  // ==============================================
  // XP SYNC
  // ==============================================

  private async syncXP(userId: string, result: SyncResult) {
    try {
      const { data: remoteXP, error } = await supabase
        .from('user_xp')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (remoteXP) {
        // Update local XP from remote (remote is source of truth)
        this.updateLocalXP(remoteXP);
        result.synced++;
      }

    } catch (error) {
      result.errors.push(`XP sync failed: ${error}`);
    }
  }

  // ==============================================
  // LOCAL STORAGE HELPERS
  // ==============================================

  private getLocalPreferences(): any {
    // Get from Zustand store (would integrate with actual store)
    const stored = localStorage.getItem('rastreamentos-sus-storage');
    if (!stored) return {};

    try {
      const data = JSON.parse(stored);
      return {
        theme: data.state?.theme || 'dark',
        content_mode: data.state?.contentMode || 'descriptive',
      };
    } catch {
      return {};
    }
  }

  private updateLocalPreferences(prefs: any) {
    // Update Zustand store (would integrate with actual store)
    const stored = localStorage.getItem('rastreamentos-sus-storage');
    if (!stored) return;

    try {
      const data = JSON.parse(stored);
      data.state = data.state || {};
      data.state.theme = prefs.theme;
      data.state.contentMode = prefs.content_mode;
      localStorage.setItem('rastreamentos-sus-storage', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to update local preferences:', error);
    }
  }

  private async uploadPreferences(userId: string, prefs: any) {
    await supabase
      .from('user_preferences')
      .insert({
        user_id: userId,
        theme: prefs.theme,
        content_mode: prefs.content_mode,
      });
  }

  private getLocalProgress(): any[] {
    // Placeholder: would integrate with actual progress tracking
    return [];
  }

  private updateLocalProgress(item: any) {
    // Placeholder: would update Zustand store
  }

  private getLocalFavorites(): any[] {
    const stored = localStorage.getItem('rastreamentos-sus-storage');
    if (!stored) return [];

    try {
      const data = JSON.parse(stored);
      return data.state?.favorites || [];
    } catch {
      return [];
    }
  }

  private updateLocalFavorites(item: any) {
    // Placeholder: would update Zustand store
  }

  private getLocalNotes(): any[] {
    const stored = localStorage.getItem('rastreamentos-sus-storage');
    if (!stored) return [];

    try {
      const data = JSON.parse(stored);
      const notes = data.state?.notes || {};
      return Object.entries(notes).map(([id, content]) => ({
        entity_id: id,
        content,
      }));
    } catch {
      return [];
    }
  }

  private updateLocalNotes(item: any) {
    // Placeholder: would update Zustand store
  }

  private updateLocalXP(xp: any) {
    // Placeholder: would update Zustand store with XP data
  }

  // ==============================================
  // MERGE STRATEGIES
  // ==============================================

  private mergeProgress(local: any[], remote: any[]): {
    toUpload: any[];
    toUpdate: any[];
    conflicts: number;
  } {
    const toUpload: any[] = [];
    const toUpdate: any[] = [];
    let conflicts = 0;

    // Create maps for efficient lookup
    const remoteMap = new Map(remote.map(item => [
      `${item.entity_type}:${item.entity_id}`,
      item
    ]));

    // Check local items
    for (const localItem of local) {
      const key = `${localItem.entity_type}:${localItem.entity_id}`;
      const remoteItem = remoteMap.get(key);

      if (!remoteItem) {
        toUpload.push(localItem);
      } else {
        // Compare timestamps
        const localTime = new Date(localItem.updated_at || 0).getTime();
        const remoteTime = new Date(remoteItem.updated_at || 0).getTime();

        if (localTime > remoteTime) {
          toUpload.push(localItem);
        } else if (remoteTime > localTime) {
          toUpdate.push(remoteItem);
        }
        // If equal, no action needed
      }

      remoteMap.delete(key);
    }

    // Remaining remote items are new
    for (const remoteItem of remoteMap.values()) {
      toUpdate.push(remoteItem);
    }

    return { toUpload, toUpdate, conflicts };
  }

  private mergeFavorites(local: any[], remote: any[]): {
    toUpload: any[];
    toUpdate: any[];
  } {
    const toUpload: any[] = [];
    const toUpdate: any[] = [];

    const remoteIds = new Set(remote.map(f => f.entity_id));
    const localIds = new Set(local.map(f => f.entity_id));

    // Upload local favorites not in remote
    for (const item of local) {
      if (!remoteIds.has(item.entity_id)) {
        toUpload.push(item);
      }
    }

    // Add remote favorites not in local
    for (const item of remote) {
      if (!localIds.has(item.entity_id)) {
        toUpdate.push(item);
      }
    }

    return { toUpload, toUpdate };
  }

  private mergeNotes(local: any[], remote: any[]): {
    toUpload: any[];
    toUpdate: any[];
    conflicts: number;
  } {
    // Similar to mergeProgress, use timestamps
    return this.mergeProgress(local, remote);
  }
}

// ==============================================
// SINGLETON INSTANCE
// ==============================================

let syncManagerInstance: SyncManager | null = null;

export function getSyncManager(options?: SyncOptions): SyncManager {
  if (!syncManagerInstance) {
    syncManagerInstance = new SyncManager(options);
  }
  return syncManagerInstance;
}
