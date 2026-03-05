'use client';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText, FolderKanban, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/api/projects'), api.get('/api/skills')])
      .then(([projects, skills]) => {
        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          skills: Array.isArray(skills) ? skills.length : 0,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: 'Total Projects',
      value: loading ? '—' : stats.projects,
      icon: FolderKanban,
      href: '/admin/projects',
      accentColor: 'accent',
      glow: 'rgba(0,255,153,0.1)',
    },
    {
      label: 'Total Skills',
      value: loading ? '—' : stats.skills,
      icon: Wrench,
      href: '/admin/skills',
      accentColor: 'purple-400',
      glow: 'rgba(168,85,247,0.1)',
    },
    {
      label: 'Resume',
      value: 'Manage',
      icon: FileText,
      href: '/admin/resume',
      accentColor: 'blue-400',
      glow: 'rgba(96,165,250,0.1)',
    },
  ];

  const quickActions = [
    { label: '+ New Project', href: '/admin/projects/create', primary: true },
    { label: '+ Add Skill', href: '/admin/skills', primary: false },
    { label: '+ Update Resume', href: '/admin/resume', primary: false },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[10px] text-accent/60 font-black uppercase tracking-[0.5em] mb-2">Overview</p>
        <h1 className="text-3xl xl:text-4xl font-black text-white tracking-tight">Dashboard</h1>
        <p className="text-white/30 text-sm mt-2">Welcome back! Here&apos;s your portfolio at a glance.</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map(({ label, value, icon: Icon, href, glow }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              href={href}
              className="group relative block p-8 rounded-[2rem] border border-white/5 hover:border-accent/30 overflow-hidden transition-all duration-500 hover:scale-[1.02] bg-white/[0.02] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-500">
                  <Icon size={20} className="text-accent" />
                </div>
                <ArrowUpRight size={16} className="text-white/10 group-hover:text-accent transition-colors duration-500 group-hover:rotate-0 -rotate-45" />
              </div>
              <p className="text-4xl font-black text-white mb-2">{value}</p>
              <p className="text-xs text-white/30 font-black uppercase tracking-[0.3em]">{label}</p>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]"
                style={{ background: `radial-gradient(circle at 30% 50%, ${glow} 0%, transparent 70%)` }}
              />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-5"
      >
        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em]">Quick Actions</p>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(({ label, href, primary }) => (
            <Link
              key={href}
              href={href}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 hover:scale-[1.03] ${
                primary
                  ? 'bg-accent text-primary shadow-[0_10px_30px_-10px_rgba(0,255,153,0.4)]'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Info Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-[2rem] border border-white/5 bg-white/[0.01]"
      >
        <p className="text-[10px] text-white/15 font-black uppercase tracking-[0.5em] text-center">
          Shah Alam · Portfolio Admin · v2.0
        </p>
      </motion.div>
    </div>
  );
}
