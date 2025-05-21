import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/device/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
