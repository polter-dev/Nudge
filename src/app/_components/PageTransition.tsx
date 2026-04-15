import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import type { ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      className="w-full h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
