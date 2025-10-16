import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import About from "./pages/About";
import MockData from "./pages/MockData";
import DayView from "./components/DayView";
import WeekView from "./components/WeekView";
import Doctor from "./components/DoctorSelector";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<About />} />
        <Route path="/mock-data" element={<MockData />} />
        <Route path="/day" element={<DayView />} />
        <Route path="/week" element={<WeekView />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </Layout>
  );
};

export default App;
