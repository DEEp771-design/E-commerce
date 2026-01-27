import { useEffect, useState } from "react";
import API from "../api";

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/products");
      const products = res.data.data || res.data;
      setData(products);
      // Extract unique categories
      const uniqueCategories = [...new Set(products.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || "Failed to load";
      setError("❌ " + errorMsg);
    } finally {
      setLoading(false);
    }
  }

  // Filter products based on search and category
  const filteredProducts = data.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          paddingBottom: "15px",
          borderBottom: "2px solid rgba(102, 126, 234, 0.2)"
        }}>
          <h2 style={{ marginBottom: 0, fontSize: "28px", fontWeight: "800", color: "#2c3e50" }}>
            📦 Products
            <span style={{
              marginLeft: "12px",
              padding: "4px 12px",
              background: "rgba(102, 126, 234, 0.15)",
              color: "#667eea",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "700"
            }}>
              {filteredProducts.length}
            </span>
          </h2>
          <button 
            onClick={load} 
            disabled={loading} 
            style={{ 
              width: "140px", 
              margin: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            {loading ? "⏳ Loading..." : "🔄 Refresh"}
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}

        {/* Search and Filter Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "15px", marginBottom: "20px" }}>
          <div className="form-group">
            <input
              placeholder="🔍 Search products by name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
            />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            disabled={loading}
            style={{ 
              padding: "12px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "14px"
            }}
          >
            <option value="all">📂 All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div style={{
          background: "linear-gradient(135deg, #f8f9fb 0%, #ecf0f1 100%)",
          padding: "14px 18px",
          borderRadius: "10px",
          fontSize: "13px",
          color: "#666",
          marginBottom: "20px"
        }}>
          Showing {filteredProducts.length} of {data.length} products
          {categoryFilter !== "all" && ` • Category: ${categoryFilter}`}
          {searchTerm && ` • Search: "${searchTerm}"`}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-id">#{p.id}</div>
              <div className="product-name">{p.name}</div>
              <div className="product-info">
                <span>🏷️ Brand</span>
                <span><strong>{p.brand}</strong></span>
              </div>
              <div className="product-info">
                <span>📂 Category</span>
                <span><strong>{p.category}</strong></span>
              </div>
              <div className="price">₹{p.price?.toLocaleString()}</div>
              <div className="product-info">
                <span>📦 Stock</span>
                <span><strong>{p.quantity} units</strong></span>
              </div>
              <span className={`status ${p.status}`}>{p.status}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-text">
            {data.length === 0 ? "No products available" : "No products match your filters"}
          </div>
        </div>
      )}
    </div>
  );
}
