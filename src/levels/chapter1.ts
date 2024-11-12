import { Chapter } from "../logic/level-types";

export const chapter1: Chapter = {
  name: "Chapter 1",
  background: "bg",
  levels: [
    {
      id: 0,
      humanName: "Lush Fields",
      hint: "Trying placing grass next to each other",
      size: 3,
      handSize: 1,
      cards: [1],
      goal: {
        score: 12,
      },
    },
    {
      id: 1,
      humanName: "Lightning Basin",
      hint: "Diagonal is good but straight is bad",
      size: 3,
      handSize: 1,
      cards: [2],
      goal: {
        score: 12,
      },
    },
    {
      id: 2,
      humanName: "Lightning Plains",
      hint: "Mix it up",
      size: 3,
      handSize: 1,
      cards: [1, 2],
      goal: {
        score: 12,
      },
    },
    {
      id: 3,
      humanName: "Burning Cinders",
      hint: "Keep them far apart",
      size: 3,
      handSize: 1,
      cards: [3],
      goal: {
        score: 15,
      },
    },
    {
      id: 4,
      humanName: "Grass on Fire",
      hint: "Keep trying...",
      size: 3,
      handSize: 1,
      cards: [3, 1],
      goal: {
        score: 20,
      },
    },
    {
      id: 5,
      humanName: "Fire and lightning",
      hint: "Not too close now...",
      size: 3,
      handSize: 1,
      cards: [3, 2],
      goal: {
        score: 15,
      },
    },
    {
      id: 6,
      humanName: "Elemental soup",
      hint: "Go nuts",
      size: 4,
      handSize: 1,
      cards: [1, 2, 3],
      goal: {
        score: 30,
      },
    },
    {
      id: 7,
      humanName: "Holes in the World",
      hint: "You can't place in holes...",
      size: 4,
      handSize: 1,
      cards: [1, 2, 3],
      deadZones: 2,
      goal: {
        score: 40,
      },
    },
    {
      id: 8,
      humanName: "Giant flower",
      hint: "Make the soil near the flower most lush",
      size: 4,
      handSize: 1,
      cards: [1, 2, 3],
      blooms: [{ x: 1, y: 1 }],
      goal: {
        bloomScore: 20,
      },
    },
    {
      id: 9,
      humanName: "Blossoms in Canyons",
      hint: "Work around it",
      size: 4,
      handSize: 1,
      cards: [1, 2, 3],
      blooms: [{ x: 2, y: 2 }],
      deadZones: 1,
      goal: {
        bloomScore: 15,
      },
    },
    {
      id: 10,
      humanName: "Blossom Fields",
      hint: "You can do it!",
      size: 5,
      handSize: 2,
      cards: [1, 2, 3],
      blooms: [
        { x: 1, y: 3 },
        { x: 3, y: 1 },
      ],
      deadZones: 2,
      goal: {
        bloomScore: 30,
      },
    },
  ],
};
