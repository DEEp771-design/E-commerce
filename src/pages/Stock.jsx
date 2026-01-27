import { useState, useEffect } from "react";
import API from "../api";

export default function Stock() {
  const [productId, setProductId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [showLogs, setShowLogs] = useState(false);

  // Load logs on component mount
  useEffect(() => {
    loadLogs();
  }, []);

  async function update() {
    if (!productId || !amount || !reason) {
      setError("❌ Please fill all fields");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/stock", {
        product_id: parseInt(productId),
        amount: parseInt(amount),
        reason: reason,
      });
      alert(`✓ Stock updated! New quantity: ${res.data.new_quantity}`);
      setProductId("");
      setAmount("");
      setReason("");
      setShowLogs(true);
      loadLogs();
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || "Error";
      setError("❌ " + errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadLogs() {
    setLogsLoading(true);
    try {
      const res = await API.get("/stock/logs");
      setLogs(res.data);
      setShowLogs(true);
      console.log("Stock logs loaded:", res.data);
    } catch (err) {
      setError("❌ Failed to load stock logs");
      console.error(err);
    } finally {
      setLogsLoading(false);
    }
  }

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        paddingBottom: "15px",
        borderBottom: "2px solid rgba(102, 126, 234, 0.2)"
      }}>
        <h2 style={{ marginBottom: 0, fontSize: "28px", fontWeight: "800", color: "#2c3e50" }}>
          📊 Stock Management
        </h2>
      </div>
      {error && <div className="error-message">{error}</div>}
      
      <div style={{ marginBottom: "20px" }}>
        <div className="form-group">
          <input
            placeholder="Product ID (e.g., 1)"
            type="number"
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
              setError("");
            }}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="+10 or -5"
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Reason (Restock, Sale, Damage, etc)"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError("");
            }}
            disabled={loading}
          />
        </div>
        <button onClick={update} disabled={loading || logsLoading}>
          {loading ? "⏳ Updating..." : "✏️ Update Stock"}
        </button>
      </div>

      <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #ddd" }} />

      <div style={{ marginTop: "20px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px"
        }}>
          <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#2c3e50" }}>
            📜 Stock Logs
            <span style={{
              marginLeft: "12px",
              padding: "2px 8px",
              background: "rgba(245, 87, 108, 0.15)",
              color: "#dc3545",
              borderRadius: "16px",
              fontSize: "13px",
              fontWeight: "700"
            }}>
              {logs.length}
            </span>
          </h3>
          <button
            onClick={() => {
              if (!showLogs) {
                loadLogs();
              } else {
                setShowLogs(false);
              }
            }} 
            disabled={logsLoading}
            style={{
              width: "auto",
              padding: "10px 16px",
              margin: 0
            }}
          >
            {logsLoading ? "⏳ Loading..." : showLogs ? "⬆️ Hide" : "⬇️ Show"}
          </button>
        </div>
      </div>

      {showLogs && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ marginBottom: "15px", color: "#333" }}>
            📋 Recent Changes
          </h3>
          {logs.length > 0 ? (
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {logs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    background: log.change > 0 
                      ? "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)" 
                      : "linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)",
                    padding: "15px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    borderLeft: `4px solid ${log.change > 0 ? "#28a745" : "#dc3545"}`,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  <div style={{ fontWeight: "bold", color: log.change > 0 ? "#155724" : "#721c24", marginBottom: "8px" }}>
                    Product #{log.product_id} {log.change > 0 ? "📈 Stock Added" : "📉 Stock Removed"}
                  </div>
                  <div style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
                    <div>
                      Change: <strong style={{ fontSize: "16px", color: log.change > 0 ? "#28a745" : "#dc3545" }}>
                        {log.change > 0 ? "+" : ""}{log.change} units
                      </strong>
                    </div>
                    <div>Reason: <strong>{log.reason}</strong></div>
                    <div>📅 Date: {new Date(log.created_at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              background: "#f0f0f0", 
              padding: "30px", 
              textAlign: "center", 
              borderRadius: "8px",
              color: "#999"
            }}>
              📭 No stock logs yet. Update stock to see history!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
