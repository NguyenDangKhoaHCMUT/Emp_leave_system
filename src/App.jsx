import Home from "~/pages/Home";
import Admin from "~/pages/Admin";
import Layout from "~/pages/Layout";
import Login from "~/pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminRoute, UserRoute, PublicRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={
              <UserRoute>
                <Home />
              </UserRoute>
            } />
            <Route path="/admin" element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
