import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { levels } from "./levels";
import { useNavigate } from "react-router-dom";
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
import owlBadge from "../../assets/FruitFall/animals/Purple Owl/owlBadge.png";
// import safari from "C:/Users/Kidsi/kia-gamification-2/frontend/src/assets/FruitFall/environment/background/safari-background.jpg";

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
    "Hoot hoot! You’ve helped Ollie wake up every time. Congratulations!";

const FruitFall = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [showSecondParagraph, setShowSecondParagraph] = useState(false);
    const [showSpeechBubble, setShowSpeechBubble] = useState(false);
    const [basketFruits, setBasketFruits] = useState([]);
    const [basketMessage, setBasketMessage] = useState("");
    const [isExcited, setIsExcited] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);

    const levelData = levels[currentLevel];
    console.log(`Done: ${showCongratulations}`);
    // If all levels are completed and finish button pressed, show final message and congratulations gif only
    




    // If all levels are completed but finish button not pressed yet
    if (!levelData) {
        return (
            <div className="flex flex-col h-screen justify-center items-center bg-cover bg-center bg-no-repeat"
>
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

    const handleDropFruit = (e) => {
    e.preventDefault();
    const fruit = JSON.parse(e.dataTransfer.getData("fruit"));

    // Check if the fruit is required for this level
    const isRequired = requiredFruits.some(req => req.name === fruit.name);

    if (isRequired) {
        setBasketFruits((prev) => [...prev, fruit]);
        setBasketMessage(""); // clear message if correct
    } else {
        setBasketMessage(`You’re learning! That’s not the one, try again.`); // show message if wrong fruit

        // Remove message after 2 seconds
        setTimeout(() => setBasketMessage(""), 2000);
    }

};

    // Move to next level or show congratulations

    const goToNextLevel = () => {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel(currentLevel + 1);
        } else {
            setShowCongratulations(true);
        }
    };
    
  
  const navigate = useNavigate();

    if (showCongratulations) 
        
        return (
        <div className="flex flex-col h-screen justify-center items-center w-screen scale-100 bg-cover bg-center bg-no-repeat"
            style={{
                        // backgroundImage: `url(${safari})` 
                
                      }}
            >
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ scale: 1, rotate: 360, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center"
        >
            
            <img
                src={owlBadge}
                alt="Ollie the Owl Badge"
                className="w-80"
            />
            <h1 className="text-2xl font-bold mb-4 text-center px-4">
                {finalText}
            </h1>
            <button
                onClick={() => navigate("/category")}
                className="x-10 py-5 bg-purple-400 text-white rounded-xl shadow font-bold text-lg hover:bg-purple-500 transition"
                >
                Choose another adventure
            </button>
        </motion.div>
        </div>
    );
    

    return (
        <div className="flex flex-col h-screen justify-center items-center relative">
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center bg-white bg-opacity-90 border-2 border-gray-300 rounded-lg shadow-lg px-8 py-6 w-[500px] text-xl text-center">
                <AnimatePresence>
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
                        className="flex flex-row justify-center items-center space-x-4"
                    >
                        
                        {requiredFruits.map(fruit => (
                        <span key={fruit.name} className="flex flex-col items-center">
                            <img
                                src={fruitImages[fruit.name]} // get image from mapping
                                alt={fruit.name}
                                className="w-10 h-10"          // adjust size as needed
                            /> 
                        
                            <span className="flex font-bold">{fruit.count}</span>
                        </span>
                        ))}
                    </motion.p>
                    )}
                </AnimatePresence>

                {isExcited && (
                    <button
                    className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg shadow font-bold text-lg hover:bg-green-700 transition"
                    onClick={goToNextLevel}
                    >
                    {currentLevel < levels.length - 1 ? `Level ${currentLevel + 2}` : "Finish"}
                    </button>
                )}
            </div>
        
            {/* Floating fruits on the screen */}
            <div className="overflow-hidden">
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
                    {[...Array(3)].map((_, repeatIndex) => (   //  repeat 3 times
                        fruitList.map((fruit, idx) => {
                        const fruitSize = 80; // px
                        const maxX = window.innerWidth - fruitSize;;
                        const minY = window.innerHeight / 2 + 100; // start just below the owl
                        const maxY = window.innerHeight - fruitSize - 20; // stay above the bottom edge


                        return (
                            <motion.img
                            key={`${fruit.name}-${repeatIndex}-${idx}`}
                            src={fruit.img}
                            alt={fruit.name}
                            className="w-20 absolute cursor-grab pointer-events-auto"
                            draggable
                            onDragStart={(e) => handleDragStart(e, fruit)}
                            initial={{
                                x: Math.random() * maxX,
                                y: minY + Math.random() * (maxY - minY),
                            }}
                            animate={{
                                y: [
                                minY + Math.random() * (maxY - minY),
                                minY + Math.random() * (maxY - minY),
                                minY + Math.random() * (maxY - minY),
                            ],
                                x: [
                                Math.random() * maxX,  // random horizontal position 1
                                Math.random() * maxX,  // random horizontal position 2
                                Math.random() * maxX,  // random horizontal position 3
                            ],
                            }}
                            transition={{
                                duration: 6 + Math.random() * 3,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                            }}
                            />
                        );
                        })
                    ))}
                </div>
            </div>
                
            <div className="flex flex-row items-end justify-between w-full px-4">
                {/* Owl */}
                <div className="relative flex flex-col items-center">
                    
                    <motion.img
                        initial={{ x: -1000 }}
                        animate={{ x: 0 }}
                        transition={{
                            delay: 1,
                            duration: 0.75,
                        }}
                        src={isExcited ? excitedOwl : owl}
                        alt="animal"
                        className="w-80 mt=40"
                    />
                </div>
                {/* Basket with drop area */}
                <div className="relative flex flex-col items-center mb-10">
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
                        onDrop={handleDropFruit}
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
                    {/* Show message if wrong fruit */}
                        {basketMessage && (
                            <div className="text-orange-400 font-bold mb-1 text-sm">
                                {basketMessage}
                            </div>
                        )}
                </div>
                
            </div>
        </div>
    );
};


export default FruitFall;
