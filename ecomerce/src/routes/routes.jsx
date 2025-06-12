import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Home } from "../pages/home/home";
import { HomeFuncionario } from "../pages/homeFuncionario/HomeFuncionario";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/homeFuncionario" element={<HomeFuncionario />} />
    </Routes>
  );
}