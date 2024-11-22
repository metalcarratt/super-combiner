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
      hint: "The more elements you mix, the bigger the point boost",
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
    {
      id: 2,
      humanName: "Golden Lake",
      hint: "Lakes bless all surrounding tiles with point boosts",
      size: 4,
      handSize: 1,
      cards: [1, 2, 3],
      deadZones: [{ x: 2, y: 1 }],
      blooms: [{ x: 2, y: 3 }],
      riverOverlays: [
        {
          type: RiverType.AntiClockwiseBend,
          direction: Direction.Right,
          coords: { x: 0, y: 0 },
          source: true,
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
      ],
      goal: {
        score: 120,
      },
    },
    {
      id: 3,
      humanName: "Blooming Lakes",
      hint: "Prioritise your tiles",
      size: 5,
      handSize: 1,
      cards: [1, 2, 3],
      deadZones: [
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 0, y: 3 },
        { x: 4, y: 1 },
      ],
      blooms: [
        { x: 2, y: 1 },
        { x: 2, y: 3 },
      ],
      riverOverlays: [
        {
          type: RiverType.ClockwiseBend,
          direction: Direction.Left,
          coords: { x: 2, y: 0 },
          source: true,
        },
        {
          type: RiverType.AntiClockwiseBend,
          direction: Direction.Down,
          coords: { x: 1, y: 0 },
        },
        {
          type: RiverType.Straight,
          direction: Direction.Down,
          coords: { x: 1, y: 1 },
        },
        {
          type: RiverType.ClockwiseBend,
          direction: Direction.Right,
          coords: { x: 2, y: 4 },
          source: true,
        },
        {
          type: RiverType.AntiClockwiseBend,
          direction: Direction.Up,
          coords: { x: 3, y: 4 },
        },
        {
          type: RiverType.Straight,
          direction: Direction.Up,
          coords: { x: 3, y: 3 },
        },
      ],
      goal: {
        bloomScore: 150,
      },
    },
    {
      id: 4,
      humanName: "Narrow valleys",
      hint: "",
      size: 5,
      handSize: 1,
      cards: [1, 2, 3],
      deadZones: [
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 3 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 1, y: 3 },
      ],
      blooms: [
        { x: 1, y: 1 },
        { x: 3, y: 3 },
      ],
      riverOverlays: [
        {
          type: RiverType.ClockwiseBend,
          direction: Direction.Up,
          coords: { x: 4, y: 1 },
          source: true,
        },
        {
          type: RiverType.AntiClockwiseBend,
          direction: Direction.Left,
          coords: { x: 4, y: 0 },
        },
        {
          type: RiverType.AntiClockwiseBend,
          direction: Direction.Down,
          coords: { x: 3, y: 0 },
        },
        {
          type: RiverType.ClockwiseBend,
          direction: Direction.Down,
          coords: { x: 0, y: 1 },
          source: true,
        },
        {
          type: RiverType.Straight,
          direction: Direction.Down,
          coords: { x: 0, y: 2 },
        },
        {
          type: RiverType.AntiClockwiseBend,
          direction: Direction.Right,
          coords: { x: 0, y: 3 },
        },
      ],
      goal: {
        bloomScore: 150,
      },
    },
  ],
};
