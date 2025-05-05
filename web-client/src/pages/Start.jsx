import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="text-center bg-slate-800 p-10 rounded-xl shadow-lg max-w-xl w-full">
        <h1 className="text-xl font-semibold text-gray-300 mb-2">Habit Tracker</h1>
        <hr className="w-48 border-gray-600 mx-auto mb-6" />

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
          Build Better Habits,<br />Build a Better Life
        </h2>

        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transform transition duration-200"
        >
          Start Daily Habits
        </button>
      </div>
    </div>
  );
};

export default Start;
