import { CardsType, Coords, GoalType } from "../types";
import { GameMap } from "./map";

export type NewLevelFn = (newMap: GameMap, level: LevelType) => void;

export enum RiverType {
  ClockwiseBend = "clockwiseBend",
  AntiClockwiseBend = "antiClockwiseBend",
  Straight = "straight",
}

export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export type RiverOverlay = {
  type: RiverType;
  direction: Direction;
  coords: Coords;
  source?: boolean;
};

export type LevelType = {
  id: number;
  size: number;
  handSize: number;
  cards: CardsType;
  deadZones?: number | Coords[];
  riverOverlays?: RiverOverlay[];
  blooms?: Coords[];
  goal: GoalType;
  humanName?: string;
  hint?: string;
};

export type Chapter = {
  name: string;
  background: string;
  levels: LevelType[];
};
