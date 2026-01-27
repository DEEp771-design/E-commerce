import { useState } from "react";
import API from "../api";

export default function Login({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("test");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  async function login() {
    if (!username || !password) {
      setError("❌ Please fill all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);
      const res = await API.post("/login", form);
      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        onLoginSuccess?.(res.data.access_token);
        window.location.href = "/";
      }
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Login failed";
      setError("❌ " + errorMsg);
    } finally {
      setLoading(false);
    }
  }

  async function register() {
    if (!username || !password) {
      setError("❌ Please fill all fields");
      return;
    }
    if (password.length < 3) {
      setError("❌ Password must be at least 3 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await API.post("/register", { username, password });
      setError("");
      setIsRegister(false);
      alert("✓ Registration successful! Please login.");
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Registration failed";
      setError("❌ " + errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        maxWidth: "900px",
        width: "100%",
        alignItems: "center"
      }}>
        {/* Left Side - Welcome Section */}
        <div style={{
          color: "white",
          animation: "slideInLeft 0.6s ease"
        }}>
          <div style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <span style={{ fontSize: "56px" }}>📦</span>
            ShopHub Pro
          </div>
          <p style={{
            fontSize: "18px",
            opacity: "0.95",
            marginBottom: "30px",
            lineHeight: "1.6"
          }}>
            Professional E-Commerce Admin Dashboard
          </p>
          
          <div style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            padding: "20px",
            borderRadius: "12px",
            borderLeft: "4px solid rgba(255, 255, 255, 0.3)",
            marginBottom: "20px"
          }}>
            <div style={{ fontSize: "14px", marginBottom: "12px", fontWeight: "600" }}>
              ✨ Key Features
            </div>
            <ul style={{
              listStyle: "none",
              fontSize: "13px",
              opacity: "0.9",
              lineHeight: "1.8"
            }}>
              <li>📊 Real-time Dashboard Analytics</li>
              <li>🛍️ 300+ Products Catalog</li>
              <li>📦 Smart Inventory Management</li>
              <li>🛒 Order Management System</li>
            </ul>
          </div>

          <div style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "15px",
            borderRadius: "8px",
            fontSize: "12px",
            opacity: "0.8"
          }}>
            💡 Built with FastAPI + React for maximum performance
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-container" style={{
          animation: "slideInRight 0.6s ease"
        }}>
          <div className="login-box" style={{
            borderTop: "4px solid #667eea"
          }}>
            <div style={{
              textAlign: "center",
              marginBottom: "10px"
            }}>
              <div style={{
                fontSize: "40px",
                marginBottom: "10px"
              }}>
                {isRegister ? "👤" : "🔐"}
              </div>
            </div>

            <h2 style={{
              marginBottom: "8px",
              color: "#1a1a1a"
            }}>
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="login-subtitle" style={{
              marginBottom: "25px"
            }}>
              {isRegister ? "Join ShopHub Pro today" : "Login to your dashboard"}
            </p>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <input
                placeholder="👤 Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                onKeyPress={(e) => e.key === "Enter" && !loading && (isRegister ? register() : login())}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="🔑 Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyPress={(e) => e.key === "Enter" && !loading && (isRegister ? register() : login())}
                disabled={loading}
              />
            </div>

            <button 
              onClick={isRegister ? register : login} 
              disabled={loading}
              style={{
                width: "100%",
                margin: "25px 0 15px 0",
                fontSize: "16px",
                fontWeight: "700",
                minHeight: "48px"
              }}
            >
              {loading ? (isRegister ? "⏳ Creating Account..." : "⏳ Logging in...") : (isRegister ? "📝 Create Account" : "🚀 Login Now")}
            </button>

            <button 
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }} 
              className="secondary"
              disabled={loading}
              style={{
                width: "100%",
                margin: "10px 0",
                minHeight: "44px"
              }}
            >
              {isRegister ? "← Back to Login" : "Don't have account? Register →"}
            </button>

            {!isRegister && (
              <div style={{
                background: "#f0f7ff",
                border: "1px solid #b3d9ff",
                padding: "16px",
                borderRadius: "10px",
                marginTop: "20px",
                fontSize: "13px"
              }}>
                <div style={{
                  fontWeight: "700",
                  color: "#0066cc",
                  marginBottom: "10px"
                }}>
                  🎯 Demo Credentials
                </div>
                <div style={{
                  display: "grid",
                  gap: "8px",
                  color: "#333",
                  lineHeight: "1.6"
                }}>
                  <div>
                    <strong>Username:</strong> <code style={{
                      background: "white",
                      padding: "3px 6px",
                      borderRadius: "4px",
                      fontFamily: "monospace",
                      color: "#667eea"
                    }}>test</code>
                  </div>
                  <div>
                    <strong>Password:</strong> <code style={{
                      background: "white",
                      padding: "3px 6px",
                      borderRadius: "4px",
                      fontFamily: "monospace",
                      color: "#667eea"
                    }}>test</code>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.7)"
          }}>
            🔒 Your data is secure and encrypted
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          h2 {
            font-size: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
