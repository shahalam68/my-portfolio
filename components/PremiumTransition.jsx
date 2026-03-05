"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PremiumTransition = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.5, 
              ease: [0.33, 1, 0.68, 1],
            } 
          }}
          exit={{ 
            opacity: 0, 
            y: -10,
            transition: { 
              duration: 0.3, 
              ease: "easeIn" 
            } 
          }}
        >
          {children}
        </motion.div>

        {/* Simplified cinematic accent */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-0 bg-accent z-50 origin-right pointer-events-none opacity-[0.05]"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PremiumTransition;
