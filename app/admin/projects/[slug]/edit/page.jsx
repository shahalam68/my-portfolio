'use client';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProjectForm from '../../ProjectForm';

export default function EditProjectPage() {
  const { slug } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/api/projects/${slug}`)
      .then((project) => {
        setInitialData({
          num: project.num || '',
          category: project.category || '',
          title: project.title || '',
          slug: project.slug || '',
          description: project.description || '',
          detailedDescription: project.detailedDescription || '',
          workplace: project.workplace || '',
          stack: project.stack?.length ? project.stack : [{ name: '' }],
          image: project.image || '',
          images: Array.isArray(project.images) ? project.images : [],
          live: project.live || '',
          github: project.github || '',
          challenge: project.caseStudy?.challenge || '',
          solution: project.caseStudy?.solution || '',
          impact: project.caseStudy?.impact || '',
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="flex items-center gap-2 text-white/40 py-12 justify-center">
      <Loader2 size={20} className="animate-spin" /> Loading project...
    </div>
  );

  if (error) return (
    <div className="text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 max-w-md">
      {error}
    </div>
  );

  return <ProjectForm mode="edit" initialData={initialData} originalSlug={slug} />;
}
