import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogCompletion = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState('');
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/habits')
      .then(res => setHabits(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleLog = () => {
    if (completed && selectedHabit) {
      axios.post(`http://localhost:3001/api/habits/log/${selectedHabit}`)
        .then(() => {
          setMessage('Habit logged successfully!');
          setSelectedHabit('');
          setCompleted(false);
          setTimeout(() => setMessage(''), 3000);
        })
        .catch(err => {
          console.error('Log error:', err);
          setMessage('Failed to log habit.');
          setTimeout(() => setMessage(''), 3000);
        });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-[#1e293b] text-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Log Completion</h2>

      <label className="block mb-2 font-semibold">Select Habit</label>
      <select
        className="w-full bg-gray-700 border border-gray-600 px-4 py-2 rounded mb-4"
        value={selectedHabit}
        onChange={(e) => setSelectedHabit(e.target.value)}
      >
        <option value="">-- Choose a habit --</option>
        {habits.map(h => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>

      <label className="flex items-center mb-6">
        <input
          type="checkbox"
          className="mr-2"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Mark as Completed Today
      </label>

      <div className="flex justify-end gap-3">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelectedHabit('');
            setCompleted(false);
          }}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 rounded text-white ${
            selectedHabit && completed
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-900 cursor-not-allowed'
          }`}
          onClick={handleLog}
          disabled={!selectedHabit || !completed}
        >
          Yes, Log It
        </button>
      </div>

      {message && (
        <div className="mt-4 p-3 bg-green-700 text-white rounded text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default LogCompletion;
