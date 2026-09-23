import {
  useState,
} from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { useNavigate } from "react-router-dom";

const API_URL =
  "http://localhost:5000/api/auth/login";

function LoginPage() {
  const navigate = useNavigate();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Login failed."
        );
      }

      localStorage.setItem(
        "fieldNationUser",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "fieldNationAuthenticated",
        "true"
      );

      navigate("/locations");
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f6f8",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,

          borderRadius: 3,

          border:
            "1px solid #e5e7eb",

          p: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          Welcome back
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#6b7280",
            mt: 1,
            mb: 3,
          }}
        >
          Sign in to your FieldNation account.
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
            }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleLogin}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            autoComplete="email"
            sx={{
              mb: 2,
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword(
                        (prev) =>
                          !prev
                      )
                    }
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              height: 46,

              backgroundColor:
                "#ff6a00",

              textTransform:
                "none",

              fontWeight: 600,

              borderRadius: 1.5,

              "&:hover": {
                backgroundColor:
                  "#e65f00",
              },
            }}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;