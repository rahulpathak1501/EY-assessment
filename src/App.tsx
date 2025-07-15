import { Routes, Route } from "react-router-dom";
import CharacterPage from "./pages/CharacterPage";
import "./styles/global.css";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/character/:id" element={<CharacterPage />} />
    </Routes>
  );
}
