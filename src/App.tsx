import { useState } from 'react'
import './App.css'
import { Map } from './map';
import { Cards } from './cards';
import { CardsType, Coords, GoalType, MapType, SelectedCardType, SpecialType } from './types';
import { calculateLevels } from './tiles';
import { LevelSelector } from './level-selector';
import { checkGoal, LevelFinished } from './goals';
// import { Modal } from './modal';
// import { NewLevelModal } from './new-level-modal';

const t = () => ({ tile: 0, level: 0})

function App() {

  const [map, setMap] = useState<MapType>([[t(),t(),t()],[t(),t(),t()],[t(),t(),t()]]);
  const [specials, setSpecials] = useState<SpecialType[]>([]);

  const [cards, setCards] = useState<CardsType>([1,1,1]);

  const [selectedCard, setSelectedCard] = useState<SelectedCardType>(1);

  const [score, setScore] = useState<number>(0);

  const [goal, setGoal] = useState<GoalType>({});

  const [levelFinished, setLevelFinished] = useState<LevelFinished>(LevelFinished.Ongoing);

  const selectCard = (index: number) => {
    // console.log('select card', index);
    setSelectedCard(index);
  }

  const newLevel = (newMap: MapType, cards: CardsType, specials: SpecialType[], goal: GoalType) => {
    setMap(newMap);
    setSpecials(specials);
    setCards(cards);
    setSelectedCard(1);
    setScore(0);
    setGoal(goal);
    setLevelFinished(LevelFinished.Ongoing);
  }

  const clickTile = (coords: Coords) => {
    const mapCopy = [...map];
    const applyCard = cards[selectedCard];
    console.log('click tile', applyCard);
    if (applyCard && applyCard !== 0 && mapCopy[coords.y][coords.x].tile === 0) {
      
      mapCopy[coords.y][coords.x] = {tile: applyCard, level: 1};
      const {updatedMap, score} = calculateLevels(mapCopy);
      setMap(updatedMap);
      setScore(score);
      setLevelFinished(checkGoal(goal, score));
    }
  }

  return (
    <div className="container" >
      <div className="column">
        <LevelSelector newLevel={newLevel} />

        <p>Score: {score}</p>
        <Map map={map} clickTile={clickTile} specials={specials} />

        <Cards cards={cards} selectedCard={selectedCard} selectCard={selectCard} />
      </div>
      <div className="column">
        Goal: Get {goal.score} score {levelFinished === LevelFinished.Finished && <span>Level FInished</span>}
      </div>

      {/* <NewLevelModal goal={goal} /> */}
    </div>
  )
}

export default App
