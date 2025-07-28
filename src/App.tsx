import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Handlebar } from "./common/layout/Handlebar";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <div className="flex flex-row w-full h-screen overflow-hidden">
        <div className="basis-1/6">
          <Handlebar />
        </div>
        <div className="basis-5/6 bg-[var(--bg-color)] h-full flex flex-col overflow-auto scrollbar-hide">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/orders" element={<Orders />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
