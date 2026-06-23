import Login from './Login';
import './Login.css'; 

function App() {
  return (
    <div className="container-principal">
      <header style={{ backgroundColor: 'black', color: 'white', width: '100%', textAlign: 'center', padding: '20px 0' }}>
        <h1>Lanchonete Xpress</h1>
        <p>A entrega mais rápida da região</p>
      </header>
      <Login login="Login" />
    </div>
  );
}

export default App;
