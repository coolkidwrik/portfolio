import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 1, y: 0 },  // Normal position
  exit: { opacity: 0, y: -100, backgroundColor: "black" }, // Move up while fading to black
  enter: { opacity: 0, y: -50, backgroundColor: "black"}, // Start below before appearing
  final: { opacity: 1, y: 0 }
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