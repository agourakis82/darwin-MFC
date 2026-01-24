'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Copy, ExternalLink, ChevronDown, ChevronUp, Code2 } from 'lucide-react';
import { PageContainer } from '@/app/components/Layout/Containers';
import { openApiSpec } from '@/lib/api/openapi';

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  summary: string;
  description: string;
}

export default function APIDocs() {
  const t = useTranslations('common');
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const endpoints = extractEndpoints();

  function extractEndpoints(): APIEndpoint[] {
    const endpoints: APIEndpoint[] = [];
    const paths = openApiSpec.paths as Record<string, any>;

    Object.entries(paths).forEach(([path, methods]) => {
      Object.entries(methods as Record<string, any>).forEach(([method, details]) => {
        if (['get', 'post', 'put', 'delete'].includes(method.toLowerCase())) {
          endpoints.push({
            method: method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE',
            path,
            summary: details.summary || '',
            description: details.description || ''
          });
        }
      });
    });

    return endpoints;
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'POST':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'DELETE':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const baseUrl = openApiSpec.servers[0].url;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Darwin-MFC API Documentation
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Medical reference API for Primary Care - OpenAPI 3.0 Specification
          </p>
        </div>
      </div>

      {/* Content */}
      <PageContainer className="py-12">
        {/* API Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Base URL</h3>
            <div className="flex items-center gap-2 mb-2">
              <code className="text-sm bg-white dark:bg-gray-800 px-3 py-2 rounded font-mono text-gray-900 dark:text-gray-100 flex-1 overflow-x-auto">
                {baseUrl}
              </code>
              <button
                onClick={() => copyToClipboard(baseUrl, 'baseurl')}
                className="p-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition"
              >
                {copied === 'baseurl' ? '✓' : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              API Version
            </h3>
            <p className="text-lg font-mono text-green-900 dark:text-green-100">
              {openApiSpec.info.version}
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              Academic Standard
            </h3>
            <p className="text-lg font-mono text-purple-900 dark:text-purple-100">
              Q1 (Nature/Cell)
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            API Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Features
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>82 diseases with full clinical protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>138 medications from RENAME 2024</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>25+ validated clinical calculators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>CIAP-2 and CID-10/11 coding</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Data Coding Systems
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                  <span>SNOMED-CT, MeSH, DOID, UMLS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                  <span>ATC, RxNorm, DrugBank IDs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                  <span>HPO, LOINC for lab tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                  <span>9 language translations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Endpoints Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            API Endpoints
          </h2>

          <div className="space-y-4">
            {endpoints.map((endpoint, index) => {
              const id = `${endpoint.method}-${endpoint.path}`;
              const isExpanded = expandedEndpoint === id;

              return (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md dark:hover:shadow-gray-700 transition"
                >
                  {/* Endpoint Header */}
                  <button
                    onClick={() =>
                      setExpandedEndpoint(isExpanded ? null : id)
                    }
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    <span
                      className={`px-3 py-1 rounded font-bold text-sm whitespace-nowrap ${getMethodColor(
                        endpoint.method
                      )}`}
                    >
                      {endpoint.method}
                    </span>
                    <span className="text-left flex-1">
                      <div className="font-mono text-sm text-gray-900 dark:text-gray-100 font-semibold break-all">
                        {endpoint.path}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {endpoint.summary}
                      </div>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {/* Endpoint Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Description
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {endpoint.description}
                        </p>
                      </div>

                      {/* Example cURL */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Example Request
                        </h4>
                        <div className="relative">
                          <code className="block bg-gray-900 dark:bg-black text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
                            curl -X {endpoint.method} \{'\n'}
                            {'  '}{baseUrl}{endpoint.path}
                          </code>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                `curl -X ${endpoint.method} \\
  ${baseUrl}${endpoint.path}`,
                                id
                              )
                            }
                            className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition text-gray-300"
                          >
                            {copied === id ? '✓' : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tags Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            API Tags
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {openApiSpec.tags.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {tag.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tag.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* OpenAPI Spec Download */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            OpenAPI Specification
          </h2>
          <p className="text-blue-800 dark:text-blue-200 mb-6">
            The complete OpenAPI 3.0 specification is available for integration with
            Swagger UI, Postman, or other API documentation tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/api/openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <ExternalLink className="w-4 h-4" />
              Download OpenAPI JSON
            </a>
            <a
              href="/api/swagger"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
            >
              <ExternalLink className="w-4 h-4" />
              View in Swagger UI
            </a>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Code Examples
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* JavaScript Example */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
                <h3 className="font-semibold text-gray-100">JavaScript</h3>
              </div>
              <div className="p-6 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono">
                  {`// Fetch a disease by ID
const response = await fetch(
  'https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial'
);
const data = await response.json();

// Search for medications
const medications = await fetch(
  'https://mfc.agourakis.med.br/api/medicamentos?search=losartana'
);
const medData = await medications.json();

// Calculate using clinical calculator
const calc = await fetch(
  'https://mfc.agourakis.med.br/api/calculadoras/ckd-epi',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      parameters: {
        creatinine: 1.2,
        age: 45,
        gender: 'M'
      }
    })
  }
);`}
                </code>
              </div>
            </div>

            {/* Python Example */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
                <h3 className="font-semibold text-gray-100">Python</h3>
              </div>
              <div className="p-6 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono">
                  {`import requests

# Get disease details
response = requests.get(
  'https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial'
)
disease = response.json()

# Filter medications by class
medications = requests.get(
  'https://mfc.agourakis.med.br/api/medicamentos',
  params={'classe': 'anti_hipertensivo'}
)

# Check drug interactions
interactions = requests.post(
  'https://mfc.agourakis.med.br/api/medicamentos/interacoes',
  json={
    'medicamentoIds': ['enalapril', 'losartana']
  }
)`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Response Format */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Response Format
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All API responses follow a consistent JSON structure:
          </p>
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-6 overflow-x-auto">
              <code className="text-sm text-gray-300 font-mono">
                {`{
  "success": true,
  "data": {
    // Response data - varies by endpoint
  },
  "pagination": {  // Only for list endpoints
    "page": 1,
    "pageSize": 20,
    "total": 82,
    "totalPages": 5
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid page number",
    "details": { /* additional info */ }
  }
}`}
              </code>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Support & Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Technical Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Email:{' '}
                <a
                  href="mailto:darwin@agourakis.med.br"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  darwin@agourakis.med.br
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Live Application
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visit:{' '}
                <a
                  href="https://mfc.agourakis.med.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 inline-flex"
                >
                  mfc.agourakis.med.br
                  <ExternalLink className="w-4 h-4" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
