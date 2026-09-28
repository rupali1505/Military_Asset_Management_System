import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import armyImg from "../assets/army.jpg"

import { useNavigate, Navigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

const Home = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRegister = (role) => {
    navigate("/register", {
      state: {
        role: role,
      },
    });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: {
            xs: 3,
            sm: 5,
          },
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            textAlign: "center",
          }}
          color="secondary.main"
          gutterBottom
        >
          Military Asset Management
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 4,
          }}
          color="secondary.main"
        >
          Select your role to register
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 3 }}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            onClick={() => handleRegister("admin")}
            sx={{
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Box
              component="img"
              src={armyImg}
              alt="Admin"
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                mx: "auto",
              }}
            />

            <Typography
              variant="h6"
              fontWeight={600}
              color="secondary.main"
              sx={{ mt: 1 }}
            >
              Admin
            </Typography>
          </Box>

          <Box
            onClick={() => handleRegister("logistics_officer")}
            sx={{
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Box
              component="img"
              src={armyImg}
              alt="Logistics Officer"
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                mx: "auto",
              }}
            />

            <Typography
              variant="h6"
              fontWeight={600}
              color="secondary.main"
              sx={{ mt: 1 }}
            >
              Logistics Officer
            </Typography>
          </Box>

          <Box
            onClick={() => handleRegister("base_commander")}
            sx={{
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Box
              component="img"
              src={armyImg}
              alt="Base Commander"
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                mx: "auto",
              }}
            />

            <Typography
              variant="h6"
              fontWeight={600}
              color="secondary.main"
              sx={{ mt: 1 }}
            >
              Base Commander
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="secondary.main">
            Already registered?
          </Typography>

          <Button
            onClick={() => navigate("/login")}
            sx={{
              color: "secondary.main",
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
