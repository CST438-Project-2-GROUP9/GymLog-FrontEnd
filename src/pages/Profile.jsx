import Navbar from "../components/Navbar";
import { useAuth } from "./AuthContext.jsx";

export default function Profile() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#111827", color: "white" }}>
                <Navbar isAdmin={false} />
                <div style={{ padding: "2rem" }}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#111827", color: "white" }}>
            <Navbar isAdmin={user?.isAdmin} />

            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Profile</h1>
                <p style={{ color: "#9ca3af", marginBottom: "2rem" }}>
                    Your account information
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "1rem",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #374151",
                            borderRadius: "12px",
                            padding: "1rem",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "0.9rem",
                                color: "#9ca3af",
                                marginBottom: "0.35rem",
                            }}
                        >
                            Email
                        </div>
                        <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                            {user?.username || "Not available"}
                        </div>
                    </div>

                    <div
                        style={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #374151",
                            borderRadius: "12px",
                            padding: "1rem",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "0.9rem",
                                color: "#9ca3af",
                                marginBottom: "0.35rem",
                            }}
                        >
                            Role
                        </div>
                        <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                            {user?.isAdmin ? "Admin" : "User"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}