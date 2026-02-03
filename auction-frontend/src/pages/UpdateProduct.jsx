import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const API_BASE_URL = `http://localhost:8181/products/${id}`;

  const [product, setProduct] = useState({
    title: "",
    description: "",
    startPrice: 0,
    reservePrice: 0,
    imageUrl: "",
    category: "",
    sellerId: 1 
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setProduct(res.data); 
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error loading original data:", err);
      setLoading(false);
    });
  }, [id, API_BASE_URL]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(API_BASE_URL, product, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      alert("Product Updated Successfully!");
      navigate("/products"); 
    } catch (err) {
      console.error("Update failed:", err);
      alert(err.response?.data?.message || "Network Error: Check if Backend is running on 8181");
    }
  };

  if (loading) return <div className="container mt-5 text-center">Loading Data...</div>;

  return (
    <div className="container mt-5 pb-5">
      <div className="card shadow border-0" style={{ borderRadius: "12px", overflow: "hidden" }}>
        
        <div className="card-header bg-dark text-white py-3 d-flex align-items-center">
          <span className="fs-3 me-3">📦</span>
          <h2 className="m-0 text-warning">Update Product Details</h2>
        </div>

        <div className="card-body bg-light p-4">
          <form onSubmit={handleUpdate}>
            <div className="row g-3">
              
              <div className="col-md-6">
                <label className="form-label fw-bold">Product Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={product.title || ""}
                  onChange={(e) => setProduct({ ...product, title: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Category</label>
                <select 
                  className="form-select"
                  value={product.category || ""}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-bold">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={product.description || ""}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-danger">Start Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control fw-bold text-danger"
                  value={product.startPrice || 0}
                  onChange={(e) => setProduct({ ...product, startPrice: parseFloat(e.target.value) })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Reserve Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={product.reservePrice || 0}
                  onChange={(e) => setProduct({ ...product, reservePrice: parseFloat(e.target.value) })}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={product.imageUrl || ""}
                  onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-warning fw-bold px-4 text-dark">
                Save Changes
              </button>
              <button 
                type="button" 
                className="btn btn-outline-dark px-4" 
                onClick={() => navigate("/products")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}