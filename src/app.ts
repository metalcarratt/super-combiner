import { useState } from "react";
import {
  CardsType,
  Coords,
  GoalType,
  MapType,
  SelectedCardType,
  TileType,
} from "./types";
import { checkGoal, LevelFinished } from "./goals";
import { calculateLevels } from "./tiles";
import { LevelType, useLevel } from "./use-level";

const t = () => ({ tile: 0, level: 0 });

export const useApp = () => {
  const [map, setMap] = useState<MapType>([
    [t(), t(), t()],
    [t(), t(), t()],
    [t(), t(), t()],
  ]);

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

  const newLevel = (newMap: MapType, level: LevelType) => {
    setMap(newMap);
    setLevel(level);
    newHand(level);
    setSelectedCard(0);
    setScore(0);
    setGoal(level.goal);
    setLevelFinished(LevelFinished.Ongoing);
  };

  const clickTile = (coords: Coords) => {
    const mapCopy = [...map];
    const applyCard = hand[selectedCard];
    // console.log('click tile', applyCard);
    if (mapCopy[coords.y][coords.x].tile === TileType.Earth) {
      mapCopy[coords.y][coords.x] = { tile: applyCard, level: 1 };
      const { updatedMap, score, bloomScore } = calculateLevels(mapCopy);
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
        if (!map.flat().find((tile) => tile.tile === TileType.Earth)) {
          setShowLevelFailedModal(true);
        }
      }
    }
  };

  const {
    levels,
    level: currentLevel,
    clickLevel,
    nextLevel,
  } = useLevel(newLevel);

  const tryAgain = () => {
    setShowLevelFailedModal(false);
    clickLevel(levels[currentLevel - 1]);
  };

  return {
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
    levels,
    currentLevel,
    clickLevel,
    nextLevel,
  };
};
