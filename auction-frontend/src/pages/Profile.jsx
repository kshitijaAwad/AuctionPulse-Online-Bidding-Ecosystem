import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-5" style={{ width: "900px" }}>
        <h1 className="fw-bold mb-4">My Profile</h1>

        <h5>
          <b>Email:</b> {email || "Not Found"}
        </h5>

        <h5 className="mt-2">
          <b>Role:</b> {role || "Not Found"}
        </h5>

        <button onClick={handleLogout} className="btn btn-danger mt-4 w-100">
          Logout
        </button>
      </div>
    </div>
  );
}
