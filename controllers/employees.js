const router = require('express').Router();
const pgClient = require('../db/connection');

// Read list of all employees.
router.get('/api/employees', (req, res) => {
    const sql = `SELECT
    emp.id,
    emp.first_name,
    emp.last_name,
    r.title,
    d.name AS "department",
    r.salary,
    (SELECT m.first_name || ' ' || m.last_name FROM employees AS m WHERE m.id = emp.manager_id) AS "manager"

    FROM employees AS emp

    INNER JOIN roles AS r 
    ON emp.role_id = r.id

    INNER JOIN departments AS d 
    ON r.department_id = d.id;`;
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

// To add an employee.
router.post('/api/employees', (req, res) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
    const params = [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id];

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

// Update an employee role.
router.put('/api/employees/:id', (req, res) => {
    const sql = `UPDATE employees SET role_id = $1 WHERE id = $2`;
    const params = [req.body.role_id, req.params.id];

    pgClient.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.rowCount) {
            res.json({
                message: 'Role not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.rowCount
            });
        }
    });
});



module.exports = router;