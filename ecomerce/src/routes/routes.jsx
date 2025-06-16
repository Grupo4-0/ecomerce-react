import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { HomeFuncionario } from "../pages/homeFuncionario/homeFuncionario";
// import { CadastroCategoria } from "../pages/homeFuncionario/cadastroCategoria";
// import { CadastroProduto } from "../pages/homeFuncionario/cadastroProduto";

{
  /* <Route path="/CadastroFuncionario" element={<CadastroFuncionario />} /> */
}
import { Home } from "../pages/home/home";
import { CadastroCliente } from "../pages/cadastro-cliente/cadastro-cliente";
import { CadastroFuncionario } from "../pages/cadastro-funcionario/cadastro-funcionario";
import Sobre from "../pages/sobre/sobre";
export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homeFuncionario" element={<HomeFuncionario />} />
      {/* <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/cadastro-categoria" element={<CadastroCategoria />} />
=======*/}

      <Route path="/sobre" element={<Sobre />}></Route>
      <Route path="/cliente/cadastro" element={<CadastroCliente />} />
      <Route path="/funcionario/cadastro" element={<CadastroFuncionario />} />
    </Routes>
  );
}
