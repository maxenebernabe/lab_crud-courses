const db = require('../config/db');

// CREATE
exports.createCourses = (req, res) => {
  const { course_code, course_name, year_level } = req.body;
  if (!course_code || !course_name) return res.status(400).json({ error: 'course code and course name are required' });

  const sql = 'INSERT INTO courses (course_code, course_name, year_level) VALUES (?, ?, ?)';
  db.query(sql, [course_code, course_name, year_level || null], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'course created', id: result.insertId });
  });
};

// READ ALL 
exports.getCourses = (req, res) => {
  db.query('SELECT * FROM courses', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// READ BY ID
exports.getCourseById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM courses WHERE id=?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: 'course not found' });
    res.json(rows[0]);
  });
};

// UPDATE
exports.updateCourses = (req, res) => {
  const { id } = req.params;
  const { course_code, course_name, year_level } = req.body;
  db.query('UPDATE courses SET course_code=?, course_name=?, year_level=? WHERE id=?',
    [course_code, course_name || null, year_level || null, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'course not found' });
      res.json({ message: 'course updated' });
    }
  );
};

// DELETE
exports.deleteCourses = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM courses WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'course not found' });
    res.json({ message: 'course deleted' });
  });
};
