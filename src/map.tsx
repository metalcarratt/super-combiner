import { Tile } from "./tile";
import { Coords, MapType, SpecialType } from "./types";

type Props = {
    map: MapType;
    clickTile: (coords: Coords) => void,
    specials: SpecialType[]
};

export const Map = ({map, clickTile, specials}: Props) => {
    return (
        <table cellSpacing="0" cellPadding="0" border={0}>
        {map.map((row, y) => (
          <tr>
            {row.map((cell, x) => (
                <td>
                    <Tile tile={cell} coords={{x, y}} clickTile={clickTile} special={specials.find(sp => sp.coord.x === x && sp.coord.y === y)?.type} />
                </td>
            ))}
          </tr>
        ))}
      </table>
    );
}