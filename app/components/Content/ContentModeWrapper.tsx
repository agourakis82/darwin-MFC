'use client';

import { useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store/appStore';
import { motion, AnimatePresence } from 'framer-motion';
import { PageContainer, ContentContainer } from '../Layout/Containers';

type ContainerType = 'page' | 'content' | 'none';

interface ContentModeWrapperProps {
  descriptiveContent: React.ReactNode;
  criticalAnalysisContent: React.ReactNode;
  /**
   * Container type to wrap content
   * - 'page': Use PageContainer (max-w-7xl, default padding)
   * - 'content': Use ContentContainer (max-w-5xl, narrower for articles)
   * - 'none': No container wrapper, full width
   * @default 'page'
   */
  container?: ContainerType;
  /**
   * Minimum height to prevent layout shift
   * @default 'auto'
   */
  minHeight?: string;
  /**
   * CSS class name for the wrapper
   */
  className?: string;
}

/**
 * ContentModeWrapper - Dual-mode content switcher with container support
 *
 * Features:
 * - Smooth transitions between descriptive and critical analysis modes
 * - Auto-wraps content with appropriate container (PageContainer, ContentContainer, or none)
 * - Prevents layout shift with consistent min-height
 * - Preserves scroll position when switching modes
 * - Maintains animation smoothness with Framer Motion
 *
 * Usage:
 * <ContentModeWrapper
 *   descriptiveContent={<DescriptiveView />}
 *   criticalAnalysisContent={<CriticalAnalysisView />}
 *   container="page"
 *   minHeight="min-h-screen"
 * />
 */
export default function ContentModeWrapper({
  descriptiveContent,
  criticalAnalysisContent,
  container = 'page',
  minHeight = 'auto',
  className
}: ContentModeWrapperProps) {
  const contentMode = useAppStore((state) => state.contentMode);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Preserve scroll position when switching modes
  useEffect(() => {
    if (wrapperRef.current) {
      // Scroll to top smoothly when switching modes
      wrapperRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [contentMode]);

  // Determine which content to display
  const currentContent =
    contentMode === 'descriptive' ? descriptiveContent : criticalAnalysisContent;

  // Wrap content with selected container
  const wrappedContent = (() => {
    switch (container) {
      case 'page':
        return (
          <PageContainer minHeight={minHeight} className={className}>
            {currentContent}
          </PageContainer>
        );
      case 'content':
        return (
          <ContentContainer minHeight={minHeight} className={className}>
            {currentContent}
          </ContentContainer>
        );
      case 'none':
      default:
        return (
          <div style={{ minHeight }} className={className}>
            {currentContent}
          </div>
        );
    }
  })();

  return (
    <div ref={wrapperRef} className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={contentMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {wrappedContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export type { ContentModeWrapperProps };

