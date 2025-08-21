import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// PAGES
import StartScreen from "./pages/StartScreen";
import CategorySelection from "./pages/CategorySelection";
import LevelSelection from "./pages/LevelSelection";

// GAME
import FruitFall from "./games/FruitFall/FruitFall";

import Particles from "./components/Particles";

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.2 },
};

const AppContent = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("start");

  const handleTransition = () => {
    navigate("/fruitfall"); // navigate to game route
  };

  return (
    <AnimatePresence mode="wait">
      {/* Background */}
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(0,128,0,0.1) 0%, rgba(0,128,0,0.4) 80%)",
          // background: l"inear-gradient(to bottom, #b0f4c1, #80e0a0)";
        }}
        animate={{
          background: [
            "radial-gradient(circle at center, rgba(0,128,0,0.1) 0%, rgba(0,128,0,0.4) 80%)",
            "radial-gradient(circle at center, rgba(0,255,0,0.15) 0%, rgba(0,200,0,0.45) 80%)",
            "radial-gradient(circle at center, rgba(0,128,0,0.1) 0%, rgba(0,128,0,0.4) 80%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {page === "start" && (
        <motion.div
          key="start"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col justify-center items-center"
        >
          <StartScreen onStart={() => setPage("categorySelection")} />
          <Particles count={30} />
        </motion.div>
      )}

      {page === "categorySelection" && (
        <motion.div
          key="categorySelection"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col justify-center items-center"
        >
          <CategorySelection onStart={() => setPage("levelSelection")} />
        </motion.div>
      )}

      {page === "levelSelection" && (
        <motion.div
          key="levelSelection"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col justify-center items-center"
        >
          <LevelSelection onSelect={handleTransition} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <main className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-r from-green-200 to-green-300">
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/fruitfall" element={<FruitFall />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
