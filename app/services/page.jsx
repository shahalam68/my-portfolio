"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "Engineering high-performance, reactive web applications using MERN, .NET, and modern state management patterns. I focus on scalable architecture and seamless API integration.",
    href: "/contact",
  },
  {
    num: "02",
    title: "E-Commerce Design",
    description:
      "Building robust e-commerce solutions and multi-vendor platforms. Specializing in conversion-optimized UI/UX and advanced WordPress/WooCommerce engineering.",
    href: "https://www.fiverr.com/shahalam68",
  },
  {
    num: "03",
    title: "UI/UX Architecture",
    description:
      "Crafting visually stunning, premium digital experiences with a focus on glassmorphism, advanced animations, and user-centric design principles.",
    href: "/contact",
  },
  {
    num: "04",
    title: "Full-Stack Consulting",
    description:
      "Providing technical leadership and architectural consulting for startups, ensuring clean, maintainable code and modern development workflows.",
    href: "/contact",
  },
];

const Services = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-36 pb-12 xl:pt-32 xl:pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 space-y-6 max-w-3xl mx-auto relative"
        >
          <h3 className="text-6xl xl:text-8xl font-black text-white uppercase tracking-tighter leading-none opacity-10 absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none select-none w-full">
            Solutions
          </h3>
          <h2 className="text-3xl xl:text-4xl font-black text-white uppercase tracking-tighter leading-none relative z-10">
            Professional Services
          </h2>
          <p className="text-white/40 text-base font-medium tracking-tight leading-relaxed">
            Transforming complex requirements into elegant, high-performance digital solutions.
          </p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full opacity-50"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-8 xl:p-10 glass-morphism rounded-[2rem] border-white/5 hover:border-accent/40 transition-all duration-700 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="w-full flex justify-between items-center">
                    <div className="text-4xl xl:text-5xl font-black text-outline text-transparent group-hover:text-accent transition-all duration-700 leading-none">
                      {service.num}
                    </div>
                    <Link 
                      href={service.href} 
                      className="w-12 h-12 xl:w-14 xl:h-14 rounded-full border border-white/10 flex justify-center items-center group-hover:bg-accent group-hover:border-accent transition-all duration-700 hover:-rotate-45"
                    >
                      <BsArrowDownRight className="text-white group-hover:text-primary text-xl group-hover:scale-110 transition-transform" />
                    </Link>
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl xl:text-3xl font-black leading-tight text-white group-hover:text-accent transition-all duration-500 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-white/40 text-sm xl:text-base font-medium leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-[100px] pointer-events-none group-hover:bg-accent/10 transition-all duration-1000"></div>
                
                {/* Visual Separator */}
                <div className="absolute bottom-4 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
