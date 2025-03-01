import { Typography, Container } from "@mui/material";

function Home() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Welcome to User Management System
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Use the navigation bar to manage users.
      </Typography>
    </Container>
  );
}

export default Home;