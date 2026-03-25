import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch("https://gymlog-backend-5.onrender.com/user/currentUser", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch current user");
                }
                return res.json();
            })
            .then((data) => {
                console.log("current user response:", data);
                setIsAdmin(data.isAdmin);
                setLoading(false);
            })
            .catch((err) => {
                console.error("current user fetch failed:", err);
                setIsAdmin(false);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}