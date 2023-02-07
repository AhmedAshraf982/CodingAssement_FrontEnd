import { useState, useEffect } from "react";

import { getDetails } from "../Api/api.js";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 150,
    editable: false,
    valueGetter: (data) =>
      new Date(data.row.date.split("T")[0]).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
  },
  {
    field: "total_rate",
    headerName: "Total Rate",
    width: 150,
    editable: false,
  },
  {
    field: "total_unit",
    headerName: "Total unit",
    width: 150,
    editable: false,
  },
  {
    field: "rate",
    headerName: "Actual Rate For Consuming Unit",
    width: 250,
    editable: false,
    valueGetter: (data) => data.row.us.rate,
  },
  {
    field: "slabText",
    headerName: "Description",
    width: 300,
    editable: false,
    valueGetter: (data) => data.row.us.slabText,
  },
];

const Details = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getDetails();

        setData(res.data.data.calculationDetail);
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
          <h1 style={{ textAlign: "center" }}>Details</h1>
        </header>
        <Box
          sx={{ height: 578, width: "80%", marginBottom: 10, marginLeft: 20 }}
        >
          {data.length === 0 ? (
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: "40%",
                fontWeight: "bold",
              }}
            >
              No Data Found
            </p>
          ) : (
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              // checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          )}
        </Box>
      </div>
      <ToastContainer />
    </>
  );
};

export default Details;
