export default function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const currentUserId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchMyOrders = async () => {
      const res = await axios.get("http://localhost:8181/orders/all");
      const filtered = res.data.filter(o => Number(o.buyerId) === currentUserId);
      setMyOrders(filtered);
    };
    fetchMyOrders();
  }, [currentUserId]);

  return (
    <div className="container mt-4">
      <h2> My Won Items</h2>
      {myOrders.length > 0 ? (
         <table className="table table-hover mt-3">
         </table>
      ) : (
         <p className="mt-4">You haven't won any auctions yet. Happy bidding!</p>
      )}
    </div>
  );
}