import { useState } from "react";
import { startAuction } from "../services/auctionService";
import { useNavigate } from "react-router-dom";

export default function StartAuction() {
  const [productId, setProductId] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");

  const navigate = useNavigate();

  const handleStart = async (e) => {
    e.preventDefault();

    try {
      const res = await startAuction({
        productId: Number(productId),
        durationMinutes: Number(durationMinutes),
      });

      if (res.status === "SUCCESS") {
        alert(res.message);
        navigate("/auctions/live");
      } else {
        alert(res.message || "Failed to start auction");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to start auction");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h3 className="text-center fw-bold mb-4">🚀 Start Auction</h3>

        <form onSubmit={handleStart}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Product ID</label>
            <input
              type="number"
              className="form-control"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Duration (Minutes)</label>
            <input
              type="number"
              className="form-control"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-dark w-100 fw-bold">Start</button>
        </form>
      </div>
    </div>
  );
}
