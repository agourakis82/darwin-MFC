# Academic Reference Export & Resolution Guide

This module provides comprehensive academic reference management functionality for Darwin-MFC, enabling users to export citations in multiple formats and resolve citation metadata from DOI and PubMed identifiers.

## Features

### Export Formats

1. **RIS** (Research Information Systems)
   - Compatible with: Zotero, Mendeley, EndNote, RefWorks
   - File extension: `.ris`
   - Use case: General citation management across multiple platforms

2. **BibTeX**
   - Compatible with: LaTeX, Overleaf, academic citation managers
   - File extension: `.bib`
   - Use case: Academic papers, technical documentation

3. **EndNote XML**
   - Compatible with: EndNote, Covidence
   - File extension: `.xml`
   - Use case: Specialized reference management with advanced features

4. **JSON**
   - Compatible with: Custom integrations, web applications
   - File extension: `.json`
   - Use case: Data exchange, API integration

### Resolution Services

1. **DOI Resolution** (CrossRef API)
   - Fetch complete citation metadata using Digital Object Identifier
   - Batch resolution with concurrency control
   - Timeout protection (10 seconds per request)

2. **PubMed Resolution** (NCBI E-utilities)
   - Fetch complete citation metadata using PubMed ID
   - Support for XML parsing
   - NCBI rate limiting compliance

## Installation & Setup

### Module Structure

```
lib/integrations/academic/
├── types.ts              # Type definitions
├── ris-exporter.ts       # RIS format export
├── bibtex-exporter.ts    # BibTeX format export
├── endnote-exporter.ts   # EndNote XML export
├── json-exporter.ts      # JSON format export
├── doi-resolver.ts       # DOI resolution
├── pubmed-resolver.ts    # PubMed/PMID resolution
├── index.ts              # Central export index
└── USAGE.md              # This file
```

### Dependencies

All modules use only Node.js/Browser built-in APIs:
- `DOMParser` for XML parsing (browser)
- `Blob` and `URL` for file downloads (browser)
- `fetch` API for HTTP requests

## Usage Examples

### 1. Export to RIS Format

```typescript
import { exportToRIS, downloadRISFile } from '@/lib/integrations/academic';
import { references } from '@/lib/data/references';

// Get some references
const selectedRefs = [
  references['portaria-saes-13-2025'],
  references['uspstf-screening-2023'],
];

// Export to RIS format
const risContent = exportToRIS(selectedRefs);

// Or download directly
downloadRISFile(selectedRefs, 'my-references.ris');
```

### 2. Export to BibTeX Format

```typescript
import { exportToBibTeX, downloadBibTeXFile } from '@/lib/integrations/academic';

const selectedRefs = [refs[0], refs[1]];

// Generate BibTeX
const bibTexContent = exportToBibTeX(selectedRefs);

// Or download directly
downloadBibTeXFile(selectedRefs, 'references.bib');
```

### 3. Export Multiple Formats

```typescript
import {
  generateRISExport,
  generateBibTeXExport,
  generateJSONExport,
} from '@/lib/integrations/academic';

const refs = [ref1, ref2, ref3];

// Generate different formats
const risResult = generateRISExport(refs);
const bibTexResult = generateBibTeXExport(refs);
const jsonResult = generateJSONExport(refs);

// Check results
if (risResult.success) {
  console.log(`Exported ${risResult.itemCount} references to ${risResult.format}`);
  console.log(risResult.content);
}
```

### 4. Resolve DOI to Citation

```typescript
import { resolveDOI, isValidDOI } from '@/lib/integrations/academic';

async function getCitationFromDOI() {
  const doi = '10.1001/jama.2023.xxxx';

  // Validate DOI format
  if (!isValidDOI(doi)) {
    console.error('Invalid DOI format');
    return;
  }

  // Resolve from CrossRef
  const citation = await resolveDOI(doi);

  if (citation) {
    console.log('Title:', citation.title);
    console.log('Authors:', citation.authors);
    console.log('Journal:', citation.journal);
    console.log('Year:', citation.year);
  }
}
```

