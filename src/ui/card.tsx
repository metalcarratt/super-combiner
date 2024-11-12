import { classForTile } from "../logic/calculate-levels";
import { TileType } from "../logic/map";

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
            
        </div>
    );
}