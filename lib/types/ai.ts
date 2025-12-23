/**
 * AI Chat Types
 * Scaffold for future AI integration
 */

/**
 * Chat message roles
 */
export type ChatRole = 'user' | 'assistant' | 'system';

/**
 * Chat message status
 */
export type MessageStatus = 'sending' | 'sent' | 'error' | 'streaming';

/**
 * Chat message
 */
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  status?: MessageStatus;
  citations?: ChatCitation[];
  suggestedActions?: SuggestedAction[];
}

/**
 * Citation reference in AI response
 */
export interface ChatCitation {
  id: string;
  type: 'disease' | 'medication' | 'protocol' | 'reference';
  title: string;
  url: string;
  snippet?: string;
}

/**
 * Suggested action after AI response
 */
export interface SuggestedAction {
  id: string;
  type: 'navigate' | 'search' | 'learn' | 'calculate';
  label: string;
  icon?: string;
  action: string; // URL or search query
}

/**
 * Context for AI chat
 */
export interface ChatContext {
  currentPage?: string;
  currentDiseaseId?: string;
  currentMedicationId?: string;
  currentProtocolId?: string;
  recentSearches?: string[];
  userLevel?: number;
  locale: string;
}

/**
 * Suggested prompt template
 */
export interface SuggestedPrompt {
  id: string;
  category: PromptCategory;
  prompt: string;
  promptKey: string; // i18n key
  icon: string;
  contextual?: boolean; // Only show in specific contexts
  contextTypes?: ('disease' | 'medication' | 'protocol' | 'learning')[];
}

/**
 * Prompt categories
 */
export type PromptCategory =
  | 'diagnosis'
  | 'treatment'
  | 'dosage'
  | 'interaction'
  | 'differential'
  | 'learning'
  | 'protocol'
  | 'general';

/**
 * AI Chat state for store
 */
export interface AIChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  context: ChatContext;
  suggestedPrompts: SuggestedPrompt[];
}

/**
 * Smart search suggestion
 */
export interface SmartSuggestion {
  id: string;
  type: 'correction' | 'related' | 'trending' | 'recent' | 'autocomplete';
  text: string;
  displayText?: string;
  score: number;
  metadata?: {
    originalQuery?: string;
    category?: string;
    count?: number;
  };
}

/**
 * Search enhancement result
 */
export interface EnhancedSearchResult {
  suggestions: SmartSuggestion[];
  didYouMean?: string;
  relatedTopics: string[];
  trendingSearches: string[];
}

// =============================================================================
// DEFAULT SUGGESTED PROMPTS
// =============================================================================

export const DEFAULT_PROMPTS: SuggestedPrompt[] = [
  // Diagnosis prompts
  {
    id: 'differential-diagnosis',
    category: 'diagnosis',
    prompt: 'What are the differential diagnoses for these symptoms?',
    promptKey: 'ai.prompts.differential_diagnosis',
    icon: '🔍',
  },
  {
    id: 'red-flags',
    category: 'diagnosis',
    prompt: 'What are the red flags I should watch for?',
    promptKey: 'ai.prompts.red_flags',
    icon: '🚩',
  },
  
  // Treatment prompts
  {
    id: 'first-line-treatment',
    category: 'treatment',
    prompt: 'What is the first-line treatment?',
    promptKey: 'ai.prompts.first_line_treatment',
    icon: '💊',
  },
  {
    id: 'non-pharm-options',
    category: 'treatment',
    prompt: 'What non-pharmacological options are available?',
    promptKey: 'ai.prompts.non_pharm_options',
    icon: '🏃',
  },
  
  // Dosage prompts
  {
    id: 'dosage-adjustment',
    category: 'dosage',
    prompt: 'How should I adjust the dose for renal impairment?',
    promptKey: 'ai.prompts.dosage_adjustment',
    icon: '⚖️',
    contextual: true,
    contextTypes: ['medication'],
  },
  {
    id: 'pediatric-dose',
    category: 'dosage',
    prompt: 'What is the pediatric dosage?',
    promptKey: 'ai.prompts.pediatric_dose',
    icon: '👶',
    contextual: true,
    contextTypes: ['medication'],
  },
  
  // Interaction prompts
  {
    id: 'drug-interactions',
    category: 'interaction',
    prompt: 'What are the main drug interactions?',
    promptKey: 'ai.prompts.drug_interactions',
    icon: '⚠️',
    contextual: true,
    contextTypes: ['medication'],
  },
  
  // Protocol prompts
  {
    id: 'when-to-refer',
    category: 'protocol',
    prompt: 'When should I refer to a specialist?',
    promptKey: 'ai.prompts.when_to_refer',
    icon: '🏥',
    contextual: true,
    contextTypes: ['disease', 'protocol'],
  },
  {
    id: 'follow-up',
    category: 'protocol',
    prompt: 'What is the recommended follow-up schedule?',
    promptKey: 'ai.prompts.follow_up',
    icon: '📅',
    contextual: true,
    contextTypes: ['disease', 'protocol'],
  },
  
  // Learning prompts
  {
    id: 'explain-mechanism',
    category: 'learning',
    prompt: 'Explain the pathophysiology in simple terms',
    promptKey: 'ai.prompts.explain_mechanism',
    icon: '🧬',
  },
  {
    id: 'clinical-pearls',
    category: 'learning',
    prompt: 'What are the key clinical pearls?',
    promptKey: 'ai.prompts.clinical_pearls',
    icon: '💡',
  },
  
  // General prompts
  {
    id: 'summarize',
    category: 'general',
    prompt: 'Summarize the key points',
    promptKey: 'ai.prompts.summarize',
    icon: '📋',
  },
  {
    id: 'evidence-level',
    category: 'general',
    prompt: 'What is the evidence level for this recommendation?',
    promptKey: 'ai.prompts.evidence_level',
    icon: '📊',
  },
];

/**
 * Get prompts for a specific context
 */
export function getContextualPrompts(
  context: ChatContext,
  allPrompts: SuggestedPrompt[] = DEFAULT_PROMPTS
): SuggestedPrompt[] {
  const contextType = context.currentDiseaseId
    ? 'disease'
    : context.currentMedicationId
    ? 'medication'
    : context.currentProtocolId
    ? 'protocol'
    : null;

  return allPrompts.filter((prompt) => {
    if (!prompt.contextual) return true;
    if (!contextType) return false;
    return prompt.contextTypes?.includes(contextType);
  });
}

/**
 * Get prompts by category
 */
export function getPromptsByCategory(
  category: PromptCategory,
  prompts: SuggestedPrompt[] = DEFAULT_PROMPTS
): SuggestedPrompt[] {
  return prompts.filter((p) => p.category === category);
}
