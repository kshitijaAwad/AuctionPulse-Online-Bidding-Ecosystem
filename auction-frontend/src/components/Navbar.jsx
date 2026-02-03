import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ setNavRefresh }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const role = localStorage.getItem("role")?.toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    if (setNavRefresh) setNavRefresh((prev) => prev + 1);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <Link className="navbar-brand fw-bold fs-3" to="/">
        Auction<span className="text-warning">Pulse</span>
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto gap-3">
          <li className="nav-item"><NavLink className="nav-link fw-semibold" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link fw-semibold" to="/products">All Products</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link fw-semibold" to="/auctions/live">Live Auctions</NavLink></li>

          {/* Seller Specific Links */}
          {isLoggedIn && (role === "SELLER" || role === "ROLE_SELLER") && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link fw-semibold text-info" to="/admin/orders">My Orders</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-semibold text-warning" to="/add-product">+ Add Product</NavLink>
              </li>
              {/* Added Start Auction Link for Seller */}
              <li className="nav-item">
                <NavLink className="nav-link fw-semibold text-success" to="/seller/start-auction">
                  🚀 Start Auction
                </NavLink>
              </li>
            </>
          )}

          {/* Buyer Specific Links */}
          {isLoggedIn && (role === "CUSTOMER" || role === "BUYER" || role === "ROLE_BUYER") && (
            <li className="nav-item">
              <NavLink className="nav-link fw-semibold text-info" to="/admin/orders">My Orders</NavLink>
            </li>
          )}

          {/* Admin Specific Links */}
          {isLoggedIn && (role === "ADMIN" || role === "ROLE_ADMIN") && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link fw-semibold text-info" to="/admin/orders"> View Orders</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-semibold text-danger" to="/admin/dashboard">Admin Panel</NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="d-flex gap-2 ms-lg-4 mt-3 mt-lg-0 align-items-center">
          {!isLoggedIn ? (
            <>
              <NavLink className="btn btn-outline-light" to="/login">Login</NavLink>
              <NavLink className="btn btn-warning fw-bold" to="/register">Register</NavLink>
            </>
          ) : (
            <>
              <NavLink className="nav-link fw-semibold text-white me-2" to="/profile">Profile</NavLink>
              <button className="btn btn-danger fw-bold" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}