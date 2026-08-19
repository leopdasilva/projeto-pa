import { Routes, Route, Navigate } from "react-router-dom";

import Home, { Cardapio } from "./pages/Home";
import Login from "./pages/Login";
import Carrinho from "./pages/Carrinho";
import Pedido from "./pages/Pedido";
import Cozinha from "./pages/Cozinha";

import RotaProtegida from "./componentes/RotaProtegida";

function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/" element={<Login />} />


      {/* ÁREA DO CLIENTE */}
      <Route element={<RotaProtegida tipo="cliente" />}>

        <Route element={<Home />}>

          <Route
            path="/home"
            element={<Cardapio />}
          />

          <Route
            path="/carrinho"
            element={<Carrinho />}
          />

          <Route
            path="/pedido"
            element={<Pedido />}
          />

        </Route>

      </Route>


      {/* ÁREA DO CHEF */}
      <Route element={<RotaProtegida tipo="chef" />}>

        <Route element={<Home />}>
          <Route
            path="/cozinha"
            element={<Cozinha />}
          />
        </Route>

      </Route>

      {/* QUALQUER URL QUE NÃO EXISTIR */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;