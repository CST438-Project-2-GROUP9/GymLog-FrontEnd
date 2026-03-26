import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Exercises.css';
import Navbar from '../components/Navbar';
import { useAuth } from './AuthContext';

export default function Exercises() {
    const {user} = useAuth();
    const  location = useLocation();

    const workoutId = location.state?.workoutId || 14; // I'm defaulting this to 1 until I talk to Victor

    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [category, setCategory] = useState('Upper'); // Mockup default
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [inputs, setInputs] = useState({});
    const [currentWorkoutExercises, setCurrentWorkoutExercises] = useState([]);

    useEffect(() => {
        fetchExercises();
        fetchCurrentWorkout();
    }, []);

    const fetchExercises = async () => {
        try {
            setLoading(true);
            setMessage('');

            const res = await fetch('https://gymlog-backend-5.onrender.com/api/exercises', {
                credentials: 'include'
                })
            if (!res.ok) throw new Error('Failed to fetch exercises');

            const data = await res.json();
            setExercises(data);

            const initialInputs = {};
            data.forEach(ex => {
                initialInputs[ex.id] = { sets: 3, reps: 10 };
                });
            setInputs(initialInputs);

            filterByRegion(data, 'Upper');

        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchCurrentWorkout = async () => {
        try {
            const res = await fetch(`https://gymlog-backend-5.onrender.com/api/workouts/${workoutId}/exercises`, {
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json();
                setCurrentWorkoutExercises(data);
            }

        } catch (e) {
            console.error("Could not fetch current workout entries", e);
        }
    };

    const filterByRegion = (allExercises, region) => {
        setCategory(region);
        const filtered = allExercises.filter(ex => ex.bodyRegion === region);
        setFilteredExercises(filtered);
    };

    // Helper to update specific input for a specific exercise
    const handleInputChange = (id, field, value) => {
        setInputs(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: parseInt(value)
            }
        }));
    };

    const handleAddExercise = async (exerciseId) => {
        try {
            const { sets, reps } = inputs[exerciseId];

            const res = await fetch(`https://gymlog-backend-5.onrender.com/api/workouts/${workoutId}/exercises`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    exerciseId: exerciseId,
                    sets: sets,
                    reps: reps
                }),
                credentials: 'include'
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to add');
            }

            setMessage('Added to Workout!')
            fetchCurrentWorkout();
            setTimeout(() => setMessage(''), 2000);
        } catch (e) {
            setMessage(e.message);
        }
    }

    const getExerciseName = (id) => {
        const found = exercises.find(ex => ex.id === id);
        return found ? found.name : `Exercise #${id}`;
    };

    return (
        <>
            <Navbar isAdmin={user?.isAdmin} />

            <div className="exercises-page-wrapper">

                {/* SECTION 1: EXERCISE LIBRARY */}
                <div className="exercise-card-container">
                    <div className="exercise-header">
                        <h1 className="titleStyle" style={{textAlign: 'left', marginBottom: '5px'}}>Library</h1>
                        <p style={{color: '#666', fontSize: '0.85rem'}}>Browsing: <strong>{category}</strong> Body</p>
                    </div>

                    <div className="filter-tabs">
                        {['Upper', 'Lower', 'Full'].map((region) => (
                            <button
                                key={region}
                                className={`tab-btn ${category === region ? 'active-tab' : ''}`}
                                onClick={() => filterByRegion(exercises, region)}
                            >
                                {region}
                            </button>
                        ))}
                    </div>

                    {message && <p className="admin-message">{message}</p>}
                    {loading && <p className="admin-loading" style={{color: '#2e7d32'}}>Loading GAINS...</p>}

                    <div className="exercise-list">
                        {filteredExercises.map((ex) => (
                            <div key={ex.id} className="exercise-item">
                                <span className="exercise-name">{ex.name}</span>
                                <div className="exercise-controls">
                                    <div className="input-group">
                                        <label>Sets</label>
                                        <select
                                            value={inputs[ex.id]?.sets || 3}
                                            onChange={(e) => handleInputChange(ex.id, 'sets', e.target.value)}
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label>Reps</label>
                                        <select
                                            value={inputs[ex.id]?.reps || 10}
                                            onChange={(e) => handleInputChange(ex.id, 'reps', e.target.value)}
                                        >
                                            {[5, 8, 10, 12, 15, 20].map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>
                                    <button className="admin-btn admin-btn-green" onClick={() => handleAddExercise(ex.id)}>
                                        ADD
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 2: CURRENT WORKOUT */}
                <div className="exercise-card-container workout-side">
                    <div className="exercise-header">
                        <h1 className="titleStyle" style={{textAlign: 'left', marginBottom: '5px'}}>Workout #{workoutId}</h1>
                        <p style={{color: '#666', fontSize: '0.85rem'}}>Current Routine</p>
                    </div>

                    <div className="exercise-list">
                        {currentWorkoutExercises.length > 0 ? (
                            currentWorkoutExercises.map((entry, index) => (
                                <div key={index} className="exercise-item">
                                    <span className="exercise-name">{getExerciseName(entry.exerciseId)}</span>

                                    <div className="exercise-controls">
                                        <div className="stat-group">
                                            <span className="stat-label">SETS</span>
                                            <span className="stat-value">{entry.sets}</span>
                                        </div>
                                        <div className="stat-group">
                                            <span className="stat-label">REPS</span>
                                            <span className="stat-value">{entry.reps}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-users">No exercises added to this session yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}