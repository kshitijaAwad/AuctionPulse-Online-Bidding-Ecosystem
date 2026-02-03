import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : null;
  const role = localStorage.getItem("role")?.toUpperCase();

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8181/orders/all", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (role === "ADMIN" || role === "ROLE_ADMIN") {
        setOrders(res.data);
      } else {
        const filtered = res.data.filter(o => Number(o.buyerId) === currentUserId);
        setOrders(filtered);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (order) => {
    const transactionData = {
      orderId: order.orderId,
      amount: order.finalPrice,
      transactionType: "DEBIT" 
    };

    try {
      const res = await axios.post("http://localhost:8181/transactions", transactionData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.status === "SUCCESS") {
        alert(` ${res.data.message}`);
        fetchOrders(); 
      } else {
        alert(`${res.data.message}`);
      }
    } catch (err) {
      alert("Payment failed. Please check your connection or backend logs.");
    }
  };

  if (loading) return <div className="text-center mt-5"><h3>Loading AuctionPulse Orders...</h3></div>;

  return (
    <div className="container mt-4 pb-5">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="bg-dark text-white py-4 px-4 d-flex justify-content-between align-items-center">
          <h2 className="mb-0 fw-bold">
            {role?.includes("ADMIN") ? " System" : " My Won"} <span className="text-warning">Orders</span>
          </h2>
          <span className="badge bg-warning text-dark px-3 py-2">{orders.length} Items</span>
        </div>
        
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle text-center mb-0">
              <thead className="table-light text-secondary text-uppercase small">
                <tr>
                  <th>Order ID</th>
                  <th>Product Details</th>
                  <th>{role?.includes("ADMIN") ? "Buyer" : "Seller"}</th>
                  <th>Final Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((o) => {
                    const isBuyer = Number(o.buyerId) === currentUserId;
                    const isPending = o.status === 'PENDING';

                    return (
                      <tr key={o.orderId}>
                        <td className="fw-bold text-dark">#ORD-{o.orderId}</td>
                        <td className="text-start">
                          <div className="fw-bold text-dark">{o.productTitle || `ID: ${o.productId}`}</div>
                        </td>
                        <td>
                           <span className="badge bg-light text-dark border px-2 py-1">
                             <i className="bi bi-person me-1"></i>
                             {role?.includes("ADMIN") ? o.buyerUsername : o.sellerUsername}
                           </span>
                        </td>
                        <td className="fw-bold text-primary">₹{o.finalPrice}</td>
                        <td>
                          <span className={`badge px-3 py-2 ${o.status === 'PAID' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {o.status}
                          </span>
                        </td>
                        <td>
                          {isBuyer && isPending ? (
                            <button className="btn btn-sm btn-dark fw-bold px-3 shadow-sm" onClick={() => handlePayment(o)}>
                              Pay Now
                            </button>
                          ) : isPending ? (
                            <span className="text-muted small fw-bold">Awaiting Payment</span>
                          ) : (
                            <span className="text-success small fw-bold">
                              <i className="bi bi-check-circle-fill me-1"></i> Paid
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan="6" className="py-5 text-muted text-center">No orders found. Happy bidding!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}