import { Chapter, Direction, RiverType } from "../logic/level-types";

export const chapter2: Chapter = {
  name: "Chapter 2",
  background: "bg2",
  levels: [
    {
      id: 0,
      humanName: "Rainforest",
      hint: "Place grass along the river to increase points",
      size: 3,
      handSize: 1,
      cards: [1],
      goal: {
        score: 25,
      },
      riverOverlays: [
        {
          type: RiverType.Straight,
          direction: Direction.Right,
          coords: { x: 0, y: 0 },
          source: true,
        },
        {
          type: RiverType.ClockwiseBend,
          direction: Direction.Down,
          coords: { x: 1, y: 0 },
        },
        {
          type: RiverType.Straight,
          direction: Direction.Down,
          coords: { x: 1, y: 1 },
        },
        {
          type: RiverType.AntiClockwiseBend,
          direction: Direction.Right,
          coords: { x: 1, y: 2 },
        },
        {
          type: RiverType.Straight,
          direction: Direction.Right,
          coords: { x: 2, y: 2 },
        },
      ],
    },
    {
      id: 1,
      humanName: "Flow of gold",
      hint: "Try and create a golden river",
      size: 4,
      handSize: 1,
      cards: [1, 2, 3],
      deadZones: [{ x: 1, y: 1 }],
      riverOverlays: [
        {
          type: RiverType.Straight,
          direction: Direction.Up,
          coords: { x: 1, y: 3 },
          source: true,
        },
        {
          type: RiverType.AntiClockwiseBend,
          direction: Direction.Left,
          coords: { x: 1, y: 2 },
        },
        {
          type: RiverType.ClockwiseBend,
          direction: Direction.Up,
          coords: { x: 0, y: 2 },
        },
        {
          type: RiverType.Straight,
          direction: Direction.Up,
          coords: { x: 0, y: 1 },
        },
        {
          type: RiverType.ClockwiseBend,
          direction: Direction.Right,
          coords: { x: 0, y: 0 },
        },
        {
          type: RiverType.Straight,
          direction: Direction.Right,
          coords: { x: 1, y: 0 },
        },
        {
          type: RiverType.ClockwiseBend,
          direction: Direction.Down,
          coords: { x: 2, y: 0 },
        },
        {
          type: RiverType.AntiClockwiseBend,
          direction: Direction.Right,
          coords: { x: 2, y: 1 },
        },
        {
          type: RiverType.ClockwiseBend,
          direction: Direction.Down,
          coords: { x: 3, y: 1 },
        },
        {
          type: RiverType.Straight,
          direction: Direction.Down,
          coords: { x: 3, y: 2 },
        },
        {
          type: RiverType.AntiClockwiseBend,
          direction: Direction.Right,
          coords: { x: 3, y: 3 },
        },
      ],
      goal: {
        score: 80,
      },
    },
  ],
};
