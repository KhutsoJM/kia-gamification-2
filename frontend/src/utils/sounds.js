// Import the sound function "playSound" from the utils
// This function is used to play sound effects in the FruitFall game
// Example: playSound('click') to play a click sound
// Example: playSound('bubbleClick', 0.5) to play a click sound at half volume
// Example: playSound('click', 0.5, 0.75) to play a click sound at half volume and 0.75 speed
// import more sounds as needed


import { Howl } from "howler";

// Sound effects for the FruitFall game
import click from "../assets/FruitFall/sounds/click-1.wav";
import click2 from "../assets/FruitFall/sounds/click-2.mp3";
import bubbleClick from "../assets/FruitFall/sounds/bubble-1.mp3";
import bubbleClick2 from "../assets/FruitFall/sounds/bubble-2.mp3";


const sounds = {
    click: new Howl({ src: [click], volume: 1 }),
    click2: new Howl({ src: [click2], volume: 1 }),
    bubbleClick: new Howl({ src: [bubbleClick], volume: 1 }),
    bubbleClick2: new Howl({ src: [bubbleClick2], volume: 1.75 }),
};

export const playSound = (name, volume = 1, rate = 1) => {
    const sound = sounds[name];

    if (!sound) {
        console.warn(`Sound "${name}" not found`);
        return;
    }

    sound.volume(volume);
    sound.rate(rate);
    sound.play();
};
