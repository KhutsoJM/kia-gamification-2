import { Howl } from "howler";

// Sound effects for the FruitFall game
import click from "../assets/FruitFall/sounds/click-1.wav"
import click2 from "../assets/FruitFall/sounds/click-2.mp3";
import bubbleClick from "../assets/FruitFall/sounds/bubble-1.mp3";
import bubbleClick2 from "../assets/FruitFall/sounds/bubble-2.mp3";


const sounds = {
    click: new Howl({ src: [click], volume: 1 }),
    click2: new Howl({ src: [click2], volume: 1 }),
    bubbleClick: new Howl({ src: [bubbleClick], volume: 1 }),
    bubbleClick2: new Howl({ src: [bubbleClick2], volume: 1.75 }),
};

export const playSound = (name) => {
    const sound = sounds[name];
    if (sound) sound.play();
};
