import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/habits')
      .then((res) => {
        setHabits(res.data);
      })
      .catch((err) => console.error('Error:', err));
  }, []);
  

  const totalHabits = habits.length;
  const longestStreak = Math.max(0, ...habits.map(h => h.streak));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-medium text-lg mb-2">Total Habits</h3>
          <p className="text-3xl font-bold">{totalHabits}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-medium text-lg mb-2">Longest Streak</h3>
          <p className="text-3xl font-bold">{longestStreak} Days</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
        <Link
          to="/habits"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Habits
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
