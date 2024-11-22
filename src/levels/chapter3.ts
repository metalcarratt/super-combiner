import { Chapter } from "../logic/level-types";

export const chapter3: Chapter = {
  name: "Chapter 3",
  background: "bg3",
  levels: [
    {
      id: 0,
      humanName: "Infinite Possibilities",
      hint: "The stars are yours!",
      size: 8,
      handSize: 3,
      cards: [2],
      blooms: [
        { x: 5, y: 7 },
        { x: 6, y: 3 },
        { x: 4, y: 1 },
        { x: 1, y: 7 },
      ],
      deadZones: 6,
      goal: {
        bloomScore: 100,
      },
    },
    {
      id: 1,
      humanName: "Dark Matter",
      hint: "Opposites do not attract",
      size: 4,
      handSize: 1,
      cards: [1, 4],
      goal: {
        score: 35,
      },
    },
    {
      id: 2,
      humanName: "Dark Matter #2",
      hint: "Opposites can get along",
      size: 4,
      handSize: 2,
      cards: [2, 5],
      deadZones: [
        { x: 0, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: 3 },
        { x: 3, y: 3 },
      ],
      goal: {
        score: 25,
      },
    },
  ],
};
