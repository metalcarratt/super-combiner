import { Coords } from "../types";
import { LevelType, RiverOverlay } from "./level-types";
import { GameMap, MapTileType, RiverEssenceType, TileType } from "./map";

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

const scoreForRiver = (cell: MapTileType, level: number) => {
  if (
    cell.riverType === RiverEssenceType.Electric ||
    cell.riverType === RiverEssenceType.Fire ||
    cell.riverType === RiverEssenceType.Water
  ) {
    return Math.floor(level * 1.5);
  }

  if (
    cell.riverType === RiverEssenceType.ElectricFire ||
    cell.riverType === RiverEssenceType.FireWater ||
    cell.riverType === RiverEssenceType.WaterElectric
  ) {
    return level * 2;
  }

  if (cell.riverType === RiverEssenceType.Golden) {
    return level * 3;
  }

  return level;
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

const traverseRiver = (
  map: GameMap,
  overlay: RiverOverlay,
  level: LevelType,
  currentEssence?: RiverEssenceType
) => {
  let essence;
  const thisTileEssence = essenceForTileType(map.getTile(overlay.coords).tile);
  if (
    (currentEssence === RiverEssenceType.Electric &&
      thisTileEssence === RiverEssenceType.Fire) ||
    (currentEssence === RiverEssenceType.Fire &&
      thisTileEssence === RiverEssenceType.Electric)
  ) {
    essence = RiverEssenceType.ElectricFire;
  } else if (
    (currentEssence === RiverEssenceType.Electric &&
      thisTileEssence === RiverEssenceType.Water) ||
    (currentEssence === RiverEssenceType.Water &&
      thisTileEssence === RiverEssenceType.Electric)
  ) {
    essence = RiverEssenceType.WaterElectric;
  } else if (
    (currentEssence === RiverEssenceType.Fire &&
      thisTileEssence === RiverEssenceType.Water) ||
    (currentEssence === RiverEssenceType.Water &&
      thisTileEssence === RiverEssenceType.Fire)
  ) {
    essence = RiverEssenceType.FireWater;
  } else if (
    (currentEssence === RiverEssenceType.ElectricFire &&
      thisTileEssence === RiverEssenceType.Water) ||
    (currentEssence === RiverEssenceType.FireWater &&
      thisTileEssence === RiverEssenceType.Electric) ||
    (currentEssence === RiverEssenceType.WaterElectric &&
      thisTileEssence === RiverEssenceType.Fire)
  ) {
    essence = RiverEssenceType.Golden;
  } else if (currentEssence && currentEssence !== RiverEssenceType.Mud) {
    essence = currentEssence;
  } else if (thisTileEssence) {
    essence = thisTileEssence;
  } else {
    essence = RiverEssenceType.Mud;
  }

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
