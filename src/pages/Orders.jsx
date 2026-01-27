import { useState, useEffect } from "react";
import API from "../api";

export default function Orders() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [showOrders, setShowOrders] = useState(false);

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  async function order() {
    if (!productId || !quantity) {
      setError("❌ Please fill all fields");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/orders", {
        items: [
          {
            product_id: parseInt(productId),
            qty: parseInt(quantity),
          },
        ],
      });
      alert(`✓ Order #${res.data.order_id} placed! Total: ₹${res.data.total}`);
      setProductId("");
      setQuantity("");
      setShowOrders(true);
      loadOrders();
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || "Error";
      setError("❌ " + errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadOrders() {
    setOrdersLoading(true);
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
      setShowOrders(true);
      console.log("Orders loaded:", res.data);
    } catch (err) {
      setError("❌ Failed to load orders");
      console.error(err);
    } finally {
      setOrdersLoading(false);
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
          🛒 Place Order
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
            placeholder="Quantity (e.g., 1)"
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setError("");
            }}
            disabled={loading}
          />
        </div>
        <button onClick={order} disabled={loading || ordersLoading}>
          {loading ? "⏳ Processing..." : "📦 Place Order"}
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
            📋 Recent Orders
            <span style={{
              marginLeft: "12px",
              padding: "2px 8px",
              background: "rgba(245, 87, 108, 0.15)",
              color: "#dc3545",
              borderRadius: "16px",
              fontSize: "13px",
              fontWeight: "700"
            }}>
              {orders.length}
            </span>
          </h3>
          <button
            onClick={() => {
              if (!showOrders) {
                loadOrders();
              } else {
                setShowOrders(false);
              }
            }} 
            disabled={ordersLoading}
            style={{
              width: "auto",
              padding: "10px 16px",
              margin: 0
            }}
          >
            {ordersLoading ? "⏳ Loading..." : showOrders ? "⬆️ Hide" : "⬇️ Show"}
          </button>
        </div>
      </div>

      {showOrders && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ marginBottom: "15px", color: "#333" }}>
            📦 Recent Orders ({orders.length})
          </h3>
          {orders.length > 0 ? (
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {orders.map((o) => (
                <div 
                  key={o.id} 
                  style={{ 
                    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    padding: "15px", 
                    margin: "10px 0", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #4facfe",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  <div style={{ fontWeight: "bold", color: "#4facfe", marginBottom: "8px" }}>
                    Order #{o.id}
                  </div>
                  <div style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
                    <div>👤 User: <strong>{o.user}</strong></div>
                    <div>💰 Total: <strong style={{ color: "#27ae60", fontSize: "16px" }}>₹{o.total?.toLocaleString()}</strong></div>
                    <div>📅 Date: {new Date(o.created_at).toLocaleString()}</div>
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
              📭 No orders yet. Place your first order!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
