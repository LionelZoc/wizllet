import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useGetEvents, useSetEvent, useDeleteEvent } from "../db/events";
import QRCode from "react-qr-code";

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
        {events.map(({id, title, description, logo}, i) => (
            <div key={i}>
              <h3>{title}</h3>
              <div>{description}</div>
              <QRCode value={JSON.stringify({
                id,
                title,
                description,
                logo
              })} size={200} />
              <button onClick={() => deleteEvent(id)}>Delete</button>
            </div>
          ))}
    </Box>
  );
}

export default List;
