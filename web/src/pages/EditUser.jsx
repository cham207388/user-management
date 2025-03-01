import { useEffect, useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({ username: "", fullName: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then((response) => setUser(response.data))
      .catch(error => console.error("Error fetching user:", error));
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/users/${id}`, user)
      .then(() => navigate("/users"))
      .catch(error => console.error("Error updating user:", error));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Edit User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" name="username" fullWidth margin="normal" value={user.username} onChange={handleChange} />
        <TextField label="Full Name" name="fullName" fullWidth margin="normal" value={user.fullName} onChange={handleChange} />
        <TextField label="Email" name="email" fullWidth margin="normal" value={user.email} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Update</Button>
      </form>
    </Container>
  );
}

export default EditUser;