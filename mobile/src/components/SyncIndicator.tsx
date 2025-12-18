/**
 * Componente de Indicador de Sincronização
 * Mostra status de conexão e sincronização
 */

import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useOfflineSync } from '../hooks/useOfflineSync';

export default function SyncIndicator() {
  const { status, sync, isOnline, isSyncing, pendingChanges, lastSync } = useOfflineSync();

  const formatLastSync = (date: Date | null): string => {
    if (!date) return 'Nunca';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes} min atrás`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      {/* Status de Conexão */}
      <View style={styles.statusContainer}>
        <Text style={[styles.statusIcon, isOnline ? styles.online : styles.offline]}>
          {isOnline ? '●' : '○'}
        </Text>
        <Text style={styles.statusText}>
          {isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>

      {/* Mudanças Pendentes */}
      {pendingChanges > 0 && (
        <View style={styles.pendingContainer}>
          <Text style={styles.pendingText}>
            {pendingChanges} pendente{pendingChanges > 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* Última Sincronização */}
      <Text style={styles.lastSyncText}>
        {formatLastSync(lastSync)}
      </Text>

      {/* Botão de Sincronização */}
      {isOnline && (
        <TouchableOpacity
          onPress={sync}
          disabled={isSyncing}
          style={[styles.syncButton, isSyncing && styles.syncButtonDisabled]}
        >
          {isSyncing ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.syncButtonText}>↻</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIcon: {
    fontSize: 12,
  },
  online: {
    color: '#10b981',
  },
  offline: {
    color: '#ef4444',
  },
  statusText: {
    fontSize: 14,
    color: '#334155',
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pendingText: {
    fontSize: 14,
    color: '#f59e0b',
  },
  lastSyncText: {
    fontSize: 12,
    color: '#64748b',
  },
  syncButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },
  syncButtonDisabled: {
    opacity: 0.5,
  },
  syncButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

