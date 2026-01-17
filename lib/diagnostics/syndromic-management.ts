/**
 * WHO Syndromic Management Protocols
 * Treatment based on clinical syndromes without laboratory diagnosis
 *
 * References:
 * - WHO Guidelines for the Management of STIs (2021)
 * - WHO IMAI District Clinician Manual
 * - MSF Clinical Guidelines
 * - CDC STI Treatment Guidelines (2021)
 *
 * For healthcare workers in settings without laboratory diagnostics
 */

export interface SyndromicProtocol {
  id: string;
  syndrome: string;
  description: string;
  targetPopulation: 'adult' | 'pediatric' | 'pregnant' | 'all';
  clinicalFeatures: string[];
  possibleCauses: PossibleCause[];
  syndromicTreatment: SyndromicTreatment;
  partnerManagement?: string;
  followUp: string;
  referralCriteria: string[];
  preventionCounseling: string[];
}

export interface PossibleCause {
  organism: string;
  frequency: 'common' | 'less_common' | 'rare';
  confirmatory?: string;
}

export interface SyndromicTreatment {
  firstLine: TreatmentRegimen[];
  alternatives: TreatmentRegimen[];
  adjunctive?: string[];
  contraindications?: string[];
}

export interface TreatmentRegimen {
  drugs: DrugDose[];
  duration: string;
  notes?: string;
}

export interface DrugDose {
  drug: string;
  dose: string;
  route: string;
  frequency: string;
}

// ============================================================================
// URETHRAL DISCHARGE SYNDROME (Male)
// ============================================================================

export const URETHRAL_DISCHARGE_SYNDROME: SyndromicProtocol = {
  id: 'urethral-discharge',
  syndrome: 'Urethral Discharge Syndrome',
  description: 'Purulent or mucopurulent urethral discharge with or without dysuria in males',
  targetPopulation: 'adult',

  clinicalFeatures: [
    'Urethral discharge (purulent, mucopurulent, or mucoid)',
    'Dysuria (painful urination)',
    'Urethral itching or tingling',
    'Meatal erythema',
    'May be asymptomatic in some cases'
  ],

  possibleCauses: [
    { organism: 'Neisseria gonorrhoeae', frequency: 'common' },
    { organism: 'Chlamydia trachomatis', frequency: 'common' },
    { organism: 'Mycoplasma genitalium', frequency: 'less_common' },
    { organism: 'Trichomonas vaginalis', frequency: 'less_common' },
    { organism: 'Ureaplasma urealyticum', frequency: 'rare' }
  ],

  syndromicTreatment: {
    firstLine: [
      {
        drugs: [
          { drug: 'Ceftriaxone', dose: '500mg', route: 'IM', frequency: 'single dose' },
          { drug: 'Azithromycin', dose: '1g', route: 'PO', frequency: 'single dose' }
        ],
        duration: 'Single dose (both drugs)',
        notes: 'Treats both gonorrhea and chlamydia simultaneously'
      }
    ],
    alternatives: [
      {
        drugs: [
          { drug: 'Cefixime', dose: '400mg', route: 'PO', frequency: 'single dose' },
          { drug: 'Azithromycin', dose: '1g', route: 'PO', frequency: 'single dose' }
        ],
        duration: 'Single dose (both drugs)',
        notes: 'Use if ceftriaxone unavailable; check local resistance patterns'
      },
      {
        drugs: [
          { drug: 'Spectinomycin', dose: '2g', route: 'IM', frequency: 'single dose' },
          { drug: 'Azithromycin', dose: '1g', route: 'PO', frequency: 'single dose' }
        ],
        duration: 'Single dose (both drugs)',
        notes: 'Alternative if cephalosporin allergic; does not treat pharyngeal gonorrhea'
      }
    ],
    adjunctive: [
      'Abstain from sex until treatment completed and symptoms resolved',
      'Abstain for 7 days if partner not treated',
      'Condom counseling'
    ]
  },

  partnerManagement: 'Treat all sexual partners from the past 60 days with the same regimen. Expedited partner therapy (providing prescriptions for partners) is recommended where legal.',

  followUp: 'Return if symptoms persist after 7 days. Test of cure not routinely needed unless pregnant, symptoms persist, or reinfection suspected.',

  referralCriteria: [
    'Symptoms persist after treatment (possible resistant gonorrhea)',
    'Suspected epididymitis (scrotal pain/swelling)',
    'Systemic symptoms (fever, joint pain - disseminated gonococcal infection)',
    'Recurrent infections (>2 episodes in 12 months)'
  ],

  preventionCounseling: [
    'Consistent and correct condom use',
    'Reduce number of sexual partners',
    'Mutual monogamy with tested partner',
    'HIV testing recommended',
    'Hepatitis B vaccination if not immune'
  ]
};

