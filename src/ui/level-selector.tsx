import { useState } from "react";
import { Chapter } from "../logic/level-types"

type LevelSelectorViewModel = {
    chapters: Chapter[],
    chapter: number,
    level: number,
    clickLevel: (ch: number, lvl: number) => void
}

export const LevelSelector = ({model}: {model: LevelSelectorViewModel}) => {
    const [viewChapter, setViewChapter] = useState(model.chapter);
    const currentChapter = () => model.chapters[viewChapter];

    const prevChapter = () => {
        setViewChapter(viewChapter-1);
    }

    const nextChapter = () => {
        setViewChapter(viewChapter+1);
    }
    return (
        <p className="levelSelector">
            <div className="chapter">
                <label>
                    <span className="name">{currentChapter().name}</span>
                    {viewChapter > 0 && <span onClick={prevChapter} className="arrow">⏶</span>}
                    {viewChapter < model.chapters.length - 1 && <span onClick={nextChapter} className="arrow">⏷</span> }
                </label>{
                currentChapter().levels.map(lvl => 
                    <span
                        className={`level ${viewChapter === model.chapter && lvl.id === model.level ? 'selected' : '' }`}
                        onClick={() => model.clickLevel(viewChapter, lvl.id)}
                    >
                        {lvl.id + 1}
                    </span>
                )}</div>
        </p>
    )
}