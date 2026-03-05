import PSHeader from '@/app/components/PS/PSHeader';
import PSSidebar from '@/app/components/PS/PSSidebar';
import PSMobileNav from '@/app/components/PS/PSMobileNav';

export default function PSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950">
      <PSHeader />
      <div className="flex flex-1">
        <div className="hidden lg:block">
          <PSSidebar />
        </div>
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
      <PSMobileNav />
    </div>
  );
}
