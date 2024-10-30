import { useEffect, useState } from "react"
import { CardsType, GoalType, MapType, SpecialType } from "./types";

const t = () => ({ tile: 0, level: 0})

type LevelType = {
    name: number,
    size: number,
    cards: CardsType,
    specials: SpecialType[],
    goal: GoalType;
}

const levels: LevelType[] = [{
    name: 1,
    size: 3,
    cards: [1,1,1],
    specials: [],
    goal: {
        score: 12
    }
}, {
    name: 2,
    size: 3,
    cards: [2,2,2],
    specials: [],
    goal: {
        score: 12
    }
}, {
    name: 3,
    size: 3,
    cards: [1,1,2],
    specials: [{
        coord: {x: 2, y: 2},
        type: 'man'
    }],
    goal: {}
}];

type Props = {
    newLevel: (newMap: MapType, cards: CardsType, specials: SpecialType[], goal: GoalType) => void
}

export const LevelSelector = ({newLevel}: Props) => {
    const [level, setLevel] = useState(1);

    const clickLevel = (lvl: LevelType) => {
        const newMap: MapType = [];
        for (let y = 0; y < lvl.size; y++) {
            newMap.push([]);
            for (let x = 0; x < lvl.size; x++) {
                newMap[y].push(t());
            }
        }
        
        newLevel(newMap, lvl.cards, lvl.specials, lvl.goal);
        setLevel(lvl.name);
    }

    useEffect(
        () => clickLevel(levels[0]),
        []
    );

    return (
        <p className="levelSelector">
            {levels.map(lvl => 
                <span
                    className={`level ${lvl.name === level }`}
                    onClick={() => clickLevel(lvl)}
                >
                    {lvl.name}
                </span>
            )}
        </p>
    )
}