// ============================================================================
// VAGINAL DISCHARGE SYNDROME
// ============================================================================

export const VAGINAL_DISCHARGE_SYNDROME: SyndromicProtocol = {
  id: 'vaginal-discharge',
  syndrome: 'Vaginal Discharge Syndrome',
  description: 'Abnormal vaginal discharge with or without vulvar itching, dysuria, or odor',
  targetPopulation: 'adult',

  clinicalFeatures: [
    'Abnormal vaginal discharge (increased amount, changed color/consistency/odor)',
    'Vulvar itching or irritation',
    'Dysuria (external)',
    'Dyspareunia',
    'Vulvar erythema or excoriation'
  ],

  possibleCauses: [
    { organism: 'Bacterial vaginosis', frequency: 'common' },
    { organism: 'Candida albicans (yeast)', frequency: 'common' },
    { organism: 'Trichomonas vaginalis', frequency: 'common' },
    { organism: 'Chlamydia trachomatis (cervicitis)', frequency: 'less_common' },
    { organism: 'Neisseria gonorrhoeae (cervicitis)', frequency: 'less_common' }
  ],

  syndromicTreatment: {
    firstLine: [
      {
        drugs: [
          { drug: 'Metronidazole', dose: '2g', route: 'PO', frequency: 'single dose' },
          { drug: 'Fluconazole', dose: '150mg', route: 'PO', frequency: 'single dose' }
        ],
        duration: 'Single dose (both drugs)',
        notes: 'Covers BV, trichomoniasis, and candidiasis. Add STI treatment if cervicitis risk.'
      }
    ],
    alternatives: [
      {
        drugs: [
          { drug: 'Metronidazole', dose: '400-500mg', route: 'PO', frequency: 'BID x 7 days' },
          { drug: 'Clotrimazole', dose: '500mg pessary', route: 'PV', frequency: 'single dose' }
        ],
        duration: '7 days metronidazole, single dose clotrimazole',
        notes: 'Alternative if single-dose metronidazole not tolerated'
      }
    ],
    adjunctive: [
      'Avoid douching',
      'Cotton underwear',
      'Partner treatment for trichomoniasis'
    ],
    contraindications: [
      'Metronidazole: avoid alcohol for 24-48 hours (disulfiram-like reaction)',
      'First trimester pregnancy: use clotrimazole only, defer metronidazole if possible'
    ]
  },

  partnerManagement: 'Partner treatment required only for Trichomonas. If cervicitis suspected (risk assessment positive), treat partners for gonorrhea/chlamydia.',

  followUp: 'Return if symptoms persist after 7 days or recur within 2 months.',

  referralCriteria: [
    'Symptoms persist after treatment',
    'Recurrent infections (>4 episodes per year)',
    'Suspected PID (pelvic pain, fever)',
    'Pregnancy with STI concerns',
    'Unusual discharge (bloody, foul-smelling with systemic symptoms)'
  ],

  preventionCounseling: [
    'Avoid douching',
    'Condom use for new/multiple partners',
    'Cotton underwear, avoid tight clothing',
    'Complete full course of treatment',
    'Partner treatment when indicated'
  ]
};

// ============================================================================
// GENITAL ULCER SYNDROME
// ============================================================================

