import { NavLink } from 'react-router-dom';
import { FaListAlt, FaHome, FaCheckCircle, FaRedoAlt, FaChartLine } from 'react-icons/fa';

const Sidebar = () => {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-2 rounded hover:text-blue-500 ${
      isActive ? 'font-semibold text-blue-600' : 'text-gray-800'
    }`;

  return (
    <div className="h-screen w-60 bg-white shadow-lg p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-6">Habit Tracker</h2>

      <NavLink to="/dashboard" className={linkStyle}>
        <FaHome />
        Dashboard
      </NavLink>

      <NavLink to="/habits" className={linkStyle}>
        <FaListAlt />
        My Habits
      </NavLink>

      <NavLink to="/log-completion" className={linkStyle}>
        <FaCheckCircle />
        Log Completion
      </NavLink>

      <NavLink to="/view-streaks" className={linkStyle}>
        <FaChartLine />
        View Streaks
      </NavLink>

      <NavLink to="/reset-habit" className={linkStyle}>
        <FaRedoAlt />
        Reset Habit
      </NavLink>
    </div>
  );
};

export default Sidebar;
