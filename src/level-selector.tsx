import { LevelType } from "./use-level";

type Props = {
    levels: LevelType[],
    level: number,
    clickLevel: (lvl: LevelType) => void
}

export const LevelSelector = ({levels, level, clickLevel}: Props) => {

    return (
        <p className="levelSelector">
            {levels.map(lvl => 
                <span
                    className={`level ${lvl.name === level ? 'selected' : '' }`}
                    onClick={() => clickLevel(lvl)}
                >
                    {lvl.name}
                </span>
            )}
        </p>
    )
}