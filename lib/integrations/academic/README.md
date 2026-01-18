# Academic Reference Export & Resolution Module

A comprehensive TypeScript/React library for exporting citations in multiple academic formats and resolving citation metadata from DOI and PubMed identifiers.

## Overview

The Darwin-MFC Academic Integration module provides:

- **Citation Export** in 4 formats: RIS, BibTeX, EndNote XML, JSON
- **Metadata Resolution** from DOI (CrossRef API) and PubMed IDs (NCBI E-utilities)
- **React Component** for user-friendly export UI
- **Type-safe** TypeScript implementation
- **Error handling** with validation functions
- **Concurrency control** for API requests
- **Browser-compatible** with all modern browsers

## Quick Start

### Import and Use

```typescript
import { exportToRIS, downloadRISFile } from '@/lib/integrations/academic';

// Export references
const refs = [ref1, ref2, ref3];
downloadRISFile(refs, 'my-references.ris');
```

### Use React Component

```typescript
import { ExportButton } from '@/app/components/Bibliography/ExportButton';

<ExportButton
  references={references}
  selectedReferenceIds={selectedIds}
  showToast={handleToast}
/>
```

## Features

### Supported Export Formats

| Format | File Ext | Compatible With | Use Case |
|--------|----------|-----------------|----------|
| RIS | .ris | Zotero, Mendeley, EndNote, RefWorks | General citation management |
| BibTeX | .bib | LaTeX, Overleaf | Academic papers, technical docs |
| EndNote XML | .xml | EndNote, Covidence | Advanced reference management |
| JSON | .json | Custom APIs, web apps | Data exchange & integration |

### Metadata Resolution

#### DOI Resolution (CrossRef)
- Automatic title, author, journal lookup
- Format: `10.xxxx/xxxxx`
- Batch resolution with concurrency control
- 10-second timeout protection

#### PubMed Resolution (NCBI)
- Automatic title, author, journal lookup from PubMed
- Format: `PMID` or `numeric ID`
- Batch resolution with rate limiting
- Respects NCBI API guidelines

## File Structure

```
lib/integrations/academic/
├── types.ts                 # TypeScript interfaces & types
├── ris-exporter.ts         # RIS format export (→ Zotero/Mendeley)
├── bibtex-exporter.ts      # BibTeX format export (→ LaTeX)
├── endnote-exporter.ts     # EndNote XML export (→ EndNote)
├── json-exporter.ts        # JSON format export (→ Custom)
├── doi-resolver.ts         # DOI metadata resolution (CrossRef)
├── pubmed-resolver.ts      # PubMed metadata resolution (NCBI)
├── index.ts                # Central exports
├── USAGE.md                # Detailed usage guide
├── examples.ts             # Code examples
└── README.md               # This file
```

## API Reference

### Export Functions

All export functions return `ExportResult`:

```typescript
interface ExportResult {
  success: boolean;
  format: ExportFormat;
  content: string;         // Formatted content
  itemCount: number;       // Number of references
  filename?: string;
  error?: string;          // Error message if failed
}
```

#### RIS Export

```typescript
// Single reference to RIS
citationToRIS(reference: Reference, index?: number): string

// Multiple to RIS
exportToRIS(references: Reference[]): string

// Generate with result
generateRISExport(references: Reference[], filename?: string): ExportResult

// Download to user's computer
downloadRISFile(references: Reference[], filename?: string): void
```

#### BibTeX Export

```typescript
citationToBibTeX(reference: Reference, index?: number): string
exportToBibTeX(references: Reference[]): string
generateBibTeXExport(references: Reference[], filename?: string): ExportResult
downloadBibTeXFile(references: Reference[], filename?: string): void
```

#### EndNote XML Export

```typescript
citationToEndNoteXML(reference: Reference, index?: number): string
exportToEndNoteXML(references: Reference[]): string
generateEndNoteExport(references: Reference[], filename?: string): ExportResult
downloadEndNoteFile(references: Reference[], filename?: string): void
```

#### JSON Export

