import { Coords } from "../../types";
import { GameMap, TileType } from "../map";
import { getTypeAt, goFn } from "./util";

const pointsFor = (map: GameMap, coords: Coords, tileType: TileType) =>
  goFn(map, tileType, map.upLeft, map.upLeft(coords)) +
  goFn(map, tileType, map.upRight, map.upRight(coords)) +
  goFn(map, tileType, map.downLeft, map.downLeft(coords)) +
  goFn(map, tileType, map.downRight, map.downRight(coords));

const minusPointsFor = (map: GameMap, coords: Coords, tileType: TileType) =>
  map
    .adjacentCoords(coords)
    .filter((coord) => coord && getTypeAt(map, coord) === tileType).length;

export const scoreForLightning = (map: GameMap, coords: Coords) => {
  let level = 1 + pointsFor(map, coords, TileType.Lightning);
  level -= minusPointsFor(map, coords, TileType.Lightning);

  return level > 0 ? level : 0;
};

export const scoreForDarkLightning = (map: GameMap, coords: Coords) => {
  let level = 1 + pointsFor(map, coords, TileType.DarkLightning);
  level -= minusPointsFor(map, coords, TileType.DarkLightning);

  return level > 0 ? level : 0;
};