export const GENITAL_ULCER_SYNDROME: SyndromicProtocol = {
  id: 'genital-ulcer',
  syndrome: 'Genital Ulcer Syndrome',
  description: 'Ulcerative lesion(s) on genitalia with or without inguinal lymphadenopathy',
  targetPopulation: 'adult',

  clinicalFeatures: [
    'Genital ulcer(s) - single or multiple',
    'May be painful or painless',
    'Inguinal lymphadenopathy (may be tender)',
    'Dysuria if urethral/vulvar involvement',
    'Regional lymph node suppuration (buboes)'
  ],

  possibleCauses: [
    { organism: 'Herpes simplex virus (HSV-1/2)', frequency: 'common', confirmatory: 'PCR or culture' },
    { organism: 'Treponema pallidum (Syphilis)', frequency: 'common', confirmatory: 'RPR/VDRL + TPHA' },
    { organism: 'Haemophilus ducreyi (Chancroid)', frequency: 'less_common', confirmatory: 'Culture (difficult)' },
    { organism: 'Klebsiella granulomatis (Donovanosis)', frequency: 'rare', confirmatory: 'Tissue smear' },
    { organism: 'Chlamydia trachomatis L1-3 (LGV)', frequency: 'rare', confirmatory: 'Serology, PCR' }
  ],

  syndromicTreatment: {
    firstLine: [
      {
        drugs: [
          { drug: 'Benzathine penicillin G', dose: '2.4 million units', route: 'IM', frequency: 'single dose' },
          { drug: 'Aciclovir', dose: '400mg', route: 'PO', frequency: 'TID x 7 days' }
        ],
        duration: 'Penicillin single dose + Aciclovir 7 days',
        notes: 'Covers syphilis and herpes. Add azithromycin 1g if chancroid suspected (painful ulcer + bubo).'
      }
    ],
    alternatives: [
      {
        drugs: [
          { drug: 'Doxycycline', dose: '100mg', route: 'PO', frequency: 'BID x 14 days' },
          { drug: 'Aciclovir', dose: '400mg', route: 'PO', frequency: 'TID x 7 days' }
        ],
        duration: '14 days doxycycline + 7 days aciclovir',
        notes: 'If penicillin allergic. Doxycycline also covers chancroid and LGV.'
      }
    ],
    adjunctive: [
      'Keep ulcers clean and dry',
      'Saline compresses for comfort',
      'Analgesia as needed',
      'Aspiration of fluctuant buboes (do NOT incise and drain)'
    ]
  },

  partnerManagement: 'All sexual partners in past 90 days should be evaluated and treated empirically for syphilis even if asymptomatic.',

  followUp: 'Review at 7 days. Syphilis ulcers should heal within 3-6 weeks. Herpes may recur. If not healing, consider HIV testing, biopsy, or referral.',

  referralCriteria: [
    'Ulcer not healing after 2 weeks of treatment',
    'HIV co-infection (may need longer/different treatment)',
    'Neurological symptoms (neurosyphilis)',
    'Pregnancy',
    'Suspected malignancy (chronic non-healing ulcer)'
  ],

  preventionCounseling: [
    'Consistent condom use (reduces but doesn\'t eliminate risk)',
    'Avoid sex during outbreaks',
    'HSV is lifelong - suppressive therapy options exist',
    'Syphilis is curable - partner treatment essential',
    'HIV testing strongly recommended'
  ]
};

// ============================================================================
// SCROTAL SWELLING SYNDROME
// ============================================================================

export const SCROTAL_SWELLING_SYNDROME: SyndromicProtocol = {
  id: 'scrotal-swelling',
  syndrome: 'Scrotal Swelling Syndrome (Epididymo-orchitis)',
  description: 'Painful swelling of the scrotum, typically unilateral',
  targetPopulation: 'adult',

  clinicalFeatures: [
    'Unilateral scrotal pain and swelling (usually gradual onset)',
    'Epididymal tenderness (posterior/superior testis)',
    'Possible urethral discharge',
    'Fever may be present',
    'Positive Prehn sign (relief with scrotal elevation)'
  ],

  possibleCauses: [
    { organism: 'Chlamydia trachomatis', frequency: 'common' },
    { organism: 'Neisseria gonorrhoeae', frequency: 'common' },
    { organism: 'Enteric bacteria (E. coli)', frequency: 'common' },
    { organism: 'Mumps virus', frequency: 'less_common' },
    { organism: 'Tuberculosis', frequency: 'rare' }
  ],

  syndromicTreatment: {
    firstLine: [
      {
        drugs: [
          { drug: 'Ceftriaxone', dose: '500mg', route: 'IM', frequency: 'single dose' },
          { drug: 'Doxycycline', dose: '100mg', route: 'PO', frequency: 'BID x 10-14 days' }
        ],
        duration: 'Single dose ceftriaxone + 10-14 days doxycycline',
        notes: 'For sexually active men <35 years (STI likely). Covers gonorrhea and chlamydia.'
      },
      {
        drugs: [
          { drug: 'Levofloxacin', dose: '500mg', route: 'PO', frequency: 'daily x 10 days' }
        ],
        duration: '10 days',
        notes: 'For men >35 or with enteric organism risk (insertive anal sex, UTI, instrumentation)'
      }
    ],
    alternatives: [
      {
        drugs: [
          { drug: 'Ofloxacin', dose: '300mg', route: 'PO', frequency: 'BID x 10 days' }
        ],
        duration: '10 days',
        notes: 'Alternative fluoroquinolone if levofloxacin unavailable'
      }
    ],
    adjunctive: [
      'Bed rest',
      'Scrotal elevation and support',
      'Ice packs',
      'NSAIDs for pain and inflammation'
    ]
  },

  partnerManagement: 'If STI-related, treat all partners from past 60 days for gonorrhea and chlamydia.',

  followUp: 'Review in 3 days if no improvement. Complete resolution may take 2-4 weeks. Persistent swelling needs investigation.',

  referralCriteria: [
    'URGENT: Cannot rule out testicular torsion (sudden onset, absent cremasteric reflex, no Prehn sign)',
    'No improvement after 3 days of treatment',
    'Abscess formation',
    'Recurrent episodes',
    'Suspected TB (chronic, sinus formation)'
  ],

  preventionCounseling: [
    'Condom use',
    'Partner treatment',
    'Complete full antibiotic course',
    'Follow-up to ensure resolution'
  ]
};

