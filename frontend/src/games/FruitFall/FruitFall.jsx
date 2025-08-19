
import { useState } from "react";
import { motion } from "framer-motion";

// ASSETS
// animals
import giraffe from "../../assets/FruitFall/animals/Round/giraffe.png";
import elephant from "../../assets/FruitFall/animals/Round/elephant.png";
import hippo from "../../assets/FruitFall/animals/Round/hippo.png";
import panda from "../../assets/FruitFall/animals/Round/panda.png";
import parrot from "../../assets/FruitFall/animals/Round/parrot.png";
import penguin from "../../assets/FruitFall/animals/Round/penguin.png";
import pig from "../../assets/FruitFall/animals/Round/pig.png";
import rabbit from "../../assets/FruitFall/animals/Round/rabbit.png";
import snake from "../../assets/FruitFall/animals/Round/snake.png";

// fruits
import apple from "../../assets/FruitFall/fruits/normal/apple.png";
import banana from "../../assets/FruitFall/fruits/normal/banana.png";
import blueberry from "../../assets/FruitFall/fruits/normal/blueberry.png";
import cherry from "../../assets/FruitFall/fruits/normal/cherry.png";
import orange from "../../assets/FruitFall/fruits/normal/orange.png";
import raspberry from "../../assets/FruitFall/fruits/normal/raspberry.png";
import watermelon from "../../assets/FruitFall/fruits/normal/watermelon.png";
import grape from "../../assets/FruitFall/fruits/normal/grape.png";

import basket from "../../assets/FruitFall/props/wooden-bucket.png";

const FruitFall = () => {
    return (
        <div className="flex flex-col h-screen justify-center">
            <motion.div
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{
                    delay: 1,
                    duration: 0.75,
                }}
                className="flex flex-row items-end gap-4"
            >
                <div className="relative">
                    <img src={parrot} alt="animal" className="w-32" />
                    {/* Speech bubble */}
                    <div className="absolute -top-16 left-full bg-white border border-gray-300 rounded-xl px-8 py-1 shadow text-sm">
                        <p>I want 3 + 2 🍎</p>
                        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-gray-300 rotate-45"></div>
                    </div>
                </div>
                <img src={basket} alt="basket" className="w-24" />
            </motion.div>
        </div>
    )
}

export default FruitFall;
