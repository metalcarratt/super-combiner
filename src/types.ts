export enum TileType {
  Dead = -1,
  Earth = 0,
  Grass = 1,
  Lightning = 2,
  Fire = 3,
  Bloom = 9,
}

export type MapTileType = {
  tile: TileType;
  level: number;
};

export type MapType = MapTileType[][];

export type CardsType = TileType[];

export type SelectedCardType = TileType;

export type Coords = { x: number; y: number };

export type GoalType = {
  score?: number;
  bloomScore?: number;
};
