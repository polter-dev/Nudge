import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function useNudgeToast() {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
  };

  return { visible, show };
}

export function NudgeToast({ visible }: { visible: boolean }) {
  return (
    <div className="fixed top-4 right-4 z-[100]">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-center gap-2 rounded-full px-5 py-3"
            style={{
              background: '#FAF5FF',
              border: '1px solid #E9D5FF',
              boxShadow: '0 4px 16px rgba(124,58,237,0.15)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span className="text-[13px] text-[#7C3AED]" style={{ fontWeight: 600 }}>
              Stay focused! You got this 💪
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}