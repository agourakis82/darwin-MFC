# Academic Export Module - Quick Reference Card

## One-Minute Start

### Install Component
```bash
# Already installed at:
# /app/components/Bibliography/ExportButton.tsx
```

### Use Component
```tsx
import { ExportButton } from '@/app/components/Bibliography/ExportButton';

<ExportButton references={refs} selectedReferenceIds={selected} />
```

### Export Functions
```typescript
import { downloadRISFile, downloadBibTeXFile, downloadJSONFile } from '@/lib/integrations/academic';

downloadRISFile(refs, 'citations.ris');
```

### Resolve Metadata
```typescript
import { resolveDOI, resolvePMID } from '@/lib/integrations/academic';

const citation = await resolveDOI('10.1001/jama.2023.9297');
const pmidCitation = await resolvePMID('25176015');
```

---

## Export Formats at a Glance

| Format | Extension | For | Import Into |
|--------|-----------|-----|-------------|
| RIS | .ris | General use | Zotero, Mendeley, EndNote |
| BibTeX | .bib | LaTeX papers | Overleaf, TeXShop |
| EndNote | .xml | Reference management | EndNote, Covidence |
| JSON | .json | Custom APIs | Web applications |

---

## Functions Cheat Sheet

### Single Reference Export
```typescript
citationToRIS(ref)
citationToBibTeX(ref)
citationToEndNoteXML(ref)
citationToJSON(ref)
```

### Batch Export
```typescript
exportToRIS(refs)
exportToBibTeX(refs)
exportToEndNoteXML(refs)
exportToJSON(refs)
```

### Download to File
```typescript
downloadRISFile(refs, 'name.ris')
downloadBibTeXFile(refs, 'name.bib')
downloadEndNoteFile(refs, 'name.xml')
downloadJSONFile(refs, 'name.json')
```

### Resolve Metadata
```typescript
resolveDOI(doi)                    // Single DOI
resolveDOIBatch(doiArray)         // Multiple DOIs
resolvePMID(pmid)                 // Single PMID
resolvePMIDBatch(pmidArray)       // Multiple PMIDs
```

### Validate & Format
```typescript
isValidDOI(doi)                   // true/false
isValidPMID(pmid)                 // true/false
formatDOIUrl(doi)                 // https://doi.org/...
formatPubMedUrl(pmid)             // https://pubmed.ncbi.nlm.nih.gov/...
extractDOI(text)                  // Extract from text
extractPMID(text)                 // Extract from text
```

---

## Common Patterns

### Pattern 1: Export Selected References
```typescript
const selected = ['ref1', 'ref2', 'ref3'];
const toExport = references.filter(r => selected.includes(r.id));
downloadRISFile(toExport, 'selected.ris');
```

### Pattern 2: Resolve All DOIs
```typescript
const dois = refs.map(r => r.doi).filter(Boolean);
const citations = await resolveDOIBatch(dois);
```

### Pattern 3: Export for LaTeX
```typescript
import { downloadBibTeXFile } from '@/lib/integrations/academic';

// Get references for a chapter
downloadBibTeXFile(chapterRefs, 'chapter-bibliography.bib');
```

### Pattern 4: React with Toast
```tsx
<ExportButton
  references={refs}
  showToast={(msg, type) => {
    if (type === 'success') showSuccessNotification(msg);
    else showErrorNotification(msg);
  }}
/>
```

---

## Error Handling

### Safe DOI Resolution
```typescript
if (isValidDOI(userInput)) {
  const citation = await resolveDOI(userInput);
  if (citation) {
    // Use citation
  } else {
    console.warn('DOI not found');
  }
} else {
  console.error('Invalid DOI format');
}
```

### Safe Export
```typescript
const result = generateRISExport(refs);
if (result.success) {
  console.log(`Exported ${result.itemCount} references`);
} else {
  console.error(result.error);
}
```

---

## Component Props

```typescript
interface ExportButtonProps {
  references: Reference[];           // Required
  selectedReferenceIds?: string[];   // Optional
  buttonText?: string;               // Optional (default: "Export Bibliography")
  showToast?: (msg, type) => void;  // Optional callback
}
```

---

## Import Statements

```typescript
// Components
import { ExportButton } from '@/app/components/Bibliography/ExportButton';

// Exporters
import { 
  downloadRISFile, 
  downloadBibTeXFile, 
  downloadEndNoteFile, 
  downloadJSONFile 
} from '@/lib/integrations/academic';

// Resolvers
import { 
  resolveDOI, 
  resolvePMID, 
  resolveDOIBatch, 
  resolvePMIDBatch 
} from '@/lib/integrations/academic';

// Validators
import { 
  isValidDOI, 
  isValidPMID, 
  formatDOIUrl, 
  formatPubMedUrl 
} from '@/lib/integrations/academic';

// All at once
import { 
  exportReferences, 
  downloadReferences 
} from '@/lib/integrations/academic';
```

---

## Supported Reference Types

✅ artigo (journal article)
✅ portaria (government document)
✅ lei (legislation)
✅ nota_tecnica (technical note)
✅ site (website)
✅ livro (book)
✅ diretriz (guideline)
✅ relatorio (report)

---

## Performance Tips

1. **Batch Resolution:** Use `resolveDOIBatch()` instead of multiple `resolveDOI()` calls
2. **Concurrency:** DOI: 3 concurrent, PubMed: 2 concurrent (automatic)
3. **Timeouts:** Each request has 10-second timeout (automatic)
4. **Large Exports:** Can handle 1000+ references efficiently

---

## Browser Compatibility

- Chrome 48+
- Firefox 40+
- Safari 11+
- Edge 14+

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Button not showing | Check references array not empty |
| Download not working | Check browser security settings |
| DOI resolution fails | Use `isValidDOI()` first, check console |
| Component errors | Import from correct path |

---

## Files Overview

```
lib/integrations/academic/
├── types.ts                  # Type definitions
├── ris-exporter.ts          # RIS export
├── bibtex-exporter.ts       # BibTeX export
├── endnote-exporter.ts      # EndNote XML
├── json-exporter.ts         # JSON export
├── doi-resolver.ts          # DOI resolution
├── pubmed-resolver.ts       # PubMed resolution
├── index.ts                 # Main exports
├── README.md                # Full docs
├── USAGE.md                 # Usage guide
├── examples.ts              # Code examples
├── INTEGRATION_GUIDE.md     # Integration
└── QUICK_REFERENCE.md       # This file

app/components/Bibliography/
└── ExportButton.tsx         # React component
```

---

## External Resources

- [CrossRef API](https://www.crossref.org/documentation/retrieve-metadata/)
- [NCBI E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25499/)
- [RIS Format](https://en.wikipedia.org/wiki/RIS_(file_format))
- [BibTeX](http://www.ctan.org/pkg/bibtex)

---

**Status:** ✅ Production Ready
**Version:** 1.0
**Last Updated:** January 18, 2025
