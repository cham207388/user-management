import { useEffect, useState } from "react";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error("Error deleting user:", error));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button component={Link} to={`/edit-user/${user.id}`} color="primary">Edit</Button>
                <Button onClick={() => handleDelete(user.id)} color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Users;