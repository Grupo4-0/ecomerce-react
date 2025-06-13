import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Home } from "../pages/home/home";
import { HomeFuncionario } from "../pages/homeFuncionario/HomeFuncionario";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homeFuncionario" element={<HomeFuncionario />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/cadastro-categoria" element={<CadastroCategoria />} />
      <Route path="/cadastroFuncionario" element={<CadastroFuncionario />} />
    </Routes>
  );
}