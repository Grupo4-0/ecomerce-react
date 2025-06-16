import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Home } from "../pages/home/home";
import { CadastroCliente } from "../pages/cadastro-cliente/cadastro-cliente";
import { CadastroFuncionario } from "../pages/cadastro-funcionario/cadastro-funcionario";
import { funcionarioHome } from "./../pages/funcionarioHome/funcionarioHome";
import { CadastroCategoria } from "./../pages/funcionarioHome/cadastroCategoria";
import { CadastroProduto } from "../pages/funcionarioHome/cadastroProduto";
export function Rotas() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/funcionarioHome" element={<funcionarioHome />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/cadastro-categoria" element={<CadastroCategoria />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/cliente/cadastro" element={<CadastroCliente />} />
      <Route path="/funcionario/cadastro" element={<CadastroFuncionario />} />
    </Routes>
  );
}
