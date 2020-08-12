import React, {useState} from 'react';
import './App.css';
import Producer from './Producer';
import Consumer from './Consumer';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <div className={`producer module-panel`}>
          <p>Producer</p>
          <p>What would you like to know?</p>
          <Producer/>
        </div>

        <div className={`consumer module-panel`}>
          <p>Consumer</p>
          <p>Pick the items you want to work on.</p>
          <Consumer/>
        </div>
      </div>
    </div>
  );
}

export default App;
