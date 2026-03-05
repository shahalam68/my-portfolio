"use client";
import Link from "next/link";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="container mx-auto px-6 py-4 glass-morphism rounded-[2.5rem] border-white/10 flex justify-between items-center max-w-[1200px] pointer-events-auto backdrop-blur-2xl bg-white/[0.03] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
        {/* logo */}
        <Link href="/" className="group">
          <h1 className="text-2xl xl:text-3xl font-black tracking-tighter text-white group-hover:text-accent transition-all duration-500">
            Alam<span className="text-accent group-hover:text-white transition-colors">.</span>
          </h1>
        </Link>
        
        {/* desktop nav and hire me button  */}
        <div className="hidden xl:flex items-center gap-10" >
          <Nav />
          <Link href="/contact">
            <Button className="rounded-full px-10 h-12 bg-accent text-primary font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,255,153,0.5)] border-none">
              Hire me
            </Button>
          </Link>
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
            <MobileNav/>
        </div>
      </div>
      
      {/* Subtle Glow beneath header */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-accent/5 blur-[100px] pointer-events-none"></div>
    </header>
  );
};

export default Header;
