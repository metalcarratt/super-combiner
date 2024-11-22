import { Coords } from "../../types";
import { GameMap, TileType } from "../map";

export const getTypeAt = (map: GameMap, coords: Coords) => {
  if (map.inMap(coords)) {
    return map.getTile(coords).tile;
  }
};

export const getLevelAt = (map: GameMap, coords: Coords) => {
  return map.getTile(coords).level;
};

export const goFn = (
  map: GameMap,
  lookFor: TileType,
  mapDirFn: any,
  coords?: Coords
): number => {
  if (!coords || map.getTile(coords)?.tile !== lookFor) {
    return 0;
  }
  const next = mapDirFn(coords);
  return 1 + goFn(map, lookFor, mapDirFn, next);
};
