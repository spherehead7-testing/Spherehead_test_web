import { motion, AnimatePresence } from "motion/react";

type LetsTalkButtonProps = {
  isVisible: boolean;
  onClick: () => void;
};

export default function LetsTalkButton({ isVisible, onClick }: LetsTalkButtonProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ 
            scale: 0, 
            opacity: 0, 
            transformOrigin: "bottom left", 
            transition: { duration: 0.2 } 
          }}
          onClick={onClick}
          // Note: perfectly rectangular (no rounded corners)
          className="fixed bottom-0 left-0 z-[100] flex h-[120px] w-[48px] cursor-pointer items-center justify-center bg-[#0D54CA] shadow-2xl hover:bg-blue-700 transition-colors sm:h-[150px] sm:w-[56px] overflow-hidden"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="[writing-mode:vertical-rl] rotate-180 text-sm font-medium tracking-widest text-white sm:text-base"
          >
            Let's Talk
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}