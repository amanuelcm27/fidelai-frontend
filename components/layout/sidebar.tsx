"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Upload,
  ListTodo,
  PenTool,
  ShieldCheck,
  ShoppingCart,
  Library,
  Settings,
  BarChart3,
  Users,
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const contributorLinks: SidebarItem[] = [
  { label: 'Dashboard', href: '/contributor', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Upload', href: '/contributor/upload', icon: <Upload className="h-4 w-4" /> },
];

const annotatorLinks: SidebarItem[] = [
  { label: 'Dashboard', href: '/annotator', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Tasks', href: '/annotator/tasks', icon: <ListTodo className="h-4 w-4" /> },
  { label: 'Workspace', href: '/annotator/workspace', icon: <PenTool className="h-4 w-4" /> },
];

const expertLinks: SidebarItem[] = [
  { label: 'Dashboard', href: '/expert', icon: <ShieldCheck className="h-4 w-4" /> },
  { label: 'Workspace', href: '/expert/workspace', icon: <PenTool className="h-4 w-4" /> },
];

const buyerLinks: SidebarItem[] = [
  { label: 'Marketplace', href: '/buyer', icon: <ShoppingCart className="h-4 w-4" /> },
  { label: 'Library', href: '/buyer/library', icon: <Library className="h-4 w-4" /> },
];

const adminLinks: SidebarItem[] = [
  { label: 'Console', href: '/admin', icon: <BarChart3 className="h-4 w-4" /> },
  { label: 'Users', href: '/admin/users', icon: <Users className="h-4 w-4" /> },
  { label: 'Settings', href: '/admin/settings', icon: <Settings className="h-4 w-4" /> },
];

const allRoleLinks: Record<string, SidebarItem[]> = {
  contributor: contributorLinks,
  annotator: annotatorLinks,
  expert: expertLinks,
  buyer: buyerLinks,
  admin: adminLinks,
};

interface SidebarProps {
  role?: string;
}

export function Sidebar({ role = 'contributor' }: SidebarProps) {
  const pathname = usePathname();
  const links = allRoleLinks[role] || contributorLinks;

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-background p-4">
      <div className="mb-8">
        <h2 className="text-lg font-bold">FidelAI</h2>
        <p className="text-xs text-muted-foreground capitalize">{role} Panel</p>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              pathname === item.href
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
