'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from '@/lib/api';
import { Briefcase, GraduationCap, Loader2, Plus, Save, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-accent transition-colors text-sm";
const textareaCls = `${inputCls} resize-none`;

export default function AdminResumePage() {
  const [activeTab, setActiveTab] = useState('experience');
  const [loading, setLoading] = useState(true);
  
  // States
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [about, setAbout] = useState({ title: '', description: '', info: [] });
  
  // Form states
  const [expForm, setExpForm] = useState({ company: '', position: '', duration: '', description: '', techStack: '' });
  const [eduForm, setEduForm] = useState({ institution: '', degree: '', duration: '' });
  
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [expData, eduData, aboutData] = await Promise.all([
        api.get('/api/resume/experience'),
        api.get('/api/resume/education'),
        api.get('/api/resume/about')
      ]);
      setExperience(expData);
      setEducation(eduData);
      setAbout(aboutData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Experience Handlers
  const handleAddExp = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const newItem = await api.post('/api/resume/experience', expForm);
      setExperience([newItem, ...experience]);
      setExpForm({ company: '', position: '', duration: '', description: '', techStack: '' });
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDeleteExp = async (id) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await api.delete(`/api/resume/experience/${id}`);
      setExperience(experience.filter(i => i._id !== id));
    } catch (err) { alert(err.message); }
  };

  // Education Handlers
  const handleAddEdu = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const newItem = await api.post('/api/resume/education', eduForm);
      setEducation([newItem, ...education]);
      setEduForm({ institution: '', degree: '', duration: '' });
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDeleteEdu = async (id) => {
    if (!confirm('Delete this education?')) return;
    try {
      await api.delete(`/api/resume/education/${id}`);
      setEducation(education.filter(i => i._id !== id));
    } catch (err) { alert(err.message); }
  };

  // About Handlers
  const handleUpdateAbout = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
        const updated = await api.put('/api/resume/about', about);
        setAbout(updated);
        alert('About section updated!');
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const updateAboutInfo = (index, key, value) => {
    const newInfo = [...about.info];
    newInfo[index] = { ...newInfo[index], [key]: value };
    setAbout({ ...about, info: newInfo });
  };

  const addAboutInfo = () => setAbout({ ...about, info: [...about.info, { fieldName: '', fieldValue: '' }] });
  const removeAboutInfo = (index) => setAbout({ ...about, info: about.info.filter((_, i) => i !== index) });

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-accent" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Resume</h1>
        <p className="text-white/40 mt-1">Update your experience, education, and personal details.</p>
      </div>

      <Tabs defaultValue="experience" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1">
          <TabsTrigger value="experience" className="flex items-center gap-2"><Briefcase size={14} /> Experience</TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2"><GraduationCap size={14} /> Education</TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2"><User size={14} /> About Me</TabsTrigger>
        </TabsList>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-8">
          <form onSubmit={handleAddExp} className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Add Experience</h3>
            <div className="grid grid-cols-2 gap-4">
              <input className={inputCls} placeholder="Company" value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} required />
              <input className={inputCls} placeholder="Position" value={expForm.position} onChange={e => setExpForm({...expForm, position: e.target.value})} required />
              <input className={inputCls} placeholder="Duration (e.g. 2024 - Present)" value={expForm.duration} onChange={e => setExpForm({...expForm, duration: e.target.value})} required />
              <input className={inputCls} placeholder="Tech Stack (comma separated)" value={expForm.techStack} onChange={e => setExpForm({...expForm, techStack: e.target.value})} />
            </div>
            <textarea className={textareaCls} rows={3} placeholder="Description" value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} required />
            <button type="submit" disabled={saving} className="bg-accent text-primary px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 disabled:opacity-50">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add Experience
            </button>
          </form>

          <div className="space-y-4">
            {experience.map(item => (
              <div key={item._id} className="bg-[#1a1a24] border border-white/10 rounded-xl p-5 flex justify-between items-start">
                <div>
                  <h4 className="text-white font-bold">{item.position}</h4>
                  <p className="text-accent text-sm font-medium">{item.company} | {item.duration}</p>
                  <p className="text-white/60 text-xs mt-2 max-w-xl">{item.description}</p>
                </div>
                <button onClick={() => handleDeleteExp(item._id)} className="text-white/20 hover:text-red-500 transition-colors p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-8">
          <form onSubmit={handleAddEdu} className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Add Education</h3>
            <div className="grid grid-cols-2 gap-4">
              <input className={inputCls} placeholder="Institution" value={eduForm.institution} onChange={e => setEduForm({...eduForm, institution: e.target.value})} required />
              <input className={inputCls} placeholder="Degree" value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} required />
              <input className={inputCls} placeholder="Duration" value={eduForm.duration} onChange={e => setEduForm({...eduForm, duration: e.target.value})} required />
            </div>
            <button type="submit" disabled={saving} className="bg-accent text-primary px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 disabled:opacity-50">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add Education
            </button>
          </form>

          <div className="space-y-4">
            {education.map(item => (
              <div key={item._id} className="bg-[#1a1a24] border border-white/10 rounded-xl p-5 flex justify-between items-start">
                <div>
                  <h4 className="text-white font-bold">{item.degree}</h4>
                  <p className="text-accent text-sm font-medium">{item.institution} | {item.duration}</p>
                </div>
                <button onClick={() => handleDeleteEdu(item._id)} className="text-white/20 hover:text-red-500 transition-colors p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about">
          <form onSubmit={handleUpdateAbout} className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">About Profile</h3>
              <input className={inputCls} placeholder="Profile Title" value={about.title} onChange={e => setAbout({...about, title: e.target.value})} required />
              <textarea className={textareaCls} rows={4} placeholder="About Description" value={about.description} onChange={e => setAbout({...about, description: e.target.value})} required />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Personal Details</h3>
                <button type="button" onClick={addAboutInfo} className="text-accent text-xs hover:underline">+ Add Field</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {about.info.map((inf, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input className={inputCls} placeholder="Label (e.g. Email)" value={inf.fieldName} onChange={e => updateAboutInfo(idx, 'fieldName', e.target.value)} required />
                    <input className={inputCls} placeholder="Value" value={inf.fieldValue} onChange={e => updateAboutInfo(idx, 'fieldValue', e.target.value)} required />
                    <button type="button" onClick={() => removeAboutInfo(idx)} className="text-white/20 hover:text-red-500 p-2"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={saving} className="w-full bg-accent text-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors disabled:opacity-50">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Save All Changes
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
