import { Routes, Route } from "react-router-dom";

import Home, { Cardapio } from "./pages/Home";
import Login from "./pages/Login";
import Carrinho from "./pages/Carrinho";
import Pedido from "./pages/Pedido";
import Cozinha from "./pages/Cozinha";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<Home />}>
        <Route path="/home" element={<Cardapio />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/cozinha" element={<Cozinha />} />
      </Route>
    </Routes>
  );
}

export default App;