// ============================================================================
// LOWER ABDOMINAL PAIN SYNDROME (PID)
// ============================================================================

export const LOWER_ABDOMINAL_PAIN_SYNDROME: SyndromicProtocol = {
  id: 'lower-abdominal-pain-female',
  syndrome: 'Lower Abdominal Pain Syndrome in Women (Pelvic Inflammatory Disease)',
  description: 'Lower abdominal/pelvic pain in sexually active women suggestive of PID',
  targetPopulation: 'adult',

  clinicalFeatures: [
    'Lower abdominal pain (bilateral)',
    'Cervical motion tenderness',
    'Adnexal tenderness',
    'Abnormal vaginal/cervical discharge',
    'Fever (may be absent in mild cases)',
    'Abnormal bleeding'
  ],

  possibleCauses: [
    { organism: 'Neisseria gonorrhoeae', frequency: 'common' },
    { organism: 'Chlamydia trachomatis', frequency: 'common' },
    { organism: 'Anaerobic bacteria', frequency: 'common' },
    { organism: 'Mycoplasma genitalium', frequency: 'less_common' },
    { organism: 'Enteric bacteria', frequency: 'less_common' }
  ],

  syndromicTreatment: {
    firstLine: [
      {
        drugs: [
          { drug: 'Ceftriaxone', dose: '500mg', route: 'IM', frequency: 'single dose' },
          { drug: 'Doxycycline', dose: '100mg', route: 'PO', frequency: 'BID x 14 days' },
          { drug: 'Metronidazole', dose: '400-500mg', route: 'PO', frequency: 'BID x 14 days' }
        ],
        duration: '14 days',
        notes: 'Outpatient treatment for mild-moderate PID'
      }
    ],
    alternatives: [
      {
        drugs: [
          { drug: 'Cefotaxime', dose: '1g', route: 'IV', frequency: 'TID' },
          { drug: 'Doxycycline', dose: '100mg', route: 'IV/PO', frequency: 'BID' },
          { drug: 'Metronidazole', dose: '500mg', route: 'IV', frequency: 'TID' }
        ],
        duration: 'Until improved, then complete 14 days oral',
        notes: 'Inpatient treatment for severe PID'
      }
    ],
    adjunctive: [
      'Rest',
      'Analgesia',
      'IUD removal if present (after starting antibiotics)',
      'Consider HIV testing'
    ]
  },

  partnerManagement: 'All male partners in past 60 days should be treated for gonorrhea and chlamydia, even if asymptomatic.',

  followUp: 'Review in 72 hours. Should see substantial improvement. If not improving, consider hospitalization.',

  referralCriteria: [
    'URGENT: Cannot rule out surgical emergency (ectopic, appendicitis, ovarian torsion)',
    'URGENT: Tubo-ovarian abscess suspected (mass palpable)',
    'Pregnancy',
    'Severe illness (high fever, vomiting, unable to tolerate oral)',
    'No improvement after 72 hours of outpatient treatment',
    'HIV-positive patient'
  ],

  preventionCounseling: [
    'Condom use reduces risk',
    'Partner treatment essential to prevent reinfection',
    'Early treatment of cervicitis prevents ascent',
    'Complications: infertility, ectopic pregnancy, chronic pain',
    'Screening for STIs in high-risk populations'
  ]
};

