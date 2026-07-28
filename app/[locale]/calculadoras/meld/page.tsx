'use client';

import { useEffect } from 'react';
import { Link, useRouter } from '@/i18n/routing';

/** Keep bookmarks to the former MELD route working after the calculator was renamed MELD-Na. */
export default function LegacyMeldCalculatorPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/calculadoras/meld-na');
  }, [router]);

  return (
    <main className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        MELD-Na
      </h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
        Redirecting to the current calculator...
      </p>
      <Link
        href="/calculadoras/meld-na"
        className="mt-6 inline-flex text-[#0071E3] hover:underline"
      >
        Open MELD-Na
      </Link>
    </main>
  );
}
