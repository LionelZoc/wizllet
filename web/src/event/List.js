import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useGetEvents, useSetEvent, useDeleteEvent } from "../db/events";

const List = ({ onClose }) => {
  const events = useGetEvents();
  const setEvent = useSetEvent();
  const deleteEvent = useDeleteEvent();

  return (
    <Box>
        <Button onClick={onClose}>Return</Button>
        <Button onClick={() => {
          setEvent({
            title: "test",
            description: "coucou",
            qrcode: "https://test.com",
            logo: "https://test.com"
          });
        }}>Test add Event</Button>
        {events.map(({id, title, description}, i) => (
            <div key={i}>
              <h3>{title}</h3>
              <div>{description}</div>
              <button onClick={() => deleteEvent(id)}>Delete</button>
            </div>
          ))}
    </Box>
  );
}

export default List;
