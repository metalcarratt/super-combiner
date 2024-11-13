import { Coords } from "../types";
import { LevelType, RiverOverlay } from "./level-types";
import { GameMap, MapTileType, RiverEssenceType, TileType } from "./map";

export const classForTile = (tile: TileType, essence?: RiverEssenceType) => {
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
      if (essence) {
        return `dead ${essence}`;
      }
      return "dead";
    case TileType.Bloom:
      return "bloom";
  }
};

const getTypeAt = (map: GameMap, coords: Coords) => {
  if (map.inMap(coords)) {
    return map.getTile(coords).tile;
  }
};

const scoreForGrass = (map: GameMap, coords: Coords) => {
  let level = 1;
  map.adjacentCoords(coords).forEach((coord) => {
    if (coord && getTypeAt(map, coord) === 1) {
      level++;
    }
  });

  return level;
};

const scoreForLightning = (map: GameMap, coords: Coords) => {
  let level = 1;
  map.diagonalCoords(coords).forEach((coord) => {
    if (coord && getTypeAt(map, coord) === 2) {
      level++;
    }
  });

  map.adjacentCoords(coords).forEach((coord) => {
    if (coord && getTypeAt(map, coord) === 2) {
      level--;
    }
  });

  return level > 0 ? level : 0;
};

const scoreForFire = (map: GameMap, coords: Coords) => {
  let level = map.filterTile((value) => value.tile === 3).length;

  map.surroundingCoords(coords).forEach((coord) => {
    if (coord && getTypeAt(map, coord) === 3) {
      level -= 2;
    }
  });

  return level > 0 ? level : 0;
};

const getLevelAt = (map: GameMap, coords: Coords) => {
  return map.getTile(coords).level;
};

const scoreForBloom = (map: GameMap, coords: Coords) => {
  let level = 0;
  map.surroundingCoords(coords).forEach((coord) => {
    if (coord) level += getLevelAt(map, coord);
  });
  return level;
};

const essenceScore = (essence?: RiverEssenceType) => {
  if (
    essence === RiverEssenceType.Electric ||
    essence === RiverEssenceType.Fire ||
    essence === RiverEssenceType.Water
  ) {
    return 1.5;
  }

  if (
    essence === RiverEssenceType.ElectricFire ||
    essence === RiverEssenceType.FireWater ||
    essence === RiverEssenceType.WaterElectric
  ) {
    return 2;
  }

  if (essence === RiverEssenceType.Golden) {
    return 3;
  }

  return 1;
};

const scoreForRiver = (cell: MapTileType, level: number) => {
  return Math.floor(level * essenceScore(cell.riverType));
};

const scoreForLake = (map: GameMap, coords: Coords, level: number) => {
  console.log("SCORE FOR LAKE");
  let newLevel = level;
  const lakes = map
    .surroundingCoords(coords)
    .filter((coord) => {
      const tile = coord && map.getTile(coord);
      return tile?.tile === TileType.Dead && tile?.riverType;
    })
    .map((coord) => (coord ? map.getTile(coord) : undefined));
  console.log("lakes", lakes);
  lakes.forEach((lake) => {
    if (lake) {
      console.log("level", newLevel);
      const escore = essenceScore(lake.riverType);
      console.log("escore", escore);
      newLevel = Math.floor(newLevel * escore);
      console.log("level2", newLevel);
    }
  });
  return newLevel;
};

const essenceForTileType = (tileType: TileType) => {
  switch (tileType) {
    case TileType.Lightning:
      return RiverEssenceType.Electric;
    case TileType.Earth:
      return RiverEssenceType.Mud;
    case TileType.Fire:
      return RiverEssenceType.Fire;
    case TileType.Grass:
      return RiverEssenceType.Water;
  }

  return RiverEssenceType.Mud;
};

