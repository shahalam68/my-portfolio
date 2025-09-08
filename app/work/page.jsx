"use client";

import { motion } from "framer-motion";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const projects = [
  
  {
    num: "04",
    category: "Fullstack",
    title: "Amar Plot",
    description:
      "A property marketplace platform that allows users to buy, sell, and rent properties. Features include secure authentication, property listings with images, and a smooth responsive UI for seamless user experience.",
    stack: [{ name: "TypeScript" },{ name: "Next.js" }, { name: "Shadcn UI" }, { name: "Node.js" }],
    image: "/work/amarplot.png",
    live: "https://amarplot.com",
    github: "https://github.com/yourusername/tech-foring",
    workplace: "Personal Project",
  },
  
  {
    num: "06",
    category: "Frontend",
    title: "GameBD",
    description:
      "A gamified loyalty platform designed to boost customer engagement and retention. Includes real-time challenges, EXP tracking, and a responsive design optimized for mobile users.",
    stack: [{ name: "TypeScript" },{ name: "Next.js" }, { name: "Shadcn UI" }, { name: "Python" }],
    image: "/work/gamebd.png",
    live: "https://play.gamebd.co/en",
    github: "https://github.com/yourusername/tech-foring",
    workplace: "ReadyLab L.L.C",
  },
  {
    num: "07",
    category: "FrontEnd",
    title: "ReadyLab Loyalty Game Platform",
    description:
      "A gamified loyalty experience built to enhance user engagement and retention. Features secure authentication, interactive challenges, EXP tracking, referral system, and a responsive UI powered by Shadcn UI and Tailwind CSS.",
    stack: [
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Shadcn UI" },
      { name: "Python" },
    ],
    image: "/work/readylab.png",
    live: "https://game.readylab.co/",
    github: "https://github.com/yourusername/readylab-loyalty",
    workplace: "ReadyLab L.L.C",
  },{
    num: "05",
    category: "Frontend",
    title: "Tech Foring",
    description:
      "A cybersecurity consulting company website built with a focus on performance and scalability. Developed reusable UI components, improved SEO, and integrated third-party services to support business growth.",
    stack: [{ name: "JavaScript" },{ name: "Next.js" }, { name: "Material UI" }, { name: "Python" }],
    image: "/work/techforing.png",
    live: "https://techforing.com",
    github: "https://github.com/yourusername/tech-foring",
    workplace: "TechForing Ltd.",
  },
  {
    num: "03",
    category: "Frontend",
    title: "Career Platform",
    description:
      "A job portal and career development platform connecting job seekers with employers. Includes resume building tools, job matching algorithms, and interview preparation resources.",
    stack: [{ name: "React.js" },  { name: "Material UI" },{ name: "Zuestend" },],
    image: "/work/carrier.png",
    live: "https://career.techforing.com/",
    github: "https://github.com/yourusername/career-platform",
    workplace: "Personal Project",
  },
  {
    num: "01",
    category: "FrontEnd",
    title: "HR Management System",
    description:
      "A comprehensive HR management platform for employee data management, payroll processing, attendance tracking, and performance evaluation. Streamlines HR operations with automated workflows.",
    stack: [{ name: "React" },{name:"Zustend"} ],
    image: "/work/hrms.png",
    live: "https://hrms.techforing.com/login",
    github: "https://github.com/yourusername/hrms",
    workplace: "TechForing Ltd.",
  },
  {
    num: "02",
    category: "FrontEnd",
    title: "Content Management System",
    description:
      "A robust CMS platform enabling content creators to manage digital content efficiently. Features include role-based access control, content scheduling, media management, and SEO optimization tools.",
    stack: [{ name: "React.js" }, { name: "Zustend" },],
    image: "/work/cms.png",
    live: "https://cms.techforing.com/login",
    github: "https://github.com/yourusername/cms",
    workplace: "TechForing Ltd.",
  },
 
];

const Work = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" },
      }}
      className="min-h-screen py-16"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My Projects
          </h2>
        </div>

        {/* Card Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-accent/40 transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mb-2">
                  {project.description}
                </p>

                {/* Workplace */}
                <p className="text-xs text-accent font-medium mb-3">
                  📍 {project.workplace}
                </p>

                {/* Stack Badges */}
                <ul className="flex gap-2 mt-2 flex-wrap">
                  {project.stack.map((item, idx) => (
                    <li
                      key={idx}
                      className="px-2 py-1 bg-accent/20 text-accent rounded-md text-xs"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>

                {/* Buttons */}
                <div className="flex gap-4 mt-5">
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      className="flex items-center gap-1 text-accent text-sm hover:underline"
                    >
                      <BsArrowUpRight /> Live
                    </Link>
                  )}
                  {/* {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-1 text-accent text-sm hover:underline"
                    >
                      <BsGithub /> Code
                    </Link>
                  )} */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Work;