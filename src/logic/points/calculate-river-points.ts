import { Coords } from "../../types";
import { LevelType, RiverOverlay } from "../level-types";
import { GameMap, MapTileType, RiverEssenceType, TileType } from "../map";

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

export const calculateRivers = (map: GameMap, level: LevelType) => {
  const riverSources = level.riverOverlays?.filter((overlay) => overlay.source);
  riverSources?.forEach((source) =>
    traverseRiver(map, source, level, undefined)
  );
  //   console.log("tiles with river type", riverSources);
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

export const scoreForRiver = (cell: MapTileType, level: number) => {
  return Math.floor(level * essenceScore(cell.riverType));
};

export const scoreForLake = (map: GameMap, coords: Coords, level: number) => {
  //   console.log("SCORE FOR LAKE");
  let newLevel = level;
  const lakes = map
    .surroundingCoords(coords)
    .filter((coord) => {
      const tile = coord && map.getTile(coord);
      return tile?.tile === TileType.Dead && tile?.riverType;
    })
    .map((coord) => (coord ? map.getTile(coord) : undefined));
  //   console.log("lakes", lakes);
  lakes.forEach((lake) => {
    if (lake) {
      //   console.log("level", newLevel);
      const escore = essenceScore(lake.riverType);
      //   console.log("escore", escore);
      newLevel = Math.floor(newLevel * escore);
      //   console.log("level2", newLevel);
    }
  });
  return newLevel;
};
