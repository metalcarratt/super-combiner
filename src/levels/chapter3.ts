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
      cards: [1, 2, 3],
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
  ],
};
