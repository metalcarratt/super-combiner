import { LevelFinished } from "../goals";
import { GoalType } from "../types";

type Props = {
    goal: GoalType;
    levelFinished: LevelFinished
}

export const Goal = ({goal, levelFinished}: Props) => {
    return (
        <>
            Goal:
            {goal.score && <span>Get {goal.score} score</span>}
            {goal.bloomScore && <span>Get {goal.bloomScore} on blooms</span>}
            {levelFinished === LevelFinished.Finished && <span className="finished">Level Finished</span>}
        </>
    )
}