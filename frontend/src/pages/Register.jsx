import { useState } from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from "../services/api";

import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const role = location.state?.role || "";

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    baseName: "",
  });

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    try {
      const response = await api.post("/auth/register", {
        ...registerForm,
        roleName: role,
      });

      

      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || "Registration failed");
    }
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
          textAlign="center"
          color="secondary.main"
          gutterBottom
        >
          Register
        </Typography>

        <Typography textAlign="center" color="secondary.main" mb={3}>
          Register as {role}
        </Typography>

        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={registerForm.name}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={registerForm.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleChange}
            margin="normal"
          />

          {role !== "admin" && (
            <TextField
              fullWidth
              label="Base Name"
              name="baseName"
              value={registerForm.baseName}
              onChange={handleChange}
              margin="normal"
            />
          )}
          {errorMessage && (
            <Typography color="error" textAlign="center" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 3,
            }}
          >
            Register
          </Button>
        </Box>

        <Box
          sx={{
            mt: 3,
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

export default Register;
