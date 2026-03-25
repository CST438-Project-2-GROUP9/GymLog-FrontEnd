import { useEffect, useState } from "react";
import { getWorkouts, addWorkout, removeWorkout } from "../api/workouts.js";

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [name, setName] = useState("");
    const [userId, setUserId] = useState(1); // TEMP until you have /user/currentUser
    const [error, setError] = useState("");

    async function load() {
        setError("");
        try {
            const data = await getWorkouts();
            setWorkouts(data);
        } catch (e) {
            setError(e.message);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function onAdd(e) {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;

        setError("");
        try {
            const created = await addWorkout({ userId: Number(userId), name: trimmed });
            setWorkouts((prev) => [created, ...prev]);
            setName("");
        } catch (e) {
            setError(e.message);
        }
    }

    async function onDelete(id) {
        setError("");
        // optimistic UI
        const prev = workouts;
        setWorkouts((w) => w.filter((x) => x.id !== id));

        try {
            await removeWorkout(id);
        } catch (e) {
            setWorkouts(prev);
            setError(e.message);
        }
    }

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", padding: 16 }}>
            <h2>Workouts</h2>

            <form onSubmit={onAdd} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    style={{ width: 110, padding: 10 }}
                    placeholder="userId"
                />
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ flex: 1, padding: 10 }}
                    placeholder="Workout name"
                />
                <button type="submit">Add</button>
            </form>

            {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

            {workouts.length === 0 ? (
                <p>No workouts yet.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {workouts.map((w) => (
                        <li key={w.id} style={{ display: "flex", justifyContent: "space-between", padding: 10, border: "1px solid #ddd", marginBottom: 8 }}>
              <span>
                <b>{w.name}</b> (id: {w.id}, userId: {w.userId})
              </span>
                            <button onClick={() => onDelete(w.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={load} style={{ marginTop: 12 }}>Refresh</button>
        </div>
    );
}