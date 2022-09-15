import React, { useState } from "react";
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useGetEvents, useSetEvent, useDeleteEvent } from "../db/events";

const Create = ({ onClose }) => {
  const setEvent = useSetEvent();
  const [values, setValues] = useState({
    title: "",
    description: "",
    logo: "",
    qrcode: "",
  })

  const handleChange = (field, value) => {
    setValues({...values, [field]: value});
  }

  const onSubmit = () => {
    setEvent(values)
      .then(onClose);
  }

  return (
    <Box display="flex" flexDirection="column">
      <Button onClick={onClose}>Return</Button>
      <TextField label="Title" margin="dense" value={values.title} onChange={(event) => handleChange("title", event.target.value)} />
      <TextField label="Description" margin="dense" value={values.description} onChange={(event) => handleChange("description", event.target.value)} />
      <TextField label="Logo" margin="dense" value={values.logo} onChange={(event) => handleChange("logo", event.target.value)} />
      <Button variant="contained" onClick={() => onSubmit(values)}>Submit</Button>
    </Box>
  );
}

export default Create;
