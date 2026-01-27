import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return token ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Login onLoginSuccess={(newToken) => setToken(newToken)} />
  );
}

export default App;
