import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ASSETS
// animals
import giraffe from "../../assets/FruitFall/animals/Round/giraffe.png";
import elephant from "../../assets/FruitFall/animals/Round/elephant.png";
import hippo from "../../assets/FruitFall/animals/Round/hippo.png";
import panda from "../../assets/FruitFall/animals/Round/panda.png";
import owl from "../../assets/FruitFall/animals/Purple Owl/sleeping owl.gif";
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

const introText1 = `Deep in the heart of a forest lives Ollie the Owl. 
Ollie is wise and kind, but he has a problem… he just loves to nap! 
Every time he dozes off, the forest animals can’t hear his bedtime stories, 
and they really want him awake.`;

const introText2 = `The only way to wake Ollie is by feeding him his favourite fruits! 
Each fruit gives him a little more energy until he finally opens his eyes, 
stretches his wings, and hoots happily.`;

const FruitFall = () => {
    const [showSecondParagraph, setShowSecondParagraph] = useState(false);
    const [showSpeechBubble, setShowSpeechBubble] = useState(false);

    // Speak the first paragraph on mount
    useEffect(() => {
        const utter = new window.SpeechSynthesisUtterance(introText1);
        window.speechSynthesis.speak(utter);

        const timer = setTimeout(() => {
            setShowSecondParagraph(true);
        }, 5000);

        return () => {
            clearTimeout(timer);
            window.speechSynthesis.cancel();
        };
    }, []);

    // Speak the second paragraph when it appears
    useEffect(() => {
        if (showSecondParagraph) {
            const utter = new window.SpeechSynthesisUtterance(introText2);
            window.speechSynthesis.speak(utter);
        }
    }, [showSecondParagraph]);

    // Show speech bubble after basket and fruits appear
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpeechBubble(true);
        }, 2000); // 2 seconds after mount (adjust as needed)
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col h-screen justify-center items-center relative">
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 border-2 border-gray-300 rounded-lg shadow-lg px-8 py-6 w-[500px] text-xl text-center">
                <AnimatePresence mode="wait">
                    {!showSecondParagraph && (
                        <motion.p
                            key="intro1"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="font-normal text-lg"
                        >
                            {introText1}
                        </motion.p>
                    )}
                    {showSecondParagraph && (
                        <motion.p
                            key="intro2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7 }}
                            className="font-normal text-lg"
                        >
                            {introText2}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex flex-row items-end mt-40 gap-8">
                {/* Owl and speech bubble */}
                <div className="relative flex flex-col items-center">
                    {showSpeechBubble && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                            <div className="bg-white border border-gray-400 rounded-2xl px-4 py-2 shadow-lg flex flex-row items-center min-w-[200px] min-h-[100px]">
                                <img src={banana} alt="banana" className="w-7 mx-1" />
                                <span className="font-bold text-base mx-1">x2</span>
                                <img src={apple} alt="apple" className="w-7 mx-1" />
                                <span className="font-bold text-base mx-1">x1</span>
                            </div>
                            <div className="w-0 h-0 border-t-[14px] border-t-white border-x-[10px] border-x-transparent mx-auto"></div>
                        </div>
                    )}
                    <motion.img
                        initial={{ x: -1000 }}
                        animate={{ x: 0 }}
                        transition={{
                            delay: 1,
                            duration: 0.75,
                        }}
                        src={owl} alt="animal"
                        className="w-80 mt-40"
                    />
                </div>
                <motion.img
                    initial={{ x: 1000 }}
                    animate={{ x: 0 }}
                    transition={{
                        delay: 1.2,
                        duration: 0.75,
                    }}
                    src={basket} alt="basket"
                    className="w-32"
                />
                {/* Fruits next to the basket */}
                <div className="flex flex-row gap-4 ml-4">
                    <div className="flex flex-col items-center">
                        <img src={apple} alt="apple" className="w-20" />
                        <span className="text-sm mt-1">A-pple</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={banana} alt="banana" className="w-20" />
                        <span className="text-sm mt-1">Ba-na-na</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={blueberry} alt="blueberry" className="w-20" />
                        <span className="text-sm mt-1">Bl-ue-be-rry</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={cherry} alt="cherry" className="w-20" />
                        <span className="text-sm mt-1">Che-rry</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={orange} alt="orange" className="w-20" />
                        <span className="text-sm mt-1">Or-ange</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={raspberry} alt="raspberry" className="w-20" />
                        <span className="text-sm mt-1">Rasp-be-rry</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={watermelon} alt="watermelon" className="w-20" />
                        <span className="text-sm mt-1">Wa-ter-me-lon</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={grape} alt="grape" className="w-20" />
                        <span className="text-sm mt-1">Gr-ape</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FruitFall;
