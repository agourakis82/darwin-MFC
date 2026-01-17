/**
 * FHIR R4 Bundle Implementation - Darwin-MFC
 * ==========================================
 *
 * Class-based FHIR R4 Bundle implementation with full support for:
 * - Document, Collection, and Transaction bundles
 * - Patient, Observation, and MedicationRequest resources
 * - Comprehensive validation
 * - JSON serialization
 *
 * @see https://www.hl7.org/fhir/bundle.html
 */

import {
  FHIRBundle,
  FHIRResource,
  FHIRPatient,
  FHIRObservation,
  FHIRMedicationRequest,
  FHIRCondition,
  FHIRAnyResource,
  FHIRIdentifier,
  FHIRCodeableConcept,
  isValidFHIRResource,
} from './types';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Supported bundle types for createBundle method
 */
export type SupportedBundleType = 'document' | 'collection' | 'transaction';

/**
 * All valid FHIR R4 bundle types
 */
export type FHIRBundleType = FHIRBundle['type'];

/**
 * Bundle entry with optional request/response for transaction bundles
 */
export interface BundleEntry {
  fullUrl?: string;
  resource?: FHIRResource;
  search?: {
    mode?: 'match' | 'include' | 'outcome';
    score?: number;
  };
  request?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    ifNoneMatch?: string;
    ifModifiedSince?: string;
    ifMatch?: string;
    ifNoneExist?: string;
  };
  response?: {
    status: string;
    location?: string;
    etag?: string;
    lastModified?: string;
    outcome?: FHIRResource;
  };
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

/**
 * Validation error details
 */
export interface ValidationError {
  code: string;
  message: string;
  path?: string;
  severity: 'error';
}

/**
 * Validation warning details
 */
export interface ValidationWarning {
  code: string;
  message: string;
  path?: string;
  severity: 'warning';
}

/**
 * Options for bundle creation
 */
export interface BundleCreateOptions {
  id?: string;
  baseUrl?: string;
  timestamp?: string;
  profile?: string[];
}

/**
 * Options for adding entries
 */
export interface AddEntryOptions {
  fullUrl?: string;
  generateId?: boolean;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

// ============================================================================
// FHIR BUNDLE CLASS
// ============================================================================

/**
 * FHIRBundleBuilder - Class-based FHIR R4 Bundle implementation
 *
 * Provides an object-oriented API for creating and managing FHIR R4 bundles.
 *
 * @example
 * ```typescript
 * const bundle = new FHIRBundleBuilder();
 * bundle.createBundle('collection');
 *
 * bundle.addEntry({
 *   resourceType: 'Patient',
 *   id: 'patient-1',
 *   name: [{ given: ['John'], family: 'Doe' }]
 * });
 *
 * const result = bundle.validate();
 * const json = bundle.toJSON();
 * ```
 */
export class FHIRBundleBuilder {
  private bundle: FHIRBundle;
  private baseUrl: string;

  /**
   * Creates a new FHIRBundleBuilder instance
   * @param baseUrl - Base URL for resource references (default: 'urn:uuid')
   */
  constructor(baseUrl: string = 'urn:uuid') {
    this.baseUrl = baseUrl;
    this.bundle = this.createInitialBundle('collection');
  }

  // ==========================================================================
  // BUNDLE CREATION
  // ==========================================================================

  /**
   * Creates a new FHIR R4 Bundle with specified type
   *
   * @param type - Bundle type: 'document', 'collection', or 'transaction'
   * @param options - Optional configuration for bundle creation
   * @returns The created FHIRBundle object
   *
   * @example
   * ```typescript
   * const bundle = new FHIRBundleBuilder();
   * bundle.createBundle('document', {
   *   id: 'my-document-bundle',
   *   baseUrl: 'http://example.org/fhir'
   * });
   * ```
   */
  createBundle(type: SupportedBundleType, options: BundleCreateOptions = {}): FHIRBundle {
    this.bundle = this.createInitialBundle(type, options);

    if (options.baseUrl) {
      this.baseUrl = options.baseUrl;
    }

    return this.bundle;
  }

