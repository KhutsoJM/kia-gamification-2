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
<<<<<<< HEAD
import bgMusic from "../assets/FruitFall/sounds/nature-ambience.mp3";

=======
import natureAmbience from "../assets/FruitFall/sounds/nature-ambience.mp3";
import bucket from "../assets/FruitFall/sounds/bucket.mp3";
import coinSound from "../assets/FruitFall/sounds/collect-points.mp3";
import owlHoot from "../assets/FruitFall/sounds/owl_hooting.mp3"
import failBuzzer from "../assets/FruitFall/sounds/fail_buzz.mp3";
>>>>>>> 060474caee6088acf37a113ca478e614fff1d2f5

const sounds = {
    click: new Howl({ src: [click], volume: 1 }),
    click2: new Howl({ src: [click2], volume: 1 }),
    bubbleClick: new Howl({ src: [bubbleClick], volume: 1 }),
    bubbleClick2: new Howl({ src: [bubbleClick2], volume: 1.75 }),
    natureAmbience: new Howl({ src: [natureAmbience], volume: 0.3}),
    bucket: new Howl({src: [bucket], volume: 1}),
    coinSound: new Howl({src: [coinSound], volume: 0.5}),
    owlHoot: new Howl({src: [owlHoot], volume: 0.5}),
    failBuzzer: new Howl({src: [failBuzzer], volume: 0.5})
};

export const playSound = (name, volume = 1, rate = 1, infinite = false) => {
    const sound = sounds[name];

    if (!sound) {
        console.warn(`Sound "${name}" not found`);
        return;
    }

    sound.volume(volume);
    sound.rate(rate);
    sound.loop(infinite);
    sound.play();
};
