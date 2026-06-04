'use client';

/**
 * DIAGNOSIS CLIENT COMPONENT
 * ==========================
 *
 * Client-side component for the knowledge diagnosis page.
 * Handles SOTA integration and displays the diagnostic dashboard.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useSotaStore, selectIsAuthenticated } from '../../lib/store/sotaStore';
import { sotaApi } from '../../lib/api/sota-client';
import { KnowledgeDiagnosticDashboard, RealTimeFeedback } from '../../app-components/SOTA';

// =============================================================================
// COMPONENT
// =============================================================================

export default function DiagnosisClient() {
  const t = useTranslations('sota');
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  const isAuthenticated = useSotaStore(selectIsAuthenticated);
  const authenticate = useSotaStore((state) => state.authenticate);
  const initializeStudent = useSotaStore((state) => state.initializeStudent);
  const connectionStatus = useSotaStore((state) => state.connectionStatus);

  // Initialize SOTA connection
  useEffect(() => {
    const init = async () => {
      setIsInitializing(true);
      setInitError(null);

      try {
        // Check if SOTA is enabled
        if (!sotaApi.isEnabled()) {
          setInitError(t('disabled'));
          setIsInitializing(false);
          return;
        }

        // Check if already authenticated
        if (!isAuthenticated) {
          // For demo purposes, use a mock token
          // In production, this would use the actual Darwin-MFC auth token
          const mockToken = 'demo-darwin-token';
          const success = await authenticate(mockToken);

          if (!success) {
            setInitError(t('authError'));
            setIsInitializing(false);
            return;
          }
        }

        // Initialize student profile if needed
        await initializeStudent();
        setIsInitializing(false);
      } catch (error) {
        console.error('[Diagnosis] Initialization error:', error);
        setInitError(error instanceof Error ? error.message : t('initError'));
        setIsInitializing(false);
      }
    };

    init();
  }, []);

  const handleStartPath = () => {
    router.push('/learn/adaptive');
  };

  const handleViewRecommendations = () => {
    // Scroll to recommendations or open modal
  };

  // Loading state
  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-lg font-medium">{t('diagnosis.initializing')}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {t('diagnosis.initializingDescription')}
        </p>
      </div>
    );
  }

  // Error state
  if (initError) {
    return (
      <div className="max-w-md mx-auto py-20">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">{t('diagnosis.errorTitle')}</h2>
          <p className="text-muted-foreground mb-4">{initError}</p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('diagnosis.backToLearn')}
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t('diagnosis.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/learn" className="hover:text-foreground transition-colors">
              {t('breadcrumb.learn')}
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{t('breadcrumb.diagnosis')}</li>
        </ol>
      </nav>

      {/* Main Dashboard */}
      <KnowledgeDiagnosticDashboard
        onStartPath={handleStartPath}
        onViewRecommendations={handleViewRecommendations}
      />

      {/* Real-time Feedback */}
      <RealTimeFeedback position="bottom-right" />
    </>
  );
}
