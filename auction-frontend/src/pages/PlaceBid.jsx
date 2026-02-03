import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { placeBid } from "../services/bidService";

export default function PlaceBid() {
  const { auctionId } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const bidderId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await placeBid({
        auctionId: Number(auctionId),
        bidderId: Number(bidderId),
        amount: Number(amount),
      });

      alert(" Bid placed successfully!");
      navigate("/live-auctions");
    } catch (err) {
      alert(err.message || " Failed to place bid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center mb-3 fw-bold"> Place Bid</h3>

              <p className="text-muted text-center mb-4">
                Auction ID: <b>{auctionId}</b>
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Bid Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter bid amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="1"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100 py-2 fw-semibold rounded-3"
                  disabled={loading}
                >
                  {loading ? "Placing..." : "Place Bid"}
                </button>
              </form>

              {!bidderId && (
                <p className="text-danger text-center mt-3">
                   Please login first (bidderId not found)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
