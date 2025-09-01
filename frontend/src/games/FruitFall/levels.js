// levels.js
export const levels = [
    {
        id: 0,
        animal: "owl",
        basket: "basket.png",
        tutorial: true,
        requests: [
            { id: 1, expression: "3 + 2", fruit: "apple", emoji: "🍏", required: 5 },
            { id: 2, expression: "6 - 4", fruit: "banana", emoji: "🍌", required: 2 },
        ],
    },
    {
        id: 1,
        animal: "elephant",
        basket: "basket.png",
        requests: [
            { id: 1, expression: "4 + 4", fruit: "grape", emoji: "🍇", required: 8 },
            { id: 2, expression: "3 x 2", fruit: "orange", emoji: "🍊", required: 6 },
        ],

    },
    {
        id: 2,
        animal: "lion",
        basket: "basket.png",
        requests: [
            { id: 1, expression: "10 - 3", fruit: "cherry", emoji: "🍒", required: 7 },
            { id: 2, expression: "2 * 5", fruit: "apple", emoji: "🍏", required: 10 },
        ],
    },
];
