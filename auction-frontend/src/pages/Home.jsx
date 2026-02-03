import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const userRole = localStorage.getItem("role")?.toUpperCase();
  const email = localStorage.getItem("email");

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <div className="bg-dark text-white py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            {/* Expanded Welcome Message Area */}
            <div className="col-lg-10"> 
              <h1 className="display-4 fw-bold">
                Welcome {isLoggedIn ? `back, ${email.split('@')[0]}!` : "to AuctionPulse"} 
              </h1>

              <p className="lead mt-3 text-white-50">
                {isLoggedIn 
                  ? "Check out the latest live auctions or manage your listings."
                  : "Buy & Sell products through live auctions. Bid in real-time and grab the best deals instantly!"}
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">
                <Link to="/auctions/live" className="btn btn-warning btn-lg fw-bold">
                  View Live Auctions
                </Link>

                {isLoggedIn && (userRole === "SELLER" || userRole === "ROLE_SELLER") && (
                  <Link to="/add-product" className="btn btn-outline-light btn-lg fw-bold">
                    + Add New Product
                  </Link>
                )}

                {!isLoggedIn && (
                  <Link to="/register" className="btn btn-outline-light btn-lg fw-bold">
                    Join Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
              <div className="display-5 mb-2">🔨</div>
              <h4 className="fw-bold">Bidding</h4>
              <p className="text-muted">Place real-time bids on verified products.</p>
              <Link to="/auctions/live" className="btn btn-sm btn-outline-dark mt-auto">Go to Bids</Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 p-4 rounded-4 bg-warning text-dark">
              <div className="display-5 mb-2">💰</div>
              <h4 className="fw-bold">{userRole === "SELLER" ? "Your Sales" : "Sell Item"}</h4>
              <p>Turn your items into cash through competitive bidding.</p>
              {isLoggedIn ? (
                <Link to="/add-product" className="btn btn-sm btn-dark mt-auto">Start Selling</Link>
              ) : (
                <Link to="/login" className="btn btn-sm btn-dark mt-auto">Login to Sell</Link>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
              <div className="display-5 mb-2">👤</div>
              <h4 className="fw-bold">Profile</h4>
              <p className="text-muted">Manage your account and view bid history.</p>
              <Link to="/profile" className="btn btn-sm btn-outline-dark mt-auto">View Profile</Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <small className="text-white-50">
          © {new Date().getFullYear()} AuctionPulse 
        </small>
      </footer>
    </div>
  );
}