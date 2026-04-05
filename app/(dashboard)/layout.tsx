export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-background p-4 hidden md:block">
        {/* Sidebar Navigation Placeholder */}
        <nav>Dashboard Sidebar</nav>
      </aside>
      <main className="flex-1 p-8 bg-muted/10">
        {children}
      </main>
    </div>
  );
}
