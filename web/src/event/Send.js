import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { useGetEvents } from "../db/events";
import { useSetNotif } from "../db/notification";

const List = ({ onClose }) => {
  const [values, setValues] = useState({
    event: null,
    message: "",
    title: "",
    date: "",
  });

  const events = useGetEvents();
  const setNotif = useSetNotif();

  const handleChange = (field, value) => {
    setValues({...values, [field]: value})
  }

  const onSubmit = () => {
    setNotif(values).then(onClose);
  };

  return (
    <Box>
        <Button onClick={onClose}>Return</Button>

        <Select fullWidth onChange={(event) => handleChange("event", event.target.value)}>
          {events.map(({id, title}, i) => (
            <MenuItem value={id}>{title}</MenuItem>
          ))}
        </Select>
        <TextField label="Title" rows={4} fullWidth margin="dense" value={values.title} onChange={(event) => handleChange("title", event.target.value)} />
        <TextField label="Message" rows={4} fullWidth multiline margin="dense" value={values.message} onChange={(event) => handleChange("message", event.target.value)} />
        <TextField label="date" rows={4} fullWidth multiline margin="dense" value={values.date} onChange={(event) => handleChange("date", event.target.value)} />
        {/*<LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
           label="Date"
           value={values.date}
           onChange={(value) => handleChange("date", value)}
           renderInput={(params) => <TextField fullWidth margin="dense" {...params} />}
         />
        </LocalizationProvider>*/}
        <Button variant="contained" onClick={() => onSubmit(values)}>Submit</Button>
    </Box>
  );
}

export default List;
