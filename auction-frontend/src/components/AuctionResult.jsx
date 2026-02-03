export default function AuctionResult({ auction }) {

  if (auction.status === "COMPLETED") {
    return (
      <div className="alert alert-success mt-3">
        🏆 <b>Winner:</b> {auction.currentHighBidder?.name}<br />
        💰 <b>Winning Bid:</b> ₹{auction.currentHighBid}
      </div>
    );
  }

  if (auction.status === "NO_BIDS") {
    return (
      <div className="alert alert-warning mt-3">
        ❌ Auction ended with no bids
      </div>
    );
  }

  if (auction.status === "RESERVE_NOT_MET") {
    return (
      <div className="alert alert-danger mt-3">
        ❌ Reserve price not met
      </div>
    );
  }

  if (auction.status === "CANCELLED") {
    return (
      <div className="alert alert-secondary mt-3">
        🚫 Auction was cancelled by admin
      </div>
    );
  }

  return null;
}
