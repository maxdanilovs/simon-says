import React from 'react';
import './style/app.scss';
import Game from './components/Game';

function App() {
  return (
    <div className="app">
    <h1>Simon Plays</h1>
      <Game />
    </div>
  );
}

export default App;
