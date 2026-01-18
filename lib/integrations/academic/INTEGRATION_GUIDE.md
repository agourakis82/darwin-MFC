# Integration Guide - Using Academic Export in Darwin-MFC

Quick reference for integrating the academic reference export functionality into existing Darwin-MFC components.

## Quick Start - 5 Minutes

### 1. Import the Component

```typescript
// In your bibliography view file
import { ExportButton } from '@/app/components/Bibliography/ExportButton';
import { references } from '@/lib/data/references';
import { useState } from 'react';
```

### 2. Add to Your Component

```typescript
export default function BibliographyPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div>
      {/* Your reference list with checkboxes */}
      <ExportButton
        references={Object.values(references)}
        selectedReferenceIds={selectedIds}
        buttonText="Download References"
        showToast={(msg, type) => console.log(`[${type}] ${msg}`)}
      />
    </div>
  );
}
```

### 3. Done!

Users can now export selected references in 4 formats.

---

## Integration Scenarios

### Scenario 1: Bibliography Page

**Location:** `/app/[locale]/bibliografia/page.tsx`

```typescript
'use client';

import { ExportButton } from '@/app/components/Bibliography/ExportButton';
import { ReferenceList } from '@/app/components/Bibliography/ReferenceList';
import { ReferenceValidator } from '@/app/components/Bibliography/ReferenceValidator';
import { references } from '@/lib/data/references';
import { useState } from 'react';

export default function BibliographiaPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const refArray = Object.values(references);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(refArray.map((r) => r.id));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      <h1>Bibliography</h1>

      {/* Selection Controls */}
      <div className="flex gap-2">
        <button onClick={handleSelectAll}>Select All</button>
        <button onClick={handleClearSelection}>Clear Selection</button>
        <span className="text-sm text-gray-500">
          {selectedIds.length} selected
        </span>
      </div>

      {/* Export Button */}
      <ExportButton
        references={refArray}
        selectedReferenceIds={selectedIds}
        buttonText={`Download ${selectedIds.length} References`}
      />

      {/* Reference List */}
      <ReferenceList
        references={refArray}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
      />

      {/* Validation Tool */}
      <ReferenceValidator references={refArray} />
    </div>
  );
}
```

### Scenario 2: Screening Protocol Page

**Location:** `/app/[locale]/cancer/page.tsx`

Show "Export Protocol References" button to download all citations for that screening.

```typescript
'use client';

import { ExportButton } from '@/app/components/Bibliography/ExportButton';
import { getReference } from '@/lib/data/references';
import { rastreamentos } from '@/lib/data/rastreamentos';

export default function CancerScreeningPage() {
  const screening = rastreamentos[0]; // Get specific screening

  // Get all referenced citations
  const referencedRefs = screening.references
    ?.map((refId) => getReference(refId))
    .filter(Boolean) as any[];

  return (
    <div>
      <h1>{screening.nome}</h1>

      {/* Protocol content */}

      {/* Export button for this protocol's references */}
      {referencedRefs && referencedRefs.length > 0 && (
        <ExportButton
          references={referencedRefs}
          buttonText={`Export ${referencedRefs.length} References for Protocol`}
        />
      )}
    </div>
  );
}
```

### Scenario 3: Clinical Case Page

**Location:** `/app/[locale]/casos-clinicos/[id]/page.tsx`

```typescript
'use client';

import { ExportButton } from '@/app/components/Bibliography/ExportButton';
import { getClinicalCase } from '@/lib/data/casos-clinicos';

export default function ClinicalCasePage({ params }: { params: { id: string } }) {
  const clinicalCase = getClinicalCase(params.id);

  if (!clinicalCase) return <div>Case not found</div>;

  return (
    <div>
      <h1>{clinicalCase.title}</h1>

      {/* Case content */}

      {/* Export case references */}
      {clinicalCase.references && clinicalCase.references.length > 0 && (
        <ExportButton
          references={clinicalCase.references}
          buttonText="Export Case References"
        />
      )}
    </div>
  );
}
```

### Scenario 4: Search Results Page

**Location:** `/app/[locale]/busca/page.tsx`

