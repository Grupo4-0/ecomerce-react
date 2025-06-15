import { Route, Routes } from "react-router-dom";
// import { Login } from "../pages/login/login";
// import { HomeFuncionario } from "../pages/homeFuncionario/homeFuncionario";
// import { CadastroCategoria } from "../pages/homeFuncionario/cadastroCategoria";
// import { CadastroProduto } from "../pages/homeFuncionario/cadastroProduto";
// import { About } from "../Pages/About/About";
// import { CadastroFuncionario } from "../pages/cadastro-funcionario/cadastro-funcionario";
import { CadastroCliente } from "../pages/cadastro-cliente/cadastro-cliente";
import { CadastroFuncionario } from "./../pages/cadastro-funcionario/cadastro-funcionario";
import { Home } from "./../pages/home/home";
export function Rotas() {
  return (
    <Routes>
      {/* <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homeFuncionario" element={<HomeFuncionario />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/cadastro-categoria" element={<CadastroCategoria />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/cadastroFuncionario" element={<CadastroFuncionario />} /> */}
      <Route path="/cadastroFuncionario" element={<CadastroFuncionario />} />
      <Route path="/cliente/cadastro" element={<CadastroCliente />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