const getEssence = (
  thisTileEssence: RiverEssenceType,
  currentEssence?: RiverEssenceType
) => {
  if (
    (currentEssence === RiverEssenceType.Electric &&
      thisTileEssence === RiverEssenceType.Fire) ||
    (currentEssence === RiverEssenceType.Fire &&
      thisTileEssence === RiverEssenceType.Electric)
  ) {
    return RiverEssenceType.ElectricFire;
  } else if (
    (currentEssence === RiverEssenceType.Electric &&
      thisTileEssence === RiverEssenceType.Water) ||
    (currentEssence === RiverEssenceType.Water &&
      thisTileEssence === RiverEssenceType.Electric)
  ) {
    return RiverEssenceType.WaterElectric;
  } else if (
    (currentEssence === RiverEssenceType.Fire &&
      thisTileEssence === RiverEssenceType.Water) ||
    (currentEssence === RiverEssenceType.Water &&
      thisTileEssence === RiverEssenceType.Fire)
  ) {
    return RiverEssenceType.FireWater;
  } else if (
    (currentEssence === RiverEssenceType.ElectricFire &&
      thisTileEssence === RiverEssenceType.Water) ||
    (currentEssence === RiverEssenceType.FireWater &&
      thisTileEssence === RiverEssenceType.Electric) ||
    (currentEssence === RiverEssenceType.WaterElectric &&
      thisTileEssence === RiverEssenceType.Fire)
  ) {
    return RiverEssenceType.Golden;
  } else if (currentEssence && currentEssence !== RiverEssenceType.Mud) {
    return currentEssence;
  } else if (thisTileEssence) {
    return thisTileEssence;
  } else {
    return RiverEssenceType.Mud;
  }
};

const traverseRiver = (
  map: GameMap,
  overlay: RiverOverlay,
  level: LevelType,
  currentEssence?: RiverEssenceType
) => {
  const thisTileEssence = essenceForTileType(map.getTile(overlay.coords).tile);
  let essence = getEssence(thisTileEssence, currentEssence);

  map.getTile(overlay.coords).riverType = essence;
  const nextCoord = map.go(overlay.direction, overlay.coords);
  const nextOverlay =
    nextCoord &&
    level.riverOverlays?.find(
      (overlay) =>
        overlay.coords.x === nextCoord.x && overlay.coords.y === nextCoord.y
    );
  if (nextOverlay) {
    traverseRiver(map, nextOverlay, level, essence);
  } else if (
    nextCoord &&
    map.getTile(nextCoord).tile === TileType.Dead &&
    essence !== RiverEssenceType.Mud
  ) {
    map.getTile(nextCoord).riverType = essence;
  }
};

const calculateRivers = (map: GameMap, level: LevelType) => {
  const riverSources = level.riverOverlays?.filter((overlay) => overlay.source);
  riverSources?.forEach((source) =>
    traverseRiver(map, source, level, undefined)
  );
  console.log("tiles with river type", riverSources);
};

export const calculateLevels = (map: GameMap, level: LevelType) => {
  let score = 0;
  const blooms: Coords[] = [];
  calculateRivers(map, level);
  const updatedMap = map.getMap().map((row, y) =>
    row.map((cell, x) => {
      let level = 0;
      if (cell.tile === TileType.Grass) {
        level = scoreForGrass(map, { x, y });
      } else if (cell.tile === TileType.Lightning) {
        level = scoreForLightning(map, { x, y });
      } else if (cell.tile === TileType.Fire) {
        level = scoreForFire(map, { x, y });
      } else if (cell.tile === TileType.Bloom) {
        blooms.push({ x, y });
      }
      level = scoreForRiver(cell, level);
      level = scoreForLake(map, { x, y }, level);
      score += level;
      return { ...cell, level };
    })
  );

  let bloomScore = 0;
  blooms.forEach((bloom) => {
    const level = scoreForBloom(new GameMap(updatedMap), bloom);
    score += level;
    updatedMap[bloom.y][bloom.x].level = level;
    bloomScore += level;
  });

  return { updatedMap: new GameMap(updatedMap), score, bloomScore };
};
