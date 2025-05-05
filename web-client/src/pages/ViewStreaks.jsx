import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewStreaks = () => {
  const [habits, setHabits] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:3001/api/habits')
      .then(res => setHabits(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const filteredHabits = habits
    .filter(h => filter === 'All' || h.frequency === filter)
    .sort((a, b) => b.streak - a.streak);

  return (
    <div className="p-8 max-w-xl mx-auto bg-white dark:bg-gray-800 shadow rounded text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">View Streaks</h2>

      <div className="mb-4">
        <label className="block mb-1">Filter by Frequency</label>
        <select
          className="w-full border px-4 py-2 rounded dark:bg-gray-700 dark:border-gray-600"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <ul className="space-y-2">
        {filteredHabits.map(h => (
          <li
            key={h.id}
            className="border p-3 rounded flex justify-between items-center dark:border-gray-600"
          >
            <span className="font-medium">{h.name}</span>
            <span className="font-semibold">{h.streak}-day streak</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewStreaks;
