import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import AdminDashboard from "./components/Dashboard/AdminDashboard.tsx";
import AboutUs from "./components/Dashboard/AboutUs.tsx";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
