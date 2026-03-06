'use client';

import React from 'react';
import type { Protocolo } from '@/lib/types/protocolo';
import GuidedProtocolRunnerClient from './GuidedProtocolRunnerClient';

export default function GuidedFlowchartClient({ protocolo }: { protocolo: Protocolo }) {
  return <GuidedProtocolRunnerClient protocolo={protocolo} />;
}
