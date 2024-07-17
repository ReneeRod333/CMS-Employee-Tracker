const router = require('express').Router();
const pgClient = require('../db/connection');

// Read list of all roles.
router.get('/api/roles', (req, res) => {
    const sql = `SELECT r.id, r.title, d.name AS "department", r.salary FROM roles AS r INNER JOIN departments AS d ON r.department_id = d.id;`;
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

// To add a role.
router.post('/api/roles', (req, res) => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
    const params = [req.body.title, req.body.salary, req.body.department_id];

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