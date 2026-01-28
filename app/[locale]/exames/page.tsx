import { Metadata } from 'next';
import { PageContainer } from '@/app/components/Layout/Containers';
import { LOINCSearch } from '@/app/components/LOINC';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Exames laboratoriais',
  description: 'Pesquisa de exames laboratoriais com codigos LOINC.',
};

export default function ExamesPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageContainer className="py-8">
        <div className="max-w-3xl">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">
              Exames laboratoriais
            </h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Pesquise exames por nome, sinonimos ou codigo LOINC.
            </p>
          </div>

          <LOINCSearch />
        </div>
      </PageContainer>
    </div>
  );
}
