'use client';

import { useAppStore } from '@/lib/store/appStore';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentModeWrapperProps {
  descriptiveContent: React.ReactNode;
  criticalAnalysisContent: React.ReactNode;
}

export default function ContentModeWrapper({ 
  descriptiveContent, 
  criticalAnalysisContent 
}: ContentModeWrapperProps) {
  const contentMode = useAppStore((state) => state.contentMode);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={contentMode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {contentMode === 'descriptive' ? descriptiveContent : criticalAnalysisContent}
      </motion.div>
    </AnimatePresence>
  );
}

