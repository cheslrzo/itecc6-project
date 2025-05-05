import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [goalDays, setGoalDays] = useState('0');
  const [editHabitData, setEditHabitData] = useState(null);
  const [habitToDelete, setHabitToDelete] = useState(null);

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
        goal_days: parseInt(goalDays, 10),
      });
      resetForm();
      setShowAddModal(false);
      fetchHabits();
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const confirmDeleteHabit = async () => {
    if (!habitToDelete) return;
    try {
      await axios.delete(`http://localhost:3001/api/habits/delete/${habitToDelete.id}`);
      setShowDeleteModal(false);
      setHabitToDelete(null);
      fetchHabits();
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const handleEditClick = (habit) => {
    setEditHabitData(habit);
    setNewHabit(habit.name);
    setFrequency(habit.frequency);
    setGoalDays(String(habit.goal_days));
    setShowEditModal(true);
  };

  const updateHabit = async () => {
    if (!editHabitData) return;
    try {
      await axios.put(`http://localhost:3001/api/habits/edit/${editHabitData.id}`, {
        name: newHabit,
        frequency,
        goal_days: parseInt(goalDays),
      });
      resetForm();
      setShowEditModal(false);
      fetchHabits();
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  const resetForm = () => {
    setNewHabit('');
    setFrequency('Daily');
    setGoalDays('0');
    setEditHabitData(null);
  };

  const renderModal = (isEdit = false) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1e293b] text-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">{isEdit ? 'Edit Habit' : 'Add Habit'}</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Habit Name</label>
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>
          <div>
            <label className="block mb-1">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Goal Days</label>
            <input
              type="number"
              value={goalDays}
              min="0"
              onChange={(e) => {
                let val = e.target.value.replace(/^0+(?!$)/, '');
                if (val === '') val = '0';
                if (/^\d+$/.test(val)) {
                  setGoalDays(val);
                }
              }}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => {
                resetForm();
                isEdit ? setShowEditModal(false) : setShowAddModal(false);
              }}
              className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={isEdit ? updateHabit : addHabit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Habits</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Habit
        </button>
      </div>

      {/* Habit List Table */}
      <div className="grid grid-cols-5 font-semibold border-b border-gray-600 pb-2 mb-2 text-gray-300">
        <span>Habit</span>
        <span>Streak</span>
        <span>Frequency</span>
        <span>Goal</span>
        <span>Action</span>
      </div>
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="grid grid-cols-5 items-center py-3 border-t border-gray-700 hover:bg-[#1e293b] rounded transition"
        >
          <span>{habit.name}</span>
          <span>{habit.streak}</span>
          <span>{habit.frequency}</span>
          <span>{habit.goal_days} days</span>
          <div className="flex gap-3">
            <button
              onClick={() => handleEditClick(habit)}
              className="text-yellow-400 hover:text-yellow-300"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => {
                setHabitToDelete(habit);
                setShowDeleteModal(true);
              }}
              className="text-red-500 hover:text-red-400"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {/* Modals */}
      {showAddModal && renderModal(false)}
      {showEditModal && renderModal(true)}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#1e293b] text-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Delete Habit</h3>
            <p className="mb-4">Are you sure you want to delete the habit "<strong>{habitToDelete?.name}</strong>"?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setHabitToDelete(null);
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteHabit}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habits;
