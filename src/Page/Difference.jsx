import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "react-toastify/dist/ReactToastify.css";
import { getDiffernce } from "../Api/api.js";
import { Box, Container } from "@mui/system";
import { Grid, Paper, Typography } from "@mui/material";
const Difference = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getDiffernce();

        setData(res.data.data);
      } catch (err) {
        toast.error(err.response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      }
    };
    fetch();
  }, []);
  return (
    <>
      <div className="App">
        <Box sx={{ display: "flex" }}>
          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 240,
                  }}
                  style={{ backgroundColor: "#362FD9" }}
                  elevation={2}
                >
                  <Typography variant="h3">
                    Difference is :{" "}
                    {data.difference < 0 ? (
                      <span style={{ fontSize: 12 }}>
                        <ArrowDownwardIcon
                          fontSize="large"
                          style={{ color: "green" }}
                        />{" "}
                        {Math.abs(+data.difference)}%
                      </span>
                    ) : (
                      <span>
                        <ArrowUpwardIcon style={{ color: "red" }} />
                        {data.difference} %
                      </span>
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 240,
                  }}
                  style={{ backgroundColor: "#362FD9" }}
                  elevation={2}
                >
                  <Typography variant="h4">Previous Month Rate is :</Typography>
                  <Typography variant="h5">{data.prevRate}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 240,
                  }}
                  style={{ backgroundColor: "#362FD9" }}
                  elevation={2}
                >
                  <Typography variant="h4">Current Month Rate is :</Typography>
                  <Typography variant="h5">{data.currentRate}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
      <ToastContainer />
    </>
  );
};

export default Difference;
