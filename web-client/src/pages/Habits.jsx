import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [goalDays, setGoalDays] = useState(7);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/habits');
      setHabits(res.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const addHabit = async () => {
    if (!newHabit.trim()) return;
    try {
      await axios.post('http://localhost:3001/api/habits/add', {
        name: newHabit,
        frequency,
        goal_days: goalDays,
      });
      setNewHabit('');
      setFrequency('Daily');
      setGoalDays(7);
      setShowAddModal(false);
      fetchHabits();
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const deleteHabit = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/habits/delete/${id}`);
      fetchHabits();
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const updateHabit = async (id, updates) => {
    try {
      await axios.put(`http://localhost:3001/api/habits/edit/${id}`, updates);
      fetchHabits();
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Habits</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Habit
        </button>
      </div>

      {/* Habit List Table */}
      <div className="grid grid-cols-5 font-semibold border-b pb-2 mb-2">
        <span>Habit</span>
        <span>Streak</span>
        <span>Frequency</span>
        <span>Goal</span>
        <span>Action</span>
      </div>
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="grid grid-cols-5 items-center py-2 border-t"
        >
          <span>{habit.name}</span>
          <span>{habit.streak}</span>
          <span>{habit.frequency}</span>
          <span>{habit.goal_days} days</span>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const newName = prompt('Edit name:', habit.name);
                const newFrequency = prompt('Edit frequency:', habit.frequency);
                const newGoalDays = prompt(
                  'Edit goal days:',
                  habit.goal_days
                );
                if (newName && newFrequency && newGoalDays) {
                  updateHabit(habit.id, {
                    name: newName,
                    frequency: newFrequency,
                    goal_days: parseInt(newGoalDays),
                  });
                }
              }}
              className="text-yellow-500 hover:text-yellow-700"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteHabit(habit.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {/* Add Habit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">Add Habit</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Habit Name</label>
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Goal Days</label>
                <input
                  type="number"
                  value={goalDays}
                  onChange={(e) => setGoalDays(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded"
                  min={1}
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={addHabit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habits;
