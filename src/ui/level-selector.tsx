import { Chapter } from "../logic/level-types"

type LevelSelectorViewModel = {
    chapters: Chapter[],
    chapter: number,
    level: number,
    clickLevel: (ch: number, lvl: number) => void
}

export const LevelSelector = ({model}: {model: LevelSelectorViewModel}) => {

    return (
        <p className="levelSelector">
            {model.chapters.map((ch, chIndex) => 
            <div className="chapter">
                <label>{ch.name}</label>{
                ch.levels.map(lvl => 
                    <span
                        className={`level ${chIndex === model.chapter && lvl.id === model.level ? 'selected' : '' }`}
                        onClick={() => model.clickLevel(chIndex, lvl.id)}
                    >
                        {lvl.id + 1}
                    </span>
                )}</div>
            )}
        </p>
    )
}