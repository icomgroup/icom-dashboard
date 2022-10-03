import "./App.css";
import NewArtical from "./Pages/Articals/NewArtical";
import Articals from "./Pages/Articals/Articals";
import Artical from "./Pages/Articals/Artical";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Articals />} />
        <Route path="/newartical" element={<NewArtical />} />
        <Route path="/aritcal/:id" element={<Artical />} />
      </Routes>
    </Router>
  );
}
