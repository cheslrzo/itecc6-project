import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResetHabit = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/habits')
      .then(res => setHabits(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const confirmReset = () => {
    setShowModal(true);
    setResetSuccess(false);
  };

  const handleReset = () => {
    axios.put(`http://localhost:3001/api/habits/reset/${selectedHabit}`)
      .then(() => {
        setShowModal(false);
        setResetSuccess(true);
        setSelectedHabit('');
      })
      .catch(err => console.error('Reset error:', err));
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white dark:bg-gray-800 shadow rounded text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Habits</h2>

      <label className="block mb-2">Habit:</label>
      <select
        className="w-full border px-4 py-2 mb-4 rounded dark:bg-gray-700 dark:border-gray-600"
        value={selectedHabit}
        onChange={(e) => {
          setSelectedHabit(e.target.value);
          setResetSuccess(false);
        }}
      >
        <option value="">Select a habit</option>
        {habits.map(h => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>

      <p className="mb-4 text-red-500 dark:text-red-400">
        Are you sure you want to reset this habit? This will erase the current streak.
      </p>

      <div className="flex justify-between">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          onClick={confirmReset}
          disabled={!selectedHabit}
        >
          Yes
        </button>
        <button
          className="bg-gray-300 dark:bg-gray-600 dark:text-white text-black px-4 py-2 rounded"
          onClick={() => setSelectedHabit('')}
        >
          Cancel
        </button>
      </div>

      {resetSuccess && (
        <div className="mt-6 p-3 bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200 rounded text-center">
          ✅ Habit reset successfully!
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Confirm Reset
            </h3>
            <p className="mb-4 text-center">
              This will reset the streak for <strong>{habits.find(h => h.id === parseInt(selectedHabit))?.name}</strong>.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 dark:bg-gray-600 dark:text-white text-black px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={handleReset}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetHabit;
