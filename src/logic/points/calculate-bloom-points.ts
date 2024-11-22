import { Coords } from "../../types";
import { GameMap } from "../map";
import { getLevelAt } from "./util";

export const scoreForBloom = (map: GameMap, coords: Coords) => {
  let level = 0;
  map.surroundingCoords(coords).forEach((coord) => {
    if (coord) level += getLevelAt(map, coord);
  });
  return level;
};
