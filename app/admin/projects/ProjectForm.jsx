'use client';
import ImageUpload from '@/components/ImageUpload';
import { api } from '@/lib/api';
import { ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const EMPTY_FORM = {
  num: '', category: '', title: '', slug: '', description: '',
  detailedDescription: '', workplace: '', stack: [{ name: '' }],
  image: '', images: '', live: '', github: '',
  challenge: '', solution: '', impact: '',
};

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/60 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-accent transition-colors text-sm";
const textareaCls = `${inputCls} resize-none`;

export default function ProjectForm({ initialData = EMPTY_FORM, mode = 'create', originalSlug }) {
  const router = useRouter();
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const setStack = (index, value) => {
    const stack = [...form.stack];
    stack[index] = { name: value };
    setForm((f) => ({ ...f, stack }));
  };

  const addStack = () => setForm((f) => ({ ...f, stack: [...f.stack, { name: '' }] }));
  const removeStack = (i) => setForm((f) => ({ ...f, stack: f.stack.filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        stack: form.stack.filter((s) => s.name.trim()),
        images: Array.isArray(form.images) ? form.images.filter(img => typeof img === 'string' && img.trim() !== '') : [],
        caseStudy: { 
          challenge: form.challenge || '', 
          solution: form.solution || '', 
          impact: form.impact || '' 
        },
      };

      // Ensure no duplicates in images
      payload.images = [...new Set(payload.images)];
      delete payload.challenge; delete payload.solution; delete payload.impact;

      if (mode === 'create') {
        await api.post('/api/projects', payload);
      } else {
        await api.put(`/api/projects/${originalSlug}`, payload);
      }
      router.push('/admin/projects');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/projects" className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">{mode === 'create' ? 'Add Project' : 'Edit Project'}</h1>
          <p className="text-white/40 mt-1 text-sm">{mode === 'create' ? 'Fill in the details below' : `Editing: ${originalSlug}`}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        {/* Basic info */}
        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Number">
              <input className={inputCls} value={form.num} onChange={(e) => set('num', e.target.value)} placeholder="01" required />
            </Field>
            <Field label="Category">
              <input className={inputCls} value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Full Stack" required />
            </Field>
          </div>
          <Field label="Title">
            <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Project Title" required />
          </Field>
          <Field label="Slug">
            <input className={inputCls} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="project-slug" required />
          </Field>
          <Field label="Workplace">
            <input className={inputCls} value={form.workplace} onChange={(e) => set('workplace', e.target.value)} placeholder="Company / Personal" required />
          </Field>
        </div>

        {/* Description */}
        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Description</h2>
          <Field label="Short Description">
            <textarea className={textareaCls} rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Brief summary..." required />
          </Field>
          <Field label="Detailed Description">
            <textarea className={textareaCls} rows={4} value={form.detailedDescription} onChange={(e) => set('detailedDescription', e.target.value)} placeholder="Full description..." required />
          </Field>
        </div>

        {/* Stack */}
        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Tech Stack</h2>
          {form.stack.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={inputCls}
                value={s.name}
                onChange={(e) => setStack(i, e.target.value)}
                placeholder={`Technology ${i + 1}`}
              />
              {form.stack.length > 1 && (
                <button type="button" onClick={() => removeStack(i)} className="p-2.5 text-white/30 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addStack} className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors">
            <Plus size={15} /> Add Technology
          </button>
        </div>

        {/* Images */}
        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Images</h2>
          <Field label="Main Image">
            <ImageUpload value={form.image} onChange={(url) => set('image', url)} />
          </Field>
          <Field label="Additional Images (up to 5)">
            <ImageUpload 
              multiple 
              value={Array.isArray(form.images) ? form.images : []} 
              onChange={(urls) => set('images', urls)} 
            />
          </Field>
        </div>

        {/* Links */}
        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Live URL">
              <input className={inputCls} value={form.live} onChange={(e) => set('live', e.target.value)} placeholder="https://..." />
            </Field>
            <Field label="GitHub URL">
              <input className={inputCls} value={form.github} onChange={(e) => set('github', e.target.value)} placeholder="https://github.com/..." />
            </Field>
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Case Study</h2>
          <Field label="Challenge">
            <textarea className={textareaCls} rows={3} value={form.challenge} onChange={(e) => set('challenge', e.target.value)} placeholder="What problem did you solve?" required />
          </Field>
          <Field label="Solution">
            <textarea className={textareaCls} rows={3} value={form.solution} onChange={(e) => set('solution', e.target.value)} placeholder="How did you solve it?" required />
          </Field>
          <Field label="Impact">
            <textarea className={textareaCls} rows={3} value={form.impact} onChange={(e) => set('impact', e.target.value)} placeholder="What was the result?" required />
          </Field>
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</p>
        )}

        <div className="flex gap-3 pb-8">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Saving...' : mode === 'create' ? 'Create Project' : 'Save Changes'}
          </button>
          <Link href="/admin/projects" className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