```typescript
'use client';

import { ExportButton } from '@/app/components/Bibliography/ExportButton';
import { AdvancedSearch } from '@/app/components/Search/AdvancedSearch';
import { useState } from 'react';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div>
      <h1>Search References</h1>

      <AdvancedSearch onResults={setSearchResults} />

      {searchResults.length > 0 && (
        <>
          <div className="mt-6 flex justify-between items-center">
            <span className="text-sm">
              {searchResults.length} results found
            </span>

            <ExportButton
              references={searchResults}
              selectedReferenceIds={selectedIds}
              buttonText={`Export ${selectedIds.length || searchResults.length} Result(s)`}
            />
          </div>

          {/* Search results with checkboxes */}
          <div className="mt-4 space-y-4">
            {searchResults.map((ref) => (
              <div key={ref.id} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(ref.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds([...selectedIds, ref.id]);
                    } else {
                      setSelectedIds(selectedIds.filter((i) => i !== ref.id));
                    }
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{ref.title}</h3>
                  <p className="text-sm text-gray-600">
                    {ref.authors?.slice(0, 3).join(', ')}
                    {ref.authors && ref.authors.length > 3 ? ' et al.' : ''}
                  </p>
                  <p className="text-xs text-gray-500">
                    {ref.journal} ({ref.year})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

---

## Advanced Usage

### Example: Export with Custom Filename

```typescript
import { downloadRISFile } from '@/lib/integrations/academic';

// Export with custom name based on screening/content
const screening = 'cancer-screening';
const date = new Date().toISOString().split('T')[0];
const filename = `darwin-${screening}-${date}.ris`;

downloadRISFile(references, filename);
```

### Example: Export Multiple Formats at Once

```typescript
import {
  downloadRISFile,
  downloadBibTeXFile,
  downloadJSONFile,
} from '@/lib/integrations/academic';

async function exportAllFormats(references: Reference[]) {
  // Create a sequence of downloads
  downloadRISFile(references, 'refs.ris');

  setTimeout(() => {
    downloadBibTeXFile(references, 'refs.bib');
  }, 500);

  setTimeout(() => {
    downloadJSONFile(references, 'refs.json');
  }, 1000);
}
```

### Example: Resolve and Export

```typescript
import { resolveDOI, exportToRIS } from '@/lib/integrations/academic';

async function resolveAndExport(doiList: string[]) {
  // Resolve DOIs to get full citation data
  const resolvedCitations = await Promise.all(
    doiList.map((doi) => resolveDOI(doi))
  );

  // Filter out failures
  const validCitations = resolvedCitations.filter(Boolean);

  // Export as RIS
  const risContent = exportToRIS(validCitations);
  console.log(risContent);
}
```

---

## Component Integration Examples

### With Existing Bibliography Component

```typescript
// app/components/Bibliography/ReferenceList.tsx
import { ExportButton } from './ExportButton';

