import { classForTile } from "../logic/calculate-levels";
import { Coords } from "../types";
import "./tiles.css";
import { MapTileType, RiverEssenceType } from "../logic/map";
import { RiverOverlay, RiverType } from "../logic/level-types";

type Props = {
  tile: MapTileType;
  coords: Coords;
  clickTile: (coords: Coords) => void;
  riverOverlay?: RiverOverlay
}

const getRiverImage = (riverOverlay: RiverOverlay, riverEssence: RiverEssenceType) => {
  let imgName = '/super-combiner/river';
  if (riverOverlay.type === RiverType.ClockwiseBend) {
    imgName += '-bend-2';
  } else if (riverOverlay.type === RiverType.AntiClockwiseBend) {
    imgName += '-bend';
  }

  if (riverEssence === RiverEssenceType.Mud) {
    imgName += '-earth';
  } else if (riverEssence === RiverEssenceType.Water) {
    imgName += '-grass';
  } else if (riverEssence === RiverEssenceType.Electric) {
    imgName += '-lightning';
  } else if (riverEssence === RiverEssenceType.Fire) {
    imgName += '-fire';
  } else if (riverEssence === RiverEssenceType.ElectricFire) {
    imgName += '-fire-lightning';
  } else if (riverEssence === RiverEssenceType.FireWater) {
    imgName += '-grass-fire';
  } else if (riverEssence === RiverEssenceType.WaterElectric) {
    imgName += '-lightning-water';
  } else if (riverEssence === RiverEssenceType.Golden) {
    imgName += '-gold';
  }

  return imgName += '.png';
}

export const Tile = ({tile, coords, clickTile, riverOverlay}: Props) => {
  const className =`tile ${classForTile(tile.tile)} ${riverOverlay?.type}`;
  console.log('draw tile', tile.riverType);
  return <div className={className} onClick={() => clickTile(coords)}>
    { riverOverlay && tile.riverType && 
      <img className={`river ${riverOverlay.direction}`} src={getRiverImage(riverOverlay, tile.riverType)} />
    }
    <span className="tileLevel">{tile.tile >= 0 ? tile.level : ''}</span>
  </div>;
};
