import Navbar from '../components/Navbar'
import { useAuth } from './AuthContext.jsx';
export default function AdminRoute() {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    return (
        <>
            <Navbar isAdmin={user?.isAdmin} />
        </>
    )
}