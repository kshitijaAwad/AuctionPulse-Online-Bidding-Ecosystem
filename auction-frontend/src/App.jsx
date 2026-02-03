import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import LiveAuctions from "./pages/LiveAuctions";
import StartAuction from "./pages/StartAuction";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddProducts from "./pages/AddProducts";
import AdminOrders from "./pages/AdminOrders"; 
import UpdateProduct from "./pages/UpdateProduct"; 


export default function App() {
  const [navRefresh, setNavRefresh] = useState(0);

  return (
    <BrowserRouter>
      <Navbar navRefresh={navRefresh} setNavRefresh={setNavRefresh} />
      
      <div className="min-vh-100 bg-light">
        <Routes>
  
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/auctions/live" element={<LiveAuctions />} />
          <Route path="/login" element={<Login setNavRefresh={setNavRefresh} />} />
          <Route path="/register" element={<Register />} />
          
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          
          <Route path="/add-product" element={
            <ProtectedRoute allowedRoles={["SELLER", "ROLE_SELLER", "CUSTOMER"]}>
              <AddProducts />
            </ProtectedRoute>
          } />
          
          <Route path="/update-product/:id" element={
            <ProtectedRoute allowedRoles={["SELLER", "ROLE_SELLER", "CUSTOMER"]}>
              <UpdateProduct />
            </ProtectedRoute>
          } />
          
          <Route path="/seller/start-auction" element={<StartAuction />} />

          <Route path="/auctions/start" element={
            <ProtectedRoute allowedRoles={["SELLER", "ROLE_SELLER", "CUSTOMER"]}>
              <StartAuction />
            </ProtectedRoute>
          } />

          {/*  ADMIN ONLY ROUTES */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={["ADMIN", "ROLE_ADMIN"]}>
              <div className="container mt-5">
                <div className="card bg-dark text-white p-5 shadow">
                  <h2>Admin Dashboard</h2>
                  <p className="text-muted">Overview of system operations.</p>
                </div>
              </div>
            </ProtectedRoute>
          } />

          <Route path="/admin/orders" element={
            <ProtectedRoute allowedRoles={["ADMIN", "BUYER"]}>
              <AdminOrders />
            </ProtectedRoute>
          } />

          

          <Route path="*" element={
            <div className="container mt-5 text-center">
              <h1>404</h1>
              <p>Page not found.</p>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}