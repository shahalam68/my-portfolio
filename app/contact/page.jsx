"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+88) 01715 351 782",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "a.k.mshahalam68@gmail.com",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    description: "Mohammadpur, Dhaka, Bangladesh",
  },
];

const Contact = () => {
  return (
    <section className="min-h-screen pt-36 pb-12 xl:pt-32 xl:pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col xl:flex-row gap-16 xl:gap-24"
        >
          {/* Form */}
          <div className="xl:w-[60%] order-2 xl:order-none">
            <form className="flex flex-col gap-10 p-12 xl:p-20 glass-morphism rounded-[4rem] border-white/5 relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <h3 className="text-3xl xl:text-4xl font-black text-accent uppercase tracking-tighter leading-none">
                  Let&apos;s Connect
                </h3>
                <p className="text-white/40 text-sm xl:text-base font-medium leading-relaxed">
                  I&apos;m available for new opportunities and collaborations. Reach out to discuss your next big idea.
                </p>
                <div className="w-20 h-1 bg-accent rounded-full opacity-50"></div>
              </div>

              {/* Input grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 text-white">
                <Input 
                  type="firstname" 
                  placeholder="Firstname" 
                  className="bg-white/5 border-white/10 rounded-2xl h-14 xl:h-16 px-6 focus:border-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20 " 
                />
                <Input 
                  type="lastname" 
                  placeholder="Lastname" 
                  className="bg-white/5 border-white/10 rounded-2xl h-14 xl:h-16 px-6 focus:border-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20" 
                />
                <Input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/5 border-white/10 rounded-2xl h-14 xl:h-16 px-6 focus:border-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20" 
                />
                <Input 
                  type="phone" 
                  placeholder="Phone number" 
                  className="bg-white/5 border-white/10 rounded-2xl h-14 xl:h-16 px-6 focus:border-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20" 
                />
              </div>

              {/* Select */}
              <div className="relative z-10">
                <Select>
                  <SelectTrigger className="w-full bg-white/5 border-white/10 rounded-2xl h-14 xl:h-16 px-6 focus:ring-accent/50 transition-all duration-300">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#030712] border-white/10 rounded-2xl">
                    <SelectGroup>
                      <SelectLabel className="text-white/40 uppercase tracking-widest text-xs font-black p-4">Services</SelectLabel>
                      <SelectItem value="web" className="focus:bg-accent focus:text-primary transition-colors cursor-pointer">Web Development</SelectItem>
                      <SelectItem value="design" className="focus:bg-accent focus:text-primary transition-colors cursor-pointer">UI/UX Design</SelectItem>
                      <SelectItem value="consult" className="focus:bg-accent focus:text-primary transition-colors cursor-pointer">Full-Stack Consulting</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Textarea */}
              <div className="relative z-10">
                <Textarea
                  className="h-[250px] bg-white/5 border-white/10 rounded-[2rem] p-8 focus:border-accent/50 focus:bg-white/10 transition-all duration-300 resize-none placeholder:text-white/20"
                  placeholder="Describe your project or message here..."
                />
              </div>

              {/* BTN */}
              <div className="relative z-10 w-full">
                <Button size="lg" className="h-16 xl:h-20 w-full rounded-3xl text-lg font-black uppercase tracking-[0.3em] hover:scale-[1.02] transition-transform duration-500 shadow-[0_20px_50px_-15px_rgba(0,255,153,0.3)]">
                  Engage
                </Button>
              </div>

              {/* Decorative Gradients */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[150px] -mr-48 -mt-48 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 blur-[120px] -ml-32 -mb-32 pointer-events-none"></div>
            </form>
          </div>

          {/* Info */}
          <div className="flex-1 flex items-center xl:justify-end xl:order-none order-1">
            <motion.ul 
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              initial="hidden"
              whileInView="show"
              className="grid grid-cols-1 gap-8 w-full max-w-md mx-auto xl:mx-0"
            >
              {info.map((item, index) => {
                return (
                  <motion.li 
                    key={index} 
                    variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}
                    className="flex items-center gap-10 group"
                  >
                    <div className="w-12 h-12 xl:w-16 xl:h-16 glass-morphism text-accent rounded-2xl flex items-center justify-center border-white/5 group-hover:bg-accent group-hover:text-primary transition-all duration-700 group-hover:scale-110 shadow-2xl">
                      <div className="text-2xl xl:text-3xl">{item.icon}</div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-accent font-black uppercase tracking-[0.3em] text-[9px] opacity-60">
                        {item.title}
                      </p>
                      <h3 className="text-lg xl:text-xl font-black text-white/90 group-hover:text-white transition-colors tracking-tight">
                        {item.description}
                      </h3>
                    </div>
                  </motion.li>
                );
              })}

              {/* Social or extra detail */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="pt-12 mt-12 border-t border-white/5 space-y-4"
              >
                 <p className="text-white/20 font-black uppercase tracking-[0.5em] text-[10px]">Portfolio v2.0</p>
                 <p className="text-white/40 italic font-medium">Built with Next.js, Framer Motion, and engineered for impact.</p>
              </motion.div>
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