  /**
   * Internal method to create the initial bundle structure
   */
  private createInitialBundle(
    type: SupportedBundleType,
    options: BundleCreateOptions = {}
  ): FHIRBundle {
    const timestamp = options.timestamp || new Date().toISOString();
    const id = options.id || this.generateUUID();

    const bundle: FHIRBundle = {
      resourceType: 'Bundle',
      id,
      meta: {
        lastUpdated: timestamp,
        profile: options.profile || [],
      },
      type,
      timestamp,
      entry: [],
    };

    // Document bundles typically need a Composition as first entry
    // Collection bundles are generic containers
    // Transaction bundles need request elements on each entry

    return bundle;
  }

  // ==========================================================================
  // ENTRY MANAGEMENT
  // ==========================================================================

  /**
   * Adds a FHIR resource entry to the bundle
   *
   * @param resource - FHIR resource to add (Patient, Observation, MedicationRequest, etc.)
   * @param options - Optional configuration for the entry
   *
   * @example
   * ```typescript
   * bundle.addEntry({
   *   resourceType: 'Patient',
   *   id: 'patient-1',
   *   gender: 'male',
   *   birthDate: '1990-01-15'
   * });
   *
   * bundle.addEntry({
   *   resourceType: 'Observation',
   *   id: 'obs-1',
   *   status: 'final',
   *   code: { text: 'Blood Pressure' }
   * });
   * ```
   */
  addEntry(resource: FHIRResource, options: AddEntryOptions = {}): void {
    // Generate ID if needed
    if (options.generateId && !resource.id) {
      resource.id = this.generateUUID();
    }

    // Construct fullUrl
    const fullUrl =
      options.fullUrl || this.constructFullUrl(resource.resourceType, resource.id);

    // Create entry
    const entry: BundleEntry = {
      fullUrl,
      resource,
    };

    // Add request for transaction bundles
    if (this.bundle.type === 'transaction') {
      entry.request = {
        method: options.method || 'POST',
        url: resource.id
          ? `${resource.resourceType}/${resource.id}`
          : resource.resourceType,
      };
    }

    // Add to bundle
    this.bundle.entry = this.bundle.entry || [];
    this.bundle.entry.push(entry);
    this.bundle.total = this.bundle.entry.length;
  }

  /**
   * Adds a Patient resource to the bundle
   *
   * @param patient - FHIR Patient resource
   * @param options - Optional configuration
   */
  addPatient(patient: FHIRPatient, options: AddEntryOptions = {}): void {
    this.addEntry(patient, options);
  }

  /**
   * Adds an Observation resource to the bundle
   *
   * @param observation - FHIR Observation resource
   * @param options - Optional configuration
   */
  addObservation(observation: FHIRObservation, options: AddEntryOptions = {}): void {
    this.addEntry(observation, options);
  }

  /**
   * Adds a MedicationRequest resource to the bundle
   *
   * @param medicationRequest - FHIR MedicationRequest resource
   * @param options - Optional configuration
   */
  addMedicationRequest(
    medicationRequest: FHIRMedicationRequest,
    options: AddEntryOptions = {}
  ): void {
    this.addEntry(medicationRequest, options);
  }

  /**
   * Adds a Condition resource to the bundle
   *
   * @param condition - FHIR Condition resource
   * @param options - Optional configuration
   */
  addCondition(condition: FHIRCondition, options: AddEntryOptions = {}): void {
    this.addEntry(condition, options);
  }

  /**
   * Adds multiple resources to the bundle
   *
   * @param resources - Array of FHIR resources to add
   * @param options - Optional configuration applied to all entries
   */
  addEntries(resources: FHIRResource[], options: AddEntryOptions = {}): void {
    for (const resource of resources) {
      this.addEntry(resource, options);
    }
  }

  /**
   * Removes an entry from the bundle by resource ID
   *
   * @param resourceId - ID of the resource to remove
   * @returns True if entry was removed, false if not found
   */
  removeEntry(resourceId: string): boolean {
    if (!this.bundle.entry) return false;

    const initialLength = this.bundle.entry.length;
    this.bundle.entry = this.bundle.entry.filter(
      (entry) => entry.resource?.id !== resourceId
    );
    this.bundle.total = this.bundle.entry.length;

    return this.bundle.entry.length < initialLength;
  }

