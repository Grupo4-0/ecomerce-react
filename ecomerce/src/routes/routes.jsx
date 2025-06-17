import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { FuncionarioHome } from "../pages/homeFuncionario/funcionarioHome";
import {Categoria} from "./../pages/home/Categoria";
import { Home } from "../pages/home/home";
import { Promocoes } from "../pages/home/Promocoes";
import { Produto } from "../pages/home/Produto";
import { Carrinho } from "../pages/carrinho/carrinho"
import { CadastroCliente } from "../pages/cadastro-cliente/cadastro-cliente";
import { CadastroFuncionario } from "../pages/cadastro-funcionario/cadastro-funcionario";
import Sobre from "../pages/sobre/sobre";
import { CadastroProduto } from "./../pages/homeFuncionario/cadastroProduto";
import { CadastroCategoria } from "./../pages/homeFuncionario/cadastroCategoria";

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
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/cadastro-categoria" element={<CadastroCategoria />} />
      <Route path="/sobre" element={<Sobre />}></Route>
      <Route path="/cliente/cadastro" element={<CadastroCliente />} />
      <Route path="/funcionario/cadastro" element={<CadastroFuncionario />} />
    </Routes>
  );
}
