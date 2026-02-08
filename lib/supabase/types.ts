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
          level: number;
          xp: number;
          streak_days: number;
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
          level?: number;
          xp?: number;
          streak_days?: number;
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
          level?: number;
          xp?: number;
          streak_days?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_preferences: {
        Row: {
          user_id: string;
          theme: 'light' | 'dark';
          language: 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi';
          content_mode: 'descriptive' | 'critical_analysis';
          notifications_enabled: boolean;
          email_notifications: boolean;
          view_mode: string | null;
          selected_region: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          theme?: 'light' | 'dark';
          language?: 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi';
          content_mode?: 'descriptive' | 'critical_analysis';
          notifications_enabled?: boolean;
          email_notifications?: boolean;
          view_mode?: string | null;
          selected_region?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          theme?: 'light' | 'dark';
          language?: 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi';
          content_mode?: 'descriptive' | 'critical_analysis';
          notifications_enabled?: boolean;
          email_notifications?: boolean;
          view_mode?: string | null;
          selected_region?: string | null;
          updated_at?: string;
        };
        Relationships: [];
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
        Relationships: [];
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          entity_type: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'article' | 'screening';
          entity_id: string;
          notes: string | null;
          tags: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          entity_type: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'article' | 'screening';
          entity_id: string;
          notes?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          entity_type?: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'article' | 'screening';
          entity_id?: string;
          notes?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
        Relationships: [];
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          entity_type: 'disease' | 'medication' | 'protocol' | 'case' | 'patient' | 'general' | 'screening';
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
          entity_type: 'disease' | 'medication' | 'protocol' | 'case' | 'patient' | 'general' | 'screening';
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
          entity_type?: 'disease' | 'medication' | 'protocol' | 'case' | 'patient' | 'general' | 'screening';
          entity_id?: string | null;
          title?: string | null;
          content?: string;
          tags?: string[] | null;
          is_private?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: 'user_badges_badge_id_fkey';
            columns: ['badge_id'];
            isOneToOne: false;
            referencedRelation: 'badges';
            referencedColumns: ['id'];
          }
        ];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
      };
      // =============================================================================
      // MEDICAL CONTENT TABLES (Migration 003)
      // =============================================================================
      medicamentos: {
        Row: {
          id: string;
          nome_generico: string;
          nome_comercial: string[] | null;
          classe_terapeutica: string;
          subclasse: string | null;
          mecanismo_acao: string | null;
          indicacoes: string[] | null;
          contraindicacoes: string[] | null;
          efeitos_adversos: Json | null;
          interacoes: Json | null;
          posologia: Json | null;
          farmacocinetica: Json | null;
          apresentacoes: string[] | null;
          disponivel_sus: boolean;
          disponivel_farmacia_popular: boolean;
          atc_code: string | null;
          cid10_indicacoes: string[] | null;
          ciap2_indicacoes: string[] | null;
          gestacao: string | null;
          lactacao: string | null;
          insuficiencia_renal: string | null;
          insuficiencia_hepatica: string | null;
          idoso: string | null;
          pediatrico: string | null;
          monitoramento: string[] | null;
          ajuste_dose: Json | null;
          regional_overlays: Json | null;
          referencias: Json | null;
          pharmgkb: Json | null;
          loinc: string[] | null;
          rxnorm_cui: string | null;
          drugbank_id: string | null;
          snomed_ct: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nome_generico: string;
          nome_comercial?: string[] | null;
          classe_terapeutica: string;
          subclasse?: string | null;
          mecanismo_acao?: string | null;
          indicacoes?: string[] | null;
          contraindicacoes?: string[] | null;
          efeitos_adversos?: Json | null;
          interacoes?: Json | null;
          posologia?: Json | null;
          farmacocinetica?: Json | null;
          apresentacoes?: string[] | null;
          disponivel_sus?: boolean;
          disponivel_farmacia_popular?: boolean;
          atc_code?: string | null;
          cid10_indicacoes?: string[] | null;
          ciap2_indicacoes?: string[] | null;
          gestacao?: string | null;
          lactacao?: string | null;
          insuficiencia_renal?: string | null;
          insuficiencia_hepatica?: string | null;
          idoso?: string | null;
          pediatrico?: string | null;
          monitoramento?: string[] | null;
          ajuste_dose?: Json | null;
          regional_overlays?: Json | null;
          referencias?: Json | null;
          pharmgkb?: Json | null;
          loinc?: string[] | null;
          rxnorm_cui?: string | null;
          drugbank_id?: string | null;
          snomed_ct?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome_generico?: string;
          nome_comercial?: string[] | null;
          classe_terapeutica?: string;
          subclasse?: string | null;
          mecanismo_acao?: string | null;
          indicacoes?: string[] | null;
          contraindicacoes?: string[] | null;
          efeitos_adversos?: Json | null;
          interacoes?: Json | null;
          posologia?: Json | null;
          farmacocinetica?: Json | null;
          apresentacoes?: string[] | null;
          disponivel_sus?: boolean;
          disponivel_farmacia_popular?: boolean;
          atc_code?: string | null;
          cid10_indicacoes?: string[] | null;
          ciap2_indicacoes?: string[] | null;
          gestacao?: string | null;
          lactacao?: string | null;
          insuficiencia_renal?: string | null;
          insuficiencia_hepatica?: string | null;
          idoso?: string | null;
          pediatrico?: string | null;
          monitoramento?: string[] | null;
          ajuste_dose?: Json | null;
          regional_overlays?: Json | null;
          referencias?: Json | null;
          pharmgkb?: Json | null;
          loinc?: string[] | null;
          rxnorm_cui?: string | null;
          drugbank_id?: string | null;
          snomed_ct?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      doencas: {
        Row: {
          id: string;
          nome: string;
          nome_alternativo: string[] | null;
          categoria: string;
          subcategoria: string | null;
          descricao: string | null;
          epidemiologia: Json | null;
          fisiopatologia: string | null;
          quadro_clinico: Json | null;
          diagnostico: Json | null;
          tratamento: Json | null;
          prognostico: string | null;
          prevencao: string[] | null;
          complicacoes: string[] | null;
          quando_encaminhar: string[] | null;
          cid10: string;
          ciap2: string | null;
          criterios_diagnosticos: Json | null;
          medicamentos_relacionados: string[] | null;
          protocolos_relacionados: string[] | null;
          regional_overlays: Json | null;
          referencias: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nome: string;
          nome_alternativo?: string[] | null;
          categoria: string;
          subcategoria?: string | null;
          descricao?: string | null;
          epidemiologia?: Json | null;
          fisiopatologia?: string | null;
          quadro_clinico?: Json | null;
          diagnostico?: Json | null;
          tratamento?: Json | null;
          prognostico?: string | null;
          prevencao?: string[] | null;
          complicacoes?: string[] | null;
          quando_encaminhar?: string[] | null;
          cid10: string;
          ciap2?: string | null;
          criterios_diagnosticos?: Json | null;
          medicamentos_relacionados?: string[] | null;
          protocolos_relacionados?: string[] | null;
          regional_overlays?: Json | null;
          referencias?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          nome_alternativo?: string[] | null;
          categoria?: string;
          subcategoria?: string | null;
          descricao?: string | null;
          epidemiologia?: Json | null;
          fisiopatologia?: string | null;
          quadro_clinico?: Json | null;
          diagnostico?: Json | null;
          tratamento?: Json | null;
          prognostico?: string | null;
          prevencao?: string[] | null;
          complicacoes?: string[] | null;
          quando_encaminhar?: string[] | null;
          cid10?: string;
          ciap2?: string | null;
          criterios_diagnosticos?: Json | null;
          medicamentos_relacionados?: string[] | null;
          protocolos_relacionados?: string[] | null;
          regional_overlays?: Json | null;
          referencias?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      protocolos: {
        Row: {
          id: string;
          titulo: string;
          categoria: string;
          descricao: string | null;
          condicoes: string[] | null;
          fluxograma: Json | null;
          etapas: Json | null;
          criterios_inclusao: string[] | null;
          criterios_exclusao: string[] | null;
          medicamentos: string[] | null;
          exames: string[] | null;
          monitoramento: Json | null;
          fonte: string | null;
          ano_publicacao: number | null;
          referencias: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          titulo: string;
          categoria: string;
          descricao?: string | null;
          condicoes?: string[] | null;
          fluxograma?: Json | null;
          etapas?: Json | null;
          criterios_inclusao?: string[] | null;
          criterios_exclusao?: string[] | null;
          medicamentos?: string[] | null;
          exames?: string[] | null;
          monitoramento?: Json | null;
          fonte?: string | null;
          ano_publicacao?: number | null;
          referencias?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          titulo?: string;
          categoria?: string;
          descricao?: string | null;
          condicoes?: string[] | null;
          fluxograma?: Json | null;
          etapas?: Json | null;
          criterios_inclusao?: string[] | null;
          criterios_exclusao?: string[] | null;
          medicamentos?: string[] | null;
          exames?: string[] | null;
          monitoramento?: Json | null;
          fonte?: string | null;
          ano_publicacao?: number | null;
          referencias?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      patient_genotypes: {
        Row: {
          id: string;
          user_id: string;
          gene: string;
          diplotype: string;
          source: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          gene: string;
          diplotype: string;
          source?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          gene?: string;
          diplotype?: string;
          source?: string;
          updated_at?: string;
        };
        Relationships: [];
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
