import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { FuncionarioHome } from "../pages/funcionarioHome/funcionarioHome";
// import { CadastroCategoria } from "../pages/funcionarioHome/cadastroCategoria";
// import { CadastroProduto } from "../pages/funcionarioHome/cadastroProduto";
// import { About } from "../Pages/About/About";
{
  /* <Route path="/CadastroFuncionario" element={<CadastroFuncionario />} /> */
}
import {Categoria} from "./../pages/home/Categoria";
import { Home } from "../pages/home/home";
import { CadastroCliente } from "../pages/cadastro-cliente/cadastro-cliente";
import { CadastroFuncionario } from "../pages/cadastro-funcionario/cadastro-funcionario";
import { Promocoes } from "../pages/home/Promocoes";
import { Produto } from "../pages/home/Produto";
import { Carrinho } from "../pages/carrinho/carrinho"

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/funcionarioHome" element={<FuncionarioHome />} />
      <Route path="/categoria/:nome" element={<Categoria />} />
      <Route path="/promocoes" element={<Promocoes />} />
      <Route path="/produto/:id" element={<Produto />} />
      <Route path="/Carrinho" element={<Carrinho />} />
      {/* <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/cadastro-categoria" element={<CadastroCategoria />} />
      <Route path="/sobre" element={<About />} /> */}
      <Route path="/cliente/cadastro" element={<CadastroCliente />} />
      <Route path="/funcionario/cadastro" element={<CadastroFuncionario />} />
    </Routes>
  );
}