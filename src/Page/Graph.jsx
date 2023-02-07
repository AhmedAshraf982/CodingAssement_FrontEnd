import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { getYearlyGraph } from "../Api/api.js";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Container, Grid, Paper } from "@mui/material";

const Graph = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getYearlyGraph();
        console.log(res.data.data.yearData);
        setData(res.data.data.yearData);
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
        <header className="App-header">
          <h1 style={{ textAlign: "center" }}>Yearly Graph</h1>
        </header>
        <ToastContainer />
      </div>
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
                elevation={2}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis dataKey="total_unit" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="total_unit"
                      fill="#8884d8"
                      background={{ fill: "#eee" }}
                    />
                    <Bar
                      dataKey="total_rate"
                      fill="#323352"
                      background={{ fill: "#eee" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Graph;
