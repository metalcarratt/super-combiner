import { GoalType } from "../types";

export enum LevelFinished {
  Ongoing = "ongoing",
  Finished = "finished",
}

export const checkGoal = (
  goal: GoalType,
  score: number,
  bloomScore: number
): LevelFinished => {
  if (
    (goal.score && score >= goal.score) ||
    (goal.bloomScore && bloomScore >= goal.bloomScore)
  ) {
    return LevelFinished.Finished;
  }

  return LevelFinished.Ongoing;
};
