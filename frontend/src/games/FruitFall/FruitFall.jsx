import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { levels } from "./levels";
import apple from "../../assets/FruitFall/fruits/normal/apple.png";
import banana from "../../assets/FruitFall/fruits/normal/banana.png";
import blueberry from "../../assets/FruitFall/fruits/normal/blueberry.png";
import cherry from "../../assets/FruitFall/fruits/normal/cherry.png";
import orange from "../../assets/FruitFall/fruits/normal/orange.png";
import raspberry from "../../assets/FruitFall/fruits/normal/raspberry.png";
import watermelon from "../../assets/FruitFall/fruits/normal/watermelon.png";
import grape from "../../assets/FruitFall/fruits/normal/grape.png";
import basket from "../../assets/FruitFall/props/wooden-bucket.png";
import excitedOwl from "../../assets/FruitFall/animals/Purple Owl/excited owl.gif";
import owl from "../../assets/FruitFall/animals/Purple Owl/sleeping owl.gif";
import Congratulations from "../../assets/FruitFall/animals/Purple Owl/congratulations.gif";

// Map fruit names to images
const fruitImages = {
    "A-pple": apple,
    "Ba-na-na": banana,
    "B-lue-be-rry": blueberry,
    "Che-rry": cherry,
    "Or-ange": orange,
    "Rasp-be-rry": raspberry,
    "Wa-ter-me-lon": watermelon,
    "Gr-ape": grape,
};

// List of all fruits for drag and drop
const fruitList = [
    { name: "A-pple", img: apple },
    { name: "Ba-na-na", img: banana },
    { name: "B-lue-be-rry", img: blueberry },
    { name: "Che-rry", img: cherry },
    { name: "Or-ange", img: orange },
    { name: "Rasp-be-rry", img: raspberry },
    { name: "Wa-ter-me-lon", img: watermelon },
    { name: "Gr-ape", img: grape },
];

const finalText =
    "Hoot hoot! You’ve helped Ollie wake up every time. The forest is full of happy animals and Ollie is wide awake, ready to tell his best stories. Congratulations!";

