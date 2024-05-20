import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CartProvider } from "./context/CartContext";

// * Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// * User Pages
import Home from "./pages/Home";
import Cart from "./pages/cart/Cart";
import Transactions from "./pages/transactions/Transactions";
import Transaction from "./pages/transactions/Transaction";
import OrderTracking from "./pages/transactions/OrderTracking";
import Medicines from "./pages/medicines/Medicines";
import Payment from "./pages/cart/Payment";
import Medicine from "./pages/medicines/Medicine";
import Support from "./pages/Support";

// * Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import CreateMedicine from "./pages/admin/CreateMedicine";
import AdminMedicines from "./pages/admin/AdminMedicines";
import AdminTransactions from "./pages/admin/AdminTransactions";

// * Components
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Filials from "./pages/Filials";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/locations" element={<Filials />} />
                <Route path="/medicines/:id" element={<Medicine />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/transactions/:id" element={<Transaction />} />
                <Route
                  path="/transactions/:id/order-tracking"
                  element={<OrderTracking />}
                />
                <Route path="/checkout" element={<Payment />} />
                <Route path="/support" element={<Support />} />

                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/medicines" element={<AdminMedicines />} />
                <Route
                  path="/admin/transactions"
                  element={<AdminTransactions />}
                />
                <Route path="/admin/users" element={<Users />} />
                <Route
                  path="/admin/create-medicine"
                  element={<CreateMedicine />}
                />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Suspense>
        </BrowserRouter>

        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              mawWidth: "900px",
              padding: "16px 24px",
              color: "#fff",
              background: "#333",
              borderRadius: "8px",
            },
          }}
        />
      </QueryClientProvider>
    </CartProvider>
  );
};

export default App;
