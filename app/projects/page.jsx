"use client";

import { SkeletonProjectCard } from "@/components/Skeleton";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/projects')
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="min-h-screen pt-36 pb-12 xl:pt-32 xl:pb-20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl xl:text-4xl font-black text-white uppercase tracking-tighter">
            Selected Work<span className="text-accent">.</span>
          </h2>
          <p className="text-white/40 text-sm font-medium max-w-xl mx-auto">
            A showcase of engineered solutions, from scalable web apps to high-performance architectures.
          </p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full opacity-50"></div>
        </motion.div>

        {loading ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
            {[...Array(6)].map((_, i) => <SkeletonProjectCard key={i} />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 glass-morphism rounded-[3rem] border-white/5 max-w-2xl mx-auto">
            <Folder className="w-20 h-20 text-white/5 mx-auto mb-6" />
            <p className="text-white/40 font-black uppercase tracking-[0.3em]">No projects discovered</p>
          </div>
        ) : (
          /* Card Grid */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12"
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative"
              >
                <Link href={`/projects/${project.slug}`} className="block h-full">
                  <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/5 hover:border-accent/30 shadow-2xl transition-all duration-700 h-full flex flex-col hover:scale-[1.02]">
                    
                    {/* Image Wrapper */}
                    <div className="relative h-60 xl:h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-black text-white group-hover:text-accent transition-colors duration-500 tracking-tight leading-tight">
                            {project.title}
                          </h3>
                          <BsArrowUpRight className="text-white/20 group-hover:text-accent group-hover:rotate-45 transition-all duration-500 text-xl" />
                        </div>
                        <p className="text-white/40 text-base font-medium leading-relaxed italic line-clamp-2">
                          "{project.description}"
                        </p>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {project.stack.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 text-white/60 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/5"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;