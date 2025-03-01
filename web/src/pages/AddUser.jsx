import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [user, setUser] = useState({ username: "", fullName: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/users", user)
      .then(() => navigate("/users"))
      .catch(error => console.error("Error adding user:", error));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Add User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" name="username" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Full Name" name="fullName" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  );
}

export default AddUser;