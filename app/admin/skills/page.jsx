'use client';
import ImageUpload from '@/components/ImageUpload';
import { api } from '@/lib/api';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const TECH_ICONS = ['SiReact', 'SiNextdotjs', 'SiNodedotjs', 'SiMongodb', 'SiTailwindcss', 'SiTypescript', 'SiJavascript', 'SiPython', 'SiDocker', 'SiGit', 'SiPostgresql', 'SiRedis', 'SiGraphql', 'SiFigma', 'SiVsco'];

const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-accent transition-colors text-sm";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState({ name: '', iconName: '', iconUrl: '', type: 'tech' });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');

  const fetchSkills = () => {
    setLoading(true);
    api.get('/api/skills')
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAddError('');
    setAdding(true);
    try {
      const newSkill = await api.post('/api/skills', form);
      setSkills((prev) => [...prev, newSkill]);
      setForm({ name: '', iconName: '', iconUrl: '', type: 'tech' });
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    setDeleting(id);
    try {
      await api.delete(`/api/skills/${id}`);
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const techSkills = skills.filter((s) => s.type === 'tech');
  const toolSkills = skills.filter((s) => s.type === 'tool');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Skills</h1>
        <p className="text-white/40 mt-1">{skills.length} skill{skills.length !== 1 ? 's' : ''} total</p>
      </div>

      {/* Add Skill Form */}
      <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Add New Skill</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className={inputCls}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Skill name (e.g. React)"
              required
            />
            <input
              className={inputCls}
              value={form.iconName}
              onChange={(e) => setForm((f) => ({ ...f, iconName: e.target.value }))}
              placeholder="Icon name (e.g. SiReact)"
            />
            <select
              className={`${inputCls} cursor-pointer`}
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            >
              <option value="tech">Tech</option>
              <option value="tool">Tool</option>
            </select>
          </div>
          
          <div className="flex flex-col sm:flex-row items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Or Upload Icon</label>
              <ImageUpload 
                value={form.iconUrl} 
                onChange={(url) => setForm((f) => ({ ...f, iconUrl: url }))} 
              />
            </div>
            <button
              type="submit"
              disabled={adding}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-60 shrink-0 h-11"
            >
              {adding ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
              Add Skill
            </button>
          </div>
        </form>
        {addError && (
          <p className="text-red-400 text-sm mt-3 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{addError}</p>
        )}
        <p className="text-white/20 text-xs mt-3">
          Icon names use react-icons Simple Icons format, e.g. <span className="text-white/40">SiReact</span>, <span className="text-white/40">SiNodedotjs</span>
        </p>
      </div>

      {/* Skills List */}
      {loading ? (
        <div className="flex items-center gap-2 text-white/40 py-12 justify-center">
          <Loader2 size={20} className="animate-spin" /> Loading skills...
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-12 text-white/30">No skills yet. Add one above.</div>
      ) : (
        <div className="space-y-6">
          {[{ label: 'Technologies', items: techSkills }, { label: 'Tools', items: toolSkills }].map(({ label, items }) =>
            items.length > 0 && (
              <div key={label}>
                <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">{label}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((skill) => (
                    <div
                      key={skill._id}
                      className="flex items-center justify-between bg-[#1a1a24] border border-white/10 rounded-xl px-4 py-3 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {skill.iconUrl && (
                          <div className="w-8 h-8 rounded bg-white/5 overflow-hidden relative border border-white/10">
                            <img src={skill.iconUrl} alt={skill.name} className="object-cover w-full h-full" />
                          </div>
                        )}
                        <div>
                          <p className="text-white text-sm font-medium">{skill.name}</p>
                          <p className="text-white/30 text-xs font-mono">{skill.iconName || 'Custom Icon'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        disabled={deleting === skill._id}
                        className="p-1.5 text-white/30 hover:text-red-400 transition-colors disabled:opacity-40"
                      >
                        {deleting === skill._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
