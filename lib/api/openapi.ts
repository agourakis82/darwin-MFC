/**
 * OpenAPI 3.0 Specification for Darwin-MFC API
 *
 * Medical reference API for Primary Care
 * - Diseases (Doenças) with clinical protocols
 * - Medications (Medicamentos) with dosage and interactions
 * - Clinical Calculators for evidence-based decision support
 *
 * All endpoints return data in Portuguese (pt) and support 9 languages
 * API is read-only and serves static medical reference data
 */

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Darwin-MFC API',
    version: '1.0.0',
    description: 'Medical reference API for Primary Care - Diseases, Medications, and Clinical Calculators',
    contact: {
      name: 'Darwin Medical Foundation Cluster',
      email: 'darwin@agourakis.med.br',
      url: 'https://mfc.agourakis.med.br'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    },
    'x-academic-standard': 'Q1 (Nature/Cell level)',
    'x-languages': ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi']
  },
  servers: [
    {
      url: 'https://mfc.agourakis.med.br',
      description: 'Production'
    },
    {
      url: 'http://localhost:3000',
      description: 'Development'
    }
  ],
  paths: {
    // ============================================================================
    // DOENÇAS (DISEASES) ENDPOINTS
    // ============================================================================

    '/api/doencas': {
      get: {
        tags: ['Doenças'],
        summary: 'List all diseases',
        description: 'Returns a paginated list of diseases in the database. Each disease includes quick view and full clinical content with citations.',
        operationId: 'listDoencas',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number (1-indexed)',
            schema: { type: 'integer', default: 1, minimum: 1 }
          },
          {
            name: 'pageSize',
            in: 'query',
            description: 'Number of results per page',
            schema: { type: 'integer', default: 20, minimum: 1, maximum: 100 }
          },
          {
            name: 'categoria',
            in: 'query',
            description: 'Filter by disease category',
            schema: {
              type: 'string',
              enum: [
                'cardiovascular', 'metabolico', 'respiratorio', 'musculoesqueletico',
                'saude_mental', 'infecciosas', 'dermatologico', 'gastrointestinal',
                'neurologico', 'endocrino', 'hematologico', 'urologico', 'ginecologico',
                'pediatrico', 'geriatrico', 'outros'
              ]
            }
          },
          {
            name: 'search',
            in: 'query',
            description: 'Search by disease name, synonym, CIAP-2 or CID-10 code',
            schema: { type: 'string' }
          },
          {
            name: 'ciap2',
            in: 'query',
            description: 'Filter by CIAP-2 classification code',
            schema: { type: 'string', pattern: '^[A-Z]\\d{2}$' }
          },
          {
            name: 'cid10',
            in: 'query',
            description: 'Filter by CID-10 classification code',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Successful response with diseases list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Doenca' }
                    },
                    pagination: {
                      type: 'object',
                      properties: {
                        page: { type: 'integer', example: 1 },
                        pageSize: { type: 'integer', example: 20 },
                        total: { type: 'integer', example: 82 },
                        totalPages: { type: 'integer', example: 5 }
                      }
                    }
                  }
                },
                examples: {
                  example1: {
                    value: {
                      success: true,
                      data: [
                        {
                          id: 'hipertensao-arterial',
                          titulo: 'Hipertensão Arterial Sistêmica (HAS)',
                          categoria: 'cardiovascular',
                          ciap2: ['K86', 'K87'],
                          cid10: ['I10', 'I11', 'I12', 'I13']
                        }
                      ],
                      pagination: {
                        page: 1,
                        pageSize: 20,
                        total: 82,
                        totalPages: 5
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid query parameters',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },

    '/api/doencas/{id}': {
      get: {
        tags: ['Doenças'],
        summary: 'Get disease by ID',
        description: 'Returns detailed information about a specific disease including epidemiology, diagnosis, treatment, and follow-up with full citations.',
        operationId: 'getDoencaById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Disease ID (e.g., hipertensao-arterial)',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Disease details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/DoencaDetailed' }
                  }
                }
              }
            }
          },
          404: {
            description: 'Disease not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },

    // ============================================================================
    // MEDICAMENTOS (MEDICATIONS) ENDPOINTS
    // ============================================================================

    '/api/medicamentos': {
      get: {
        tags: ['Medicamentos'],
        summary: 'List all medications',
        description: 'Returns a paginated list of medications from RENAME 2024. Includes therapeutic classification, dosage, interactions, and safety information.',
        operationId: 'listMedicamentos',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number (1-indexed)',
            schema: { type: 'integer', default: 1, minimum: 1 }
          },
          {
            name: 'pageSize',
            in: 'query',
            description: 'Number of results per page',
            schema: { type: 'integer', default: 20, minimum: 1, maximum: 100 }
          },
          {
            name: 'classe',
            in: 'query',
            description: 'Filter by therapeutic class',
            schema: {
              type: 'string',
              enum: [
                'anti_hipertensivo', 'anticoagulante', 'antiagregante', 'hipolipemiante',
                'antidiabetico', 'antibiotico', 'antiviral', 'antifungico',
                'antidepressivo', 'ansiolitico', 'antipsicotico', 'analgesico',
                'anti_inflamatorio', 'aine', 'broncodilatador', 'corticoide_inalatorio',
                'inibidor_bomba_protonica', 'antiemetico', 'anti_histaminico',
                'vitamina', 'suplemento'
              ]
            }
          },
          {
            name: 'search',
            in: 'query',
            description: 'Search by generic name, commercial name, or ATC code',
            schema: { type: 'string' }
          },
          {
            name: 'rename',
            in: 'query',
            description: 'Filter by RENAME availability (true = available in RENAME)',
            schema: { type: 'boolean' }
          },
          {
            name: 'atc',
            in: 'query',
            description: 'Filter by ATC code',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Successful response with medications list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Medicamento' }
                    },
                    pagination: {
                      type: 'object',
                      properties: {
                        page: { type: 'integer', example: 1 },
                        pageSize: { type: 'integer', example: 20 },
                        total: { type: 'integer', example: 138 },
                        totalPages: { type: 'integer', example: 7 }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid query parameters',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },

    '/api/medicamentos/{id}': {
      get: {
        tags: ['Medicamentos'],
        summary: 'Get medication by ID',
        description: 'Returns detailed information about a specific medication including indications, dosages, contraindications, interactions, and special populations.',
        operationId: 'getMedicamentoById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Medication ID (e.g., enalapril)',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Medication details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/MedicamentoDetailed' }
                  }
                }
              }
            }
          },
          404: {
            description: 'Medication not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },

    '/api/medicamentos/interacoes': {
      post: {
        tags: ['Medicamentos'],
        summary: 'Check drug interactions',
        description: 'Check for interactions between multiple medications. Returns severity level and recommendations.',
        operationId: 'checkInteracoes',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['medicamentoIds'],
                properties: {
                  medicamentoIds: {
                    type: 'array',
                    items: { type: 'string' },
                    minItems: 2,
                    example: ['enalapril', 'losartana']
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Interaction analysis',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        medicamentos: {
                          type: 'array',
                          items: { type: 'string' }
                        },
                        interacoes: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              medicamento1: { type: 'string' },
                              medicamento2: { type: 'string' },
                              gravidade: {
                                type: 'string',
                                enum: ['leve', 'moderada', 'grave', 'contraindicada']
                              },
                              efeito: { type: 'string' },
                              conduta: { type: 'string' }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid medication IDs or request format',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },

    // ============================================================================
    // CALCULADORAS (CLINICAL CALCULATORS) ENDPOINTS
    // ============================================================================

    '/api/calculadoras': {
      get: {
        tags: ['Calculadoras'],
        summary: 'List all clinical calculators',
        description: 'Returns available clinical calculators for evidence-based decision support.',
        operationId: 'listCalculadoras',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number (1-indexed)',
            schema: { type: 'integer', default: 1, minimum: 1 }
          },
          {
            name: 'pageSize',
            in: 'query',
            description: 'Number of results per page',
            schema: { type: 'integer', default: 20, minimum: 1, maximum: 100 }
          },
          {
            name: 'category',
            in: 'query',
            description: 'Filter by calculator category',
            schema: {
              type: 'string',
              enum: [
                'cardiovascular', 'renal', 'metabolic', 'infectious',
                'respiratory', 'psychiatric', 'obstetric', 'pediatric', 'general'
              ]
            }
          },
          {
            name: 'search',
            in: 'query',
            description: 'Search by calculator name or description',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Successful response with calculators list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Calculator' }
                    },
                    pagination: {
                      type: 'object',
                      properties: {
                        page: { type: 'integer', example: 1 },
                        pageSize: { type: 'integer', example: 20 },
                        total: { type: 'integer', example: 25 },
                        totalPages: { type: 'integer', example: 2 }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid query parameters',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },

    '/api/calculadoras/{id}': {
      get: {
        tags: ['Calculadoras'],
        summary: 'Get calculator by ID',
        description: 'Returns detailed information about a specific clinical calculator including formula, variables, and interpretation.',
        operationId: 'getCalculadoraById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Calculator ID (e.g., ckd-epi)',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Calculator details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/CalculatorDetailed' }
                  }
                }
              }
            }
          },
          404: {
            description: 'Calculator not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Calculadoras'],
        summary: 'Calculate using a specific calculator',
        description: 'Execute a clinical calculator with provided parameters.',
        operationId: 'executeCalculator',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Calculator ID (e.g., ckd-epi)',
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  parameters: {
                    type: 'object',
                    description: 'Calculator-specific input parameters',
                    example: {
                      creatinine: 1.2,
                      age: 45,
                      gender: 'M',
                      race: 'white'
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Calculation result',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        calculatorId: { type: 'string', example: 'ckd-epi' },
                        result: {
                          type: 'object',
                          properties: {
                            value: { type: 'number', example: 87.5 },
                            unit: { type: 'string', example: 'mL/min/1.73m²' },
                            category: { type: 'string', example: 'CKD Stage 1' },
                            interpretation: { type: 'string' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid parameters or missing required fields',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          404: {
            description: 'Calculator not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },

    // ============================================================================
    // REFERENCES AND METADATA ENDPOINTS
    // ============================================================================

    '/api/references': {
      get: {
        tags: ['References'],
        summary: 'List all references',
        description: 'Returns bibliography database with Vancouver-style citations.',
        operationId: 'listReferences',
        parameters: [
          {
            name: 'type',
            in: 'query',
            description: 'Filter by reference type',
            schema: {
              type: 'string',
              enum: ['artigo', 'portaria', 'lei', 'nota_tecnica', 'site', 'livro', 'diretriz', 'relatorio']
            }
          },
          {
            name: 'search',
            in: 'query',
            description: 'Search by title or author',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'References list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Reference' }
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },

    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check endpoint',
        description: 'Verify API availability and status',
        operationId: 'healthCheck',
        responses: {
          200: {
            description: 'API is operational',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    timestamp: { type: 'string', format: 'date-time' },
                    status: { type: 'string', example: 'operational' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  components: {
    schemas: {
      // ========================================================================
      // ERROR SCHEMA
      // ========================================================================

      Error: {
        type: 'object',
        required: ['success', 'error'],
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            required: ['code', 'message'],
            properties: {
              code: { type: 'string', example: 'INVALID_PARAMETER' },
              message: { type: 'string', example: 'Invalid page number' },
              details: { type: 'object' }
            }
          }
        }
      },

      // ========================================================================
      // CITATION SCHEMA
      // ========================================================================

      Citation: {
        type: 'object',
        required: ['refId'],
        properties: {
          refId: { type: 'string', description: 'Reference ID from bibliography' },
          page: { type: 'string', description: 'Specific page or location in reference' },
          note: { type: 'string', description: 'Contextual note about the citation' }
        }
      },

      Reference: {
        type: 'object',
        required: ['id', 'type', 'title', 'year'],
        properties: {
          id: { type: 'string', example: 'vigitel-2023' },
          type: {
            type: 'string',
            enum: ['artigo', 'portaria', 'lei', 'nota_tecnica', 'site', 'livro', 'diretriz', 'relatorio']
          },
          authors: {
            type: 'array',
            items: { type: 'string' }
          },
          title: { type: 'string', example: 'Vigilância de Fatores de Risco e Proteção para Doenças Crônicas por Inquérito Telefônico' },
          journal: { type: 'string', description: 'Journal name (for articles)' },
          year: { type: 'integer', example: 2023 },
          volume: { type: 'string' },
          pages: { type: 'string' },
          doi: { type: 'string', pattern: '^10\\.' },
          pmid: { type: 'string' },
          url: { type: 'string', format: 'uri' },
          accessDate: { type: 'string', format: 'date' },
          publisher: { type: 'string' },
          edition: { type: 'string' },
          note: { type: 'string' }
        }
      },

      // ========================================================================
      // DOENÇA (DISEASE) SCHEMAS
      // ========================================================================

      DoencaBasic: {
        type: 'object',
        required: ['id', 'titulo', 'categoria', 'ciap2', 'cid10'],
        properties: {
          id: { type: 'string', example: 'hipertensao-arterial' },
          titulo: { type: 'string', example: 'Hipertensão Arterial Sistêmica (HAS)' },
          sinonimos: {
            type: 'array',
            items: { type: 'string' },
            example: ['Pressão alta', 'HAS', 'Hipertensão']
          },
          categoria: {
            type: 'string',
            enum: [
              'cardiovascular', 'metabolico', 'respiratorio', 'musculoesqueletico',
              'saude_mental', 'infecciosas', 'dermatologico', 'gastrointestinal',
              'neurologico', 'endocrino', 'hematologico', 'urologico', 'ginecologico',
              'pediatrico', 'geriatrico', 'outros'
            ]
          },
          ciap2: {
            type: 'array',
            items: { type: 'string', pattern: '^[A-Z]\\d{2}$' }
          },
          cid10: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      },

      Doenca: {
        allOf: [
          { $ref: '#/components/schemas/DoencaBasic' },
          {
            type: 'object',
            properties: {
              doid: { type: 'string', example: 'DOID:10763' },
              snomedCT: { type: 'string', example: '38341003' },
              meshId: { type: 'string' },
              umlsCui: { type: 'string', example: 'C0020538' },
              cid11: { type: 'array', items: { type: 'string' } },
              lastUpdate: { type: 'string', format: 'date-time' }
            }
          }
        ]
      },

      QuickView: {
        type: 'object',
        required: ['definicao', 'criteriosDiagnosticos', 'tratamentoPrimeiraLinha', 'redFlags'],
        properties: {
          definicao: {
            type: 'string',
            example: 'Condição clínica multifatorial caracterizada por elevação sustentada dos níveis pressóricos ≥140/90 mmHg'
          },
          criteriosDiagnosticos: {
            type: 'array',
            items: { type: 'string' }
          },
          tratamentoPrimeiraLinha: {
            type: 'object',
            properties: {
              naoFarmacologico: {
                type: 'array',
                items: { type: 'string' }
              },
              farmacologico: {
                type: 'array',
                items: { type: 'string' }
              }
            }
          },
          metasTerapeuticas: {
            type: 'array',
            items: { type: 'string' }
          },
          examesIniciais: {
            type: 'array',
            items: { type: 'string' }
          },
          redFlags: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      },

      Epidemiologia: {
        type: 'object',
        properties: {
          prevalencia: { type: 'string', example: '32% da população adulta brasileira' },
          incidencia: { type: 'string', example: '~500 mil novos casos/ano' },
          mortalidade: { type: 'string' },
          faixaEtaria: { type: 'string' },
          fatoresRisco: {
            type: 'array',
            items: { type: 'string' }
          },
          citations: {
            type: 'array',
            items: { $ref: '#/components/schemas/Citation' }
          }
        }
      },

      QuadroCli: {
        type: 'object',
        properties: {
          sintomasPrincipais: {
            type: 'array',
            items: { type: 'string' }
          },
          sinaisExameFisico: {
            type: 'array',
            items: { type: 'string' }
          },
          formasClinicas: {
            type: 'array',
            items: { type: 'string' }
          },
          citations: {
            type: 'array',
            items: { $ref: '#/components/schemas/Citation' }
          }
        }
      },

      DoencaDetailed: {
        allOf: [
          { $ref: '#/components/schemas/Doenca' },
          {
            type: 'object',
            properties: {
              quickView: { $ref: '#/components/schemas/QuickView' },
              fullContent: {
                type: 'object',
                properties: {
                  epidemiologia: { $ref: '#/components/schemas/Epidemiologia' },
                  fisiopatologia: {
                    type: 'object',
                    properties: {
                      texto: { type: 'string' },
                      citations: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Citation' }
                      }
                    }
                  },
                  quadroClinico: { $ref: '#/components/schemas/QuadroCli' },
                  diagnostico: {
                    type: 'object',
                    properties: {
                      criterios: { type: 'array', items: { type: 'string' } },
                      diagnosticoDiferencial: { type: 'array', items: { type: 'string' } },
                      examesLaboratoriais: { type: 'array', items: { type: 'string' } },
                      examesImagem: { type: 'array', items: { type: 'string' } },
                      citations: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Citation' }
                      }
                    }
                  },
                  tratamento: {
                    type: 'object',
                    properties: {
                      objetivos: { type: 'array', items: { type: 'string' } },
                      naoFarmacologico: {
                        type: 'object',
                        properties: {
                          medidas: { type: 'array', items: { type: 'string' } },
                          citations: { type: 'array', items: { $ref: '#/components/schemas/Citation' } }
                        }
                      },
                      farmacologico: {
                        type: 'object',
                        properties: {
                          primeiraLinha: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                classe: { type: 'string' },
                                medicamentos: { type: 'array', items: { type: 'string' } },
                                posologia: { type: 'string' },
                                observacoes: { type: 'string' }
                              }
                            }
                          },
                          segundaLinha: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                classe: { type: 'string' },
                                medicamentos: { type: 'array', items: { type: 'string' } }
                              }
                            }
                          },
                          citations: { type: 'array', items: { $ref: '#/components/schemas/Citation' } }
                        }
                      }
                    }
                  },
                  acompanhamento: {
                    type: 'object',
                    properties: {
                      frequenciaConsultas: { type: 'string' },
                      examesControle: { type: 'array', items: { type: 'string' } },
                      metasTerapeuticas: { type: 'array', items: { type: 'string' } },
                      criteriosEncaminhamento: { type: 'array', items: { type: 'string' } },
                      citations: { type: 'array', items: { $ref: '#/components/schemas/Citation' } }
                    }
                  },
                  prevencao: {
                    type: 'object',
                    properties: {
                      primaria: { type: 'array', items: { type: 'string' } },
                      secundaria: { type: 'array', items: { type: 'string' } },
                      citations: { type: 'array', items: { $ref: '#/components/schemas/Citation' } }
                    }
                  }
                }
              },
              protocolos: { type: 'array', items: { type: 'string' }, description: 'Related protocol IDs' },
              medicamentos: { type: 'array', items: { type: 'string' }, description: 'Related medication IDs' },
              calculadoras: { type: 'array', items: { type: 'string' }, description: 'Related calculator IDs' }
            }
          }
        ]
      },

      // ========================================================================
      // MEDICAMENTO (MEDICATION) SCHEMAS
      // ========================================================================

      ApresentacaoComercial: {
        type: 'object',
        required: ['forma', 'concentracao', 'disponivelSUS'],
        properties: {
          forma: {
            type: 'string',
            enum: [
              'comprimido', 'capsula', 'dragea', 'granulado', 'sache', 'po_oral',
              'solucao_oral', 'suspensao_oral', 'xarope', 'gotas', 'elixir',
              'injetavel', 'injetavel_im', 'injetavel_iv', 'injetavel_sc',
              'creme', 'pomada', 'gel', 'locao', 'colirio', 'spray_nasal',
              'inalatorio', 'aerosol', 'supositorio', 'ovulo', 'adesivo'
            ]
          },
          concentracao: { type: 'string', example: '10 mg' },
          quantidade: { type: 'string', example: '30 comprimidos' },
          disponivelSUS: { type: 'boolean' }
        }
      },

      Posologia: {
        type: 'object',
        required: ['indicacao', 'adultos'],
        properties: {
          indicacao: { type: 'string' },
          adultos: {
            type: 'object',
            required: ['dose', 'frequencia'],
            properties: {
              dose: { type: 'string', example: '10 mg' },
              frequencia: { type: 'string', example: '1-2 vezes ao dia' },
              doseMaxima: { type: 'string' },
              observacoes: { type: 'string' }
            }
          },
          pediatrico: {
            type: 'object',
            properties: {
              dose: { type: 'string' },
              frequencia: { type: 'string' },
              idadeMinima: { type: 'string' },
              doseMaxima: { type: 'string' }
            }
          },
          idosos: {
            type: 'object',
            properties: {
              dose: { type: 'string' },
              observacoes: { type: 'string' }
            }
          }
        }
      },

      Interacao: {
        type: 'object',
        required: ['medicamento', 'gravidade', 'efeito', 'conduta'],
        properties: {
          medicamento: { type: 'string', example: 'losartana' },
          gravidade: {
            type: 'string',
            enum: ['leve', 'moderada', 'grave', 'contraindicada']
          },
          efeito: { type: 'string' },
          mecanismo: { type: 'string' },
          conduta: { type: 'string' }
        }
      },

      AjusteDoseRenal: {
        type: 'object',
        required: ['tfg', 'ajuste'],
        properties: {
          tfg: { type: 'string', example: '>50', description: 'TFG range (>50, 30-50, 15-30, <15)' },
          ajuste: { type: 'string', example: 'Sem ajuste' },
          observacao: { type: 'string' }
        }
      },

      MedicamentoBasic: {
        type: 'object',
        required: ['id', 'nomeGenerico', 'classeTerapeutica', 'rename'],
        properties: {
          id: { type: 'string', example: 'enalapril' },
          nomeGenerico: { type: 'string', example: 'Enalapril' },
          nomesComerciais: {
            type: 'array',
            items: { type: 'string' },
            example: ['Renitec', 'Enacard']
          },
          classeTerapeutica: {
            type: 'string',
            example: 'anti_hipertensivo'
          },
          rename: { type: 'boolean' }
        }
      },

      Medicamento: {
        allOf: [
          { $ref: '#/components/schemas/MedicamentoBasic' },
          {
            type: 'object',
            properties: {
              atcCode: { type: 'string', example: 'C09AA02' },
              rxNormCui: { type: 'string' },
              snomedCT: {
                oneOf: [
                  { type: 'string' },
                  { type: 'array', items: { type: 'string' } }
                ]
              },
              anvisaRegistro: { type: 'string' },
              dcbCode: { type: 'string' },
              subclasse: { type: 'string' },
              apresentacoes: {
                type: 'array',
                items: { $ref: '#/components/schemas/ApresentacaoComercial' }
              },
              mecanismoAcao: { type: 'string' },
              gestacao: {
                type: 'string',
                enum: ['A', 'B', 'C', 'D', 'X', 'N']
              },
              lastUpdate: { type: 'string', format: 'date-time' }
            }
          }
        ]
      },

      MedicamentoDetailed: {
        allOf: [
          { $ref: '#/components/schemas/Medicamento' },
          {
            type: 'object',
            required: [
              'indicacoes', 'contraindicacoes', 'efeitosAdversos', 'interacoes',
              'posologias', 'amamentacao'
            ],
            properties: {
              indicacoes: {
                type: 'array',
                items: { type: 'string' }
              },
              posologias: {
                type: 'array',
                items: { $ref: '#/components/schemas/Posologia' }
              },
              contraindicacoes: {
                type: 'array',
                items: { type: 'string' }
              },
              precaucoes: {
                type: 'array',
                items: { type: 'string' }
              },
              efeitosAdversos: {
                type: 'object',
                required: ['comuns'],
                properties: {
                  comuns: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  graves: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                }
              },
              interacoes: {
                type: 'array',
                items: { $ref: '#/components/schemas/Interacao' }
              },
              ajusteDoseRenal: {
                type: 'array',
                items: { $ref: '#/components/schemas/AjusteDoseRenal' }
              },
              amamentacao: {
                type: 'object',
                required: ['compativel', 'observacao'],
                properties: {
                  compativel: { type: 'boolean' },
                  observacao: { type: 'string' }
                }
              },
              consideracoesEspeciais: {
                type: 'object',
                properties: {
                  idosos: { type: 'string' },
                  hepatopatas: { type: 'string' },
                  pediatrico: { type: 'string' }
                }
              },
              monitorizacao: {
                type: 'array',
                items: { type: 'string' }
              },
              orientacoesPaciente: {
                type: 'array',
                items: { type: 'string' }
              },
              doencasRelacionadas: {
                type: 'array',
                items: { type: 'string' },
                description: 'Related disease IDs'
              }
            }
          }
        ]
      },

      // ========================================================================
      // CALCULATOR SCHEMAS
      // ========================================================================

      CalculatorVariable: {
        type: 'object',
        required: ['name', 'type', 'label'],
        properties: {
          name: { type: 'string' },
          label: { type: 'string' },
          description: { type: 'string' },
          type: {
            type: 'string',
            enum: ['number', 'string', 'boolean', 'select']
          },
          unit: { type: 'string' },
          minValue: { type: 'number' },
          maxValue: { type: 'number' },
          options: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                value: { type: 'string' },
                label: { type: 'string' }
              }
            }
          }
        }
      },

      Calculator: {
        type: 'object',
        required: ['id', 'name', 'description', 'category'],
        properties: {
          id: { type: 'string', example: 'ckd-epi' },
          name: { type: 'string', example: 'CKD-EPI Creatinine Equation' },
          description: { type: 'string' },
          category: {
            type: 'string',
            enum: [
              'cardiovascular', 'renal', 'metabolic', 'infectious',
              'respiratory', 'psychiatric', 'obstetric', 'pediatric', 'general'
            ]
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            example: ['renal', 'function', 'eGFR']
          }
        }
      },

      CalculatorDetailed: {
        allOf: [
          { $ref: '#/components/schemas/Calculator' },
          {
            type: 'object',
            properties: {
              formula: { type: 'string', description: 'Mathematical formula or algorithm' },
              source: { type: 'string', description: 'Origin/citation of the calculator' },
              variables: {
                type: 'array',
                items: { $ref: '#/components/schemas/CalculatorVariable' }
              },
              interpretation: {
                type: 'object',
                properties: {
                  resultUnit: { type: 'string' },
                  categories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        min: { type: 'number' },
                        max: { type: 'number' },
                        label: { type: 'string' },
                        clinical_significance: { type: 'string' }
                      }
                    }
                  }
                }
              },
              limitations: {
                type: 'array',
                items: { type: 'string' }
              },
              references: {
                type: 'array',
                items: { $ref: '#/components/schemas/Citation' }
              }
            }
          }
        ]
      }
    }
  },

  tags: [
    {
      name: 'Doenças',
      description: 'Disease protocols with clinical guidelines and evidence'
    },
    {
      name: 'Medicamentos',
      description: 'Medication information from RENAME 2024 with dosage and interactions'
    },
    {
      name: 'Calculadoras',
      description: 'Clinical calculators for evidence-based decision support'
    },
    {
      name: 'References',
      description: 'Bibliography and citations in Vancouver format'
    },
    {
      name: 'Health',
      description: 'API health and status endpoints'
    }
  ]
};