  /**
   * Gets an entry by resource ID
   *
   * @param resourceId - ID of the resource to find
   * @returns The entry if found, undefined otherwise
   */
  getEntry(resourceId: string): BundleEntry | undefined {
    return this.bundle.entry?.find((entry) => entry.resource?.id === resourceId);
  }

  /**
   * Gets all entries of a specific resource type
   *
   * @param resourceType - Type of resources to retrieve
   * @returns Array of matching entries
   */
  getEntriesByType(resourceType: string): BundleEntry[] {
    return (
      this.bundle.entry?.filter(
        (entry) => entry.resource?.resourceType === resourceType
      ) || []
    );
  }

  /**
   * Gets the count of entries in the bundle
   */
  getEntryCount(): number {
    return this.bundle.entry?.length || 0;
  }

  /**
   * Clears all entries from the bundle
   */
  clearEntries(): void {
    this.bundle.entry = [];
    this.bundle.total = 0;
  }

  // ==========================================================================
  // METADATA MANAGEMENT
  // ==========================================================================

  /**
   * Sets the bundle ID
   *
   * @param id - New bundle ID
   */
  setId(id: string): void {
    this.bundle.id = id;
  }

  /**
   * Gets the bundle ID
   */
  getId(): string | undefined {
    return this.bundle.id;
  }

  /**
   * Sets the bundle timestamp
   *
   * @param timestamp - ISO 8601 timestamp
   */
  setTimestamp(timestamp: string): void {
    this.bundle.timestamp = timestamp;
    if (this.bundle.meta) {
      this.bundle.meta.lastUpdated = timestamp;
    }
  }

  /**
   * Gets the bundle timestamp
   */
  getTimestamp(): string | undefined {
    return this.bundle.timestamp;
  }

  /**
   * Gets the bundle type
   */
  getType(): FHIRBundleType {
    return this.bundle.type;
  }

  /**
   * Adds a profile to the bundle metadata
   *
   * @param profileUrl - URL of the FHIR profile
   */
  addProfile(profileUrl: string): void {
    if (!this.bundle.meta) {
      this.bundle.meta = {};
    }
    if (!this.bundle.meta.profile) {
      this.bundle.meta.profile = [];
    }
    if (!this.bundle.meta.profile.includes(profileUrl)) {
      this.bundle.meta.profile.push(profileUrl);
    }
  }

  /**
   * Adds a link to the bundle
   *
   * @param relation - Link relation type (e.g., 'self', 'next', 'previous')
   * @param url - Link URL
   */
  addLink(relation: string, url: string): void {
    if (!this.bundle.link) {
      this.bundle.link = [];
    }
    this.bundle.link.push({ relation, url });
  }

  // ==========================================================================
  // SERIALIZATION
  // ==========================================================================

  /**
   * Converts the bundle to a FHIR-compliant JSON object
   *
   * @returns The FHIR Bundle as a plain JavaScript object
   *
   * @example
   * ```typescript
   * const jsonBundle = bundle.toJSON();
   * console.log(JSON.stringify(jsonBundle, null, 2));
   * ```
   */
  toJSON(): FHIRBundle {
    // Return a deep copy to prevent external modification
    return JSON.parse(JSON.stringify(this.bundle));
  }

  /**
   * Converts the bundle to a JSON string
   *
   * @param pretty - Whether to format with indentation (default: false)
   * @returns JSON string representation of the bundle
   */
  toString(pretty: boolean = false): string {
    return pretty
      ? JSON.stringify(this.bundle, null, 2)
      : JSON.stringify(this.bundle);
  }

  /**
   * Converts the bundle to NDJSON format (one resource per line)
   *
   * @returns NDJSON string with each resource on a separate line
   */
  toNDJSON(): string {
    if (!this.bundle.entry) return '';
    return this.bundle.entry
      .map((entry) => JSON.stringify(entry.resource))
      .join('\n');
  }

