import { useState, useEffect } from "react";
import Products from "./Products";
import Orders from "./Orders";
import Stock from "./Stock";
import API from "../api";

export default function Dashboard({ onLogout }) {
  const [summary, setSummary] = useState(null);
  const [user, setUser] = useState("User");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSummary();
    // Get username from API or localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser(decoded.sub || "User");
      } catch (e) {
        setUser("User");
      }
    }
  }, []);

  async function loadSummary() {
    setLoading(true);
    try {
      const res = await API.get("/dashboard/summary");
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout?.();
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="brand">
            <span>📦</span> ShopHub Pro
          </div>
          <div className="user-section">
            <div className="user-info">
              <div className="username">👤 {user}</div>
              <div className="user-status">Admin Dashboard</div>
            </div>
            <button onClick={handleLogout} className="danger" style={{ width: "120px", margin: 0 }}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="dashboard-title-section">
            <div>
              <h1 className="dashboard-title">Dashboard</h1>
              <p style={{ color: "#666", fontSize: "14px", marginTop: "5px" }}>
                Welcome back! Here's what's happening with your store.
              </p>
            </div>
            <button 
              onClick={loadSummary} 
              disabled={loading}
              style={{ width: "150px", margin: 0 }}
            >
              {loading ? "⏳ Refreshing..." : "🔄 Refresh"}
            </button>
          </div>

          {/* Stats Grid */}
          {summary && (
            <div className="dashboard-grid">
              <div className="stat-card products">
                <div className="stat-label">📦 Total Products</div>
                <div className="stat-value">{summary.total_products}</div>
              </div>
              <div className="stat-card active">
                <div className="stat-label">✅ Active Products</div>
                <div className="stat-value">{summary.active_products}</div>
              </div>
              <div className="stat-card orders">
                <div className="stat-label">🛒 Total Orders</div>
                <div className="stat-value">{summary.total_orders}</div>
              </div>
              <div className="stat-card sales">
                <div className="stat-label">💰 Total Sales</div>
                <div className="stat-value">₹{(summary.total_sales / 100000).toFixed(1)}L+</div>
              </div>
            </div>
          )}
        </div>

        {/* Sections */}
        <div className="section">
          <Products />
        </div>
        <div className="section">
          <Stock />
        </div>
        <div className="section">
          <Orders />
        </div>
      </div>
    </div>
  );
}
