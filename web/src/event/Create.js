import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Create = ({ onClose }) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    logo: "",
    qrcode: "",
  })

  const handleChange = (field, value) => {
    setValues({...values, [field]: value});
  }

  return (
    <Box>
      <Button onClick={onClose}>Return</Button>
      <TextField value={values.title} onChange={(event) => handleChange("title", event.target.value)} />
      <TextField value={values.description} onChange={(event) => handleChange("description", event.target.value)} />
    </Box>
  );
}

export default Create;
