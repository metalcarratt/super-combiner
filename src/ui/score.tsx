import { GoalType } from "../types";

type Props = {
    goal: GoalType,
    score: number;
    bloomScore: number;
}

export const Score = ({goal, score, bloomScore}: Props) => {
    return (
        <>
        {goal.score && <p>Score: {score}</p>}
        {goal.bloomScore && <p>Bloom score: {bloomScore}</p>}
        </>
    )
}