import './App.css'
import { Map } from './map';
import { Cards } from './ui/cards';
import { LevelSelector } from './level-selector';
import { Score } from './ui/score';
import { Goal } from './ui/goal';
import { LevelFinishedModal } from './ui/level-finished-modal';
import { useApp } from './app';
import { HowToPlayModal } from './ui/howto-modal';
import { AudioPanel } from './ui/audio';
import { classForTile } from './tiles';
import { LevelFailedModal } from './ui/level-failed-modal';

function App() {

  const {
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
    availableCards,
    showLevelFailedModal,
    tryAgain,
    levels, currentLevel, clickLevel, nextLevel
  } = useApp();

  return (
    <div className="container" >
      <h1 id="top">Super Combiner</h1>
      <AudioPanel />
      <LevelSelector levels={levels} level={currentLevel} clickLevel={clickLevel} />
      <div className="columns">
        <div className="column">
          <Score goal={goal} score={score} bloomScore={bloomScore} />
          <Map map={map} clickTile={clickTile} />

          <Cards cards={hand} selectedCard={selectedCard} selectCard={selectCard} />
        </div>
        <div className="column">
          <Goal goal={goal} levelFinished={levelFinished} />

          <h2>Available tiles:</h2>
          <div className="availableCards">
            {availableCards?.map(card => <span className={classForTile(card)} />)}
          </div>

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

      {showLevelFailedModal && <LevelFailedModal tryAgainFn={tryAgain} />}
    </div>
  )
}

export default App
