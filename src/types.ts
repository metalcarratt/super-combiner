import { TileType } from "./logic/map";

export type CardsType = TileType[];

export type SelectedCardType = TileType;

export type Coords = { x: number; y: number };

export type GoalType = {
  score?: number;
  bloomScore?: number;
};
