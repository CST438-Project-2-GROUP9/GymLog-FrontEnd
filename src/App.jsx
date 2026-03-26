import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
import Admin from './pages/Admin';
import AdminRoute from "./pages/AdminRoute";
import WorkoutsPage from "./pages/WorkoutsPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/workouts" element={<WorkoutsPage />} />
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}