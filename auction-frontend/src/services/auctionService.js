const BASE_URL = "http://localhost:8181/auctions";

export async function startAuction(auctionData) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(auctionData),
  });
  if (!res.ok) throw new Error(await res.text() || "Failed to start auction");
  return await res.json();
}

export async function getLiveAuctions() {
  const res = await fetch(`${BASE_URL}/live`);
  if (!res.ok) throw new Error("Failed to fetch live auctions");
  return await res.json();
}