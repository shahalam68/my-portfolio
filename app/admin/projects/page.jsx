'use client';
import { api } from '@/lib/api';
import { ExternalLink, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchProjects = () => {
    setLoading(true);
    api.get('/api/projects')
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (slug) => {
    if (!confirm(`Delete project "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      await api.delete(`/api/projects/${slug}`);
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-white/40 mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link
          href="/admin/projects/create"
          className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors"
        >
          <Plus size={16} /> Add Project
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-white/40 py-12 justify-center">
          <Loader2 size={20} className="animate-spin" /> Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <p className="text-lg">No projects yet.</p>
          <Link href="/admin/projects/create" className="text-accent hover:underline text-sm mt-2 inline-block">
            Create your first project →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex items-center justify-between bg-[#1a1a24] border border-white/10 rounded-xl px-5 py-4 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-accent font-mono text-sm font-bold shrink-0">#{project.num}</span>
                <div className="min-w-0">
                  <p className="text-white font-medium truncate">{project.title}</p>
                  <p className="text-white/40 text-xs truncate">{project.category} · {project.workplace}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/30 hover:text-white transition-colors"
                    title="Live site"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
                <Link
                  href={`/admin/projects/${project.slug}/edit`}
                  className="p-2 text-white/40 hover:text-accent transition-colors"
                  title="Edit"
                >
                  <Pencil size={15} />
                </Link>
                <button
                  onClick={() => handleDelete(project.slug)}
                  disabled={deleting === project.slug}
                  className="p-2 text-white/40 hover:text-red-400 transition-colors disabled:opacity-40"
                  title="Delete"
                >
                  {deleting === project.slug ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
