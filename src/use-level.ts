import { useEffect, useState } from "react";
import { CardsType, Coords, GoalType, MapType, TileType } from "./types";

export type NewLevelFn = (newMap: MapType, level: LevelType) => void;

const t = () => ({ tile: 0, level: 0 });

export type LevelType = {
  name: number;
  size: number;
  handSize: number;
  cards: CardsType;
  deadZones?: number;
  blooms?: Coords[];
  goal: GoalType;
};

const levels: LevelType[] = [
  {
    name: 1,
    size: 3,
    handSize: 1,
    cards: [1],
    goal: {
      score: 12,
    },
  },
  {
    name: 2,
    size: 3,
    handSize: 1,
    cards: [2],
    goal: {
      score: 12,
    },
  },
  {
    name: 3,
    size: 3,
    handSize: 1,
    cards: [1, 2],
    goal: {
      score: 15,
    },
  },
  {
    name: 4,
    size: 3,
    handSize: 1,
    cards: [3],
    goal: {
      score: 15,
    },
  },
  {
    name: 5,
    size: 3,
    handSize: 1,
    cards: [3, 1],
    goal: {
      score: 20,
    },
  },
  {
    name: 6,
    size: 3,
    handSize: 1,
    cards: [3, 2],
    goal: {
      score: 20,
    },
  },
  {
    name: 7,
    size: 4,
    handSize: 1,
    cards: [1, 2, 3],
    goal: {
      score: 30,
    },
  },
  {
    name: 8,
    size: 4,
    handSize: 1,
    cards: [1, 2, 3],
    deadZones: 2,
    goal: {
      score: 40,
    },
  },
  {
    name: 9,
    size: 4,
    handSize: 1,
    cards: [1, 2, 3],
    blooms: [{ x: 1, y: 1 }],
    goal: {
      bloomScore: 20,
    },
  },
  {
    name: 10,
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
    name: 11,
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
];

export const useLevel = (newLevel: NewLevelFn) => {
  const [level, setLevel] = useState(1);

  const clickLevel = (lvl: LevelType) => {
    const newMap: MapType = [];
    const coords: Coords[] = [];
    for (let y = 0; y < lvl.size; y++) {
      newMap.push([]);
      for (let x = 0; x < lvl.size; x++) {
        newMap[y].push(t());
        if (lvl.blooms?.find((bloom) => bloom.x === x && bloom.y === y)) {
          newMap[y][x].tile = TileType.Bloom;
        } else {
          coords.push({ x, y });
        }
      }
    }

    if (lvl.deadZones) {
      for (let i = 0; i < lvl.deadZones; i++) {
        const r = Math.floor(Math.random() * coords.length);
        const rcoord = coords[r];
        newMap[rcoord.y][rcoord.x].tile = -1;
        // console.log('deadzone', rcoord);
        coords.splice(r, 1);
      }
    }

    newLevel(newMap, lvl);
    setLevel(lvl.name);
  };

  const nextLevel = () => {
    level < levels.length && clickLevel(levels[level]);
  };

  useEffect(() => clickLevel(levels[0]), []);

  return { levels, level, clickLevel, nextLevel };
};
