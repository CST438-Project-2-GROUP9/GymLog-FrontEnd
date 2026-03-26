import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminRoute from "./pages/AdminRoute";
import Profile from "./pages/Profile";
import Workout from "./pages/Workout";
import WorkoutsPage from "./pages/WorkoutsPage";
import Exercises from "./pages/Exercises";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/workouts" element={<WorkoutsPage />} />
                <Route path="/exercises" element={<Exercises />} />
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