  // ==========================================================================
  // VALIDATION
  // ==========================================================================

  /**
   * Validates the bundle against FHIR R4 requirements
   *
   * @returns ValidationResult with errors and warnings
   *
   * @example
   * ```typescript
   * const result = bundle.validate();
   * if (!result.valid) {
   *   console.error('Validation errors:', result.errors);
   * }
   * ```
   */
  validate(): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Validate bundle structure
    this.validateBundleStructure(errors, warnings);

    // Validate entries
    this.validateEntries(errors, warnings);

    // Type-specific validation
    this.validateByType(errors, warnings);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validates the basic bundle structure
   */
  private validateBundleStructure(
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    // resourceType must be 'Bundle'
    if (this.bundle.resourceType !== 'Bundle') {
      errors.push({
        code: 'INVALID_RESOURCE_TYPE',
        message: `resourceType must be "Bundle", got "${this.bundle.resourceType}"`,
        path: 'resourceType',
        severity: 'error',
      });
    }

    // type must be valid
    const validTypes: FHIRBundleType[] = [
      'document',
      'message',
      'transaction',
      'transaction-response',
      'batch',
      'batch-response',
      'history',
      'searchset',
      'collection',
    ];
    if (!validTypes.includes(this.bundle.type)) {
      errors.push({
        code: 'INVALID_BUNDLE_TYPE',
        message: `Invalid bundle type: "${this.bundle.type}"`,
        path: 'type',
        severity: 'error',
      });
    }

    // ID recommendation
    if (!this.bundle.id) {
      warnings.push({
        code: 'MISSING_ID',
        message: 'Bundle should have an id',
        path: 'id',
        severity: 'warning',
      });
    }

    // Timestamp recommendation
    if (!this.bundle.timestamp && !this.bundle.meta?.lastUpdated) {
      warnings.push({
        code: 'MISSING_TIMESTAMP',
        message: 'Bundle should have a timestamp',
        path: 'timestamp',
        severity: 'warning',
      });
    }
  }

  /**
   * Validates all entries in the bundle
   */
  private validateEntries(
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    if (!this.bundle.entry) {
      if (this.bundle.type === 'document') {
        errors.push({
          code: 'EMPTY_DOCUMENT_BUNDLE',
          message: 'Document bundles must have at least one entry',
          path: 'entry',
          severity: 'error',
        });
      }
      return;
    }

    for (let i = 0; i < this.bundle.entry.length; i++) {
      const entry = this.bundle.entry[i];
      const pathPrefix = `entry[${i}]`;

      // Resource validation
      if (!entry.resource) {
        warnings.push({
          code: 'MISSING_RESOURCE',
          message: `Entry at index ${i} has no resource`,
          path: pathPrefix,
          severity: 'warning',
        });
      } else {
        // Validate resource has resourceType
        if (!entry.resource.resourceType) {
          errors.push({
            code: 'MISSING_RESOURCE_TYPE',
            message: `Resource at entry[${i}] is missing resourceType`,
            path: `${pathPrefix}.resource.resourceType`,
            severity: 'error',
          });
        }

        // Validate using isValidFHIRResource
        if (!isValidFHIRResource(entry.resource)) {
          errors.push({
            code: 'INVALID_RESOURCE',
            message: `Invalid FHIR resource at entry[${i}]`,
            path: `${pathPrefix}.resource`,
            severity: 'error',
          });
        }

        // Specific resource type validations
        this.validateResourceByType(entry.resource, pathPrefix, errors, warnings);
      }

      // fullUrl recommendation
      if (!entry.fullUrl) {
        warnings.push({
          code: 'MISSING_FULL_URL',
          message: `Entry at index ${i} should have a fullUrl`,
          path: `${pathPrefix}.fullUrl`,
          severity: 'warning',
        });
      }
    }
  }

