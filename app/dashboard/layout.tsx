import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-ice-50 to-white">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
