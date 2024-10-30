import { classForTile } from "./tiles";
import { TileType } from "./types";

type Props = {
    tile: TileType;
    index: number;
    selected: boolean;
    selectCard: (index: number) => void
}

export const Card = ({tile, index, selected, selectCard}: Props) => {
// console.log('card selected?', selected);
    const className = `card ${classForTile(tile)} ${selected ? 'selected' : ''}`;

    return (
        <div className={className} onClick={() => selectCard(index)}>
            1
        </div>
    );
}