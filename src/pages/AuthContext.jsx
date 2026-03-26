import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const API_BASE =
        import.meta.env.VITE_API_BASE_URL ?? "https://gymlog-backend-5.onrender.com";

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/user/currentUser`, {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Not authenticated");
                }
                return res.json();
            })
            .then((data) => {
                setUser(data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [API_BASE]);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}