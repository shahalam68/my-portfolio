"use client";

import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight, BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectDetails = ({ params }) => {
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/api/projects/${params.slug}`),
      api.get('/api/projects')
    ])
    .then(([single, all]) => {
      setProject(single);
      setAllProjects(all);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-white/40">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  // Get prev and next projects
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" },
      }}
      className="min-h-screen pt-36 pb-12 xl:pt-32 xl:pb-24"
    >
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-accent hover:underline mb-4 group"
        >
          <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header Section */}
        <div className="flex flex-col mb-8 mt-2">
          <div className="text-6xl md:text-8xl leading-none font-extrabold text-transparent text-outline mb-4">
            {project.num}
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-lg md:text-xl">
            <span className="text-accent font-medium">📍 {project.workplace}</span>
            <span className="w-2 h-2 rounded-full bg-white/20 hidden md:block"></span>
            <span className="text-white/60">{project.category}</span>
          </div>
        </div>

        {/* Image Slider - HUGE AND INTERACTIVE */}
        <div className="w-full mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group/slider">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            speed={1000}
            className="w-full h-full aspect-[21/9]"
          >
            {(project.images || [project.image]).map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <style jsx global>{`
            .swiper-button-next, .swiper-button-prev {
              color: var(--accent) !important;
              background: rgba(0,0,0,0.3);
              padding: 30px;
              border-radius: 10px;
              opacity: 0;
              transition: all 0.3s ease;
            }
            .group\/slider:hover .swiper-button-next,
            .group\/slider:hover .swiper-button-prev {
              opacity: 1;
            }
          `}</style>
        </div>

        {/* Case Study Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 mb-24">
          {/* Main Content Side */}
          <div className="lg:col-span-8">
            <div className="space-y-12">
              {/* Introduction */}
              <section>
                <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  {project.detailedDescription}
                </p>
              </section>

              {/* Challenge */}
              <section className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold text-accent mb-4">The Challenge</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {project.caseStudy.challenge}
                </p>
              </section>

              {/* Solution */}
              <section>
                <h3 className="text-2xl font-bold text-white mb-4">The Solution</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </section>

              {/* Impact */}
              <section className="bg-accent/10 p-6 md:p-8 rounded-2xl border border-accent/20">
                <h3 className="text-2xl font-bold text-accent mb-4">Impact & Results</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {project.caseStudy.impact}
                </p>
              </section>
            </div>
          </div>

          {/* Sidebar / Info Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-10">
              {/* Tech Stack */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/5 border border-white/10 text-accent rounded-full text-sm font-medium"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-4">
                {project.live && (
                  <Link
                    href={project.live}
                    target="_blank"
                    className="w-full py-4 bg-accent text-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-accent-hover transition-all"
                  >
                    Launch Live Site <BsArrowUpRight />
                  </Link>
                )}
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    className="w-full py-4 bg-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/10"
                  >
                    View Source Code <BsGithub />
                  </Link>
                )}
              </div>

              {/* Share/CTA */}
              <div className="p-6 bg-[#232329] rounded-2xl border border-white/5">
                <p className="text-white/40 text-sm italic mb-0">
                  Interested in seeing more? Let&apos;s talk about how I can bring similar solutions to your team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Project */}
            <Link 
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start gap-4 p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-accent/40 transition-all duration-500 overflow-hidden relative"
            >
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-accent uppercase tracking-widest text-xs font-bold flex items-center gap-2">
                  <BsArrowLeft /> Previous
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors">
                  {prevProject.title}
                </h2>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-accent/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            </Link>

            {/* Next Project */}
            <Link 
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-end gap-4 p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-accent/40 transition-all duration-500 overflow-hidden relative text-right"
            >
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-accent uppercase tracking-widest text-xs font-bold flex items-center justify-end gap-2">
                  Next <BsArrowRight />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors">
                  {nextProject.title}
                </h2>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-accent/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetails;