  /**
   * Validates specific resource types
   */
  private validateResourceByType(
    resource: FHIRResource,
    pathPrefix: string,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    switch (resource.resourceType) {
      case 'Patient':
        this.validatePatient(resource as FHIRPatient, pathPrefix, errors, warnings);
        break;
      case 'Observation':
        this.validateObservation(
          resource as FHIRObservation,
          pathPrefix,
          errors,
          warnings
        );
        break;
      case 'MedicationRequest':
        this.validateMedicationRequest(
          resource as FHIRMedicationRequest,
          pathPrefix,
          errors,
          warnings
        );
        break;
    }
  }

  /**
   * Validates Patient resources
   */
  private validatePatient(
    patient: FHIRPatient,
    pathPrefix: string,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    // Patient should have at least one identifier or name
    if (
      (!patient.identifier || patient.identifier.length === 0) &&
      (!patient.name || patient.name.length === 0)
    ) {
      warnings.push({
        code: 'PATIENT_NO_IDENTIFIER',
        message: 'Patient should have at least one identifier or name',
        path: `${pathPrefix}.resource`,
        severity: 'warning',
      });
    }
  }

  /**
   * Validates Observation resources
   */
  private validateObservation(
    observation: FHIRObservation,
    pathPrefix: string,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    // status is required
    if (!observation.status) {
      errors.push({
        code: 'OBSERVATION_MISSING_STATUS',
        message: 'Observation must have a status',
        path: `${pathPrefix}.resource.status`,
        severity: 'error',
      });
    }

    // code is required
    if (!observation.code) {
      errors.push({
        code: 'OBSERVATION_MISSING_CODE',
        message: 'Observation must have a code',
        path: `${pathPrefix}.resource.code`,
        severity: 'error',
      });
    }
  }

  /**
   * Validates MedicationRequest resources
   */
  private validateMedicationRequest(
    medRequest: FHIRMedicationRequest,
    pathPrefix: string,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    // status is required
    if (!medRequest.status) {
      errors.push({
        code: 'MEDICATION_REQUEST_MISSING_STATUS',
        message: 'MedicationRequest must have a status',
        path: `${pathPrefix}.resource.status`,
        severity: 'error',
      });
    }

    // intent is required
    if (!medRequest.intent) {
      errors.push({
        code: 'MEDICATION_REQUEST_MISSING_INTENT',
        message: 'MedicationRequest must have an intent',
        path: `${pathPrefix}.resource.intent`,
        severity: 'error',
      });
    }

    // subject is required
    if (!medRequest.subject) {
      errors.push({
        code: 'MEDICATION_REQUEST_MISSING_SUBJECT',
        message: 'MedicationRequest must have a subject reference',
        path: `${pathPrefix}.resource.subject`,
        severity: 'error',
      });
    }

    // Either medicationCodeableConcept or medicationReference
    if (!medRequest.medicationCodeableConcept && !medRequest.medicationReference) {
      warnings.push({
        code: 'MEDICATION_REQUEST_NO_MEDICATION',
        message:
          'MedicationRequest should have medicationCodeableConcept or medicationReference',
        path: `${pathPrefix}.resource`,
        severity: 'warning',
      });
    }
  }

  /**
   * Performs bundle-type-specific validation
   */
  private validateByType(
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    switch (this.bundle.type) {
      case 'transaction':
        this.validateTransactionBundle(errors, warnings);
        break;
      case 'document':
        this.validateDocumentBundle(errors, warnings);
        break;
    }
  }

  /**
   * Validates transaction bundle requirements
   */
  private validateTransactionBundle(
    errors: ValidationError[],
    _warnings: ValidationWarning[]
  ): void {
    if (!this.bundle.entry) return;

    for (let i = 0; i < this.bundle.entry.length; i++) {
      const entry = this.bundle.entry[i];

      if (!entry.request) {
        errors.push({
          code: 'TRANSACTION_MISSING_REQUEST',
          message: `Transaction bundle entry[${i}] must have a request element`,
          path: `entry[${i}].request`,
          severity: 'error',
        });
      } else {
        if (!entry.request.method) {
          errors.push({
            code: 'TRANSACTION_MISSING_METHOD',
            message: `Transaction bundle entry[${i}].request must have a method`,
            path: `entry[${i}].request.method`,
            severity: 'error',
          });
        }
        if (!entry.request.url) {
          errors.push({
            code: 'TRANSACTION_MISSING_URL',
            message: `Transaction bundle entry[${i}].request must have a url`,
            path: `entry[${i}].request.url`,
            severity: 'error',
          });
        }
      }
    }
  }

