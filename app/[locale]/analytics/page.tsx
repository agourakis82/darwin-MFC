/**
 * ANALYTICS PAGE
 * ==============
 *
 * Route: /analytics
 * Main analytics dashboard page
 */

import { Metadata } from 'next';
import AnalyticsDashboard from './AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics | Darwin-MFC',
  description: 'Painel de analytics e insights de uso da plataforma Darwin-MFC',
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
