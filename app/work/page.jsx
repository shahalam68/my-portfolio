"use client";

import { motion } from "framer-motion";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    num: "04",
    category: "fullstack",
    title: "Amar Plot",
    description:
      "A property buy, sell , and ren platfrom ",
    stack: [{ name: "React.js" }, { name: " Shadcn UI" }, { name: "Node.js" }],
    image: "/work/amarplot.png",
    live: "https://amarplot.com", // ✅ Replace with real link
    github: "https://github.com/yourusername/tech-foring", // ✅ GitHub repo
  },
  {
    num: "03",
    category: "fullstack",
    title: "tech foring",
    description:
      "Cybersecurity consulting website with service booking and reports.",
    stack: [{ name: "React.js" }, { name: "Material UI" }, { name: "Node.js" }],
    image: "/work/Techforing.png",
    live: "https://techforing.com", // ✅ Replace with real link
    github: "https://github.com/yourusername/tech-foring", // ✅ GitHub repo
  },
  {
    num: "01",
    category: "frontend",
    title: "chat app",
    description:
      "A real-time chat app with typing indicators, online status, and group chat features.",
    stack: [{ name: "HTML 5" }, { name: "CSS 3" }, { name: "JavaScript" }],
    image: "/work/chatApp.png",
    live: "https://yourchatappdemo.com",   // ✅ Add your live demo link
    github: "https://github.com/yourusername/chat-app", // ✅ GitHub repo link
  },
  {
    num: "02",
    category: "fullstack",
    title: "low guard pro",
    description:
      "A legal services management platform with secure client portal.",
    stack: [
      { name: "Next.js" },
      { name: "Material UI" },
      { name: "ASP.Net Core" },
    ],
    image: "/work/lawGurdPro.png",
    live: "https://lowguardpro.com", // ✅ Add live site
    github: "https://github.com/yourusername/low-guard-pro", // ✅ GitHub repo
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
                <p className="text-white/60 text-sm">{project.description}</p>

                {/* Stack Badges */}
                <ul className="flex gap-2 mt-4 flex-wrap">
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
