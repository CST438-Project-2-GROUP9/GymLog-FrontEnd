import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [notLoggedIn, setNotLoggedIn] = useState(false);

    useEffect(() => {
        let cancelled = false;

        fetch(`${API_BASE}/user/currentUser`, {
            credentials: "include",
        })
            .then(async (res) => {
                if (cancelled) return;

                if (res.status === 401 || res.status === 403) {
                    setNotLoggedIn(true);
                    setLoading(false);
                    return;
                }

                if (!res.ok) throw new Error("Failed to fetch current user");

                const data = await res.json();
                setIsAdmin(Boolean(data.isAdmin));
                setLoading(false);
            })
            .catch(() => {
                if (cancelled) return;
                setIsAdmin(false);
                setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [API_BASE]);

    if (loading) return <div>Loading...</div>;
    if (notLoggedIn) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/dashboard" replace />;

    return children;
}