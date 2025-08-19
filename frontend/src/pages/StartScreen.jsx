import { motion } from "framer-motion";


const floatAnimation = {
    y: [0, -10, 0], // up 10px, then back
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
    }
};


const StartScreen = ({ onStart }) => {
    return (
        <>
            {/* Title with floating letters */}
            <h1 className="text-8xl mb-8 font-bold text-slate-800 flex gap-2">
                {"FruitFall".split("").map((char, i) => {
                    // Skip spaces
                    if (char === " ") return <span key={i} style={{ width: "0.5em" }} />;

                    return (
                        <motion.span
                            key={i}
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 2 + Math.random(), // small variation per letter
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.05, // stagger letters slightly
                            }}
                        >
                            {char}
                        </motion.span>
                    );
                })}
            </h1>
            <div className="text-5xl mb-8 flex gap-4">
                <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    🍎
                </motion.span>

                <motion.span
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                        duration: 2.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                    }}
                >
                    🍌
                </motion.span>

                <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4
                    }}
                >
                    🍇
                </motion.span>
            </div>
            <p className="text-3xl mb-8 text-slate-500 font-light">
                Feed the animals and learn Maths while doing it!
            </p>
            <button onClick={onStart} className="text-center text-3xl px-20 py-3 rounded-full text-white bg-emerald-300 ring ring-emerald-400 cursor-pointer shadow-2xl hover:bg-emerald-400 active:bg-emerald-500 transition-colors duration-300">
                Start 🚀
            </button>
        </>
    )
}

export default StartScreen;
