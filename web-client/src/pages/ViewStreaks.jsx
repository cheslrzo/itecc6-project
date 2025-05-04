import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewStreaks = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/habits')
      .then(res => setHabits(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">View Streaks</h2>
      <ul className="space-y-2">
        {habits.map(h => (
          <li key={h.id} className="border p-3 rounded flex justify-between">
            <span>{h.name}</span>
            <span>{h.streak}-day streak</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewStreaks;
