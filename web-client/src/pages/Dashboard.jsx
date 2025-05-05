import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/habits')
      .then((res) => setHabits(res.data))
      .catch((err) => console.error('Error:', err));
  }, []);

  const totalHabits = habits.length;
  const longestStreak = Math.max(0, ...habits.map(h => h.streak));

  return (
    <div className="p-8 bg-[#1e293b] min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Total Habits Card */}
          <div
            onClick={() => navigate('/habits')}
            className="bg-[#334155] shadow-md rounded-xl p-6 cursor-pointer transform transition duration-200 hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
          >
            <h3 className="text-lg text-gray-300 mb-1">Total Habits</h3>
            <p className="text-4xl font-bold text-blue-200">{totalHabits}</p>
          </div>

          {/* Longest Streak Card */}
          <div
            onClick={() => navigate('/view-streaks')}
            className="bg-[#334155] shadow-md rounded-xl p-6 cursor-pointer transform transition duration-200 hover:scale-105 hover:bg-green-600 hover:shadow-lg"
          >
            <h3 className="text-lg text-gray-300 mb-1">Longest Streak</h3>
            <p className="text-4xl font-bold text-green-200">{longestStreak} Days</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