// ============================================================================
// INGUINAL BUBO SYNDROME
// ============================================================================

export const INGUINAL_BUBO_SYNDROME: SyndromicProtocol = {
  id: 'inguinal-bubo',
  syndrome: 'Inguinal Bubo Syndrome',
  description: 'Painful inguinal lymphadenopathy with or without genital ulcer',
  targetPopulation: 'adult',

  clinicalFeatures: [
    'Painful, enlarged inguinal lymph nodes (usually unilateral)',
    'May be fluctuant (bubo)',
    'Overlying erythema',
    'May have associated genital ulcer (or ulcer may have healed)',
    'Fever and malaise possible'
  ],

  possibleCauses: [
    { organism: 'Haemophilus ducreyi (Chancroid)', frequency: 'common' },
    { organism: 'Chlamydia trachomatis L1-3 (LGV)', frequency: 'less_common' },
    { organism: 'Treponema pallidum (Syphilis)', frequency: 'less_common' },
    { organism: 'Non-STI causes (skin infection, lymphoma)', frequency: 'less_common' }
  ],

  syndromicTreatment: {
    firstLine: [
      {
        drugs: [
          { drug: 'Azithromycin', dose: '1g', route: 'PO', frequency: 'weekly x 3 weeks' },
          { drug: 'Ceftriaxone', dose: '250mg', route: 'IM', frequency: 'single dose' }
        ],
        duration: '3 weeks azithromycin + single dose ceftriaxone',
        notes: 'Covers LGV, chancroid, and incubating syphilis'
      }
    ],
    alternatives: [
      {
        drugs: [
          { drug: 'Doxycycline', dose: '100mg', route: 'PO', frequency: 'BID x 21 days' }
        ],
        duration: '21 days',
        notes: 'Alternative for LGV and chancroid'
      }
    ],
    adjunctive: [
      'Aspirate fluctuant buboes through healthy skin (do NOT incise and drain)',
      'Repeat aspiration may be needed',
      'Analgesia'
    ]
  },

  partnerManagement: 'Partners in past 60 days (chancroid) or 30 days before symptom onset (LGV) should be examined and treated.',

  followUp: 'Review weekly until resolved. Buboes may take several weeks to resolve even with effective treatment.',

  referralCriteria: [
    'No improvement after 7 days of treatment',
    'HIV co-infection',
    'Rectal or pharyngeal LGV suspected',
    'Non-healing lesions (consider malignancy)',
    'Systemic symptoms out of proportion'
  ],

  preventionCounseling: [
    'Condom use',
    'Partner notification and treatment',
    'HIV testing recommended',
    'Complete full course of treatment'
  ]
};

// ============================================================================
// NEONATAL CONJUNCTIVITIS (Ophthalmia Neonatorum)
// ============================================================================

