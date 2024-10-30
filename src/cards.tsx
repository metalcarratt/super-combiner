import { Card } from "./card";
import { CardsType, SelectedCardType } from "./types";
import './cards.css';

type Props = {
    cards: CardsType,
    selectedCard: SelectedCardType,
    selectCard: (index: number) => void
};

export const Cards = ({cards, selectedCard, selectCard}: Props) => {
    return (
        <div className="cards">
            {cards.map((card, index) => <Card tile={card} index={index} selected={index===selectedCard} selectCard={selectCard} />)}
        </div>
    );
}