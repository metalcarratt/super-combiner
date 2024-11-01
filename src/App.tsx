import './App.css'
import { Map } from './map';
import { Cards } from './ui/cards';
import { LevelSelector } from './level-selector';
import { Score } from './ui/score';
import { Goal } from './ui/goal';
import { LevelFinishedModal } from './ui/level-finished-modal';
import { useApp } from './app';
import { useLevel } from './use-level';

function App() {

  const {
    newLevel, 
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
    setShowLevelFinishedModal
  } = useApp();

  const {levels, level, clickLevel, nextLevel} = useLevel(newLevel);

  return (
    <div className="container" >
      <div className="column">
        <LevelSelector levels={levels} level={level} clickLevel={clickLevel} />
        <Score goal={goal} score={score} bloomScore={bloomScore} />
        <Map map={map} clickTile={clickTile} />

        <Cards cards={hand} selectedCard={selectedCard} selectCard={selectCard} />
      </div>
      <div className="column">
        <Goal goal={goal} levelFinished={levelFinished} />
      </div>

      {/* <NewLevelModal goal={goal} /> */}
      {showLevelFinishedModal &&
        <LevelFinishedModal 
          nextLevelFn={() => {setShowLevelFinishedModal(false); nextLevel();}} 
          keepPlayingFn={() => setShowLevelFinishedModal(false)}
        />}
    </div>
  )
}

export default App
