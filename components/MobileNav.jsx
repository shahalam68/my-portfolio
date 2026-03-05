"use client";

import { motion } from "framer-motion";
import { Briefcase, FileText, FolderOpen, Home, Mail, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const links = [
  { name: "Home", path: "/", icon: Home },
  { name: "Services", path: "/services", icon: Briefcase },
  { name: "Resume", path: "/resume", icon: FileText },
  { name: "Projects", path: "/projects", icon: FolderOpen },
  { name: "Contact", path: "/contact", icon: Mail },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex justify-center items-center w-11 h-11 glass-morphism rounded-2xl border-white/10 hover:border-accent/50 transition-all duration-500">
        <Menu className="text-accent w-5 h-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-[#030712]/95 backdrop-blur-2xl border-l border-white/5 p-0 w-[300px] shadow-[0_0_100px_rgba(0,0,0,0.8)]"
      >
        <div className="flex flex-col h-full py-10 px-8">
          {/* Logo */}
          <Link href="/" onClick={() => setOpen(false)} className="group mb-16">
            <h1 className="text-2xl font-black tracking-tighter text-white group-hover:text-accent transition-colors duration-500">
              Alam<span className="text-accent group-hover:text-white transition-colors">.</span>
            </h1>
            <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-black mt-1">Full-Stack Engineer</p>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 flex-1">
            {links.map((link, index) => {
              const isActive = link.path === pathname;
              const Icon = link.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                      isActive
                        ? "bg-accent text-primary"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-500 ${isActive ? "text-primary" : "text-accent group-hover:scale-110"}`} />
                    <span className="text-sm font-black uppercase tracking-[0.2em]">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Hire Me CTA */}
          <div className="mt-auto pt-10 border-t border-white/5">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-3 w-full py-4 bg-accent/10 text-accent border border-accent/20 rounded-2xl hover:bg-accent hover:text-primary transition-all duration-500 group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-black uppercase tracking-[0.3em]">Hire Me</span>
            </Link>
            <p className="text-white/10 text-[9px] text-center mt-6 uppercase tracking-[0.5em] font-black">Portfolio v2.0</p>
          </div>
        </div>

        {/* Background Glow */}
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/5 blur-[120px] pointer-events-none -mb-20 -ml-20"></div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
