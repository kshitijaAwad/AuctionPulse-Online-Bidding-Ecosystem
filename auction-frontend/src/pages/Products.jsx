import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  // User Authentication Context
  const currentUserId = localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : null;
  const currentUserRole = localStorage.getItem("role")?.toUpperCase();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const prodRes = await axios.get("http://localhost:8181/products/list");
      const auctionRes = await axios.get("http://localhost:8181/auctions/all");

      const mergedData = prodRes.data.map(p => {
        const matchingAuction = auctionRes.data.find(a => a.product?.itemId === p.itemId);
        return {
          ...p,
          activeAuctionId: matchingAuction?.auctionId,
          auctionStatus: matchingAuction ? matchingAuction.status.toUpperCase() : "AVAILABLE"
        };
      });

      setProducts(mergedData);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderAction = async (auctionId) => {
    if (!auctionId) return;
    try {
      await axios.post(`http://localhost:8181/orders/place/${auctionId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/admin/orders");
    } catch (err) {
      navigate("/admin/orders");
    }
  };

  useEffect(() => {
    const filtered = products.filter((p) => {
      const titleMatch = p.title?.toLowerCase().includes(keyword);
      const categoryMatch = !category || p.category === category;
      return titleMatch && categoryMatch;
    });
    setFilteredProducts(filtered);
  }, [keyword, category, products]);

  const renderStatus = (p) => {
    const status = p.auctionStatus;
    if (status === "COMPLETED" || status === "SOLD") {
      return <span className="badge px-3 py-2 bg-danger text-white">Sold Out</span>;
    } else if (status === "ACTIVE" || status === "STARTED") {
      return <span className="badge px-3 py-2 bg-primary">In Auction</span>;
    } else {
      return <span className="badge px-3 py-2 bg-success text-white">Available</span>;
    }
  };

  if (loading) return <div className="text-center mt-5"><h3>Loading AuctionPulse...</h3></div>;

  const showActionColumn = currentUserId && currentUserRole !== "BUYER";

  return (
    <div className="container mt-4 pb-5">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="bg-dark text-white py-4 px-4 d-flex justify-content-between align-items-center">
          <h2 className="mb-0 fw-bold"> All <span className="text-warning">Products</span></h2>
          <span className="badge bg-warning text-dark px-3 py-2 fs-6">{filteredProducts.length} Items Found</span>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle text-center mb-0">
              <thead className="table-light text-secondary text-uppercase small">
                <tr>
                  <th>Preview</th>
                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Asking Price</th>
                  <th>Seller</th>
                  <th>Status</th>
                  {showActionColumn && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const pid = p.itemId;
                  const sellerId = p.seller?.userId || p.sellerId;
                  const isOwner = Number(sellerId) === currentUserId;
                  const isAdmin = currentUserRole === "ADMIN";
                  const isSeller = currentUserRole === "SELLER";
                  const isFinished = p.auctionStatus === "COMPLETED" || p.auctionStatus === "SOLD";

                  return (
                    <tr key={pid}>
                      <td><img src={p.imageUrl || "https://via.placeholder.com/60"} className="rounded shadow-sm" style={{ height: "60px", width: "60px", objectFit: "cover" }} alt="" /></td>
                      <td className="text-start">
                        <div className="fw-bold text-dark">{p.title}</div>
                        <div className="text-muted small">{p.description?.substring(0, 30)}...</div>
                      </td>
                      <td><span className="badge rounded-pill bg-light text-dark border px-3">{p.category}</span></td>
                      <td className="fw-bold text-primary">₹{p.startPrice}</td>
                      <td className="text-muted">
                        {isOwner ? <span className="badge bg-secondary text-white px-2">Me</span> : (p.seller?.username || "Member")}
                      </td>
                      <td>{renderStatus(p)}</td>

                      {showActionColumn && (
                        <td style={{ minWidth: "150px" }}>
                          <div className="d-flex gap-2 justify-content-center">
                            
                            {/* SELLER LOGIC: Update for owned available items, Locked for others */}
                            {isSeller && (
                              isOwner && !isFinished ? (
                                <button 
                                  className="btn btn-sm btn-outline-primary fw-bold px-4" 
                                  onClick={() => navigate(`/update-product/${pid}`)}
                                >
                                  Update
                                </button>
                              ) : (
                                isFinished && <span className="text-muted small fw-bold italic">Locked</span>
                              )
                            )}

                            {/* ADMIN LOGIC: Delete removed. Only Order button remains for sold items. */}
                            {isAdmin && (
                              <>
                                {isFinished ? (
                                  <button 
                                    className="btn btn-sm btn-success fw-bold px-4" 
                                    onClick={() => handleOrderAction(p.activeAuctionId)}
                                  >
                                    Order
                                  </button>
                                ) : (
                                  <span className="text-muted small italic">In Progress</span>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}