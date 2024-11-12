import { LevelFinished } from "../logic/goals";
import { GoalType } from "../types";

type Props = {
    goal: GoalType;
    levelFinished: LevelFinished,
    score?: number,
    bloomScore?: number
}

export const Goal = ({goal, levelFinished, score, bloomScore}: Props) => {
    return (
        <>
            {goal.score && <>
                <p>Goal: Get {goal.score} score</p>
                <p>Score: {score}</p>
            </>}
            {goal.bloomScore && <>
                <p>Goal: Get {goal.bloomScore} on blooms</p>
                <p>Bloom score: {bloomScore}</p>
            </>}
            {levelFinished === LevelFinished.Finished && <span className="finished">Level Finished</span>}
        </>
    )
}