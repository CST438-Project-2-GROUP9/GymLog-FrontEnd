import { useEffect, useState } from 'react'
import '../styles/Admin.css'

export default function Admin() {
    const [users, setUsers] = useState([])
    const [searchId, setSearchId] = useState('')
    const [actionUserId, setActionUserId] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            setMessage('')

            const res = await fetch('http://localhost:8080/admin/users', {
                credentials: 'include'
                })
            if (!res.ok) throw new Error('Failed to fetch users')

            const data = await res.json()
            setUsers(data)
        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async () => {
        try {
            setLoading(true)
            setMessage('')
            console.log('searchId:', searchId)

            const res = await fetch(`http://localhost:8080/admin/users/${searchId}`, {
                credentials: 'include'
            })
            if (!res.ok) throw new Error('User not found')

            const data = await res.json()
            setUsers([data])
        } catch (error) {
            setUsers([])
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!actionUserId.trim()) {
            setMessage('Enter a user id to delete')
            return
        }

        try {
            setMessage('')

            const res = await fetch(`http://localhost:8080/admin/users/${actionUserId}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (!res.ok) throw new Error('Failed to delete user')

            setMessage('User deleted successfully')
            setActionUserId('')
            fetchUsers()
        } catch (error) {
            setMessage(error.message)
        }
    }

    const handleUpdateAdminStatus = async (status) => {
        if (!actionUserId.trim()) {
            setMessage('Enter a user id to update')
            return
        }

        try {
            setMessage('')

            const res = await fetch(`http://localhost:8080/admin/users/${actionUserId}?status=${status}`, {
                method: 'PATCH',
                credentials: 'include',
            })

            if (!res.ok) {
                throw new Error(`Failed to update user: ${res.status}`)
            }

            const data = await res.json()
            console.log('updated user:', data)

            setMessage(
                status ? 'User made admin successfully' : 'User removed from admin successfully'
            )
            setActionUserId('')
            fetchUsers()
        } catch (error) {
            console.error(error)
            setMessage(error.message)
        }
    }

    return (
        <div className="admin_controller">
            <div className="cardStyle">
                <h1 className="titleStyle">Admin Page</h1>

                <div className="admin-actions">
                    <input
                        type="text"
                        placeholder="Search by user id"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="admin-input"
                    />
                    <button onClick={handleSearch} className="admin-btn">
                        Search
                    </button>
                    <button onClick={fetchUsers} className="admin-btn secondary-btn">
                        Show All
                    </button>
                </div>

                <div className="admin-actions">
                    <input
                        type="text"
                        placeholder="Enter user id"
                        value={actionUserId}
                        onChange={(e) => setActionUserId(e.target.value)}
                        className="admin-input"
                    />
                    <button onClick={handleDelete} className="admin-btn delete-btn">
                        Delete User
                    </button>
                    <button
                        onClick={() => handleUpdateAdminStatus(true)}
                        className="admin-btn admin-btn-green"
                    >
                        Make Admin
                    </button>

                    <button
                        onClick={() => handleUpdateAdminStatus(false)}
                        className="admin-btn secondary-btn"
                    >
                        Remove Admin
                    </button>
                </div>

                {message && <p className="admin-message">{message}</p>}
                {loading && <p className="admin-loading">Loading...</p>}

                <div className="users-container">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.user_id} className="user-card">
                                <p><strong>ID:</strong> {user.id}</p>
                                <p><strong>Username:</strong> {user.username}</p>
                                {/*This means if user.isAdmin is True the first ? this value then : means else value*/}
                                <p><strong>Admin:</strong> {user.isAdmin ? 'True' : 'False' }</p>
                            </div>
                        ))
                    ) : (
                        !loading && <p className="no-users">No users found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}