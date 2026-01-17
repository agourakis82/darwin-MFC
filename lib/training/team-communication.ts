/**
 * Team Communication Protocols for Healthcare Settings
 * Structured communication to prevent errors and improve patient safety
 *
 * References:
 * - TeamSTEPPS (AHRQ)
 * - WHO Patient Safety Guidelines
 * - Institute for Healthcare Improvement (IHI)
 * - Joint Commission Safety Goals
 *
 * For healthcare teams in all settings, especially crisis situations
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export interface CommunicationTemplate {
  id: string;
  name: string;
  purpose: string;
  whenToUse: string[];
  structure: TemplateSection[];
  example: string;
  tips: string[];
}

export interface TemplateSection {
  section: string;
  description: string;
  prompts: string[];
}

export interface HandoffChecklist {
  id: string;
  name: string;
  context: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  category: string;
  item: string;
  critical: boolean;
}

export interface CRMPrinciple {
  principle: string;
  description: string;
  application: string[];
  example: string;
}

// ============================================================================
// SBAR COMMUNICATION
// ============================================================================

export const SBAR_TEMPLATE: CommunicationTemplate = {
  id: 'sbar',
  name: 'SBAR Communication',
  purpose: 'Structured communication for escalation, handoffs, and urgent consultations',

  whenToUse: [
    'Calling a physician about a deteriorating patient',
    'Requesting urgent consultation',
    'Handing off care between providers',
    'Communicating critical information quickly'
  ],

  structure: [
    {
      section: 'S - Situation',
      description: 'What is happening right now?',
      prompts: [
        'I am calling about [patient name/location]',
        'The problem I am calling about is...',
        'The patient\'s condition has changed: [describe]'
      ]
    },
    {
      section: 'B - Background',
      description: 'What is the relevant clinical context?',
      prompts: [
        'The patient was admitted for [reason]',
        'Relevant history: [key conditions]',
        'Recent events: [procedures, changes, treatments]',
        'Current medications: [relevant ones]'
      ]
    },
    {
      section: 'A - Assessment',
      description: 'What do you think is going on?',
      prompts: [
        'I think the problem is...',
        'I am concerned about [specific concern]',
        'The patient is/is not stable',
        'My assessment is [diagnosis/problem]'
      ]
    },
    {
      section: 'R - Recommendation',
      description: 'What do you need?',
      prompts: [
        'I recommend/request [specific action]',
        'The patient needs [intervention/test/consult]',
        'I need you to [come see patient/order X/advise on Y]',
        'How urgently can you respond?'
      ]
    }
  ],

  example: `
SBAR Example - Calling physician about deteriorating patient:

S: "Dr. Smith, this is Nurse Jones on Ward 3. I'm calling about Mr. Brown
   in Room 312. He is having increased shortness of breath and his oxygen
   saturation has dropped to 88% on room air."

B: "Mr. Brown is a 68-year-old admitted yesterday for COPD exacerbation.
   He was stable overnight on 2L nasal cannula. He has a history of CHF
   and is on furosemide and lisinopril. His last chest X-ray showed
   bilateral infiltrates."

A: "I think he may be having worsening heart failure or pneumonia.
   His respiratory rate is 28, he's using accessory muscles, and I can
   hear crackles in both lung bases. His BP is 150/90 and HR is 110."

R: "I recommend you come assess him now. In the meantime, should I
   increase his oxygen to 4L, give a dose of furosemide, and get a
   stat chest X-ray and ABG?"
`,

  tips: [
    'Be concise but complete - have chart ready before calling',
    'State your concern clearly - don\'t minimize',
    'Offer your assessment even if unsure - it\'s valuable input',
    'Be specific about what you need and the timeframe',
    'Read back any verbal orders received',
    'If response is inadequate, escalate using chain of command'
  ]
};

// ============================================================================
// I-PASS HANDOFF
// ============================================================================

export const IPASS_HANDOFF: CommunicationTemplate = {
  id: 'ipass',
  name: 'I-PASS Handoff Protocol',
  purpose: 'Standardized handoff between providers at shift change or transfer',

  whenToUse: [
    'End-of-shift handoffs',
    'Transfer of care between units',
    'Transfer between facilities',
    'Procedure/surgery handoffs'
  ],

  structure: [
    {
      section: 'I - Illness Severity',
      description: 'How sick is this patient?',
      prompts: [
        'Stable / "watcher" / unstable',
        'Code status',
        'Level of care needed'
      ]
    },
    {
      section: 'P - Patient Summary',
      description: 'Brief summary of why patient is here',
      prompts: [
        'One-liner: [age, reason for admission, key events]',
        'Primary diagnosis',
        'Relevant past history'
      ]
    },
    {
      section: 'A - Action List',
      description: 'What needs to be done?',
      prompts: [
        'Pending tasks: [labs, imaging, consults]',
        'Medications due: [time-sensitive meds]',
        'Follow-up needed: [specific items]'
      ]
    },
    {
      section: 'S - Situation Awareness & Contingency',
      description: 'What could go wrong and what\'s the plan?',
      prompts: [
        'If [X happens], then [do Y]',
        'Watch for: [specific concerns]',
        'Contingency plan for deterioration'
      ]
    },
    {
      section: 'S - Synthesis by Receiver',
      description: 'Receiver summarizes and asks questions',
      prompts: [
        'Let me summarize what I heard...',
        'Questions about [specific items]',
        'Confirm understanding of key points'
      ]
    }
  ],

  example: `
I-PASS Example - End of shift handoff:

I: "Mrs. Garcia is a WATCHER - she could go either way. Full code."

P: "She's a 72-year-old with DM, CHF, and CKD, admitted 2 days ago for
   CHF exacerbation. She was diuresing well but spiked a fever tonight
   to 38.5. Blood and urine cultures sent."

A: "To-do list: Culture results pending (call lab if not back by 6am).
   She's due for her 4am furosemide. Cardiology wants an echo tomorrow
   morning - needs to be NPO after midnight."

S: "I'm worried about sepsis given her fever. If she becomes hypotensive
   or confused, start a fluid bolus and broad-spectrum antibiotics per
   the sepsis protocol. Her lactate from tonight was 2.1, not terrible
   but worth trending."

S (Receiver): "So she's a 72-year-old with CHF admitted for exacerbation,
   now with new fever concerning for possible sepsis. I need to follow up
   on cultures, give 4am lasix, keep her NPO for morning echo, and watch
   for signs of sepsis. Any specific antibiotic if she decompensates?"
`,

  tips: [
    'Use a printed or electronic handoff sheet',
    'Face-to-face handoffs are safest when possible',
    'Minimize interruptions during handoffs',
    'Receiver must synthesize back to confirm understanding',
    'Identify "watcher" patients clearly',
    'Be specific about contingency plans'
  ]
};

// ============================================================================
// CLOSED-LOOP COMMUNICATION
// ============================================================================

export const CLOSED_LOOP_COMMUNICATION: CommunicationTemplate = {
  id: 'closed-loop',
  name: 'Closed-Loop Communication',
  purpose: 'Ensure orders and information are received and understood correctly',

  whenToUse: [
    'During resuscitation/codes',
    'Giving verbal orders',
    'Communicating critical values',
    'Any high-stakes communication'
  ],

  structure: [
    {
      section: 'Step 1: Sender Gives Clear Message',
      description: 'Use name, eye contact, clear instruction',
      prompts: [
        '[Name], I need you to [specific action]',
        'Please [action] and let me know when complete'
      ]
    },
    {
      section: 'Step 2: Receiver Confirms Receipt',
      description: 'Acknowledge and read back',
      prompts: [
        'Confirm: I heard [repeat order]',
        'You want me to [restate action]',
        'Is that correct?'
      ]
    },
    {
      section: 'Step 3: Sender Verifies',
      description: 'Confirm the read-back is correct',
      prompts: [
        'That\'s correct',
        'No, I said [correct information]',
        'Yes, proceed'
      ]
    },
    {
      section: 'Step 4: Receiver Reports Completion',
      description: 'Close the loop',
      prompts: [
        '[Action] is done',
        'Task completed',
        '[Result of action]'
      ]
    }
  ],

  example: `
Closed-Loop Example - During CPR:

Leader: "Sarah, please give 1mg of epinephrine IV push now."

Sarah: "1mg epinephrine IV push, is that correct?"

Leader: "That's correct."

[Sarah gives medication]

Sarah: "1mg epinephrine given IV push."
`,

  tips: [
    'Use the person\'s name to get their attention',
    'Make eye contact when possible',
    'Keep orders simple - one task at a time',
    'Wait for acknowledgment before moving on',
    'Use phonetic alphabet for critical letters/numbers',
    'Write down complex orders'
  ]
};

// ============================================================================
// CUS WORDS - ASSERTIVE STATEMENTS
// ============================================================================

export const CUS_WORDS: CommunicationTemplate = {
  id: 'cus-words',
  name: 'CUS Words - Assertive Communication',
  purpose: 'Escalating safety concerns in a structured way',

  whenToUse: [
    'When concerned about patient safety',
    'When initial concern was not heard',
    'When you need to stop an action',
    'When speaking up to authority'
  ],

  structure: [
    {
      section: 'C - Concerned',
      description: 'First level - express concern',
      prompts: [
        'I am CONCERNED about...',
        'I\'m worried that...',
        'Something doesn\'t seem right about...'
      ]
    },
    {
      section: 'U - Uncomfortable',
      description: 'Second level - escalate if not heard',
      prompts: [
        'I am UNCOMFORTABLE with this plan because...',
        'I don\'t feel good about proceeding with...',
        'This makes me uncomfortable...'
      ]
    },
    {
      section: 'S - Safety Issue',
      description: 'Highest level - explicit safety concern',
      prompts: [
        'This is a SAFETY issue',
        'I believe this patient is in danger',
        'We need to stop and address this NOW'
      ]
    }
  ],

  example: `
CUS Example - Escalating concern about medication:

First attempt (C): "Doctor, I'm CONCERNED about this morphine dose.
The patient weighs 45kg and this seems high."

[If dismissed]

Second attempt (U): "I'm UNCOMFORTABLE giving this dose. In my
experience, this could cause respiratory depression in a patient
this size. Can we please verify the calculation?"

[If still dismissed]

Third attempt (S): "I need to stop. This is a SAFETY issue. I cannot
give this medication until we verify the dose together. I need to
call pharmacy or a second physician."
`,

  tips: [
    'Anyone can speak up about safety - it\'s your duty',
    'Use "I" statements - focus on your concern',
    'Be respectful but firm',
    'If overruled and still concerned, escalate to supervisor',
    'Document your concerns',
    'Creating psychological safety for CUS is a leadership responsibility'
  ]
};

// ============================================================================
// CREW RESOURCE MANAGEMENT (CRM) PRINCIPLES
// ============================================================================

export const CRM_PRINCIPLES: CRMPrinciple[] = [
  {
    principle: 'Situational Awareness',
    description: 'Know what\'s going on around you and anticipate what\'s coming',
    application: [
      'Continuously assess patient status',
      'Monitor team performance and fatigue',
      'Anticipate needs and potential problems',
      'Share mental model with team'
    ],
    example: 'During resuscitation: "We\'ve been going for 20 minutes. Next pulse check in 60 seconds. If no ROSC, we need to discuss stopping."'
  },
  {
    principle: 'Communication',
    description: 'Information flows freely and accurately between all team members',
    application: [
      'Use structured communication (SBAR, I-PASS)',
      'Closed-loop communication for orders',
      'Brief and debrief',
      'Speak up with concerns (CUS)'
    ],
    example: 'Before a procedure: "Let\'s do a quick brief. I\'m inserting a central line. Sarah, you\'re assisting. John, monitor the patient. Any concerns?"'
  },
  {
    principle: 'Leadership',
    description: 'Clear leadership with team involvement in decisions',
    application: [
      'Designate a leader',
      'Leader sets priorities and assigns tasks',
      'Leader maintains global view',
      'Leader encourages input from team'
    ],
    example: 'Code leader: "I\'m running this code. Maria, you\'re on airway. Tom, chest compressions. I want someone to speak up if they see something I\'m missing."'
  },
  {
    principle: 'Mutual Support',
    description: 'Team members assist each other and watch for errors',
    application: [
      'Cross-monitor each other\'s work',
      'Offer help when someone is overloaded',
      'Accept help gracefully',
      'Use "two-challenge rule" for safety concerns'
    ],
    example: '"Hey, you look overwhelmed. Can I take one of your patients?" or "I noticed you\'re about to hang that IV - let me double-check the label with you."'
  },
  {
    principle: 'Workload Management',
    description: 'Distribute work appropriately and recognize overload',
    application: [
      'Prioritize tasks',
      'Delegate appropriately',
      'Recognize task saturation (yourself and others)',
      'Ask for help before overwhelmed'
    ],
    example: '"I\'m task-saturated right now. Can someone take over documentation while I manage this airway?"'
  },
  {
    principle: 'Error Management',
    description: 'Errors are anticipated, caught, and mitigated',
    application: [
      'Use checklists',
      'Cross-check high-risk actions',
      'Report errors without blame',
      'Debrief after errors to learn'
    ],
    example: 'After a near-miss: "Let\'s debrief. What happened, why did it happen, and what can we do differently next time?"'
  }
];

// ============================================================================
// HANDOFF CHECKLISTS
// ============================================================================

export const SHIFT_HANDOFF_CHECKLIST: HandoffChecklist = {
  id: 'shift-handoff',
  name: 'End-of-Shift Handoff Checklist',
  context: 'Transferring care between shifts',

  items: [
    { category: 'Patient Identity', item: 'Confirm patient name and location', critical: true },
    { category: 'Severity', item: 'Identify illness severity (stable/watcher/unstable)', critical: true },
    { category: 'Code Status', item: 'Confirm code status/advance directives', critical: true },
    { category: 'Summary', item: 'Provide one-liner summary', critical: false },
    { category: 'Events', item: 'Review significant events this shift', critical: true },
    { category: 'Vitals', item: 'Report recent vital signs and trends', critical: true },
    { category: 'Labs', item: 'Review pending and recent lab results', critical: false },
    { category: 'Meds', item: 'Highlight time-critical medications', critical: true },
    { category: 'Tasks', item: 'Communicate pending tasks with deadlines', critical: true },
    { category: 'Contingency', item: 'Discuss "if-then" plans for deterioration', critical: true },
    { category: 'Family', item: 'Note family concerns or communication needs', critical: false },
    { category: 'Questions', item: 'Allow time for receiver questions', critical: true },
    { category: 'Read-back', item: 'Receiver summarizes key points', critical: true }
  ]
};

export const INTERHOSPITAL_TRANSFER_CHECKLIST: HandoffChecklist = {
  id: 'interhospital-transfer',
  name: 'Interhospital Transfer Handoff',
  context: 'Transferring patient between facilities',

  items: [
    { category: 'Patient ID', item: 'Full name, DOB, and ID number', critical: true },
    { category: 'Receiving', item: 'Confirm receiving facility, unit, and contact', critical: true },
    { category: 'Reason', item: 'State reason for transfer', critical: true },
    { category: 'Summary', item: 'Clinical summary and course', critical: true },
    { category: 'Diagnosis', item: 'Current diagnosis and differentials', critical: true },
    { category: 'Vitals', item: 'Most recent vital signs', critical: true },
    { category: 'Medications', item: 'Current medications (especially drips)', critical: true },
    { category: 'Allergies', item: 'Confirm allergies', critical: true },
    { category: 'Access', item: 'Document IV access, airway, lines', critical: true },
    { category: 'Labs/Imaging', item: 'Send copies of relevant results', critical: true },
    { category: 'Pending', item: 'Communicate pending workup/procedures', critical: false },
    { category: 'Code Status', item: 'Confirm and document code status', critical: true },
    { category: 'Family', item: 'Family contact information and notification', critical: false },
    { category: 'Belongings', item: 'Patient belongings documented', critical: false },
    { category: 'Contingency', item: 'Plan if patient deteriorates in transit', critical: true },
    { category: 'Transport team', item: 'Brief transport team on critical issues', critical: true }
  ]
};

export const PROCEDURE_HANDOFF_CHECKLIST: HandoffChecklist = {
  id: 'procedure-handoff',
  name: 'Procedure/OR Handoff',
  context: 'Transferring care for procedures or surgery',

  items: [
    { category: 'Patient ID', item: 'Verify patient identity (two identifiers)', critical: true },
    { category: 'Procedure', item: 'Confirm correct procedure and site', critical: true },
    { category: 'Consent', item: 'Verify consent signed and correct', critical: true },
    { category: 'Allergies', item: 'Communicate allergies clearly', critical: true },
    { category: 'NPO', item: 'Confirm NPO status', critical: true },
    { category: 'Meds', item: 'Review pre-op medications (given/held)', critical: true },
    { category: 'Anticoag', item: 'Anticoagulation status and last dose', critical: true },
    { category: 'Labs', item: 'Confirm required pre-op labs', critical: false },
    { category: 'Access', item: 'Document IV access and blood availability', critical: true },
    { category: 'Airway', item: 'Note any airway concerns', critical: true },
    { category: 'Events', item: 'Report any events since booking', critical: true },
    { category: 'Concerns', item: 'Communicate any special concerns', critical: false }
  ]
};

// ============================================================================
// DEBRIEF TEMPLATES
// ============================================================================

export interface DebriefTemplate {
  id: string;
  name: string;
  duration: string;
  questions: DebriefQuestion[];
}

export interface DebriefQuestion {
  phase: string;
  question: string;
  purpose: string;
}

export const QUICK_DEBRIEF: DebriefTemplate = {
  id: 'quick-debrief',
  name: 'Quick Debrief (Hot Debrief)',
  duration: '5-10 minutes immediately after event',

  questions: [
    {
      phase: 'Emotional Check',
      question: 'How is everyone doing? Anyone need a moment?',
      purpose: 'Acknowledge emotional impact, ensure team wellbeing'
    },
    {
      phase: 'Summary',
      question: 'What happened? (Brief factual summary)',
      purpose: 'Establish shared mental model of events'
    },
    {
      phase: 'What Went Well',
      question: 'What went well that we should do again?',
      purpose: 'Reinforce positive behaviors'
    },
    {
      phase: 'Opportunities',
      question: 'What could we improve next time?',
      purpose: 'Identify learning opportunities without blame'
    },
    {
      phase: 'Action Items',
      question: 'Are there any immediate actions we need to take?',
      purpose: 'Capture actionable items'
    },
    {
      phase: 'Close',
      question: 'Any final thoughts? Thank you all.',
      purpose: 'Closure and appreciation'
    }
  ]
};

export const FORMAL_DEBRIEF: DebriefTemplate = {
  id: 'formal-debrief',
  name: 'Formal After-Action Review',
  duration: '30-60 minutes, scheduled within 24-72 hours',

  questions: [
    {
      phase: 'Ground Rules',
      question: 'Reminder: This is a learning discussion. No blame. Confidential.',
      purpose: 'Create psychological safety'
    },
    {
      phase: 'Timeline',
      question: 'Let\'s walk through what happened chronologically.',
      purpose: 'Establish accurate timeline'
    },
    {
      phase: 'Expected vs Actual',
      question: 'What did we expect/plan to happen? What actually happened?',
      purpose: 'Identify deviations and surprises'
    },
    {
      phase: 'Decision Points',
      question: 'What were the key decision points? What information did we have?',
      purpose: 'Understand decision-making context'
    },
    {
      phase: 'What Worked',
      question: 'What worked well that we should sustain?',
      purpose: 'Identify best practices'
    },
    {
      phase: 'Challenges',
      question: 'What challenges did we face? What were the barriers?',
      purpose: 'Understand system factors'
    },
    {
      phase: 'Improvement',
      question: 'What would we do differently? What changes should we recommend?',
      purpose: 'Generate improvement ideas'
    },
    {
      phase: 'Action Plan',
      question: 'What are our specific action items? Who is responsible? By when?',
      purpose: 'Create accountable action plan'
    },
    {
      phase: 'Share Learning',
      question: 'How should we share this learning with others?',
      purpose: 'Spread lessons learned'
    }
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const ALL_COMMUNICATION_TEMPLATES: CommunicationTemplate[] = [
  SBAR_TEMPLATE,
  IPASS_HANDOFF,
  CLOSED_LOOP_COMMUNICATION,
  CUS_WORDS
];

export const ALL_HANDOFF_CHECKLISTS: HandoffChecklist[] = [
  SHIFT_HANDOFF_CHECKLIST,
  INTERHOSPITAL_TRANSFER_CHECKLIST,
  PROCEDURE_HANDOFF_CHECKLIST
];

export const ALL_DEBRIEF_TEMPLATES: DebriefTemplate[] = [
  QUICK_DEBRIEF,
  FORMAL_DEBRIEF
];

export function getCommunicationTemplate(id: string): CommunicationTemplate | undefined {
  return ALL_COMMUNICATION_TEMPLATES.find(t => t.id === id);
}

export function getHandoffChecklist(id: string): HandoffChecklist | undefined {
  return ALL_HANDOFF_CHECKLISTS.find(c => c.id === id);
}

// Quick reference
export const TEAM_COMMUNICATION_QUICK_REFERENCE = `
╔════════════════════════════════════════════════════════════════════════════╗
║                 TEAM COMMUNICATION QUICK REFERENCE                          ║
╠════════════════════════════════════════════════════════════════════════════╣
║ SBAR - For escalation and urgent communication:                            ║
║ S - Situation: "I'm calling about Mr. X who is having [problem]"           ║
║ B - Background: "He was admitted for... History includes..."               ║
║ A - Assessment: "I think the problem is... I'm concerned about..."         ║
║ R - Recommendation: "I need you to... Can you...?"                         ║
╠════════════════════════════════════════════════════════════════════════════╣
║ I-PASS - For handoffs:                                                     ║
║ I - Illness severity (stable/watcher/unstable)                             ║
║ P - Patient summary (one-liner)                                            ║
║ A - Action list (to-do items)                                              ║
║ S - Situation awareness (if X, then Y)                                     ║
║ S - Synthesis by receiver (read-back)                                      ║
╠════════════════════════════════════════════════════════════════════════════╣
║ CLOSED-LOOP - For orders during emergencies:                               ║
║ 1. Sender: "[Name], give 1mg epinephrine IV"                              ║
║ 2. Receiver: "1mg epinephrine IV, correct?"                               ║
║ 3. Sender: "Correct"                                                       ║
║ 4. Receiver: "1mg epinephrine given"                                       ║
╠════════════════════════════════════════════════════════════════════════════╣
║ CUS WORDS - Escalating safety concerns:                                    ║
║ "I am CONCERNED about..."                                                  ║
║ "I am UNCOMFORTABLE with..."                                               ║
║ "This is a SAFETY issue"                                                   ║
╠════════════════════════════════════════════════════════════════════════════╣
║ CRM PRINCIPLES:                                                            ║
║ • Situational awareness - know what's happening                            ║
║ • Communication - share information freely                                 ║
║ • Leadership - clear roles and responsibilities                            ║
║ • Mutual support - help each other, catch errors                           ║
║ • Workload management - recognize overload                                 ║
║ • Error management - anticipate, catch, learn                              ║
╠════════════════════════════════════════════════════════════════════════════╣
║ QUICK DEBRIEF (After any event):                                           ║
║ 1. "How is everyone doing?"                                                ║
║ 2. "What happened?" (brief summary)                                        ║
║ 3. "What went well?"                                                       ║
║ 4. "What could we improve?"                                                ║
║ 5. "Any immediate actions needed?"                                         ║
╚════════════════════════════════════════════════════════════════════════════╝
`;
