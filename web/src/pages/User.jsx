import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

function User() {
  const { id } = useParams(); // ✅ Get user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setError("User not found or an error occurred.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">User Details</Typography>
      <Typography variant="h6">ID: {user.id}</Typography>
      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="h6">Full Name: {user.fullName}</Typography>
      <Typography variant="h6">Email: {user.email}</Typography>
    </Container>
  );
}

export default User;