import { motion } from "framer-motion";
import story from "../data/story";
import heroBg from "../assets/main.jpeg";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

function Hero() {
  const { hero } = story;

  function handleStart() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-end pb-32 text-center px-6"
      style={{
        backgroundImage: "url('https://picsum.photos/1920/1080?random=10')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.p
        className="text-m font-medium tracking-widest uppercase mb-4"
        style={{ color: "#ffd900ff" }}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
      >
        {hero.subtitle}
      </motion.p>

      <motion.h1
        className="text-2xl font-bold mb-6"
        style={{ color: "rgba(255, 143, 236, 1)" }}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
      >
        {hero.name}
      </motion.h1>

      <motion.p
        className="text-m font-medium tracking-widest uppercase mb-4"
        style={{ color: "#ffd900ff" }}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.5}
      >
        {hero.description}
      </motion.p>

      <motion.button
        onClick={handleStart}
        className="px-8 py-4 rounded-full text-white font-semibold text-lg"
        style={{ background: "#C4B5FD" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: [1, 1.04, 1],
          transition: {
            opacity: { duration: 0.7, delay: 0.7, ease: "easeOut" },
            y: { duration: 0.7, delay: 0.7, ease: "easeOut" },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.4,
            },
          },
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {hero.buttonText}
      </motion.button>
    </section>
  );
}

export default Hero;
