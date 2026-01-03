/**
 * DARWIN-MFC ONTOLOGY SERVICES
 * ============================
 *
 * Browser and API services for all supported ontology systems.
 */

// SNOMED-CT browser service
export {
  SnomedBrowserService,
  snomedBrowser,
  SnomedApiError,
  getSnomedConcept,
} from './snomed-browser';

// LOINC browser service
export {
  LoincBrowser,
  getLoincBrowser,
  createLoincBrowser,
} from './loinc-browser';
