import { Tile } from "./tile";
import { Coords } from "../types";
import { GameMap } from "../logic/map";
import { RiverOverlay } from "../logic/level-types";

type Props = {
    map: GameMap;
    clickTile: (coords: Coords) => void,
    riverOverlays?: RiverOverlay[]
};

export const Map = ({map, clickTile, riverOverlays}: Props) => {
    return (
        <table cellSpacing="0" cellPadding="0" border={0}>
        {map.getMap().map((row, y) => (
          <tr>
            {row.map((cell, x) => (
                <td>
                    <Tile tile={cell} coords={{x, y}} clickTile={clickTile} riverOverlay={riverOverlays?.find(overlay => overlay.coords.x === x && overlay.coords.y === y)} />
                </td>
            ))}
          </tr>
        ))}
      </table>
    );
}