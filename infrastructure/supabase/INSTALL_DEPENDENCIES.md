# Install Supabase Dependencies

## Required Package

To use the Supabase infrastructure, you need to install the Supabase JavaScript client:

```bash
npm install @supabase/supabase-js
```

Or if using pnpm:

```bash
pnpm add @supabase/supabase-js
```

Or if using yarn:

```bash
yarn add @supabase/supabase-js
```

## Version Compatibility

- **@supabase/supabase-js**: ^2.39.0 or higher
- **TypeScript**: ^5.0.0 or higher (already installed)
- **Next.js**: ^15.0.0 or higher (already installed)

## Verify Installation

After installing, verify the package is available:

```bash
npm list @supabase/supabase-js
```

Expected output:
```
darwin-mfc@0.9.0
└── @supabase/supabase-js@2.39.x
```

## Update package.json

The dependency will be automatically added to your `package.json`:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

## TypeScript Support

The `@supabase/supabase-js` package includes TypeScript definitions, so no additional `@types` package is needed.

Our custom type definitions are in:
- `lib/supabase/types.ts` - Database schema types
- `lib/supabase/client.ts` - Client type exports

## Next Steps

After installing the dependency:

1. Configure environment variables (see `.env.example`)
2. Set up your Supabase project (see `SETUP.md`)
3. Run database migrations (see `SETUP.md`)
4. Test the connection

## Import Examples

Once installed, you can import Supabase functionality:

```typescript
// Client and auth
import { supabase, signIn, signUp } from '@/lib/supabase';

// Helper functions
import { updateProgress, awardXP, addFavorite } from '@/lib/supabase';

// Types
import type { Database } from '@/lib/supabase';
```

## Troubleshooting

**Issue**: Module not found after installation
- **Solution**: Restart your development server
  ```bash
  npm run dev
  ```

**Issue**: TypeScript errors
- **Solution**: Restart TypeScript server in your IDE
  - VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

**Issue**: Old version installed
- **Solution**: Update to latest
  ```bash
  npm update @supabase/supabase-js
  ```
