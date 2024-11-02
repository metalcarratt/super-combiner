import './App.css'
import { Map } from './map';
import { Cards } from './ui/cards';
import { LevelSelector } from './level-selector';
import { Score } from './ui/score';
import { Goal } from './ui/goal';
import { LevelFinishedModal } from './ui/level-finished-modal';
import { useApp } from './app';
import { useLevel } from './use-level';
import { HowToPlayModal } from './ui/howto-modal';
import { AudioPanel } from './ui/audio';

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
    setShowLevelFinishedModal,
    howtoModal,
    setHowtoModal
  } = useApp();

  const {levels, level, clickLevel, nextLevel} = useLevel(newLevel);

  return (
    <div className="container" >
      <h1 id="top">Super Combiner</h1>
      <AudioPanel />
      <LevelSelector levels={levels} level={level} clickLevel={clickLevel} />
      <div className="columns">
        <div className="column">
          <Score goal={goal} score={score} bloomScore={bloomScore} />
          <Map map={map} clickTile={clickTile} />

          <Cards cards={hand} selectedCard={selectedCard} selectCard={selectCard} />
        </div>
        <div className="column">
          <Goal goal={goal} levelFinished={levelFinished} />
          <a className="help" href="#" onClick={(e) => {setHowtoModal(true); e.preventDefault()}}>How to play?</a>
        </div>
      </div>

      {showLevelFinishedModal &&
        <LevelFinishedModal 
          nextLevelFn={() => {setShowLevelFinishedModal(false); nextLevel();}} 
          keepPlayingFn={() => setShowLevelFinishedModal(false)}
        />}

      {howtoModal &&
        <HowToPlayModal close={() => setHowtoModal(false)}/>
      }
    </div>
  )
}

export default App
