import { classForTile } from "../tiles";
import { Coords, MapTileType } from "../types";
import "./tiles.css";

type Props = {
  tile: MapTileType;
  coords: Coords;
  clickTile: (coords: Coords) => void;
}

export const Tile = ({tile, coords, clickTile}: Props) => {
  const className =`tile ${classForTile(tile.tile)}`;
  return <div className={className} onClick={() => clickTile(coords)}>
    {tile.tile >= 0 ? tile.level : ''}
  </div>;
};
