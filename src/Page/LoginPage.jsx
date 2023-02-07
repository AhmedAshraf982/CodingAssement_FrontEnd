import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Image from "../images/cool-background.png";
import { Link as RLink, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "../Api/api.js";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { UserContext } from "../Auth/UserContext";
import { authSession } from "../Auth/AuthService";

const theme = createTheme();

export default function SignupPage() {
  const navigate = useNavigate();
  const { loginDetail } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      authSession(
        {
          id: res.data.data.user.id,
          userName: res.data.data.user.userName,
        },
        res.data.token
      );
      loginDetail({
        id: res.data.data.user.id,
        userName: res.data.data.user.userName,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      reset();
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign-In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="UserName"
                name="username"
                autoFocus
                {...register("userName", { required: true })}
              />
              {errors.userName && (
                <span style={{ color: "red" }}>Username is required</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                })}
                autoComplete="current-password"
              />
              {errors.password?.type === "required" && (
                <span style={{ color: "red" }}>Password is required</span>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Typography variant="body2">
                    <RLink to="signup">
                      {"Don't have an account? Sign Up"}
                    </RLink>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <ToastContainer />
      </Grid>
    </ThemeProvider>
  );
}
