import { GameMap } from "../map";
import { scoreForGrass } from "./calculate-grass-points";
import { d, e, g } from "./spec-util";

describe("score for grass", () => {
  it("scores 1 point when alone", () => {
    const map = new GameMap([
      [e, e, e],
      [e, g, e],
      [e, e, e],
    ]);
    const score = scoreForGrass(map, { x: 1, y: 1 });

    expect(score).toBe(1);
  });

  it("scores 1 point for each adjacent", () => {
    const map = new GameMap([
      [e, g, e],
      [g, g, g],
      [e, g, e],
    ]);
    const score = scoreForGrass(map, { x: 1, y: 1 });

    expect(score).toBe(5);
  });

  it("scores no points for each diagonal", () => {
    const map = new GameMap([
      [g, e, g],
      [e, g, e],
      [g, e, g],
    ]);
    const score = scoreForGrass(map, { x: 1, y: 1 });

    expect(score).toBe(1);
  });
  it("scores 0 points for dark grass", () => {
    const map = new GameMap([
      [g, g, g],
      [d, g, g],
      [g, g, g],
    ]);
    const score = scoreForGrass(map, { x: 1, y: 1 });

    expect(score).toBe(0);
  });

  it("scores 1 point for each far adjacent", () => {
    const map = new GameMap([
      [e, e, g, e, e],
      [e, e, g, e, e],
      [g, g, g, g, g],
      [e, e, g, e, e],
      [e, e, g, e, e],
    ]);
    const score = scoreForGrass(map, { x: 2, y: 2 });
    const score2 = scoreForGrass(map, { x: 0, y: 2 });

    expect(score).toBe(9);
    expect(score2).toBe(5);
  });
});