### 5. Resolve PubMed ID to Citation

```typescript
import { resolvePMID, formatPubMedUrl } from '@/lib/integrations/academic';

async function getCitationFromPubMed() {
  const pmid = '25176015';

  // Resolve from NCBI
  const citation = await resolvePMID(pmid);

  if (citation) {
    console.log('Title:', citation.title);
    console.log('Authors:', citation.authors);
    console.log('Link:', formatPubMedUrl(pmid));
  }
}
```

### 6. Batch DOI Resolution

```typescript
import { resolveDOIBatch } from '@/lib/integrations/academic';

async function resolveManyDOIs() {
  const dois = [
    '10.1001/jama.2023.xxxx',
    '10.1590/S0004-2803.202300000-00',
    '10.1016/S2468-1253(16)30181-9',
  ];

  const citations = await resolveDOIBatch(dois);

  citations.forEach((citation, index) => {
    if (citation) {
      console.log(`[${dois[index]}] ${citation.title}`);
    } else {
      console.log(`[${dois[index]}] Resolution failed`);
    }
  });
}
```

### 7. Using the React Export Button Component

```typescript
import { ExportButton } from '@/app/components/Bibliography/ExportButton';
import { references } from '@/lib/data/references';

export function BibliographyView() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToast = (message: string, type: 'success' | 'error') => {
    console.log(`[${type}] ${message}`);
  };

  return (
    <div>
      {/* Reference list and checkboxes here */}

      <ExportButton
        references={Object.values(references)}
        selectedReferenceIds={selectedIds}
        buttonText="Download References"
        showToast={handleToast}
      />
    </div>
  );
}
```

### 8. Extract and Resolve Metadata

```typescript
import { extractDOI, extractPMID, resolveDOI, resolvePMID } from '@/lib/integrations/academic';

// Extract DOI from text
const textWithDOI = 'See https://doi.org/10.1001/jama.2023.xxxx for details';
const doi = extractDOI(textWithDOI);

if (doi) {
  const citation = await resolveDOI(doi);
}

// Extract PMID from URL
const urlWithPMID = 'https://pubmed.ncbi.nlm.nih.gov/25176015/';
const pmid = extractPMID(urlWithPMID);

if (pmid) {
  const citation = await resolvePMID(pmid);
}
```

## React Component Usage

### ExportButton Component

Located at: `app/components/Bibliography/ExportButton.tsx`

```typescript
interface ExportButtonProps {
  references: Reference[];                    // Array of references to export
  selectedReferenceIds?: string[];            // Optional pre-selected IDs
  buttonText?: string;                        // Button label (default: "Export Bibliography")
  showToast?: (msg: string, type: string) => void; // Toast notification callback
}
```

**Features:**
- Automatic filename generation with date
- Shows count of references to be exported
- Loading state during export
- Dropdown menu with format descriptions
- Compatible tools listed for each format
- Error handling with user feedback

## Error Handling

All functions include comprehensive error handling:

```typescript
// Export functions return ExportResult
interface ExportResult {
  success: boolean;
  format: ExportFormat;
  content: string;
  itemCount: number;
  filename?: string;
  error?: string;
}

// Check result before using
const result = generateRISExport(refs);
if (!result.success) {
  console.error(result.error);
}

// Resolvers return null on failure
const citation = await resolveDOI(doi);
if (!citation) {
  console.error('DOI resolution failed');
}
```

## Performance Considerations

### Concurrency Limiting

Both DOI and PubMed resolvers implement concurrency limiting to respect API rate limits:

- **DOI (CrossRef):** 3 concurrent requests
- **PubMed (NCBI):** 2 concurrent requests with 400ms delay between batches

