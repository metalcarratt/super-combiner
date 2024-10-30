import { classForTile } from "./tiles";
import { Coords, MapTileType, SpecialType } from "./types";

type Props = {
  tile: MapTileType;
  coords: Coords;
  clickTile: (coords: Coords) => void;
  special: SpecialType['type'] | undefined
}

export const Tile = ({tile, coords, clickTile, special}: Props) => {
  const className =`tile ${classForTile(tile.tile)}`;
  return <div className={className} onClick={() => clickTile(coords)}>
    {tile.level}
    {special && <span className="special">{special === 'man' ? '👨' : '👩'}</span>}
  </div>;
};
