import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "", description: "", category: "",
    startPrice: "", reservePrice: "", imageUrl: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const sellerId = localStorage.getItem("userId");

      if (!sellerId) {
        alert("Session expired. Please login again");
        navigate("/login");
        return;
      }

      const payload = {
        ...product,
        sellerId: Number(sellerId),
      };

      const res = await axios.post("http://localhost:8181/products/addProducts", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.status === "SUCCESS") {
        alert("Product added successfully");
        navigate("/auctions/live");
      }
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 border-0 rounded-4" style={{ width: "600px" }}>
        <h2 className="text-center fw-bold mb-4"> Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(product).map((key) => (
            <div className="mb-3" key={key}>
              <input
                className="form-control"
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                type={key.includes("Price") ? "number" : "text"}
                value={product[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" className="btn btn-dark w-100 fw-bold py-2">Create Listing</button>
        </form>
      </div>
    </div>
  );
}