'use client';

/**
 * SOTA CONNECTION STATUS
 * ======================
 *
 * Visual indicator for SOTA backend connection status.
 */

import { Wifi, WifiOff, Loader2, AlertCircle } from 'lucide-react';
import { useSotaStore } from '../../lib/store/sotaStore';

// =============================================================================
// COMPONENT
// =============================================================================

export function SOTAConnectionStatus() {
  const connectionStatus = useSotaStore((state) => state.connectionStatus);
  const { isConnected, isWebSocketConnected, error } = connectionStatus;

  // Connection states
  if (error) {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-4 w-4" />
        <span className="text-xs">Erro</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <WifiOff className="h-4 w-4" />
        <span className="text-xs">Desconectado</span>
      </div>
    );
  }

  if (isConnected && !isWebSocketConnected) {
    return (
      <div className="flex items-center gap-2 text-yellow-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-xs">Conectando...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-500">
      <Wifi className="h-4 w-4" />
      <span className="text-xs">Conectado</span>
    </div>
  );
}

export default SOTAConnectionStatus;
