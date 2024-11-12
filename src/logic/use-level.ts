import { useEffect, useState } from "react";
import { GameMap } from "./map";
import { chapter2 } from "../levels/chapter2";
import { chapter1 } from "../levels/chapter1";
import { Chapter, NewLevelFn } from "./level-types";
import { chapter3 } from "../levels/chapter3";

const chapters: Chapter[] = [chapter1, chapter2, chapter3];

export const useLevel = (newLevel: NewLevelFn) => {
  const [chapter, setChapter] = useState(0);
  const [level, setLevel] = useState(0);

  const clickLevel = (ch: number, lvl: number) => {
    const newLvl = chapters[ch].levels[lvl];
    console.log("click level", newLvl);
    const newMap = new GameMap();
    newMap.fromLevel(newLvl);

    newLevel(newMap, newLvl);
    setChapter(ch);
    setLevel(newLvl.id);
  };

  const nextLevel = () => {
    if (level + 1 < chapters[chapter].levels.length) {
      clickLevel(chapter, level + 1);
    } else if (chapter < chapters.length) {
      clickLevel(chapter + 1, 0);
    }
  };

  useEffect(() => clickLevel(chapter, level), []);

  return { chapters, chapter, level, clickLevel, nextLevel };
};
