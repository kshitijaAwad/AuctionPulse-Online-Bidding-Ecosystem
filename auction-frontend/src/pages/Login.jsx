import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { jwtDecode } from "jwt-decode";

export default function Login({ setNavRefresh }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      if (!res.token) return alert("Login failed ");

      localStorage.setItem("token", res.token);
      const decoded = jwtDecode(res.token);

      localStorage.setItem("email", res.email || decoded?.sub || "");
      localStorage.setItem("userId", res.userId || res.id); 
      localStorage.setItem("role", res.role || "BUYER");

      if (setNavRefresh) setNavRefresh((prev) => prev + 1);
      navigate("/auctions/live");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center fw-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" required
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-dark w-100 fw-bold">Login</button>
        </form>
      </div>
    </div>
  );
}