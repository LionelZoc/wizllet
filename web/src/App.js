import React, { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import logo from './logo.svg';
import './App.css';

import Create from "./event/Create";
import ListEvent from  "./event/List";

const LIST = "list";
const FORM = "form";

const App = () => {
  const [tab, setTab] = useState(null);

  if (tab === LIST) return <ListEvent onClose={() => setTab(null)} />;
  if (tab === FORM) return <Create onClose={() => setTab(null)} />;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <List>
          <ListItemButton onClick={() => setTab(LIST)}>
           <ListItemText primary="List" />
         </ListItemButton>
         <ListItemButton onClick={() => setTab(FORM)}>
          <ListItemText primary="Form" />
        </ListItemButton>
        </List>
      </header>
    </div>
  );
}

export default App;