const FruitFall = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [showSecondParagraph, setShowSecondParagraph] = useState(false);
    const [showSpeechBubble, setShowSpeechBubble] = useState(false);
    const [basketFruits, setBasketFruits] = useState([]);
    const [isExcited, setIsExcited] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);

    const levelData = levels[currentLevel];

    // If all levels are completed and finish button pressed, show final message and congratulations gif only
    if (showCongratulations) {
        return (
            <div className="flex flex-col h-screen justify-center items-center bg-white">
                <h1 className="text-2xl font-bold mb-8 text-center px-4">
                    {finalText}
                </h1>
                <img
                    src={Congratulations}
                    alt="Ollie the Owl"
                    className="w-80"
                />
            </div>
        );
    }

    // If all levels are completed but finish button not pressed yet
    if (!levelData) {
        return (
            <div className="flex flex-col h-screen justify-center items-center bg-white">
                <h1 className="text-2xl font-bold mb-8 text-center px-4">
                    {finalText}
                </h1>
                <img
                    src={excitedOwl}
                    alt="Ollie the Owl"
                    className="w-80"
                />
            </div>
        );
    }

    const { requiredFruits, introText1, introText2 } = levelData;

    // Speak the first paragraph on mount or when level changes
    useEffect(() => {
        const utter = new window.SpeechSynthesisUtterance(introText1);
        window.speechSynthesis.speak(utter);

        setShowSecondParagraph(false);
        setShowSpeechBubble(false);
        setBasketFruits([]);
        setIsExcited(false);

        const timer = setTimeout(() => {
            setShowSecondParagraph(true);
        }, 10000);

        return () => {
            clearTimeout(timer);
            window.speechSynthesis.cancel();
        };
    }, [currentLevel, introText1]);

    // Speak the second paragraph when it appears
    useEffect(() => {
        if (showSecondParagraph) {
            const utter = new window.SpeechSynthesisUtterance(introText2);
            window.speechSynthesis.speak(utter);
        }
    }, [showSecondParagraph, introText2]);

    // Show speech bubble after basket and fruits appear
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpeechBubble(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [currentLevel]);

    // Drag and drop handlers
    const handleDragStart = (e, fruit) => {
        e.dataTransfer.setData("fruit", JSON.stringify(fruit));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const fruit = JSON.parse(e.dataTransfer.getData("fruit"));
        setBasketFruits((prev) => [...prev, fruit]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Check if basket matches required fruits
    useEffect(() => {
        const fruitCounts = basketFruits.reduce((acc, fruit) => {
            acc[fruit.name] = (acc[fruit.name] || 0) + 1;
            return acc;
        }, {});
        const matches = requiredFruits.every(
            (req) => fruitCounts[req.name] === req.count
        );
        setIsExcited(matches);
    }, [basketFruits, requiredFruits]);

    // Move to next level or show congratulations
    const goToNextLevel = () => {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel(currentLevel + 1);
        } else {
            setShowCongratulations(true);
        }
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center relative">
            <div className="absolute top-47 left-1/2 transform -translate-x-1/2 flex flex-row items-center bg-white bg-opacity-90 border-2 border-gray-300 rounded-lg shadow-lg px-8 py-6 w-[500px] text-xl text-center">
                <div className="flex-1">
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
                {isExcited && (
                    <button
                        className="ml-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow font-bold text-lg hover:bg-green-700 transition"
                        onClick={goToNextLevel}
                    >
                        {currentLevel < levels.length - 1
                            ? `Level ${currentLevel + 2}`
                            : "Finish"}
                    </button>
                )}
            </div>
            <div className="flex flex-row items-end mt-40 gap-8">
                {/* Owl and speech bubble */}
                <div className="relative flex flex-col items-center">
                    {showSpeechBubble && (
                        <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10">
                            <div className="bg-white border border-gray-400 rounded-2xl px-4 py-2 shadow-lg flex flex-row items-center min-w-[200px] min-h-[100px]">
                                {requiredFruits.map((fruit) => (
                                    <React.Fragment key={fruit.name}>
                                        <img
                                            src={fruitImages[fruit.name]}
                                            alt={fruit.name}
                                            className="w-12 mx-1"
                                        />
                                        <span className="font-bold text-base mx-1">
                                            x{fruit.count}
                                        </span>
                                    </React.Fragment>
                                ))}
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
                        src={isExcited ? excitedOwl : owl}
                        alt="animal"
                        className="w-80 mt-40"
                    />
                </div>
                {/* Basket with drop area */}
                <div className="relative flex flex-col items-center">
                    <motion.img
                        initial={{ x: 1000 }}
                        animate={{ x: 0 }}
                        transition={{
                            delay: 1.2,
                            duration: 0.75,
                        }}
                        src={basket}
                        alt="basket"
                        className="w-50"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{ cursor: "pointer" }}
                    />
                    {/* Show dropped fruits in basket */}
                    <div className="flex flex-row flex-wrap justify-center mt-2">
                        {basketFruits.map((fruit, idx) => (
                            <img
                                key={idx}
                                src={fruit.img}
                                alt={fruit.name}
                                className="w-8 mx-1"
                            />
                        ))}
                    </div>
                </div>
                {/* Fruits next to the basket */}
                <div className="flex flex-row gap-4 ml-4">
                    {fruitList.map((fruit) => (
                        <div className="flex flex-col items-center" key={fruit.name}>
                            <img
                                src={fruit.img}
                                alt={fruit.name}
                                className="w-20"
                                draggable
                                onDragStart={(e) => handleDragStart(e, fruit)}
                                style={{ cursor: "grab" }}
                            />
                            <span className="text-sm mt-1">{fruit.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FruitFall;
