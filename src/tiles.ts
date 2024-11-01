import { Coords, MapType, TileType } from "./types";

export const classForTile = (tile: TileType) => {
  switch (tile) {
    case TileType.Earth:
      return "earth";
    case TileType.Grass:
      return "grass";
    case TileType.Lightning:
      return "lightning";
    case TileType.Fire:
      return "fire";
    case TileType.Dead:
      return "dead";
    case TileType.Bloom:
      return "bloom";
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

const scoreForFire = (map: MapType, x: number, y: number) => {
  let level = map.flat().filter((value) => value.tile === 3).length;

  if (getTypeAt(map, { y: y - 1, x }) === 3) {
    level--;
  }
  if (getTypeAt(map, { y: y + 1, x }) === 3) {
    level--;
  }
  if (getTypeAt(map, { y, x: x - 1 }) === 3) {
    level--;
  }
  if (getTypeAt(map, { y, x: x + 1 }) === 3) {
    level--;
  }

  if (getTypeAt(map, { y: y - 1, x: x - 1 }) === 3) {
    level--;
  }
  if (getTypeAt(map, { y: y + 1, x: x + 1 }) === 3) {
    level--;
  }
  if (getTypeAt(map, { y: y + 1, x: x - 1 }) === 3) {
    level--;
  }
  if (getTypeAt(map, { y: y - 1, x: x + 1 }) === 3) {
    level--;
  }

  return level > 0 ? level : 0;
};

const getLevelAt = (map: MapType, coords: Coords) => {
  return map[coords.y][coords.x].level;
};

const scoreForBloom = (map: MapType, x: number, y: number) => {
  let level = 0;
  level += getLevelAt(map, { y: y - 1, x });
  level += getLevelAt(map, { y: y + 1, x });
  level += getLevelAt(map, { y, x: x - 1 });
  level += getLevelAt(map, { y, x: x + 1 });
  level += getLevelAt(map, { y: y - 1, x: x - 1 });
  level += getLevelAt(map, { y: y + 1, x: x + 1 });
  level += getLevelAt(map, { y: y + 1, x: x - 1 });
  level += getLevelAt(map, { y: y - 1, x: x + 1 });
  return level;
};

export const calculateLevels = (map: MapType) => {
  let score = 0;
  const blooms: Coords[] = [];
  const updatedMap = map.map((row, y) =>
    row.map((cell, x) => {
      let level = 0;
      if (cell.tile === TileType.Grass) {
        level = scoreForGrass(map, x, y);
      } else if (cell.tile === TileType.Lightning) {
        level = scoreForLightning(map, x, y);
      } else if (cell.tile === TileType.Fire) {
        level = scoreForFire(map, x, y);
      } else if (cell.tile === TileType.Bloom) {
        blooms.push({ x, y });
      }
      score += level;
      return { ...cell, level };
    })
  );

  let bloomScore = 0;
  blooms.forEach((bloom) => {
    const level = scoreForBloom(updatedMap, bloom.x, bloom.y);
    score += level;
    updatedMap[bloom.y][bloom.x].level = level;
    bloomScore += level;
  });

  return { updatedMap, score, bloomScore };
};