```typescript
citationToJSON(reference: Reference): JsonExportReference
exportToJSON(references: Reference[]): JsonExportReference[]
exportToJSONString(references: Reference[], includeMetadata?: boolean): string
generateJSONExport(references: Reference[], filename?: string, includeMetadata?: boolean): ExportResult
downloadJSONFile(references: Reference[], filename?: string, includeMetadata?: boolean): void
parseJSONExport(jsonString: string): JsonExportReference[] | null
isValidJSONExport(jsonString: string): boolean
```

### Resolver Functions

#### DOI Resolution

```typescript
// Resolve single DOI
async resolveDOI(doi: string): Promise<ResolvedCitation | null>

// Batch resolve with concurrency control
async resolveDOIBatch(dois: string[]): Promise<(ResolvedCitation | null)[]>

// Utilities
isValidDOI(doi: string): boolean
formatDOIUrl(doi: string): string        // → https://doi.org/...
extractDOI(text: string): string | null  // Extract from text
```

#### PubMed Resolution

```typescript
// Resolve single PMID
async resolvePMID(pmid: string): Promise<ResolvedCitation | null>

// Batch resolve with NCBI rate limiting
async resolvePMIDBatch(pmids: string[]): Promise<(ResolvedCitation | null)[]>

// Utilities
isValidPMID(pmid: string): boolean
formatPubMedUrl(pmid: string): string        // → https://pubmed.ncbi.nlm.nih.gov/...
extractPMID(text: string): string | null     // Extract from text
```

### React Component

#### ExportButton

```typescript
interface ExportButtonProps {
  references: Reference[];           // Array to export
  selectedReferenceIds?: string[];   // Optional pre-selected
  buttonText?: string;               // Button label
  showToast?: (msg: string, type: 'success' | 'error') => void;
}

<ExportButton
  references={allReferences}
  selectedReferenceIds={selected}
  showToast={handleNotification}
/>
```

Features:
- Dropdown menu with format descriptions
- Shows reference count
- Compatible tools listed per format
- Loading states
- Error handling
- Automatic filename with date

#### ExportFormatSelector

```typescript
<ExportFormatSelector
  format="json"
  onChange={(format) => setFormat(format)}
/>
```

## Usage Examples

### Example 1: Export to Zotero

```typescript
import { downloadRISFile } from '@/lib/integrations/academic';

// Export selected papers
downloadRISFile(selectedReferences, 'darwin-papers.ris');
// User imports into Zotero via File → Import
```

### Example 2: Export for LaTeX Thesis

```typescript
import { downloadBibTeXFile } from '@/lib/integrations/academic';

// Export as BibTeX
downloadBibTeXFile(references, 'thesis-references.bib');

// In thesis.tex:
// \bibliographystyle{unsrt}
// \bibliography{thesis-references}
```

### Example 3: Look Up Citation Metadata

```typescript
import { resolveDOI, isValidDOI } from '@/lib/integrations/academic';

const doi = '10.1001/jama.2023.9297';

if (isValidDOI(doi)) {
  const citation = await resolveDOI(doi);
  console.log(citation?.title);    // Full title from CrossRef
  console.log(citation?.journal);  // Journal name
  console.log(citation?.year);     // Publication year
}
```

### Example 4: Batch Import PubMed IDs

```typescript
import { resolvePMIDBatch } from '@/lib/integrations/academic';

const pmids = ['25176015', '31504439', '28844192'];
const citations = await resolvePMIDBatch(pmids);

// Update local database with resolved metadata
citations.forEach((citation, i) => {
  if (citation) {
    updateReferenceMetadata(pmids[i], citation);
  }
});
```

### Example 5: React Component Integration

```typescript
'use client';

import { ExportButton } from '@/app/components/Bibliography/ExportButton';
import { useState } from 'react';

export function Bibliography() {
  const [selected, setSelected] = useState<string[]>([]);
  const [toast, setToast] = useState('');

  return (
    <div>
      {/* Reference list with checkboxes */}
      <ExportButton
        references={references}
        selectedReferenceIds={selected}
        buttonText="Download Selected"
        showToast={(msg, type) => setToast(`[${type}] ${msg}`)}
      />
    </div>
  );
}
```

