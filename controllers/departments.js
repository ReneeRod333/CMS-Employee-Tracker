const router = require('express').Router();
const pgClient = require('../db/connection');

// Read list of all departments.
router.get('/api/departments', (req, res) => {
    const sql = `SELECT d.id, d.name FROM departments AS d;`;
    pgClient.query(sql, (err, { rows }) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// To add a department.
router.post('/api/departments', (req, res) => {
    const sql = `INSERT INTO departments (name) VALUES ($1)`;
    const params = [req.body.name];

    pgClient.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: req.body
        });
    });
});

module.exports = router;
