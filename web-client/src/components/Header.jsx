import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/habits':
        return 'My Habits';
      case '/log-completion':
        return 'Log Completion';
      case '/view-streaks':
        return 'View Streaks';
      case '/reset-habit':
        return 'Reset Habit';
      default:
        return '';
    }
  };

  return (
    <header className="w-full bg-[#1e293b] shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-white tracking-wide">
        {getTitle()}
      </h1>
      <span className="text-sm text-gray-400">Welcome back!</span>
    </header>
  );
};

export default Header;
