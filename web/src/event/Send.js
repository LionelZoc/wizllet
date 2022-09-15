import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { useGetEvents } from "../db/events";

const List = ({ onClose }) => {
  const [values, setValues] = useState({
    event: null,
    message: "",
  });
  const events = useGetEvents();

  const handleChange = (field, value) => {
    setValues({...values, [field]: value})
  }

  const onSubmit = () => {

  };

  return (
    <Box>
        <Button onClick={onClose}>Return</Button>

        <Select fullWidth onChange={(event) => handleChange("event", event.target.value)}>
          {events.map(({id, title}, i) => (
            <MenuItem value={id}>{title}</MenuItem>
          ))}
        </Select>
        <TextField label="Message" rows={4} fullWidth multiline margin="dense" value={values.message} onChange={(event) => handleChange("message", event.target.value)} />
        <Button variant="contained" onClick={() => onSubmit(values)}>Submit</Button>
    </Box>
  );
}

export default List;
