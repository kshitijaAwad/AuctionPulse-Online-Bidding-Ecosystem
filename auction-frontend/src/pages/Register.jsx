import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register({ setNavRefresh }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "SELLER",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);
      navigate("/login");
      if (setNavRefresh) setNavRefresh((prev) => prev + 1);

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Registration Failed!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h3 className="text-center fw-bold mb-4">
          Create Account <span className="text-warning">AuctionPulse</span>
        </h3>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="SELLER">SELLER</option>
              <option value="BUYER">BUYER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <button className="btn btn-warning w-100 fw-bold">Register</button>
        </form>
      </div>
    </div>
  );
}
