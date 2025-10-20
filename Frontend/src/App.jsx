import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowSchool from "./pages/ShowSchool";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/show-schools" element={<ShowSchool />} />
    </Routes>
  );
};

export default App;