export const NEONATAL_CONJUNCTIVITIS_SYNDROME: SyndromicProtocol = {
  id: 'neonatal-conjunctivitis',
  syndrome: 'Neonatal Conjunctivitis (Ophthalmia Neonatorum)',
  description: 'Purulent conjunctivitis in newborn within first 28 days of life',
  targetPopulation: 'pediatric',

  clinicalFeatures: [
    'Purulent or mucopurulent eye discharge',
    'Eyelid swelling',
    'Conjunctival injection',
    'Usually bilateral',
    'Onset: gonococcal (2-5 days), chlamydial (5-14 days), other (variable)'
  ],

  possibleCauses: [
    { organism: 'Neisseria gonorrhoeae', frequency: 'common' },
    { organism: 'Chlamydia trachomatis', frequency: 'common' },
    { organism: 'Other bacteria (Staph, Strep, H. influenzae)', frequency: 'common' },
    { organism: 'Herpes simplex virus', frequency: 'less_common' },
    { organism: 'Chemical (silver nitrate prophylaxis)', frequency: 'less_common' }
  ],

  syndromicTreatment: {
    firstLine: [
      {
        drugs: [
          { drug: 'Ceftriaxone', dose: '50mg/kg', route: 'IM/IV', frequency: 'single dose (max 125mg)' },
          { drug: 'Erythromycin', dose: '12.5mg/kg', route: 'PO', frequency: 'QID x 14 days' }
        ],
        duration: 'Single dose ceftriaxone + 14 days erythromycin',
        notes: 'Treats both gonococcal and chlamydial infection. Saline eye irrigation.'
      }
    ],
    alternatives: [
      {
        drugs: [
          { drug: 'Spectinomycin', dose: '25mg/kg', route: 'IM', frequency: 'single dose (max 75mg)' },
          { drug: 'Azithromycin', dose: '20mg/kg', route: 'PO', frequency: 'daily x 3 days' }
        ],
        duration: 'Single dose spectinomycin + 3 days azithromycin',
        notes: 'If ceftriaxone unavailable'
      }
    ],
    adjunctive: [
      'Saline eye irrigation every 1-2 hours until discharge clears',
      'Mother and partner should be treated for gonorrhea and chlamydia'
    ]
  },

  partnerManagement: 'Mother and her sexual partner(s) must be treated for gonorrhea and chlamydia.',

  followUp: 'Daily review until improving. Gonococcal ophthalmia can progress to corneal perforation within 24-48 hours.',

  referralCriteria: [
    'URGENT: Suspected gonococcal ophthalmia (hyperacute, copious discharge) - EMERGENCY',
    'Corneal involvement (clouding, ulceration)',
    'Not responding to treatment',
    'Suspected herpes (vesicles, dendritic ulcer)',
    'Systemic infection suspected (sepsis, meningitis)'
  ],

  preventionCounseling: [
    'Prophylaxis at birth: erythromycin 0.5% eye ointment or 1% tetracycline',
    'Screen pregnant women for STIs',
    'Treat infected mothers before delivery',
    'Cesarean delivery does not fully prevent transmission'
  ]
};

// ============================================================================
// ACUTE RESPIRATORY INFECTION SYNDROMIC APPROACH
// ============================================================================

export const ACUTE_RESPIRATORY_SYNDROME: SyndromicProtocol = {
  id: 'acute-respiratory-infection',
  syndrome: 'Acute Respiratory Infection (ARI) Syndromic Approach',
  description: 'Clinical approach to cough, cold, and respiratory symptoms',
  targetPopulation: 'all',

  clinicalFeatures: [
    'Cough (productive or dry)',
    'Nasal congestion/rhinorrhea',
    'Sore throat',
    'Fever',
    'Respiratory distress (severe cases)'
  ],

  possibleCauses: [
    { organism: 'Viral URI (rhinovirus, coronavirus, RSV)', frequency: 'common' },
    { organism: 'Influenza', frequency: 'common' },
    { organism: 'Streptococcus pneumoniae (pneumonia)', frequency: 'common' },
    { organism: 'Haemophilus influenzae', frequency: 'less_common' },
    { organism: 'Mycoplasma pneumoniae', frequency: 'less_common' },
    { organism: 'Mycobacterium tuberculosis', frequency: 'less_common' }
  ],

  syndromicTreatment: {
    firstLine: [
      {
        drugs: [
          { drug: 'Paracetamol', dose: '500-1000mg (adult), 15mg/kg (child)', route: 'PO', frequency: 'Q4-6H PRN' }
        ],
        duration: 'As needed for fever/pain',
        notes: 'Viral URI: supportive care only. NO ANTIBIOTICS for simple URI/cold.'
      },
      {
        drugs: [
          { drug: 'Amoxicillin', dose: '500mg-1g (adult), 80-90mg/kg/day (child)', route: 'PO', frequency: 'TID x 5 days' }
        ],
        duration: '5 days',
        notes: 'For suspected bacterial pneumonia (fever, tachypnea, crackles, chest pain)'
      }
    ],
    alternatives: [
      {
        drugs: [
          { drug: 'Amoxicillin-clavulanate', dose: '875/125mg', route: 'PO', frequency: 'BID x 5-7 days' }
        ],
        duration: '5-7 days',
        notes: 'If no response to amoxicillin or COPD/smoker'
      },
      {
        drugs: [
          { drug: 'Azithromycin', dose: '500mg day 1, then 250mg daily', route: 'PO', frequency: 'daily x 5 days' }
        ],
        duration: '5 days',
        notes: 'For atypical pneumonia or penicillin allergy'
      }
    ],
    adjunctive: [
      'Hydration',
      'Honey for cough (>1 year old)',
      'Saline nasal drops',
      'Avoid cough suppressants in productive cough'
    ]
  },

  partnerManagement: 'Not applicable. Respiratory hygiene and hand washing to prevent spread.',

  followUp: 'Return if: fever >3 days, worsening symptoms, difficulty breathing, blood in sputum.',

  referralCriteria: [
    'Signs of severe pneumonia (RR >30, hypoxia, confusion, shock)',
    'Cough >3 weeks (evaluate for TB)',
    'Hemoptysis',
    'Immunocompromised patient',
    'Not improving after 48-72 hours of antibiotics'
  ],

  preventionCounseling: [
    'Respiratory hygiene (cover cough)',
    'Hand washing',
    'Influenza vaccination (annual)',
    'Pneumococcal vaccination (high-risk groups)',
    'Avoid smoke exposure'
  ]
};

