import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useEventsManager } from "../db/events";

const List = ({ onClose }) => {
  const events = useEventsManager();

  return (
    <Box>
        <Button onClick={onClose}>Return</Button>
        <p>
          {events.map(({title, description}) => (
            <>
              <h3>{title}</h3>
              <div>{description}</div>
            </>
          ))}
        </p>
    </Box>
  );
}

export default List;
