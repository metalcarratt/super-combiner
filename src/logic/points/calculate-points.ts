import { Coords } from "../../types";
import { LevelType } from "../level-types";
import { GameMap, RiverEssenceType, TileType } from "../map";
import { scoreForBloom } from "./calculate-bloom-points";
import { scoreForFire } from "./calculate-fire-points";
import { scoreForDarkGrass, scoreForGrass } from "./calculate-grass-points";
import {
  scoreForDarkLightning,
  scoreForLightning,
} from "./calculate-lightning-points";
import {
  calculateRivers,
  scoreForLake,
  scoreForRiver,
} from "./calculate-river-points";

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
    case TileType.DarkGrass:
      return "darkGrass";
    case TileType.DarkLightning:
      return "darkLightning";
    case TileType.DarkFire:
      return "darkFire";
    case TileType.Dead:
      if (essence) {
        return `dead ${essence}`;
      }
      return "dead";
    case TileType.Bloom:
      return "bloom";
  }
};

const pointsForTileType = (
  map: GameMap,
  tileType: TileType,
  coords: Coords
) => {
  switch (tileType) {
    case TileType.Grass:
      return scoreForGrass(map, coords);
    case TileType.Lightning:
      return scoreForLightning(map, coords);
    case TileType.Fire:
      return scoreForFire(map, coords);
    case TileType.DarkGrass:
      return scoreForDarkGrass(map, coords);
    case TileType.DarkLightning:
      return scoreForDarkLightning(map, coords);
    default:
      return 0;
  }
};

export const calculateLevels = (map: GameMap, level: LevelType) => {
  let score = 0;
  const blooms: Coords[] = [];
  calculateRivers(map, level);
  const updatedMap = map.mapEach((coords, cell) => {
    let level = pointsForTileType(map, cell.tile, coords);

    if (cell.tile === TileType.Bloom) {
      blooms.push(coords);
    }
    level = scoreForRiver(cell, level);
    level = scoreForLake(map, coords, level);
    score += level;
    return { ...cell, level };
  });

  let bloomScore = 0;
  blooms.forEach((bloom) => {
    const level = scoreForBloom(new GameMap(updatedMap), bloom);
    score += level;
    updatedMap[bloom.y][bloom.x].level = level;
    bloomScore += level;
  });

  return { updatedMap: new GameMap(updatedMap), score, bloomScore };
};