  /**
   * Validates document bundle requirements
   */
  private validateDocumentBundle(
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    if (!this.bundle.entry || this.bundle.entry.length === 0) {
      errors.push({
        code: 'DOCUMENT_NO_ENTRIES',
        message: 'Document bundle must have at least one entry',
        path: 'entry',
        severity: 'error',
      });
      return;
    }

    // First entry should be a Composition for proper document bundles
    const firstResource = this.bundle.entry[0].resource;
    if (firstResource?.resourceType !== 'Composition') {
      warnings.push({
        code: 'DOCUMENT_NO_COMPOSITION',
        message:
          'Document bundle first entry should be a Composition resource',
        path: 'entry[0]',
        severity: 'warning',
      });
    }
  }

  // ==========================================================================
  // UTILITY METHODS
  // ==========================================================================

  /**
   * Generates a UUID v4
   */
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Constructs a fullUrl for a resource
   */
  private constructFullUrl(resourceType: string, id?: string): string {
    if (this.baseUrl.startsWith('urn:')) {
      return `${this.baseUrl}:${id || this.generateUUID()}`;
    }
    return id
      ? `${this.baseUrl}/${resourceType}/${id}`
      : `urn:uuid:${this.generateUUID()}`;
  }

  /**
   * Gets the raw bundle (for advanced use cases)
   */
  getRawBundle(): FHIRBundle {
    return this.bundle;
  }

  /**
   * Loads a bundle from a JSON object
   *
   * @param json - FHIR Bundle JSON object
   * @returns True if successful, throws on invalid input
   */
  fromJSON(json: FHIRBundle): boolean {
    if (json.resourceType !== 'Bundle') {
      throw new Error('Invalid FHIR Bundle: resourceType must be "Bundle"');
    }

    this.bundle = JSON.parse(JSON.stringify(json));
    return true;
  }

  /**
   * Creates a deep clone of this bundle builder
   */
  clone(): FHIRBundleBuilder {
    const cloned = new FHIRBundleBuilder(this.baseUrl);
    cloned.bundle = JSON.parse(JSON.stringify(this.bundle));
    return cloned;
  }
}

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

/**
 * Creates a new FHIRBundleBuilder with a document bundle
 *
 * @param options - Bundle creation options
 * @returns Configured FHIRBundleBuilder instance
 */
export function createDocumentBundle(options: BundleCreateOptions = {}): FHIRBundleBuilder {
  const builder = new FHIRBundleBuilder(options.baseUrl);
  builder.createBundle('document', options);
  return builder;
}

/**
 * Creates a new FHIRBundleBuilder with a collection bundle
 *
 * @param options - Bundle creation options
 * @returns Configured FHIRBundleBuilder instance
 */
export function createCollectionBundle(options: BundleCreateOptions = {}): FHIRBundleBuilder {
  const builder = new FHIRBundleBuilder(options.baseUrl);
  builder.createBundle('collection', options);
  return builder;
}

/**
 * Creates a new FHIRBundleBuilder with a transaction bundle
 *
 * @param options - Bundle creation options
 * @returns Configured FHIRBundleBuilder instance
 */
export function createTransactionBundle(options: BundleCreateOptions = {}): FHIRBundleBuilder {
  const builder = new FHIRBundleBuilder(options.baseUrl);
  builder.createBundle('transaction', options);
  return builder;
}

/**
 * Creates a FHIRBundleBuilder from an existing bundle JSON
 *
 * @param json - Existing FHIR Bundle JSON
 * @param baseUrl - Base URL for new entries
 * @returns Configured FHIRBundleBuilder instance
 */
export function fromJSON(json: FHIRBundle, baseUrl?: string): FHIRBundleBuilder {
  const builder = new FHIRBundleBuilder(baseUrl);
  builder.fromJSON(json);
  return builder;
}

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default FHIRBundleBuilder;
