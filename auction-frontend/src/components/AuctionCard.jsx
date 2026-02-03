import { closeAuction, cancelAuction } from "../services/auctionService";
import AuctionResult from "./AuctionResult";

export default function AuctionCard({ auction, refresh }) {

  const handleClose = async () => {
    try {
      await closeAuction(auction.auctionId);
      alert("Auction closed successfully ");
      refresh();
    } catch (err) {
      alert(err.message || "Failed to close auction ");
    }
  };

  const handleCancel = async () => {
    try {
      await cancelAuction(auction.auctionId);
      alert("Auction cancelled ");
      refresh();
    } catch (err) {
      alert(err.message || "Failed to cancel auction ");
    }
  };

  return (
    <div className="card shadow rounded-4 border-0 mb-3">
      <img
        src={auction.product?.imageUrl}
        className="card-img-top"
        alt="product"
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h5 className="fw-bold">{auction.product?.title}</h5>

        <p className="mb-1">
          Category: <b>{auction.product?.category}</b>
        </p>

        <p className="mb-1">
          Current High Bid: ₹<b>{auction.currentHighBid}</b>
        </p>

        <p className="mb-2">
          Status:{" "}
          <span className="badge bg-info text-dark">
            {auction.status}
          </span>
        </p>

        {auction.status === "ACTIVE" && (
          <div className="d-flex gap-2">
            <button className="btn btn-success w-50" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-danger w-50" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
        
        <AuctionResult auction={auction} />
      </div>
    </div>
  );
}
