import React, { useState, useEffect } from 'react';
import SimonButton from './SimonButton';
import Modal from './Modal';
import '../style/game.scss';

function Game() {
  const [activeId, setActiveId] = useState(4);
  const [sequence, setSequence] = useState([]);
  const [attempt, setAttempt] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOn, setGameOn] = useState(false);

  useEffect(() => {
    nextStep();
    clearTimeout(time);
  }, [sequence])

  useEffect(() => {
    if (step > 0 && step === sequence.length) {
      setClickable(true);
      setStep(0);
    }
  }, [step, clickable])

  useEffect(() => {
    let correct = true;
    if (attempt.length <= 0) {
      return;
    }
    for (var i = 0; i < attempt.length; i++) {
      if (attempt[i] !== sequence[i]) {
        setEndGame(true);
        correct = false;
      }
    }
    if (attempt.length === sequence.length && correct) {
      addRandomNumber();
      setAttempt([]);
    }
  }, [attempt])

  useEffect(() => {
    if (endGame) {
    }
  }, [endGame])

  const cleanStart = () => {
    clearTimeout(time);
    setAttempt([]);
    setActiveId(4);
    setEndGame(false);
    setClickable(false);
    setStep(0);
    setGameOn(false);
    // setSequence([]);
  }

  const addRandomNumber = () => {
    setTimeout(() => {
      const rand = Math.floor(Math.random() * 4);
      setSequence(sequence => [...sequence, rand]);
      console.log("randnum")
    }, 500)
  }

  const nextStep = () => {
    setClickable(false);
    for (var i = 0; i < sequence.length; i++) {
      (function (i) {
        setTime(setTimeout(function () {
          setActiveId(sequence[i]);
          setStep(step => step + 1);
        }, 1000*i));
      })(i);
    };
  }

  const handleAttempt = (id) => {
    setAttempt(attempt => [...attempt, id]);
  }

  const startGame = () => {
    setSequence([]);
    setGameOn(true);
    addRandomNumber();
  }

  const handleClose = () => {
    cleanStart();
  }

  return (
    <div className="game">
      <Modal active={endGame} close={handleClose} attempts={sequence.length - 1} />
      <div className="game-container">
        <button disabled={gameOn} className="start-button" onClick={startGame}>New Game</button>
        <p className="level">{sequence.length}</p>
        <div className="row-1">
          <SimonButton clickable={clickable} handleAttempt={handleAttempt}
            activeId={activeId} step={step} id={0} color="green" />
          <SimonButton clickable={clickable} handleAttempt={handleAttempt}
            activeId={activeId} step={step} id={1} color="yellow" />
        </div>
        <div className="row-2">
          <SimonButton clickable={clickable} handleAttempt={handleAttempt}
            activeId={activeId} step={step} id={2} color="red" />
          <SimonButton clickable={clickable} handleAttempt={handleAttempt}
            activeId={activeId} step={step} id={3} color="blue" />
        </div>
      </div>
    </div>
  )
}

export default Game;
