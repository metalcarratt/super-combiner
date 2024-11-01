import { Tile } from "./ui/tile";
import { Coords, MapType } from "./types";

type Props = {
    map: MapType;
    clickTile: (coords: Coords) => void,
};

export const Map = ({map, clickTile}: Props) => {
    return (
        <table cellSpacing="0" cellPadding="0" border={0}>
        {map.map((row, y) => (
          <tr>
            {row.map((cell, x) => (
                <td>
                    <Tile tile={cell} coords={{x, y}} clickTile={clickTile} />
                </td>
            ))}
          </tr>
        ))}
      </table>
    );
}