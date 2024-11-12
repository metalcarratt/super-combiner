import './App.css'
import { Map } from './ui/map';
import { Cards } from './ui/cards';
import { LevelSelector } from './ui/level-selector';
import { Goal } from './ui/goal';
import { LevelFinishedModal } from './ui/level-finished-modal';
import { useApp } from './logic/use-app';
import { HowToPlayModal } from './ui/howto-modal';
import { AudioPanel } from './ui/audio';
import { classForTile } from './logic/calculate-levels';
import { LevelFailedModal } from './ui/level-failed-modal';

function App() {

  const {
    levelSelector,
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
    nextLevel,
    riverOverlays,
    closeLevelFailedModal,
    level,
    bg
  } = useApp();

  return (
    <div className={`background ${bg}`}>
    <div className="container" >
      <h1 id="top">Super Combiner</h1>
      <AudioPanel />
      <LevelSelector model={levelSelector} />
      <div className="title">
        <h2>{level?.humanName}</h2>
        <p>{level?.hint}</p>
      </div>
      <div className="columns">
        <div className="column">
          <Map map={map} clickTile={clickTile} riverOverlays={riverOverlays}/>

          <Cards cards={hand} selectedCard={selectedCard} selectCard={selectCard} />
        </div>
        <div className="column">
          <Goal goal={goal} score={score} bloomScore={bloomScore} levelFinished={levelFinished} />

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

      {showLevelFailedModal && <LevelFailedModal tryAgainFn={tryAgain} closeFn={closeLevelFailedModal}/>}
    </div>
    </div>
  )
}

export default App
