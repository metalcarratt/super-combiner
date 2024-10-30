export type TileType = number;

export type MapTileType = {
  tile: TileType;
  level: number;
};

export type MapType = MapTileType[][];

export type CardsType = TileType[];

export type SelectedCardType = TileType;

export type Coords = { x: number; y: number };

export type SpecialType = {
  coord: Coords;
  type: "man" | "woman";
};

export type GoalType = {
  score?: number;
};
