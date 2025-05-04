import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResetHabit = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/habits')
      .then(res => setHabits(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleReset = () => {
    if (!selectedHabit) return;
    axios.put(`http://localhost:3001/api/habits/reset/${selectedHabit}`)
      .then(() => {
        alert('Habit reset!');
        setSelectedHabit('');
      })
      .catch(err => console.error('Reset error:', err));
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Habits</h2>
      <label className="block mb-2">Habit:</label>
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

      <p className="mb-4 text-red-500">Are you sure you want to reset this habit? This will erase the current streak.</p>

      <div className="flex justify-between">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          Yes
        </button>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => setSelectedHabit('')}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResetHabit;
