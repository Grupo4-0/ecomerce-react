import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { HomeFuncionario } from "../pages/homeFuncionario/homeFuncionario";
import { CadastroCategoria } from "../pages/homeFuncionario/cadastroCategoria";
import { CadastroProduto } from "../pages/homeFuncionario/cadastroProduto";


export function Rotas() {
  return (
    <Routes>

      < Route path="/login" element={<Login />} />
      <Route path="/homeFuncionario" element={<HomeFuncionario />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/cadastro-categoria" element={<CadastroCategoria />} />


    </Routes>
  );
}
