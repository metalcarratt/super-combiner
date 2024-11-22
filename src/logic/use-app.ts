import { useState } from "react";
import { CardsType, Coords, GoalType, SelectedCardType } from "../types";
import { checkGoal, LevelFinished } from "./goals";
import { calculateLevels } from "./points/calculate-points";
import { useLevel } from "./use-level";
import { GameMap, TileType } from "./map";
import { LevelType } from "./level-types";

export const useApp = () => {
  const [map, setMap] = useState<GameMap>(new GameMap());

  const [level, setLevel] = useState<LevelType | undefined>();
  const [hand, setHand] = useState<CardsType>([]);

  const [selectedCard, setSelectedCard] = useState<SelectedCardType>(0);

  const [score, setScore] = useState<number>(0);
  const [bloomScore, setBloomScore] = useState<number>(0);

  const [goal, setGoal] = useState<GoalType>({});

  const [levelFinished, setLevelFinished] = useState<LevelFinished>(
    LevelFinished.Ongoing
  );

  const [showLevelFinishedModal, setShowLevelFinishedModal] =
    useState<boolean>(false);
  const [howtoModal, setHowtoModal] = useState<boolean>(false);

  const [showLevelFailedModal, setShowLevelFailedModal] =
    useState<Boolean>(false);

  const selectCard = (index: number) => {
    // console.log('select card', index);
    setSelectedCard(index);
  };

  const randomCard = (level: LevelType) =>
    level.cards[Math.floor(Math.random() * level.cards.length)];

  const newHand = (level: LevelType) => {
    let newHand = [];
    while (newHand.length < level.handSize) {
      newHand.push(randomCard(level));
    }
    console.log("new hand", newHand);
    setHand(newHand);
  };

  const newCardInHand = () => {
    const handCopy = [...hand];
    handCopy.splice(selectedCard, 1);
    level && handCopy.push(randomCard(level));
    // console.log('new card in hand', handCopy);
    setHand(handCopy);
  };

  const newLevel = (newMap: GameMap, level: LevelType) => {
    console.log("new level", newMap);
    setMap(newMap);
    setLevel(level);
    newHand(level);
    setSelectedCard(0);
    setScore(0);
    setGoal(level.goal);
    setLevelFinished(LevelFinished.Ongoing);
  };

  const clickTile = (coords: Coords) => {
    const mapCopy = map.clone();
    const applyCard = hand[selectedCard];
    // console.log('click tile', applyCard);
    if (mapCopy.getTile(coords).tile === TileType.Earth && level) {
      mapCopy.setTile(coords, { tile: applyCard, level: 1 });
      const { updatedMap, score, bloomScore } = calculateLevels(mapCopy, level);
      newCardInHand();
      setMap(updatedMap);
      setScore(score);
      setBloomScore(bloomScore);
      // console.log('bloom score', bloomScore);
      const isFinished = checkGoal(goal, score, bloomScore);
      setLevelFinished(isFinished);
      if (
        isFinished === LevelFinished.Finished &&
        isFinished !== levelFinished
      ) {
        setShowLevelFinishedModal(true);
      } else {
        if (!map.findTile((tile) => tile.tile === TileType.Earth)) {
          setShowLevelFailedModal(true);
        }
      }
    }
  };

  const {
    chapters,
    chapter,
    level: currentLevel,
    clickLevel,
    nextLevel,
  } = useLevel(newLevel);

  const tryAgain = () => {
    setShowLevelFailedModal(false);
    clickLevel(chapter, currentLevel);
  };

  const closeLevelFailedModal = () => {
    setShowLevelFailedModal(false);
  };

  return {
    levelSelector: {
      chapters,
      chapter,
      level: currentLevel,
      clickLevel,
    },
    goal,
    score,
    bloomScore,
    map,
    clickTile,
    hand,
    selectedCard,
    selectCard,
    levelFinished,
    showLevelFinishedModal,
    setShowLevelFinishedModal,
    howtoModal,
    setHowtoModal,
    availableCards: level?.cards,
    showLevelFailedModal,
    tryAgain,
    currentLevel,
    clickLevel,
    nextLevel,
    riverOverlays: level?.riverOverlays,
    closeLevelFailedModal,
    level,
    chapters,
    chapter,
    bg: chapters[chapter].background,
  };
};
