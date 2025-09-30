import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage.js";
import DashboardPage from "./pages/DashboardPage.js";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./ProtectedRoute.js";
import BookManagementPage from "./pages/BookManagementPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. PUBLIC ROUTE: Login and Register (AuthPage handles both) */}
        <Route path="/" element={<AuthPage />} />

        {/* 2. PROTECTED ROUTES (Requires AdminLayout wrapper) */}
        {/* Catatan: Nanti kita akan tambahkan Auth Guard di sini */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Rute Default untuk /admin, arahkan ke dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          {/* Dashboard Utama */}
          <Route path="dashboard" element={<DashboardPage />} />
          {/* TODO: Rute-rute manajemen lainnya */}
          <Route path="books" element={<BookManagementPage />} />
          <Route
            path="members"
            element={<div>Manajemen Anggota Akan Datang...</div>}
          />
        </Route>

        {/* Rute 404 (Opsional) */}
        <Route
          path="*"
          element={
            <h1 className="text-3xl text-center mt-20">404: Page Not Found</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