// ============================================================================
// ACUTE DIARRHEA SYNDROMIC APPROACH
// ============================================================================

export const ACUTE_DIARRHEA_SYNDROME: SyndromicProtocol = {
  id: 'acute-diarrhea',
  syndrome: 'Acute Diarrheal Disease Syndromic Approach',
  description: 'Clinical approach to acute diarrhea with or without vomiting',
  targetPopulation: 'all',

  clinicalFeatures: [
    'Increased stool frequency (≥3 loose stools/day)',
    'Change in stool consistency (loose or watery)',
    'Duration <14 days',
    'May have: vomiting, fever, abdominal cramps, blood in stool'
  ],

  possibleCauses: [
    { organism: 'Viral (rotavirus, norovirus)', frequency: 'common' },
    { organism: 'Enterotoxigenic E. coli', frequency: 'common' },
    { organism: 'Campylobacter', frequency: 'common' },
    { organism: 'Salmonella', frequency: 'less_common' },
    { organism: 'Shigella', frequency: 'less_common' },
    { organism: 'Vibrio cholerae (in endemic/epidemic settings)', frequency: 'less_common' },
    { organism: 'Giardia/Entamoeba (subacute/chronic)', frequency: 'less_common' }
  ],

  syndromicTreatment: {
    firstLine: [
      {
        drugs: [
          { drug: 'ORS (oral rehydration salts)', dose: 'Ad libitum (as much as patient will take)', route: 'PO', frequency: 'Continuously' },
          { drug: 'Zinc', dose: '20mg (>6mo), 10mg (<6mo)', route: 'PO', frequency: 'daily x 10-14 days' }
        ],
        duration: 'ORS until diarrhea stops, Zinc for 10-14 days',
        notes: 'MOST diarrhea is viral and self-limiting. Rehydration is the key treatment.'
      }
    ],
    alternatives: [
      {
        drugs: [
          { drug: 'Ciprofloxacin', dose: '500mg', route: 'PO', frequency: 'BID x 3 days' }
        ],
        duration: '3 days',
        notes: 'For bloody diarrhea (dysentery) suggesting bacterial cause'
      },
      {
        drugs: [
          { drug: 'Metronidazole', dose: '400mg TID (adult), 7.5mg/kg TID (child)', route: 'PO', frequency: 'TID x 5-7 days' }
        ],
        duration: '5-7 days',
        notes: 'If giardiasis or amebiasis suspected (subacute, bloating, travel)'
      },
      {
        drugs: [
          { drug: 'Azithromycin', dose: '500mg', route: 'PO', frequency: 'daily x 3 days' }
        ],
        duration: '3 days',
        notes: 'Alternative for dysentery, especially if quinolone resistance suspected'
      }
    ],
    adjunctive: [
      'Continue feeding (do not stop food)',
      'Avoid sugary drinks, fruit juices',
      'BRAT diet as tolerated',
      'Avoid antidiarrheals (loperamide) in bloody diarrhea'
    ]
  },

  partnerManagement: 'Food and water hygiene. Investigate common source if outbreak suspected.',

  followUp: 'Return if: blood in stool, severe dehydration, fever >48 hours, no improvement in 3 days.',

  referralCriteria: [
    'Severe dehydration not responding to ORS',
    'Bloody diarrhea with fever and toxicity',
    'Suspected cholera (rice-water stool, rapid dehydration)',
    'Immunocompromised patient',
    'Diarrhea >14 days (chronic - needs investigation)',
    'Young infant (<2 months)'
  ],

  preventionCounseling: [
    'Safe water (boil or treat)',
    'Hand washing with soap',
    'Safe food handling',
    'Rotavirus vaccination (infants)',
    'Exclusive breastfeeding (infants <6 months)'
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const ALL_SYNDROMIC_PROTOCOLS: SyndromicProtocol[] = [
  URETHRAL_DISCHARGE_SYNDROME,
  VAGINAL_DISCHARGE_SYNDROME,
  GENITAL_ULCER_SYNDROME,
  SCROTAL_SWELLING_SYNDROME,
  LOWER_ABDOMINAL_PAIN_SYNDROME,
  INGUINAL_BUBO_SYNDROME,
  NEONATAL_CONJUNCTIVITIS_SYNDROME,
  ACUTE_RESPIRATORY_SYNDROME,
  ACUTE_DIARRHEA_SYNDROME
];

export function getSyndromicProtocol(syndromeId: string): SyndromicProtocol | undefined {
  return ALL_SYNDROMIC_PROTOCOLS.find(p => p.id === syndromeId);
}

export function getSTISyndromes(): SyndromicProtocol[] {
  return ALL_SYNDROMIC_PROTOCOLS.filter(p =>
    ['urethral-discharge', 'vaginal-discharge', 'genital-ulcer',
     'scrotal-swelling', 'lower-abdominal-pain-female', 'inguinal-bubo',
     'neonatal-conjunctivitis'].includes(p.id)
  );
}

// Quick reference
export const SYNDROMIC_QUICK_REFERENCE = `
╔════════════════════════════════════════════════════════════════════════════╗
║               WHO SYNDROMIC MANAGEMENT - QUICK REFERENCE                   ║
║               Treatment Without Laboratory Diagnosis                        ║
╠════════════════════════════════════════════════════════════════════════════╣
║ URETHRAL DISCHARGE (Male):                                                 ║
║ → Ceftriaxone 500mg IM SINGLE DOSE                                        ║
║ → Azithromycin 1g PO SINGLE DOSE                                          ║
║ (Covers gonorrhea + chlamydia)                                             ║
╠════════════════════════════════════════════════════════════════════════════╣
║ VAGINAL DISCHARGE:                                                         ║
║ → Metronidazole 2g PO SINGLE DOSE (BV, trich)                             ║
║ → Fluconazole 150mg PO SINGLE DOSE (candida)                              ║
║ → Add STI treatment if cervicitis risk (gonorrhea + chlamydia Rx above)   ║
╠════════════════════════════════════════════════════════════════════════════╣
║ GENITAL ULCER:                                                             ║
║ → Benzathine penicillin 2.4M units IM SINGLE DOSE (syphilis)              ║
║ → Aciclovir 400mg PO TID x 7 days (herpes)                                ║
║ → Add Azithromycin 1g if chancroid suspected (painful ulcer + bubo)       ║
╠════════════════════════════════════════════════════════════════════════════╣
║ PID (Lower Abdominal Pain + Cervical Motion Tenderness):                   ║
║ → Ceftriaxone 500mg IM SINGLE DOSE                                        ║
║ → Doxycycline 100mg PO BID x 14 days                                      ║
║ → Metronidazole 400mg PO BID x 14 days                                    ║
╠════════════════════════════════════════════════════════════════════════════╣
║ NEONATAL CONJUNCTIVITIS (Ophthalmia Neonatorum):                          ║
║ → Ceftriaxone 50mg/kg IM SINGLE DOSE (max 125mg) - EMERGENCY              ║
║ → Erythromycin 12.5mg/kg PO QID x 14 days                                 ║
║ → Saline irrigation hourly                                                 ║
║ → TREAT MOTHER AND PARTNER                                                 ║
╠════════════════════════════════════════════════════════════════════════════╣
║ ACUTE DIARRHEA:                                                            ║
║ → ORS + Zinc (most cases - viral, self-limiting)                          ║
║ → Ciprofloxacin 500mg BID x 3d IF bloody diarrhea (dysentery)            ║
║ → Metronidazole IF giardia/ameba suspected                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ PARTNER TREATMENT: Essential for all STI syndromes                         ║
║ HIV TESTING: Offer to all patients with STI syndromes                      ║
╚════════════════════════════════════════════════════════════════════════════╝
`;
