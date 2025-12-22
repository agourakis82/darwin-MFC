'use client';

/**
 * CERTIFICATE VIEWER
 * ==================
 *
 * Display and download learning path certificates.
 * Generates professional PDF certificates using jsPDF.
 */

import React, { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  Calendar,
  Hash,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import type { Certificate, LearningPath } from '@/lib/types/learning';

// =============================================================================
// PROPS
// =============================================================================

interface CertificateViewerProps {
  certificate: Certificate;
  learningPath: LearningPath;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CertificateViewer({ certificate, learningPath }: CertificateViewerProps) {
  const t = useTranslations('learning.certificate');
  const tPaths = useTranslations('learning.paths');
  const [isGenerating, setIsGenerating] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Get the path title from translations
  const getPathTitle = () => {
    try {
      return tPaths(`${learningPath.id}.title`);
    } catch {
      return learningPath.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  // ==========================================================================
  // PDF GENERATION
  // ==========================================================================

  const handleDownload = useCallback(async () => {
    setIsGenerating(true);

    try {
      // Dynamic import for better code splitting
      const { jsPDF } = await import('jspdf');

      // Create landscape A4 PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;

      // Colors
      const darkBlue = [30, 58, 95] as [number, number, number];
      const gold = [201, 162, 39] as [number, number, number];
      const gray = [102, 102, 102] as [number, number, number];
      const lightGray = [153, 153, 153] as [number, number, number];

      // Background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Decorative border
      pdf.setDrawColor(...gold);
      pdf.setLineWidth(1);
      pdf.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

      // Inner decorative border
      pdf.setLineWidth(0.3);
      pdf.rect(margin + 5, margin + 5, pageWidth - margin * 2 - 10, pageHeight - margin * 2 - 10);

      // Header
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(28);
      pdf.setTextColor(...darkBlue);
      pdf.text('Darwin MFC', pageWidth / 2, 40, { align: 'center' });

      // Title
      pdf.setFontSize(36);
      pdf.setTextColor(...gold);
      pdf.text(t('title').toUpperCase(), pageWidth / 2, 55, { align: 'center' });

      // Subtitle
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(14);
      pdf.setTextColor(...gray);
      pdf.text(t('subtitle'), pageWidth / 2, 65, { align: 'center' });

      // Presented to
      pdf.setFontSize(12);
      pdf.text(t('presented_to').toUpperCase(), pageWidth / 2, 85, { align: 'center' });

      // User name
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(28);
      pdf.setTextColor(...darkBlue);
      pdf.text(certificate.userName, pageWidth / 2, 100, { align: 'center' });

      // Gold underline for name
      const nameWidth = pdf.getTextWidth(certificate.userName);
      pdf.setDrawColor(...gold);
      pdf.setLineWidth(0.8);
      pdf.line(pageWidth / 2 - nameWidth / 2, 103, pageWidth / 2 + nameWidth / 2, 103);

      // For completing
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(...gray);
      pdf.text(t('for_completing'), pageWidth / 2, 118, { align: 'center' });

      // Course name
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(...darkBlue);
      const courseName = getPathTitle();
      pdf.text(courseName, pageWidth / 2, 130, { align: 'center' });

      // Score
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(14);
      pdf.setTextColor(...gray);
      pdf.text(`${t('score')}: ${certificate.score}%`, pageWidth / 2, 145, { align: 'center' });

      // Footer section
      const footerY = pageHeight - 45;

      // Date issued
      pdf.setFontSize(9);
      pdf.setTextColor(...lightGray);
      pdf.text('DATA DE EMISSÃO', margin + 15, footerY);
      pdf.setFontSize(11);
      pdf.setTextColor(...darkBlue);
      pdf.text(formatDate(certificate.issuedAt), margin + 15, footerY + 6);

      // Verification code
      pdf.setFontSize(9);
      pdf.setTextColor(...lightGray);
      pdf.text('CÓDIGO DE VERIFICAÇÃO', pageWidth / 2, footerY, { align: 'center' });
      pdf.setFontSize(11);
      pdf.setTextColor(...darkBlue);
      pdf.text(certificate.verificationCode, pageWidth / 2, footerY + 6, { align: 'center' });

      // QR Code placeholder (in production, use a QR code library)
      const qrX = pageWidth - margin - 35;
      const qrY = footerY - 10;
      pdf.setFillColor(240, 240, 240);
      pdf.rect(qrX, qrY, 25, 25, 'F');
      pdf.setFontSize(6);
      pdf.setTextColor(...lightGray);
      pdf.text('QR CODE', qrX + 12.5, qrY + 14, { align: 'center' });

      // Disclaimer
      pdf.setFontSize(8);
      pdf.setTextColor(...lightGray);
      const disclaimer = learningPath.certification?.accreditation?.disclaimer ||
        'Este certificado é emitido pela plataforma Darwin MFC para fins educacionais.';
      pdf.text(disclaimer, pageWidth / 2, pageHeight - 20, { align: 'center' });

      // Verification URL
      pdf.setFontSize(7);
      pdf.text(`Verifique em: mfc.agourakis.med.br/verify/${certificate.verificationCode}`, pageWidth / 2, pageHeight - 15, { align: 'center' });

      // Save PDF
      pdf.save(`certificado-darwin-mfc-${learningPath.id}-${certificate.verificationCode}.pdf`);
    } catch (error) {
      console.error('Error generating certificate PDF:', error);
      alert('Erro ao gerar certificado. Por favor, tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  }, [certificate, learningPath, t, getPathTitle]);

  // ==========================================================================
  // SHARE HANDLER
  // ==========================================================================

  const handleShare = useCallback(async () => {
    const shareData = {
      title: t('share_title'),
      text: t('share_text', { course: learningPath.titleKey }),
      url: `https://mfc.agourakis.med.br/verify/${certificate.verificationCode}`,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareData.url);
      alert(t('link_copied'));
    }
  }, [certificate, learningPath, t]);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-8 text-white">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <Award className="w-10 h-10 text-yellow-400" />
        <div className="text-center">
          <h2 className="text-2xl font-bold">{t('title')}</h2>
          <p className="text-blue-200 text-sm">{t('subtitle')}</p>
        </div>
      </div>

      {/* Certificate preview */}
      <div className="bg-white rounded-xl p-6 text-gray-900 mb-6">
        {/* Logo */}
        <div className="text-center mb-4">
          <span className="text-xl font-bold text-blue-900">Darwin MFC</span>
        </div>

        {/* Recipient */}
        <div className="text-center mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {t('presented_to')}
          </p>
          <p className="text-xl font-semibold text-blue-900 border-b-2 border-yellow-500 inline-block pb-1">
            {certificate.userName}
          </p>
        </div>

        {/* Course */}
        <div className="text-center mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {t('for_completing')}
          </p>
          <p className="text-lg font-medium text-gray-800">
            {t(learningPath.titleKey.replace('learning.', ''))}
          </p>
        </div>

        {/* Score badge */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">
              {certificate.score}% {t('score')}
            </span>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(certificate.issuedAt)}
          </div>
          <div className="flex items-center gap-1">
            <Hash className="w-3 h-3" />
            {certificate.verificationCode}
          </div>
        </div>

        {/* Disclaimer */}
        {learningPath.certification?.accreditation?.disclaimer && (
          <p className="mt-4 text-xs text-gray-400 text-center">
            {learningPath.certification.accreditation.disclaimer}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isGenerating ? t('generating') : t('download')}
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          {t('share')}
        </button>
      </div>

      {/* Verify link */}
      <div className="mt-4 text-center">
        <a
          href={`/verify/${certificate.verificationCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-200 hover:text-white inline-flex items-center gap-1"
        >
          {t('verify_link')}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default CertificateViewer;
