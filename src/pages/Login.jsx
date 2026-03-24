import { useState } from "react";
import "../styles/Login.css";

export default function Login() {
    const [message, setMessage] = useState("");

    function handleGoogleLogin() {
        setMessage("Redirecting to Google...");
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    }

    return (
        <div className="pageStyle">
            <div className="cardStyle">
                <div className="dumbbell">GET THOSE GAINS</div>

                <h1 className="titleStyle">Fitness Tracker</h1>

                <p className="subtitleStyle">
                    Sign in with Google to continue
                </p>

                <button
                    className="googleButtonStyle"
                    onClick={handleGoogleLogin}
                >
                    Google
                </button>

                {message && <p className="messageStyle">{message}</p>}
            </div>
        </div>
    );
}