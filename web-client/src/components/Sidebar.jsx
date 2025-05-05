import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaListAlt, FaHome, FaCheckCircle, FaRedoAlt, FaChartLine, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white font-semibold shadow-md'
        : 'text-gray-400 hover:text-white hover:bg-[#1e293b]'
    }`;

  return (
    <aside
      className={`h-screen ${
        collapsed ? 'w-20' : 'w-64'
      } bg-[#0f172a] flex flex-col justify-between shadow-lg transition-all duration-300`}
    >
      <div className="p-4">
        {/* Collapse/Expand Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white mb-6 focus:outline-none"
        >
          <FaBars size={20} />
        </button>

        {/* Logo / Title */}
        {!collapsed && (
          <h1 className="text-2xl font-bold text-blue-400 mb-8 tracking-wide transition-all duration-300">
            Habit Tracker
          </h1>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" className={linkStyle}>
            <FaHome />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/habits" className={linkStyle}>
            <FaListAlt />
            {!collapsed && <span>My Habits</span>}
          </NavLink>

          <NavLink to="/log-completion" className={linkStyle}>
            <FaCheckCircle />
            {!collapsed && <span>Log Completion</span>}
          </NavLink>

          <NavLink to="/view-streaks" className={linkStyle}>
            <FaChartLine />
            {!collapsed && <span>View Streaks</span>}
          </NavLink>

          <NavLink to="/reset-habit" className={linkStyle}>
            <FaRedoAlt />
            {!collapsed && <span>Reset Habit</span>}
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 text-xs text-gray-500 text-center">
          © 2025 Habit Tracker
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