## Type Definitions

### Reference (from lib/types/references.ts)

```typescript
interface Reference {
  id: string;
  type: ReferenceType;
  title: string;
  authors?: string[];
  year: number;
  journal?: string;
  volume?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  url?: string;
  publisher?: string;
  edition?: string;
  note?: string;
  legalNumber?: string; // Brazilian legal documents
  accessDate?: string;
}
```

### ResolvedCitation

```typescript
interface ResolvedCitation {
  id?: string;
  title: string;
  authors?: string[];
  year?: number;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  url?: string;
  publisher?: string;
  issn?: string;
}
```

## Error Handling

All functions include comprehensive error handling:

```typescript
// Export functions return ExportResult with error field
const result = generateRISExport(refs);
if (!result.success) {
  console.error('Export failed:', result.error);
}

// Resolvers return null on failure
const citation = await resolveDOI(doi);
if (!citation) {
  console.warn('DOI not found or resolution failed');
}

// Validation helpers prevent errors
if (isValidDOI(userInput)) {
  const citation = await resolveDOI(userInput);
}
```

## Performance

### Concurrency Limiting

Prevents API rate limiting:

```typescript
// DOI: 3 concurrent requests
// PubMed: 2 concurrent requests + 400ms delay between batches

const citations = await resolveDOIBatch([
  doi1, doi2, doi3, doi4, doi5  // Automatically throttled
]);
```

### Timeouts

All API calls have 10-second timeout:

```typescript
const TIMEOUT = 10000; // 10 seconds

// Automatically aborts long-running requests
const citation = await resolveDOI(doi); // Max 10s wait
```

## Browser Support

- Chrome 48+
- Firefox 40+
- Safari 11+
- Edge 14+
- iOS Safari 11+

Requirements:
- ES6+ support
- `fetch` API
- `Blob` & `URL` APIs
- `DOMParser` (for PubMed XML parsing)

## API Keys

No API keys required:

- **CrossRef API:** Public, no authentication needed
- **NCBI E-utilities:** Free tier, requires `tool` and `email` parameters (already configured)

## Testing

```typescript
import { generateRISExport, isValidDOI } from '@/lib/integrations/academic';

// Test RIS export
const result = generateRISExport([ref]);
expect(result.success).toBe(true);
expect(result.content).toContain('TY  -');

// Test validation
expect(isValidDOI('10.1001/jama.2023.xxxx')).toBe(true);
expect(isValidDOI('invalid')).toBe(false);

// Test resolution
const citation = await resolveDOI('10.1001/jama.2023.9297');
expect(citation?.title).toBeDefined();
```

## Troubleshooting

### Export functions return errors

**Solution:** Check that references have required fields (id, title, year)

### DOI resolution fails

**Solution:** Validate DOI format with `isValidDOI()` first. Check browser console for network errors.

### PubMed resolution times out

**Solution:** PMID might not exist. Check with `isValidPMID()` first. Batch resolution respects NCBI rate limits.

### File downloads not working

**Solution:** Check browser security settings. Some browsers block downloads from certain contexts. Enable third-party downloads.

## Contributing

To add new export formats:

1. Create new `*-exporter.ts` file following the pattern
2. Implement conversion functions
3. Add type definitions to `types.ts`
4. Export from `index.ts`
5. Add examples to `examples.ts`
6. Update `USAGE.md`

## References

- [RIS Format](https://en.wikipedia.org/wiki/RIS_(file_format))
- [BibTeX](http://www.ctan.org/pkg/bibtex)
- [CrossRef API](https://www.crossref.org/documentation/retrieve-metadata/)
- [NCBI E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25499/)
- [EndNote](https://endnote.com/)

## License

Part of Darwin-MFC platform.

---

For detailed usage examples and workflows, see [USAGE.md](./USAGE.md) and [examples.ts](./examples.ts).
