import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  enter: { opacity: 0, scale: 1 },
  final: { opacity: 1, scale: 1 }
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial="enter"
      animate="final"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="page-container"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
