import React, { useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { useEventsManager } from "./db/events";

function App() {
  const events = useEventsManager();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {events.map(({title, description}) => (
            <>
              <h3>{title}</h3>
              <div>{description}</div>
            </>
          ))}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
