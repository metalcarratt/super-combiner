import { Coords, MapType, TileType } from "./types";
import "./tiles.css";

export const classForTile = (tile: TileType) => {
  switch (tile) {
    case 0:
      return "earth";
    case 1:
      return "grass";
    case 2:
      return "lightning";
  }
};

const getTypeAt = (map: MapType, coords: Coords) => {
  if (
    coords.x >= 0 &&
    coords.y >= 0 &&
    coords.x < map[0].length &&
    coords.y < map.length
  ) {
    return map[coords.y][coords.x].tile;
  }
};

const scoreForGrass = (map: MapType, x: number, y: number) => {
  let level = 1;

  if (getTypeAt(map, { y: y - 1, x }) === 1) {
    level++;
  }
  if (getTypeAt(map, { y: y + 1, x }) === 1) {
    level++;
  }
  if (getTypeAt(map, { y, x: x - 1 }) === 1) {
    level++;
  }
  if (getTypeAt(map, { y, x: x + 1 }) === 1) {
    level++;
  }

  return level;
};

const scoreForLightning = (map: MapType, x: number, y: number) => {
  let level = 1;
  if (getTypeAt(map, { y: y - 1, x }) === 2) {
    level--;
  }
  if (getTypeAt(map, { y: y + 1, x }) === 2) {
    level--;
  }
  if (getTypeAt(map, { y, x: x - 1 }) === 2) {
    level--;
  }
  if (getTypeAt(map, { y, x: x + 1 }) === 2) {
    level--;
  }

  if (getTypeAt(map, { y: y - 1, x: x - 1 }) === 2) {
    level++;
  }
  if (getTypeAt(map, { y: y + 1, x: x + 1 }) === 2) {
    level++;
  }
  if (getTypeAt(map, { y: y + 1, x: x - 1 }) === 2) {
    level++;
  }
  if (getTypeAt(map, { y: y - 1, x: x + 1 }) === 2) {
    level++;
  }

  return level > 0 ? level : 0;
};

export const calculateLevels = (map: MapType) => {
  let score = 0;
  const updatedMap = map.map((row, y) =>
    row.map((cell, x) => {
      let level = 0;
      if (cell.tile === 1) {
        level = scoreForGrass(map, x, y);
      } else if (cell.tile === 2) {
        level = scoreForLightning(map, x, y);
      }
      score += level;
      return { ...cell, level };
    })
  );

  return { updatedMap, score };
};
