import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogCompletion = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/habits')
      .then(res => setHabits(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleLog = () => {
    if (completed && selectedHabit) {
      axios.post(`http://localhost:3001/api/habits/log/${selectedHabit}`)
        .then(() => {
          alert('Habit logged!');
          setSelectedHabit('');
          setCompleted(false);
        })
        .catch(err => console.error('Log error:', err));
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Log Completion</h2>
      <label className="block mb-2">Add Habit</label>
      <select
        className="w-full border px-4 py-2 mb-4"
        value={selectedHabit}
        onChange={(e) => setSelectedHabit(e.target.value)}
      >
        <option value="">Select a habit</option>
        {habits.map(h => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          className="mr-2"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed Today
      </label>

      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleLog}
        >
          Yes
        </button>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => {
            setSelectedHabit('');
            setCompleted(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogCompletion;
