import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar({ isAdmin = false }) {
    const handleLogout = () => {
        window.location.href = 'https://gymlog-backend-5.onrender.com/logout'
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span className="navbar-title">FitnessTracker</span>
            </div>

            <div className="navbar-links">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                    Profile
                </NavLink>

                {isAdmin && (
                    <NavLink
                        to="/admin"
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Admin
                    </NavLink>
                )}
            </div>

            <button className="navbar-logout" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}