import { useState } from "react";

function App() {
    const [view, setView] = useState("signin");
    const [message, setMessage] = useState("");

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const [signupForm, setSignupForm] = useState({
        username: "",
        password: "",
    });

    function handleLoginChange(e) {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    }

    function handleSignupChange(e) {
        setSignupForm({
            ...signupForm,
            [e.target.name]: e.target.value,
        });
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        console.log("Login:", loginForm);
        setMessage("Username/password login not implemented yet.");
    }

    function handleSignupSubmit(e) {
        e.preventDefault();
        console.log("Signup:", signupForm);
        setMessage("Username/password signup not implemented yet.");
    }

    function handleGoogleLogin() {
        setMessage("Redirecting to Google...");
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    }

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
        animation: "fadeIn 0.6s ease",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const primaryButtonStyle = {
        width: "100%",
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
    };

    const googleButtonStyle = {
        width: "100%",
        padding: "10px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    };

    const linkButtonStyle = {
        background: "none",
        border: "none",
        color: "#2e7d32",
        cursor: "pointer",
        textDecoration: "underline",
        padding: 0,
        fontWeight: "bold",
    };

    const titleStyle = {
        textAlign: "center",
        marginBottom: "0.5rem",
        color: "#222",
    };

    const subtitleStyle = {
        textAlign: "center",
        color: "#444",
        marginBottom: "1.5rem",
    };

    const messageStyle = {
        marginTop: "1rem",
        textAlign: "center",
        color: "#333",
    };

    return (
        <div style={pageStyle}>
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .dumbbell {
            font-size: 1.67rem;
            text-align: center;
            animation: lift 1.5s infinite ease-in-out;
            color: #2e7d32;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }

          @keyframes lift {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }
        `}
            </style>

            <div style={cardStyle}>
                <div className="dumbbell">GET THOSE GAINS</div>

                <h1 style={titleStyle}>Fitness Tracker</h1>

                <p style={subtitleStyle}>
                    {view === "signin" ? "Welcome back" : "Create your account"}
                </p>

                {view === "signin" && (
                    <div>
                        <h2 style={{ textAlign: "center", color: "#222" }}>Sign In</h2>

                        <form onSubmit={handleLoginSubmit} style={formStyle}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={loginForm.username}
                                onChange={handleLoginChange}
                                style={inputStyle}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginForm.password}
                                onChange={handleLoginChange}
                                style={inputStyle}
                            />

                            <button
                                type="submit"
                                style={primaryButtonStyle}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                            >
                                Sign In
                            </button>
                        </form>

                        <div style={{ marginTop: "1rem" }}>
                            <p style={{ textAlign: "center", color: "#444" }}>
                                Or sign in with
                            </p>
                            <button
                                onClick={handleGoogleLogin}
                                style={googleButtonStyle}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#357ae8")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#4285F4")}
                            >
                                Google
                            </button>
                        </div>

                        <p style={{ textAlign: "center", marginTop: "1rem" }}>
                            Don&apos;t have an account?{" "}
                            <button type="button" onClick={() => setView("signup")} style={linkButtonStyle}>
                                Sign Up
                            </button>
                        </p>
                    </div>
                )}

                {view === "signup" && (
                    <div>
                        <h2 style={{ textAlign: "center", color: "#222" }}>Sign Up</h2>

                        <form onSubmit={handleSignupSubmit} style={formStyle}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={signupForm.username}
                                onChange={handleSignupChange}
                                style={inputStyle}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={signupForm.password}
                                onChange={handleSignupChange}
                                style={inputStyle}
                            />

                            <button
                                type="submit"
                                style={primaryButtonStyle}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                            >
                                Create Account
                            </button>
                        </form>

                        <div style={{ marginTop: "1rem" }}>
                            <p style={{ textAlign: "center", color: "#444" }}>
                                Or sign up with
                            </p>
                            <button
                                onClick={handleGoogleLogin}
                                style={googleButtonStyle}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#357ae8")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#4285F4")}
                            >
                                Google
                            </button>
                        </div>

                        <p style={{ textAlign: "center", marginTop: "1rem" }}>
                            Already have an account?{" "}
                            <button type="button" onClick={() => setView("signin")} style={linkButtonStyle}>
                                Sign In
                            </button>
                        </p>
                    </div>
                )}

                {message && <p style={messageStyle}>{message}</p>}
            </div>
        </div>
    );
}

export default App;