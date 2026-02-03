const BASE_URL = "http://localhost:8181/bids";

export async function placeBid(bidData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/place`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(bidData),
  });

  if (!res.ok) {
    const errorMsg = await res.text();
    throw new Error(errorMsg || "Failed to place bid");
  }

  const text = await res.text();
  return text ? JSON.parse(text) : {};
}