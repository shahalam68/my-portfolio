'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, FolderKanban, LayoutDashboard, LogOut, Menu, Wrench, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/skills', label: 'Skills', icon: Wrench },
  { href: '/admin/resume', label: 'Resume', icon: FileText },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    const token = localStorage.getItem('admin_token');
    if (!token) router.replace('/admin/login');
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-[#030712] text-white">
      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-30 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto
          bg-white/[0.02] backdrop-blur-2xl border-r border-white/5`}
      >
        {/* Logo */}
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-[0_5px_20px_rgba(0,255,153,0.3)]">
              <Zap size={18} className="text-primary" />
            </div>
            <div>
              <span className="text-sm font-black text-white tracking-tight">Admin Panel</span>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">Portfolio CMS</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }, idx) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
            return (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 relative overflow-hidden group
                    ${active
                      ? 'bg-accent text-primary shadow-[0_5px_20px_rgba(0,255,153,0.2)]'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Icon size={16} className={active ? 'text-primary' : 'group-hover:scale-110 transition-transform text-accent'} />
                  {label}
                  {active && (
                    <motion.div
                      layoutId="adminActiveIndicator"
                      className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 w-full group"
          >
            <LogOut size={16} className="group-hover:scale-110 transition-transform" />
            Sign Out
          </button>
          <p className="text-[9px] text-white/10 uppercase tracking-[0.5em] font-black text-center mt-4">v2.0</p>
        </div>

        {/* Glow */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-accent/3 blur-[100px] pointer-events-none"></div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-2xl sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
              <Zap size={14} className="text-primary" />
            </div>
            <span className="text-sm font-black text-white">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </header>

        <main className="flex-1 p-6 xl:p-10 overflow-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Global Ambient Glow */}
      <div className="fixed top-1/2 left-64 -translate-y-1/2 w-[60rem] h-[60rem] bg-accent/2 blur-[200px] rounded-full pointer-events-none -z-10"></div>
    </div>
  );
}
