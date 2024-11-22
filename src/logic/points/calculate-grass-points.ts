import { Coords } from "../../types";
import { GameMap, TileType } from "../map";
import { getTypeAt, goFn } from "./util";

const pointsFor = (map: GameMap, coords: Coords, tileType: TileType) =>
  goFn(map, tileType, map.up, map.up(coords)) +
  goFn(map, tileType, map.down, map.down(coords)) +
  goFn(map, tileType, map.left, map.left(coords)) +
  goFn(map, tileType, map.right, map.right(coords));

const nextTo = (map: GameMap, coords: Coords, tileType: TileType) =>
  map
    .adjacentCoords(coords)
    .find((coord) => coord && getTypeAt(map, coord) === tileType);

export const scoreForGrass = (map: GameMap, coords: Coords) => {
  if (nextTo(map, coords, TileType.DarkGrass)) {
    return 0;
  }

  return 1 + pointsFor(map, coords, TileType.Grass);
};

export const scoreForDarkGrass = (map: GameMap, coords: Coords) => {
  if (nextTo(map, coords, TileType.Grass)) {
    return 0;
  }

  return 1 + pointsFor(map, coords, TileType.DarkGrass);
};
