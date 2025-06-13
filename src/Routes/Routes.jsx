import { Route, Routes } from "react-router-dom";
import About from "../Pages/About/About";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      {/* Por enquanto e isso    */}
    </Routes>
  );
}
