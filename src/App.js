import SignupPage from "./Page/SignupPage";
import LoginPage from "./Page/LoginPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import { ProtectedRoute, IsLogin } from "./Components/ProtectedRoute";
import Calculate from "./Page/Calculate";
import Details from "./Page/Details";
import Graph from "./Page/Graph";
import Difference from "./Page/Difference";

function App() {
  return (
    <Routes>
      <Route element={<IsLogin />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/calculate" element={<Calculate />} />
          <Route path="/dashboard/details" element={<Details />} />
          <Route path="/dashboard/yearly/graph" element={<Graph />} />
          <Route path="/dashboard/difference" element={<Difference />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
