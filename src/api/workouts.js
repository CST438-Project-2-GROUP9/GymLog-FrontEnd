const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export async function getWorkouts() {
    const res = await fetch(`${API_BASE}/api/workouts`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Failed to load workouts (${res.status})`);
    return res.json();
}

export async function addWorkout({ userId, name }) {
    const res = await fetch(`${API_BASE}/api/workouts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, name }),
    });
    if (!res.ok) throw new Error(`Failed to add workout (${res.status})`);
    return res.json(); // created workout
}

export async function removeWorkout(id) {
    const res = await fetch(`${API_BASE}/api/workouts/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (res.status !== 204 && !res.ok) throw new Error(`Failed to delete workout (${res.status})`);
}