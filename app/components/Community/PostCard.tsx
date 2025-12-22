'use client';

/**
 * POST CARD COMPONENT
 * ===================
 *
 * Display a forum post summary in a card format.
 */

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  MessageSquare,
  Eye,
  ThumbsUp,
  Pin,
  Lock,
  FileText,
  Clock,
} from 'lucide-react';
import type { PostSummary, ForumPost } from '@/lib/types/community';

// =============================================================================
// PROPS
// =============================================================================

interface PostCardProps {
  post: ForumPost | PostSummary;
  showCategory?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function PostCard({ post, showCategory = false }: PostCardProps) {
  const t = useTranslations('community');

  const isFullPost = 'content' in post;
  const isPinned = isFullPost && (post as ForumPost).isPinned;
  const isLocked = isFullPost && (post as ForumPost).isLocked;

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return t('time.just_now');
    if (diff < 3600) return t('time.minutes_ago', { count: Math.floor(diff / 60) });
    if (diff < 86400) return t('time.hours_ago', { count: Math.floor(diff / 3600) });
    if (diff < 604800) return t('time.days_ago', { count: Math.floor(diff / 86400) });
    return date.toLocaleDateString();
  };

  return (
    <Link
      href={`/community/posts/${post.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        {/* Author avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium shrink-0">
          {post.author.displayName?.charAt(0).toUpperCase() || 'U'}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center gap-2 flex-wrap">
            {isPinned && (
              <Pin className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            {isLocked && (
              <Lock className="w-4 h-4 text-gray-400 shrink-0" />
            )}
            {post.isCase && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full shrink-0">
                <FileText className="w-3 h-3" />
                {t('case')}
              </span>
            )}
            <h3 className="font-medium text-gray-900 dark:text-white truncate">
              {post.title}
            </h3>
          </div>

          {/* Author and time */}
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <span>{post.author.displayName || post.author.username}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {getTimeAgo('lastActivity' in post ? post.lastActivity : (post as ForumPost).createdAt)}
            </span>
          </div>

          {/* Excerpt */}
          {'excerpt' in post && post.excerpt && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {post.replyCount} {t('replies')}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.viewCount} {t('views')}
            </span>
            {isFullPost && (
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {(post as ForumPost).upvoteCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
