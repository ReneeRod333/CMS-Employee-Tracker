-- Show all employees.
SELECT
emp.id,
emp.first_name,
emp.last_name,
r.title,
d.name AS "department",
r.salary,
m.first_name || ' ' || m.last_name AS "manager"

FROM employees AS emp

INNER JOIN roles AS r 
ON emp.role_id = r.id

INNER JOIN departments AS d 
ON r.department_id = d.id

LEFT JOIN employees AS m 
ON m.manager_id = emp.id;

-- Show all departments.
SELECT
d.id,
d.name

FROM departments AS d;

-- Show all roles.
SELECT
r.id,
r.title,
d.name AS "department",
r.salary

FROM roles AS r 

INNER JOIN departments AS d 
ON r.department_id = d.id;


