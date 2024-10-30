import { GoalType } from "./types";

export enum LevelFinished {
  Ongoing = "ongoing",
  Finished = "finished",
}

export const checkGoal = (goal: GoalType, score: number): LevelFinished => {
  if (goal.score && score >= goal.score) {
    return LevelFinished.Finished;
  }

  return LevelFinished.Ongoing;
};
