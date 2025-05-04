const express = require('express');
const router = express.Router();
const db = require('../db');

//Add Habit
router.post('/add', (req, res) => {
  const { name, frequency, goal_days } = req.body;
  db.query(
    'INSERT INTO habits (name, frequency, goal_days) VALUES (?, ?, ?)',
    [name, frequency, goal_days],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Habit added!', id: results.insertId });
    }
  );
});

//Log Completion
router.post('/log/:id', (req, res) => {
    const id = req.params.id;
  
    // Get today's date in YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
  
    // Update last_completed and increment streak
    db.query(
      'UPDATE habits SET last_completed = ?, streak = streak + 1 WHERE id = ?',
      [today, id],
      (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Habit completion logged!' });
      }
    );
  });

//Edit Habit
router.put('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, frequency, goal_days } = req.body;
  
    db.query(
      'UPDATE habits SET name = ?, frequency = ?, goal_days = ? WHERE id = ?',
      [name, frequency, goal_days, id],
      (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Habit updated successfully!' });
      }
    );
  });

//Delete Habit
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM habits WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Habit deleted successfully!' });
    });
  });
  
//View All Habits with Streaks
router.get('/streaks', (req, res) => {
    db.query('SELECT * FROM habits', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

//Reset Habit
router.put('/reset/:id', (req, res) => {
    const id = req.params.id;
  
    db.query(
      'UPDATE habits SET streak = 0, last_completed = NULL WHERE id = ?',
      [id],
      (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Habit reset successfully!' });
      }
    );
  });
  
module.exports = router;
