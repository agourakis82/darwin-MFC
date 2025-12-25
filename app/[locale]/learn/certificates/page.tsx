'use client';

/**
 * CERTIFICATES PAGE
 * =================
 *
 * Display all user certificates with download options.
 */

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Award,
  ArrowLeft,
  Download,
  Calendar,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { useLearningStore } from '@/lib/store/learningStore';
import { getPublishedLearningPaths } from '@/lib/data/learning-paths';
import { CertificateViewer } from '@/app/components/Learning';

export default function CertificatesPage() {
  const t = useTranslations('learning');
  const { certificates } = useLearningStore();
  const allPaths = getPublishedLearningPaths();

  // Get learning path for each certificate
  const certificatesWithPaths = certificates.map((cert) => {
    const path = allPaths.find((p) => p.id === cert.learningPathId);
    return { certificate: cert, path };
  }).filter((item) => item.path !== undefined);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/learn/progress"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('progress.title')}
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t('progress.my_certificates')}</h1>
              <p className="text-yellow-100 mt-1">
                {certificates.length} {certificates.length === 1 ? 'certificado' : 'certificados'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {certificates.length === 0 ? (
          // Empty state
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('certificate.no_certificates')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {t('certificate.complete_path')}
            </p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              {t('widget.explore')}
            </Link>
          </div>
        ) : (
          // Certificates grid
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
            {certificatesWithPaths.map(({ certificate, path }) => (
              <div key={certificate.id}>
                {path && (
                  <CertificateViewer
                    certificate={certificate}
                    learningPath={path}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
