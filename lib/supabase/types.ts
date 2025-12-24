/**
 * SUPABASE DATABASE TYPES
 * ========================
 *
 * TypeScript types for Darwin-MFC Supabase database
 * Auto-generated from schema, then manually refined
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          specialty: string | null;
          country: string | null;
          institution: string | null;
          role: 'user' | 'verified' | 'moderator' | 'admin';
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          specialty?: string | null;
          country?: string | null;
          institution?: string | null;
          role?: 'user' | 'verified' | 'moderator' | 'admin';
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          specialty?: string | null;
          country?: string | null;
          institution?: string | null;
          role?: 'user' | 'verified' | 'moderator' | 'admin';
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          user_id: string;
          theme: 'light' | 'dark';
          language: 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi';
          content_mode: 'descriptive' | 'critical_analysis';
          notifications_enabled: boolean;
          email_notifications: boolean;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          theme?: 'light' | 'dark';
          language?: 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi';
          content_mode?: 'descriptive' | 'critical_analysis';
          notifications_enabled?: boolean;
          email_notifications?: boolean;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          theme?: 'light' | 'dark';
          language?: 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi';
          content_mode?: 'descriptive' | 'critical_analysis';
          notifications_enabled?: boolean;
          email_notifications?: boolean;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          entity_type: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'learning_path' | 'module';
          entity_id: string;
          progress: number;
          completed: boolean;
          completed_at: string | null;
          last_accessed_at: string;
          time_spent_seconds: number;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          entity_type: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'learning_path' | 'module';
          entity_id: string;
          progress?: number;
          completed?: boolean;
          completed_at?: string | null;
          last_accessed_at?: string;
          time_spent_seconds?: number;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          entity_type?: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'learning_path' | 'module';
          entity_id?: string;
          progress?: number;
          completed?: boolean;
          completed_at?: string | null;
          last_accessed_at?: string;
          time_spent_seconds?: number;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          entity_type: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'article';
          entity_id: string;
          notes: string | null;
          tags: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          entity_type: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'article';
          entity_id: string;
          notes?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          entity_type?: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'article';
          entity_id?: string;
          notes?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          entity_type: 'disease' | 'medication' | 'protocol' | 'case' | 'patient' | 'general';
          entity_id: string | null;
          title: string | null;
          content: string;
          tags: string[] | null;
          is_private: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          entity_type: 'disease' | 'medication' | 'protocol' | 'case' | 'patient' | 'general';
          entity_id?: string | null;
          title?: string | null;
          content: string;
          tags?: string[] | null;
          is_private?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          entity_type?: 'disease' | 'medication' | 'protocol' | 'case' | 'patient' | 'general';
          entity_id?: string | null;
          title?: string | null;
          content?: string;
          tags?: string[] | null;
          is_private?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      learning_progress: {
        Row: {
          id: string;
          user_id: string;
          path_id: string;
          module_id: string | null;
          score: number | null;
          attempts: number;
          time_spent_seconds: number;
          completed: boolean;
          completed_at: string | null;
          last_quiz_score: number | null;
          quiz_history: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          path_id: string;
          module_id?: string | null;
          score?: number | null;
          attempts?: number;
          time_spent_seconds?: number;
          completed?: boolean;
          completed_at?: string | null;
          last_quiz_score?: number | null;
          quiz_history?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          path_id?: string;
          module_id?: string | null;
          score?: number | null;
          attempts?: number;
          time_spent_seconds?: number;
          completed?: boolean;
          completed_at?: string | null;
          last_quiz_score?: number | null;
          quiz_history?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          quiz_id: string;
          module_id: string | null;
          score: number;
          answers: Json;
          time_taken_seconds: number | null;
          passed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          quiz_id: string;
          module_id?: string | null;
          score: number;
          answers: Json;
          time_taken_seconds?: number | null;
          passed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          quiz_id?: string;
          module_id?: string | null;
          score?: number;
          answers?: Json;
          time_taken_seconds?: number | null;
          passed?: boolean;
          created_at?: string;
        };
      };
      user_xp: {
        Row: {
          user_id: string;
          total_xp: number;
          level: number;
          current_streak: number;
          longest_streak: number;
          last_activity_date: string | null;
          daily_goal_met_count: number;
          weekly_goal_met_count: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          total_xp?: number;
          level?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
          daily_goal_met_count?: number;
          weekly_goal_met_count?: number;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          total_xp?: number;
          level?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
          daily_goal_met_count?: number;
          weekly_goal_met_count?: number;
          updated_at?: string;
        };
      };
      xp_transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          reason: string;
          entity_type: string | null;
          entity_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          reason: string;
          entity_type?: string | null;
          entity_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          reason?: string;
          entity_type?: string | null;
          entity_id?: string | null;
          created_at?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          icon: string | null;
          category: 'learning' | 'practice' | 'community' | 'milestone' | 'special' | null;
          criteria: Json;
          xp_reward: number;
          rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          icon?: string | null;
          category?: 'learning' | 'practice' | 'community' | 'milestone' | 'special' | null;
          criteria: Json;
          xp_reward?: number;
          rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          icon?: string | null;
          category?: 'learning' | 'practice' | 'community' | 'milestone' | 'special' | null;
          criteria?: Json;
          xp_reward?: number;
          rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | null;
          created_at?: string;
        };
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          earned_at: string;
          metadata: Json;
        };
        Insert: {
          id?: string;
          user_id: string;
          badge_id: string;
          earned_at?: string;
          metadata?: Json;
        };
        Update: {
          id?: string;
          user_id?: string;
          badge_id?: string;
          earned_at?: string;
          metadata?: Json;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          progress: number;
          target: number;
          completed: boolean;
          completed_at: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          progress?: number;
          target: number;
          completed?: boolean;
          completed_at?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_id?: string;
          progress?: number;
          target?: number;
          completed?: boolean;
          completed_at?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      shared_cases: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          specialty: string | null;
          difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' | null;
          case_data: Json;
          anonymized: boolean;
          published: boolean;
          verified: boolean;
          verified_by: string | null;
          upvotes: number;
          downvotes: number;
          views: number;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          specialty?: string | null;
          difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert' | null;
          case_data: Json;
          anonymized?: boolean;
          published?: boolean;
          verified?: boolean;
          verified_by?: string | null;
          upvotes?: number;
          downvotes?: number;
          views?: number;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          specialty?: string | null;
          difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert' | null;
          case_data?: Json;
          anonymized?: boolean;
          published?: boolean;
          verified?: boolean;
          verified_by?: string | null;
          upvotes?: number;
          downvotes?: number;
          views?: number;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      case_comments: {
        Row: {
          id: string;
          case_id: string;
          user_id: string;
          parent_id: string | null;
          content: string;
          upvotes: number;
          is_verified_answer: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          user_id: string;
          parent_id?: string | null;
          content: string;
          upvotes?: number;
          is_verified_answer?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          case_id?: string;
          user_id?: string;
          parent_id?: string | null;
          content?: string;
          upvotes?: number;
          is_verified_answer?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_sessions: {
        Row: {
          id: string;
          user_id: string | null;
          session_start: string;
          session_end: string | null;
          duration_seconds: number | null;
          pages_visited: string[] | null;
          actions_count: number;
          device_info: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_start?: string;
          session_end?: string | null;
          duration_seconds?: number | null;
          pages_visited?: string[] | null;
          actions_count?: number;
          device_info?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_start?: string;
          session_end?: string | null;
          duration_seconds?: number | null;
          pages_visited?: string[] | null;
          actions_count?: number;
          device_info?: Json | null;
          created_at?: string;
        };
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity_type: string | null;
          entity_id: string | null;
          metadata: Json;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      calculate_level: {
        Args: { xp: number };
        Returns: number;
      };
      award_xp: {
        Args: {
          p_user_id: string;
          p_amount: number;
          p_reason: string;
          p_entity_type?: string;
          p_entity_id?: string;
        };
        Returns: void;
      };
      update_user_streak: {
        Args: { p_user_id: string };
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
