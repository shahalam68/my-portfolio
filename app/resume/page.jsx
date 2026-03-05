"use client";
import { SkeletonCard, SkeletonSkill } from "@/components/Skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/lib/api";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Code2, GraduationCap, Terminal, User } from "lucide-react";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const skillsData = {
  title: "Technical Arsenal",
  description:
    "A curated collection of modern technologies and professional tools I utilize to engineer high-impact solutions.",
};

const SkillIcon = ({ iconName, iconUrl, name }) => {
  if (iconUrl) {
    return (
      <div className="w-full h-full relative p-6">
        <img src={iconUrl} alt={name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
      </div>
    );
  }

  if (name === "TanStack Query" || name === "Transtecq Query") {
     const Icon = SiIcons.SiReactquery || Terminal;
     return <Icon />;
  }

  const IconComponent = FaIcons[iconName] || SiIcons[iconName];
  if (IconComponent) {
    return <IconComponent />;
  }

  return <Terminal className="w-8 h-8" />;
};

const Resume = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [about, setAbout] = useState({ title: 'Profile Info', description: '', info: [] });
  const [activeTab, setActiveTab] = useState("experience");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get('/api/skills'),
      api.get('/api/resume/experience'),
      api.get('/api/resume/education'),
      api.get('/api/resume/about')
    ])
    .then(([skillsData, extData, eduData, aboutData]) => {
      setSkills(skillsData);
      setExperience(extData);
      setEducation(eduData);
      setAbout(aboutData);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  }, []);

  const tabVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -30, filter: "blur(10px)", transition: { duration: 0.3 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const TABS = [
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "about", label: "About", icon: User },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      className="min-h-screen flex flex-col justify-center pt-36 pb-12 xl:pt-32 xl:pb-20"
    >
      <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
        <Tabs
          defaultValue="experience"
          className="flex flex-col items-center gap-16 xl:gap-24"
          onValueChange={setActiveTab}
        >
          {/* Horizontal Grid/Flex Tabs List */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full flex justify-center"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent p-0 w-full max-w-4xl">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="group flex items-center justify-center gap-4 px-8 py-6 glass-morphism rounded-[2rem] border-white/5 data-[state=active]:bg-accent data-[state=active]:text-primary transition-all duration-700 hover:border-accent/40 hover:scale-[1.02] active:scale-95"
                >
                  <tab.icon className="w-5 h-5 group-data-[state=active]:scale-110 transition-transform" />
                  <span className="text-sm font-black uppercase tracking-[0.2em]">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>
          
          <div className="w-full min-h-[700px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                {/* Experience Content */}
                <TabsContent value="experience" className="m-0 focus-visible:outline-none">
                  <div className="space-y-20">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center space-y-6 max-w-3xl mx-auto"
                    >
                      <h3 className="text-6xl xl:text-8xl font-black text-white uppercase tracking-tighter leading-none opacity-20 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none w-full">
                        Experience
                      </h3>
                      <h3 className="text-3xl xl:text-4xl font-black text-white uppercase tracking-tighter leading-none">
                        Professional Journey
                      </h3>
                      <p className="text-white/40 text-base font-medium tracking-tight">Engineering scalable excellence across the modern web stack.</p>
                      <div className="w-24 h-1 bg-accent mx-auto rounded-full opacity-50"></div>
                    </motion.div>
                    
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6"
                    >
                      {loading ? (
                        <>{[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}</>
                      ) : experience.map((item, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[3rem] border border-white/5 hover:border-accent/30 transition-all duration-700 group relative overflow-hidden flex flex-col justify-between h-full"
                        >
                          <div className="flex flex-col gap-8 relative z-10">
                            <div className="flex justify-between items-start">
                              <span className="text-accent font-black text-[10px] tracking-[0.4em] uppercase bg-accent/10 px-5 py-2 rounded-full border border-accent/20">
                                {item.duration}
                              </span>
                              <Briefcase className="w-6 h-6 text-white/10 group-hover:text-accent/40 transition-colors" />
                            </div>
                            <div>
                              <h4 className="text-4xl font-black mb-3 group-hover:text-accent transition-all duration-500 tracking-tight leading-tight">
                                {item.position}
                              </h4>
                              <p className="text-white/60 font-black text-lg tracking-wide uppercase opacity-80">{item.company}</p>
                            </div>
                            <p className="text-white/40 leading-relaxed text-lg font-medium italic">
                              "{item.description}"
                            </p>
                            {item.techStack && (
                              <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                                {item.techStack.split(',').map((tech, i) => (
                                  <span key={i} className="text-[9px] font-black uppercase text-accent/80 bg-accent/5 px-4 py-2 rounded-xl border border-accent/10 hover:bg-accent/10 transition-colors">
                                    {tech.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-accent/10 transition-all duration-1000"></div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </TabsContent>

                {/* Education Content */}
                <TabsContent value="education" className="m-0 focus-visible:outline-none">
                  <div className="space-y-20">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center space-y-6 max-w-3xl mx-auto"
                    >
                      <h3 className="text-6xl xl:text-8xl font-black text-white uppercase tracking-tighter leading-none opacity-20 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none w-full">
                        Knowledge
                      </h3>
                      <h3 className="text-3xl xl:text-4xl font-black text-white uppercase tracking-tighter leading-none relative z-10">Academic Path</h3>
                      <p className="text-white/40 text-base font-medium tracking-tight">The theoretical core of my engineering philosophy.</p>
                      <div className="w-24 h-1 bg-accent mx-auto rounded-full opacity-50"></div>
                    </motion.div>
                    
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6"
                    >
                      {loading ? (
                        <>{[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}</>
                      ) : education.map((item, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="bg-white/[0.02] backdrop-blur-3xl p-16 rounded-[4rem] border border-white/5 hover:border-accent/30 transition-all duration-700 flex flex-col items-center text-center group relative overflow-hidden"
                        >
                          <span className="text-accent font-black text-[10px] tracking-[0.4em] uppercase mb-10 bg-accent/10 px-6 py-3 rounded-full border border-accent/20">{item.duration}</span>
                          <GraduationCap className="w-12 h-12 text-white/5 mb-8 group-hover:text-accent/20 transition-all duration-700" />
                          <h4 className="text-3xl font-black mb-6 group-hover:text-accent transition-all duration-500 tracking-tight leading-snug">
                            {item.degree}
                          </h4>
                          <div className="h-[2px] w-16 bg-accent/20 mb-8 group-hover:w-32 transition-all duration-700"></div>
                          <p className="text-white/50 font-black text-xl tracking-tighter uppercase">{item.institution}</p>
                          <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </TabsContent>

                {/* Skills Content */}
                <TabsContent value="skills" className="m-0 focus-visible:outline-none">
                  <div className="space-y-20">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center space-y-6 max-w-3xl mx-auto"
                    >
                      <h3 className="text-6xl xl:text-8xl font-black text-white uppercase tracking-tighter leading-none opacity-20 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none w-full">
                        Expertise
                      </h3>
                      <h3 className="text-3xl xl:text-4xl font-black text-white uppercase tracking-tighter leading-none relative z-10">{skillsData.title}</h3>
                      <p className="text-white/40 text-base font-medium tracking-tight leading-relaxed">{skillsData.description}</p>
                      <div className="w-24 h-1 bg-accent mx-auto rounded-full opacity-50"></div>
                    </motion.div>
                    
                    {loading ? (
                      <>{[...Array(12)].map((_, i) => <SkeletonSkill key={i} />)}</>
                    ) : (
                      <div className="space-y-16">
                        {/* Technical Skills */}
                        <div className="space-y-8">
                          <h4 className="text-xl font-black text-white uppercase tracking-[0.2em] relative inline-block">
                            Technical Skills
                            <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-accent"></div>
                          </h4>
                          <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8"
                          >
                            {skills.filter(s => s.type !== 'tool').map((skill, index) => (
                              <motion.div key={`tech-${index}`} variants={itemVariants}>
                                <TooltipProvider delayDuration={0}>
                                  <Tooltip>
                                    <TooltipTrigger className="w-full group">
                                      <div className="aspect-square bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] flex flex-col items-center justify-center border border-white/5 hover:border-accent/40 hover:shadow-[0_0_60px_-15px_rgba(0,255,153,0.4)] transition-all duration-700 relative overflow-hidden group-hover:scale-105 active:scale-95">
                                        <div className="text-6xl group-hover:scale-110 group-hover:text-accent transition-all duration-700 opacity-60 group-hover:opacity-100 flex items-center justify-center">
                                          <SkillIcon iconName={skill.iconName} iconUrl={skill.iconUrl} name={skill.name} />
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-accent text-primary font-black uppercase text-[11px] tracking-[0.3em] rounded-xl px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-none">
                                      <p>{skill.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>

                        {/* Professional Tools */}
                        <div className="space-y-8">
                          <h4 className="text-xl font-black text-white uppercase tracking-[0.2em] relative inline-block">
                            Professional Tools
                            <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-accent"></div>
                          </h4>
                          <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8"
                          >
                            {skills.filter(s => s.type === 'tool').map((skill, index) => (
                              <motion.div key={`tool-${index}`} variants={itemVariants}>
                                <TooltipProvider delayDuration={0}>
                                  <Tooltip>
                                    <TooltipTrigger className="w-full group">
                                      <div className="aspect-square bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] flex flex-col items-center justify-center border border-white/5 hover:border-accent/40 hover:shadow-[0_0_60px_-15px_rgba(0,255,153,0.4)] transition-all duration-700 relative overflow-hidden group-hover:scale-105 active:scale-95">
                                        <div className="text-6xl group-hover:scale-110 group-hover:text-accent transition-all duration-700 opacity-60 group-hover:opacity-100 flex items-center justify-center">
                                          <SkillIcon iconName={skill.iconName} iconUrl={skill.iconUrl} name={skill.name} />
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-accent text-primary font-black uppercase text-[11px] tracking-[0.3em] rounded-xl px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-none">
                                      <p>{skill.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* About Content */}
                <TabsContent value="about" className="m-0 focus-visible:outline-none">
                  <div className="space-y-20">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center space-y-6 max-w-3xl mx-auto"
                    >
                      <h3 className="text-6xl xl:text-8xl font-black text-white uppercase tracking-tighter leading-none opacity-20 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none w-full">
                        Bio
                      </h3>
                      <h3 className="text-3xl xl:text-4xl font-black text-white uppercase tracking-tighter leading-none relative z-10">Personal Context</h3>
                      <p className="text-white/40 text-base font-medium tracking-tight leading-relaxed">{about.description || "Synthesizing professional mastery with human-centric design."}</p>
                      <div className="w-24 h-1 bg-accent mx-auto rounded-full opacity-50"></div>
                    </motion.div>
                    
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
                    >
                      {about.info.map((item, index) => (
                        <motion.div 
                          key={index} 
                          variants={itemVariants}
                          className="bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/5 flex items-center gap-10 group hover:border-accent/30 transition-all duration-700 relative overflow-hidden"
                        >
                          <div className="w-2 h-16 bg-accent/20 rounded-full group-hover:bg-accent group-hover:h-20 transition-all duration-700"></div>
                          <div className="space-y-3">
                            <span className="text-[11px] uppercase font-black tracking-[0.4em] text-accent/50">{item.fieldName}</span>
                            <p className="text-3xl font-black tracking-tight text-white/90 leading-none">{item.fieldValue}</p>
                          </div>
                          <User className="absolute -right-6 -bottom-6 w-40 h-40 text-white/[0.02] group-hover:text-accent/[0.05] transition-all duration-1000 transform group-hover:scale-110" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-accent/5 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-blue-500/5 blur-[180px] rounded-full animate-bounce" style={{ animationDuration: '20s' }} />
      </div>
    </motion.section>
  );
};

export default Resume;
