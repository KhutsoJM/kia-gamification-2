import { motion } from "framer-motion";
import safari from "../assets/FruitFall/environment/background/safari-background.jpg";
import React, { useState, useEffect } from "react";
import { playSound } from "../utils/sounds";
import { Howl } from "howler";

const levels = [
  1, 2, 3, 4, 5
];

const LevelSelection = ({ onSelect }) => {
   const [unlockedLevel, setUnlockedLevel] = useState(1);

   // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("unlockedLevel");
    if (savedProgress) {
      setUnlockedLevel(parseInt(savedProgress, 10));
    }
    playSound("natureAmbience", 0.5, 1);
  }, []);

  // Update localStorage when unlockedLevel changes
  useEffect(() => {
    localStorage.setItem("unlockedLevel", unlockedLevel);
  }, [unlockedLevel]);

  return (
    
    <div
      className="flex justify-center items-center h-screen w-screen scale-100 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${safari})` 

      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {levels.map(level => {
            const locked = level > unlockedLevel;
            return (
              <motion.div
                key={level}
                initial={{ rotateZ: 0, scale: 1 }}
                whileTap={!locked ? { scale: 0.9 } : {}}
                whileHover={!locked ? { rotateZ: 5, scale: 1.1 } : {}}
                onClick={() => {
                  if (!locked) onSelect("game", level);
                }}
                className={`flex justify-center items-center w-32 h-32 text-center rounded-md transition
                  ${locked ? "bg-gray-300 opacity-70 cursor-not-allowed" : "bg-slate-100 cursor-pointer"}`}
              >
                Level {level}
              </motion.div>
          );
        })}
        
      </div>
    </div>
  );
};

export default LevelSelection;
