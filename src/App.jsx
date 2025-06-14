import { useState } from "react";
import { Rotas } from "./routes/routes";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Rotas />
    </>
  );
}

export default App;
