import { useState, useEffect } from "react";
import { calculateRate, getAllSlab } from "../Api/api";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box, Container } from "@mui/system";

const Calculate = () => {
  const [slab, setSlab] = useState([]);

  const navigate = useNavigate();

  const [units, setUnit] = useState();
  const [date, setDate] = useState(dayjs());
  const [selectedSlab, setSelectedSlab] = useState();

  const handleChange = (e) => {
    setSelectedSlab(e.target.value);
  };

  const handleUnit = (e) => {
    if (e.target.value >= -1) {
      setUnit(e.target.value);
    } else {
      alert("Negative value is not allowed");
      setUnit(0);
    }
  };

  const handleSubmit = async (e) => {
    const stringified = String(date);
    let parts = stringified.split(" ");
    const parsed = parts[1] + "-" + parts[2] + "-" + parts[3];
    try {
      await calculateRate({
        units,
        currentDate: parsed,
        slabId: selectedSlab,
      });
      toast.success("Rate is Calculated", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 300,
      });
      setDate(dayjs());
      setUnit(0);
      setTimeout(() => navigate("/dashboard/details"), 1000);
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllSlab();
        setSlab(res.data.data.slabs);
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
          <h1 style={{ textAlign: "center" }}>Calculate Rate</h1>
          <Box sx={{ display: "flex" }}>
            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3 }}
              width="80%"
              height="80%"
            >
              <Container sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4} lg={3}>
                    <TextField
                      fullWidth
                      id="outlined-password-input"
                      label="Enter Units"
                      type="number"
                      value={units}
                      onChange={handleUnit}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Date"
                        inputFormat="MM/DD/YYYY"
                        value={date}
                        onChange={setDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={4} lg={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Slab
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedSlab}
                        label="Slab"
                        onChange={handleChange}
                      >
                        {slab.map(({ id, rate, slabText }) => (
                          <MenuItem value={id} key={id}>
                            Rs.{rate} <span>-</span>
                            <span style={{ fontSize: "12px" }}>{slabText}</span>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Container>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" onClick={handleSubmit}>
                  Calculate Rate
                </Button>
              </Box>
            </Box>
          </Box>
        </header>
      </div>
      <ToastContainer />
    </>
  );
};

export default Calculate;
