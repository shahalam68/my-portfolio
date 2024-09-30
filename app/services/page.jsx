"use client";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";
const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "Highly motivated Full-Stack Web Developer with expertise in React.js and .NET, recognized for delivering clean, efficient, and reusable code. I focus on designing reactive web applications, managing states, and integrating APIs for real-time data updates.",
    href: "",
  },
  {
    num: "02",
    title: "WordPress Design",
    description:
      "Experienced Freelance Web Designer on Fiverr with over 50+ projects completed. I specialize in WordPress design and have built multi-vendor e-commerce websites using Woocommerce. Achieved a level 1 seller badge through consistent delivery of quality projects.",
    href: "",
  },
];

import { motion } from "framer-motion";
const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 ">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div key={index} className="flex-1 flex flex-col justify-center gap-6 group ">
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">{service.num}</div>
                  <Link href={service.href} className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"><BsArrowDownRight className="text-primary text-3xl"/></Link>
                </div>
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 ">{service.title}</h2>
                <p className="text-white/60">{service.description}</p>
                <div className="border-b border-white/20"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
