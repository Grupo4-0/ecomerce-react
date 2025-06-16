import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Home } from "../pages/home/home";
import { CadastroCliente } from "../pages/cadastro-cliente/cadastro-cliente";
import { CadastroFuncionario } from "../pages/cadastro-funcionario/cadastro-funcionario";
import Sobre from "../pages/sobre/sobre";
import { FuncionarioHome } from "./../pages/homeFuncionario/funcionarioHome";
import { CadastroProduto } from "./../pages/homeFuncionario/cadastroProduto";
import { CadastroCategoria } from "./../pages/homeFuncionario/cadastroCategoria";

export function Rotas() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/funcionarioHome" element={<FuncionarioHome />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/cadastro-categoria" element={<CadastroCategoria />} />
      <Route path="/sobre" element={<Sobre />}></Route>
      <Route path="/cliente/cadastro" element={<CadastroCliente />} />
      <Route path="/funcionario/cadastro" element={<CadastroFuncionario />} />
    </Routes>
  );
}
