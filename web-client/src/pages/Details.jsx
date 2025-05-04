import { useParams, useNavigate } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const mockHabit = {
    id,
    name: 'Exercise',
    frequency: 'Daily',
    streak: 5,
    description: 'A daily 30-minute exercise routine.',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Habit Details</h1>
      <div className="border p-4 rounded bg-white shadow-md">
        <p><strong>ID:</strong> {mockHabit.id}</p>
        <p><strong>Name:</strong> {mockHabit.name}</p>
        <p><strong>Frequency:</strong> {mockHabit.frequency}</p>
        <p><strong>Streak:</strong> {mockHabit.streak} days</p>
        <p><strong>Description:</strong> {mockHabit.description}</p>
      </div>
      <button
        onClick={() => navigate('/habits')}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Habits
      </button>
    </div>
  );
};

export default Details;