```typescript
// Batch resolution with automatic concurrency control
const citations = await resolveDOIBatch([doi1, doi2, doi3, doi4, doi5]);
```

### Timeouts

All API calls have 10-second timeout protection:

```typescript
const TIMEOUT = 10000; // 10 seconds

// Using AbortController
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
```

## Validation Functions

All modules include validation helpers:

```typescript
// DOI validation
import { isValidDOI, formatDOIUrl } from '@/lib/integrations/academic/doi-resolver';
if (isValidDOI('10.1001/jama.2023.xxxx')) {
  const url = formatDOIUrl(doi); // https://doi.org/...
}

// PMID validation
import { isValidPMID, formatPubMedUrl } from '@/lib/integrations/academic/pubmed-resolver';
if (isValidPMID('25176015')) {
  const url = formatPubMedUrl(pmid); // https://pubmed.ncbi.nlm.nih.gov/...
}

// JSON export validation
import { isValidJSONExport } from '@/lib/integrations/academic/json-exporter';
if (isValidJSONExport(jsonString)) {
  const refs = parseJSONExport(jsonString);
}
```

## API Integration

### CrossRef API

- **Base URL:** `https://api.crossref.org/works`
- **Rate limit:** No explicit limit (but be respectful)
- **Response time:** Usually < 1 second
- **Cost:** Free

### NCBI E-utilities API

- **Base URL:** `https://eutils.ncbi.nlm.nih.gov/entrez/eutils`
- **Requirements:** Must include `tool` and `email` parameters
- **Rate limit:** 3 requests/second recommended
- **Response time:** Usually < 2 seconds
- **Cost:** Free

## Testing

### Test Cases

```typescript
// Test RIS export
const risExport = generateRISExport([ref]);
assert(risExport.success);
assert(risExport.content.includes('TY  -'));

// Test BibTeX export
const bibTexExport = generateBibTeXExport([ref]);
assert(bibTexExport.success);
assert(bibTexExport.content.includes('@'));

// Test JSON export
const jsonExport = generateJSONExport([ref]);
assert(jsonExport.success);
assert(isValidJSONExport(jsonExport.content));

// Test DOI resolution
const citation = await resolveDOI('10.1001/jama.2023.xxxx');
assert(citation?.title);

// Test PMID resolution
const pmidCitation = await resolvePMID('25176015');
assert(pmidCitation?.authors);
```

## Troubleshooting

### DOI Resolution Fails

**Possible causes:**
- Invalid DOI format (use `isValidDOI()` to check)
- CrossRef API is down or unreachable
- Network timeout (check browser console)
- DOI doesn't exist in CrossRef database

**Solution:** Check the browser console for detailed error messages

### PubMed Resolution Fails

**Possible causes:**
- Invalid PMID format (must be numeric)
- NCBI API is down
- Network timeout
- PMID doesn't exist in PubMed

**Solution:** Use `isValidPMID()` to validate before resolving

### File Download Not Working

**Possible causes:**
- Browser security restrictions
- No blob support in browser
- Pop-up blockers preventing download

**Solution:** Check browser console and ensure third-party downloads are allowed

## Browser Support

All modules require:
- Modern browser with ES6 support
- `fetch` API support
- `Blob` and `URL` API support
- `DOMParser` for XML parsing

**Supported browsers:**
- Chrome 48+
- Firefox 40+
- Safari 11+
- Edge 14+
- iOS Safari 11+
- Chrome Android 48+

## License

These modules are part of Darwin-MFC and follow the same license as the main project.

## References

- [RIS Format Specification](https://en.wikipedia.org/wiki/RIS_(file_format))
- [BibTeX Documentation](http://www.ctan.org/pkg/bibtex)
- [CrossRef API Documentation](https://www.crossref.org/documentation/retrieve-metadata/)
- [NCBI E-utilities Guide](https://www.ncbi.nlm.nih.gov/books/NBK25499/)
- [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/)
