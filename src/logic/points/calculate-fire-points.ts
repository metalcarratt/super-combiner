import { Coords } from "../../types";
import { GameMap, TileType } from "../map";
import { getTypeAt } from "./util";

export const scoreForFire = (map: GameMap, coords: Coords) => {
  let level = map.filterTile((value) => value.tile === TileType.Fire).length;

  map.surroundingCoords(coords).forEach((coord) => {
    if (coord && getTypeAt(map, coord) === TileType.Fire) {
      level -= 2;
    }
  });

  return level > 0 ? level : 0;
};
