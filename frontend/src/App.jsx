import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/logIn";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";
import Expenditures from "./pages/Expenditures";
import Navbar from "./layouts/Navbar";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { useAuth } from "./context/useAuth";
import PublicRoute from "./routes/PublicRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4b5320",
    },
    secondary: {
      main: "#556B2F",
    },
    background: {
      default: "#BDB76B",
    },
  },
});

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchases"
          element={
            <ProtectedRoute>
              <Purchases />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transfers"
          element={
            <ProtectedRoute>
              <Transfers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenditures"
          element={
            <ProtectedRoute>
              <Expenditures />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
