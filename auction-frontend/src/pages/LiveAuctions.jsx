import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeBid } from "../services/bidService";
import axios from "axios"; 
export default function LiveAuctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amounts, setAmounts] = useState({});
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : null;
  const currentUserRole = localStorage.getItem("role")?.toUpperCase();
  const token = localStorage.getItem("token");

  const fetchLiveAuctions = async () => {
    try {
      const res = await fetch("http://localhost:8181/auctions/live");
      const data = await res.json();
      setAuctions(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLiveAuctions(); }, []);

  const handleBid = async (auctionId, sellerId) => {
    if (!token) { alert("Please login to place a bid!"); navigate("/login"); return; }
    if (currentUserRole === "ADMIN" || currentUserRole === "ROLE_ADMIN") { alert("Admins cannot bid!"); return; }
    if (currentUserId === Number(sellerId)) { alert("Security Alert: You cannot bid on your own product! 🚫"); return; }

    try {
      await placeBid({ auctionId, bidderId: currentUserId, amount: Number(amounts[auctionId]) });
      alert("Bid placed! ");
      fetchLiveAuctions();
      setAmounts({ ...amounts, [auctionId]: "" });
    } catch (err) { alert(err.message || "Bid failed "); }
  };

  /** * NEW: Handles Order Generation for the Winner
   * Only active once auction status is COMPLETED.
   */
  const handleConfirmOrder = async (auctionId) => {
    try {
      const res = await axios.post(`http://localhost:8181/orders/place/${auctionId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(` Order Placed! Order ID: #ORD-${res.data.orderId}`);
      navigate("/admin/orders"); // Navigate to see the new record
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order.");
    }
  };

  if (loading) return <h3 className="text-center mt-5">Loading Live Auctions...</h3>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold"> Live Auctions</h2>
      <div className="row">
        {auctions.map((a) => {
          const sellerId = a.product?.sellerId || a.product?.seller?.userId;
          const isOwner = currentUserId && sellerId && currentUserId === Number(sellerId);
          const isAdmin = currentUserRole === "ADMIN" || currentUserRole === "ROLE_ADMIN";
          
          const isWinner = a.currentHighBidder?.userId === currentUserId;
          const isCompleted = a.status === "COMPLETED";

          return (
            <div className="col-md-4 mb-4" key={a.auctionId}>
              <div className="card shadow rounded-4 border-0 h-100">
                <img src={a.product?.imageUrl} className="card-img-top" style={{ height: "220px", objectFit: "cover" }} alt="product" />
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{a.product?.title}</h5>
                  <span className={`badge mb-2 w-50 ${isCompleted ? 'bg-danger' : 'bg-primary'}`}>
                    {isCompleted ? 'AUCTION ENDED' : 'LIVE'}
                  </span>
                  <p className="text-muted mb-1 small">Category: {a.product?.category}</p>
                  <p className="fs-5 mb-3 text-success fw-bold">Current High: ₹{a.currentHighBid || a.product?.startPrice}</p>
                  
                  {isCompleted && isWinner ? (
                    <button className="btn btn-success fw-bold w-100 py-2 mt-auto shadow-sm" onClick={() => handleConfirmOrder(a.auctionId)}>
                      🏁 Claim Item & Place Order
                    </button>
                  ) : isCompleted ? (
                    <div className="alert alert-secondary py-2 text-center fw-bold mt-auto">
                      Sold to User #{a.currentHighBidder?.userId || "N/A"}
                    </div>
                  ) : (isOwner || isAdmin) ? (
                    <div className={`alert ${isAdmin ? 'alert-danger' : 'alert-secondary'} py-2 text-center fw-bold mt-auto`}>
                      {isAdmin ? " Admin View" : " Your Listing"}
                    </div>
                  ) : (
                    <div className="mt-auto">
                      <input type="number" className="form-control mb-2" placeholder="Bid Amount" value={amounts[a.auctionId] || ""} onChange={(e) => setAmounts({...amounts, [a.auctionId]: e.target.value})} />
                      <button className="btn btn-dark w-100 fw-bold" onClick={() => handleBid(a.auctionId, sellerId)}>Place Bid</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}