import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaCheck } from "react-icons/fa";

import { levels } from "./levels";


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


const fruits = [
    { name: "apple", src: apple },
    { name: "raspberry", src: raspberry },
    { name: "banana", src: banana },
    { name: "blueberry", src: blueberry },
]

// Requests: store as an object with an equation for dyscalculia support
const requests = {
    apple: { equation: '3 + 2', required: 5 },
    banana: { equation: '6 - 4', required: 2 },
};


const introText1 = `Deep in the heart of a forest lives Ollie the Owl. 
Ollie is wise and kind, but he has a problem… he just loves to nap! 
Every time he dozes off, the forest animals can’t hear his bedtime stories, 
and they really want him awake.`;

const introText2 = `The only way to wake Ollie is by feeding him his favourite fruits! 
Each fruit gives him a little more energy until he finally opens his eyes, 
stretches his wings, and hoots happily.`;

const FruitFall = () => {
    // states
    const [showSecondParagraph, setShowSecondParagraph] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [isFruitsVisible, setIsFruitsVisible] = useState(false);
    const [showRequests, setShowRequests] = useState(false);

    // basket/drop handling
    const basketRef = useRef(null);
    const rootRef = useRef(null);
    const [lastDropFeedback, setLastDropFeedback] = useState(null); // 'accepted' | 'wrong'
    const [lastAcceptedFruit, setLastAcceptedFruit] = useState(null);
    const [basketCounts, setBasketCounts] = useState({});
    const [flyingFruits, setFlyingFruits] = useState([]); // { id, name, offset }
    const [levelIndex, setLevelIndex] = useState(0);

    // State to track the count of each fruit
    const [fruitsCount, setFruitsCount] = useState({
        apple: 0,
        raspberry: 0,
        banana: 0,
        blueberry: 0,
    })

    const level = levels[levelIndex];

    function goToNextLevel() {
        if (levelIndex < levels.length - 1) {
            setLevelIndex(levelIndex + 1);
        } else {
            // game finished
        }
    }

    useEffect(() => {
        loadLevel(levelIndex);
    }, [levelIndex]);

    // Speak the first paragraph on mount
    useEffect(() => {
        const utter = new window.SpeechSynthesisUtterance(introText1);
        window.speechSynthesis.speak(utter);

        const timer = setTimeout(() => {
            setShowSecondParagraph(true);
            setTimeout(() => {
                console.log("done speaking")
                setStartGame(true);
                setTimeout(() => {
                    setIsFruitsVisible(true);
                    setTimeout(() => {
                        setShowRequests(true);
                    }, 2000);
                }, 3000);
            }, 13500)
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



    const handleFruitCountChange = (fruitName, amount) => {
        setFruitsCount(prevCounts => ({
            ...prevCounts,
            [fruitName]: Math.max(0, prevCounts[fruitName] + amount) // Ensure count doesn't go below 0
        }));
    };

    const loadLevel = (index) => {
        const level = levels[index];
        if (!level) return;

    }

    // layout constants for the fruit box
    const ITEM_DISPLAY_WIDTH = 160; // px per fruit (includes gap)
    const containerWidth = fruits.length * ITEM_DISPLAY_WIDTH + 32; // extra padding



    const allRequestsSatisfied = Object.entries(requests).every(
        ([name, r]) => (basketCounts[name] || 0) >= r.required
    );


    const handleDrop = (point, fruit) => {
        if (!basketRef.current || !point) return false;
        const rect = basketRef.current.getBoundingClientRect();
        const rootRect = rootRef.current ? rootRef.current.getBoundingClientRect() : { left: 0, top: 0 };
        if (point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom) {
            // Only accept if this fruit is requested and the counter equals the required amount
            const req = requests[fruit.name];
            if (!req) {
                // wrong type
                setLastDropFeedback('wrong');
                setTimeout(() => setLastDropFeedback(null), 700);
                return false;
            }
            const have = fruitsCount[fruit.name] || 0;
            // debug info to help diagnose drop issues
            console.debug('[FruitFall] drop', { fruit: fruit.name, point, have, required: req.required, basketRect: rect, rootRect });
            // accept only when the user has exactly the required amount
            if (have === req.required) {
                // accept: transfer the exact amount into the basket (decrement local counter)
                handleFruitCountChange(fruit.name, -req.required);
                setLastAcceptedFruit(fruit.name);

                // create flying fruits that animate into the basket
                const idBase = Date.now();
                // compute basket center relative to root container as target
                const basketCenterX = rect.left + rect.width / 2 - rootRect.left;
                const basketCenterY = rect.top + rect.height / 2 - rootRect.top;
                // start the flying fruits slightly above the basket and spread them horizontally
                const startBaseY = rect.top - rootRect.top - 60; // 60px above the top of the basket
                const spread = 24; // horizontal spread per fruit

                const newFlying = Array.from({ length: req.required }).map((_, i) => {
                    const centerIndex = (req.required - 1) / 2;
                    const offsetH = (i - centerIndex) * spread;
                    return {
                        id: `${fruit.name}-${idBase}-${i}`,
                        name: fruit.name,
                        offset: i,
                        startX: basketCenterX + offsetH,
                        startY: startBaseY,
                        targetX: basketCenterX + (i - centerIndex) * 8, // slight target offset
                        targetY: basketCenterY,
                    };
                });
                setFlyingFruits(prev => [...prev, ...newFlying]);

                setLastDropFeedback('accepted');

                // after animation duration, remove flying fruits and increment basketCounts
                const animMs = 900;
                setTimeout(() => {
                    setFlyingFruits(prev => prev.filter(f => !newFlying.some(n => n.id === f.id)));
                    setBasketCounts(prev => ({ ...prev, [fruit.name]: (prev[fruit.name] || 0) + req.required }));
                }, animMs);

                setTimeout(() => setLastDropFeedback(null), 800);
                return true;
            }
            // wrong amount (not the required one)
            setLastDropFeedback('wrong');
            setTimeout(() => setLastDropFeedback(null), 700);
            return false;
        }
        return false;
    };

    return (
        <div ref={rootRef} className="flex flex-col h-screen justify-center items-center relative">
            {/* flying fruits rendered at root level so client coords match */}
            {flyingFruits.map((f, idx) => {
                const src = fruits.find(x => x.name === f.name)?.src;
                const dx = (f.targetX || 0) - (f.startX || 0);
                const dy = (f.targetY || 0) - (f.startY || 0);
                return (
                    <motion.img
                        key={f.id}
                        src={src}
                        alt={f.name}
                        className="w-10 h-10 object-contain absolute z-0"
                        style={{ left: `${f.startX}px`, top: `${f.startY}px` }}
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{ x: dx, y: dy, opacity: 1 }}
                        transition={{ duration: 0.9, ease: 'easeIn' }}
                    />
                )
            })}
            <AnimatePresence mode="wait">
                {!startGame &&
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        // onClick={() => setStartGame(true)}
                        className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 border-2 border-gray-300 rounded-lg shadow-lg px-8 py-6 w-[500px] text-xl text-center">
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
                    </motion.div>}
            </AnimatePresence>
            <motion.div
                initial={{ x: -1000, y: 50 }}
                animate={{ x: 0, y: startGame ? -50 : 50 }}
                transition={{
                    delay: 1,
                    duration: 0.75,
                }}
                className="flex flex-row items-end"
            >
                <img
                    src={owl} alt="animal"
                    className="w-64"
                />
                <div className="w-64 flex flex-col items-center justify-end relative">
                    <motion.img
                        ref={basketRef}
                        src={basket}
                        alt="basket"
                        className="w-36 z-20"
                        animate={lastDropFeedback === 'wrong' ? { x: [0, -10, 10, -6, 6, 0] } : lastDropFeedback === 'accepted' ? { scale: [1, 1.2, 1] } : {}}
                        transition={lastDropFeedback === 'wrong' ? { duration: 0.6 } : { duration: 0.3 }}
                    // style={lastDropFeedback === 'accepted' ? { boxShadow: '0 8px 20px rgba(34,197,94,0.25)' } : {}}
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: showRequests ? 1 : 0, scale: showRequests ? 1 : 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="w-64 mx-6 px-4 py-4 bg-white border border-gray-300 rounded-lg shadow-lg self-start">
                    {Object.entries(requests).map(([name, r]) => {
                        const have = basketCounts[name] || 0;
                        const satisfied = have >= r.required;
                        return (
                            <div key={name} className="flex items-center justify-between mb-4">
                                <div className="text-2xl bg-green-300 p-2 rounded-md w-full">
                                    {r.equation} = ?
                                </div>
                                <div className="w-8 ml-3 flex items-center justify-center">
                                    {satisfied && (
                                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="text-green-600">
                                            <FaCheck />
                                        </motion.span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </motion.div>

            {allRequestsSatisfied && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute h-screen  w-screen flex flex-col items-center justify-center bg-teal-300 bg-opacity-80 z-50"
                >
                    <h2 className="text-4xl font-bold mb-4">You did it! 🎉</h2>
                    <button
                        onClick={() => {
                            setFruitsCount({ apple: 0, raspberry: 0, banana: 0, blueberry: 0 });
                            setBasketCounts({});
                            setFlyingFruits([]);
                            goToNextLevel();
                        }}
                        className="px-6 py-3 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600"
                    >
                        Next Level →
                    </button>
                </motion.div>
            )}


            {isFruitsVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    // absolutely position the fruit box so it doesn't change layout
                    className="absolute left-1/2 transform -translate-x-1/2 bottom-8 z-20 flex flex-nowrap justify-center gap-6 px-6 py-4 items-center bg-teal-200 rounded-3xl shadow-lg border border-gray-200"
                    style={{ width: `${containerWidth}px` }}
                >
                    {fruits.map((fruit, index) => (
                        <div className="flex flex-row items-center gap-1 flex-none w-36 justify-center" key={index}>
                            <button onClick={() => handleFruitCountChange(fruit.name, -1)} className="p-2 bg-teal-300 rounded-full hover:bg-teal-400 cursor-pointer flex items-center justify-center">
                                <FaMinus />
                            </button>
                            <div className="relative w-14 h-14">
                                {/* Ghost image behind */}
                                <img
                                    src={fruit.src}
                                    alt={`${fruit.name}-ghost`}
                                    className="absolute inset-0 w-14 object-cover opacity-40 z-0"
                                />

                                {/* Draggable fruit on top */}
                                <motion.img
                                    drag
                                    dragSnapToOrigin
                                    src={fruit.src}
                                    alt={fruit.name}
                                    className="w-14 object-cover cursor-pointer relative z-10"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onDragEnd={(e, info) => handleDrop(info.point, fruit)}
                                />

                                {/* Count badge */}
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center font-bold shadow-md z-20">
                                    {fruitsCount[fruit.name]}
                                </div>
                            </div>

                            <button onClick={() => handleFruitCountChange(fruit.name, 1)} className="p-2 bg-teal-300 rounded-full hover:bg-teal-400 cursor-pointer flex items-center justify-center">
                                <FaPlus />
                            </button>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default FruitFall;
