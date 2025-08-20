import { motion } from "framer-motion";

const levels = [
  1, 2, 3, 4, 5
];

const LevelSelection = ({ onSelect }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {levels.map(level => (
          <motion.div
            key={level}
            initial={{ rotateZ: 0, scale: 1 }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ rotateZ: 5, scale: 1.1 }}
            onClick={() => { onSelect("game") }}
            className="flex justify-center items-center w-32 h-32 bg-slate-100 text-center rounded-md cursor-pointer">
            Level {level}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;
