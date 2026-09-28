import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import api from "../services/api";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";


const Login = () => {
     const navigate = useNavigate();
    const { logIn } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    
    const [logInForm, setLogInForm] = useState({
        email:"",
        password:""
    });
    
     const handleChange = (e)=>{
        setLogInForm({
            ...logInForm,
            [e.target.name]:e.target.value
        })
     }
    const handleLogin = async (event) => {
      event.preventDefault();

      setErrorMessage("");

      try {
        const response = await api.post("/auth/login", logInForm);

        logIn(response.data.token);
        

        navigate("/dashboard");
      } catch (error) {
        setErrorMessage(error.response?.data?.msg || error.message);
      }
    };

    return (
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
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
            color="primary"
            gutterBottom
          >
            Military Asset Management
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            mb={4}
          >
            Login to your account
          </Typography>
          {errorMessage && (
            <Typography
              color="error"
              textAlign="center"
              sx={{
                mb: 2,
              }}
            >
              {errorMessage}
            </Typography>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={logInForm.email}
              onChange={(e) => handleChange(e)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={logInForm.password}
              onChange={(e) => handleChange(e)}
              margin="normal"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    );
};

export default Login;