interface ReferenceListProps {
  references: Reference[];
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

export function ReferenceList({
  references,
  selectedIds = [],
  onSelectionChange,
}: ReferenceListProps) {
  return (
    <div>
      {/* Selection toolbar */}
      <div className="flex items-center gap-4 py-4 border-b">
        <input
          type="checkbox"
          indeterminate={
            selectedIds.length > 0 && selectedIds.length < references.length
          }
          onChange={(e) => {
            if (e.target.checked) {
              onSelectionChange?.(references.map((r) => r.id));
            } else {
              onSelectionChange?.([]);
            }
          }}
        />
        <span className="text-sm text-gray-600">
          {selectedIds.length} of {references.length} selected
        </span>

        {/* Export button */}
        {selectedIds.length > 0 && (
          <ExportButton
            references={references}
            selectedReferenceIds={selectedIds}
            buttonText={`Download ${selectedIds.length}`}
          />
        )}
      </div>

      {/* Reference items */}
      <div className="space-y-4">
        {references.map((ref) => (
          <div
            key={ref.id}
            className="flex items-start gap-3 p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(ref.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  onSelectionChange?.([...selectedIds, ref.id]);
                } else {
                  onSelectionChange?.(
                    selectedIds.filter((i) => i !== ref.id)
                  );
                }
              }}
            />
            <div className="flex-1">
              <h4 className="font-semibold">{ref.title}</h4>
              <p className="text-sm text-gray-600">{ref.journal}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## API Integration Examples

### Fetch and Export References for Analysis

```typescript
import {
  resolveDOI,
  resolvePMIDBatch,
  exportToBibTeX,
} from '@/lib/integrations/academic';

// Example: Research team collects DOIs and PMIDs, needs bibliography
async function generateResearchBibliography() {
  const doiList = [
    '10.1001/jama.2023.9297',
    '10.36660/abc.20210062',
  ];

  const pmidList = ['25176015', '31504439'];

  // Resolve metadata
  const doiCitations = await Promise.all(doiList.map((doi) => resolveDOI(doi)));
  const pmidCitations = await resolvePMIDBatch(pmidList);

  // Combine results
  const allCitations = [...doiCitations, ...pmidCitations].filter(Boolean);

  // Export as BibTeX for LaTeX thesis
  const bibTeX = exportToBibTeX(allCitations);

  console.log('Bibliography generated:');
  console.log(bibTeX);
}
```

---

## Error Handling in Components

```typescript
'use client';

import { ExportButton } from '@/app/components/Bibliography/ExportButton';
import { useState } from 'react';

export function BibliographyWithErrorHandling() {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });

    // Auto-dismiss after 5 seconds
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div>
      <ExportButton
        references={references}
        showToast={handleToast}
      />

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg text-white ${
            toast.type === 'success'
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
```

---

## Styling Customization

### Tailwind CSS Dark Mode

The component automatically supports dark mode. To customize:

```typescript
// Override styles in ExportButton
const buttonClass = "px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600";
```

### Custom Theme Colors

```typescript
// Create a theme provider wrapper
function ThemedExportButton(props) {
  return (
    <div className="[--primary:#3b82f6] [--primary-dark:#1e40af]">
      <ExportButton {...props} />
    </div>
  );
}
```

---

## Performance Considerations

### Large Reference Sets

For large collections (1000+ references):

```typescript
// Split export into batches
const batchSize = 500;
const references = getAllReferences();

for (let i = 0; i < references.length; i += batchSize) {
  const batch = references.slice(i, i + batchSize);
  const filename = `references-batch-${i / batchSize + 1}.ris`;
  downloadRISFile(batch, filename);
}
```

### Lazy Loading

```typescript
// Load export functions on demand
const ExportButton = lazy(() =>
  import('@/app/components/Bibliography/ExportButton')
    .then((mod) => ({ default: mod.ExportButton }))
);
```

---

## Troubleshooting

### Export Button Not Appearing

1. Check if `ExportButton` is imported correctly
2. Verify references array is not empty
3. Check browser console for errors

### Downloads Not Working

1. Check browser security settings
2. Ensure third-party downloads are allowed
3. Check browser console for CORS errors

### Metadata Resolution Failing

1. Validate DOI/PMID format with `isValidDOI()` or `isValidPMID()`
2. Check browser network tab for API errors
3. Verify CrossRef/NCBI services are accessible

---

## Testing Integration

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ExportButton } from '@/app/components/Bibliography/ExportButton';

describe('ExportButton Integration', () => {
  it('should export references in RIS format', async () => {
    const mockRefs = [{ id: '1', title: 'Test', year: 2024 }];

    render(
      <ExportButton
        references={mockRefs}
        selectedReferenceIds={['1']}
      />
    );

    const button = screen.getByRole('button', { name: /export/i });
    fireEvent.click(button);

    const risOption = screen.getByRole('button', { name: /ris/i });
    fireEvent.click(risOption);

    // Verify download initiated
    expect(screen.getByText(/successfully exported/i));
  });
});
```

---

## Next Steps

1. **Add to Bibliography Page** - Implement in `/app/[locale]/bibliografia/page.tsx`
2. **Add to Protocol Pages** - Add export button to each screening protocol
3. **Add to Search Results** - Allow exporting search results
4. **Add to Clinical Cases** - Export references from case studies
5. **Monitor Usage** - Track which formats are most popular
6. **Gather Feedback** - Ask users what other formats they need

---

For more detailed information, see:
- [README.md](./README.md) - Complete API reference
- [USAGE.md](./USAGE.md) - Detailed usage guide
- [examples.ts](./examples.ts) - Code examples
