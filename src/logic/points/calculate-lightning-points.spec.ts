import { GameMap } from "../map";
import {
  scoreForDarkLightning,
  scoreForLightning,
} from "./calculate-lightning-points";
import { e, i, l } from "./spec-util";

describe("score for lightning", () => {
  it("scores 1 point when alone", () => {
    const map = new GameMap([
      [e, e, e],
      [e, l, e],
      [e, e, e],
    ]);
    const score = scoreForLightning(map, { x: 1, y: 1 });

    expect(score).toBe(1);
  });

  it("scores 1 point for each diagonal", () => {
    const map = new GameMap([
      [l, e, l],
      [e, l, e],
      [l, e, l],
    ]);
    const score = scoreForLightning(map, { x: 1, y: 1 });

    expect(score).toBe(5);
  });

  it("looses 1 point for each adjacent", () => {
    const map = new GameMap([
      [l, l, e],
      [e, l, l],
      [l, l, e],
    ]);
    const score = scoreForLightning(map, { x: 1, y: 1 });

    expect(score).toBe(0);
  });

  it("is not affected by dark lightning", () => {
    const map = new GameMap([
      [l, i, l],
      [i, l, e],
      [l, i, l],
    ]);

    const score = scoreForLightning(map, { x: 1, y: 1 });
    expect(score).toBe(5);

    const score2 = scoreForDarkLightning(map, { x: 0, y: 1 });
    expect(score2).toBe(3);
  });
});
