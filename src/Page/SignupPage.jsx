import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { Link as RLink } from "react-router-dom";
import Image from "../images/cool-background.png";
import { signup } from "../Api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authSession } from "../Auth/AuthService";
import { useContext } from "react";
import { UserContext } from "../Auth/UserContext";

const theme = createTheme();

export default function SignupPage() {
  const { loginDetail } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await signup(data);
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
            <Typography component="h1" variant="h5">
              Sign-Up
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
                  minLength: 8,
                  maxLength: 20,
                })}
                autoComplete="current-password"
              />
              {errors.password?.type === "required" && (
                <span style={{ color: "red" }}>Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span style={{ color: "red" }}>
                  Password must be greater than 8 character
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span style={{ color: "red" }}>
                  Password must be less than 16 character
                </span>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Typography variant="body2">
                    <RLink to="/">{"Already have an Account? Sign In"}</RLink>
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
