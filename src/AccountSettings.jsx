import { useNavigate } from "react-router-dom";

function AccountSettings() {
    const navigate = useNavigate();

    const pageStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e0e0, #f5f5f5)",
        fontFamily: "Arial, sans-serif",
    };

    const cardStyle = {
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        width: "100%",
        maxWidth: "360px",
        textAlign: "center",
    };

    const buttonStyle = {
        width: "100%",
        padding: "12px",
        marginTop: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1 style={{ color: "#222" }}>Account Settings</h1>
                <p style={{ color: "#444" }}>Manage your account</p>

                <button
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                    onClick={() => navigate("/edit-user")}
                >
                    Edit Profile
                </button>

                <button
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                    onClick={() => navigate("/user-info")}
                >
                    View User Info
                </button>
            </div>
        </div>
    );
}

export default AccountSettings;