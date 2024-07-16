UPDATE employees
SET role_id = 2
WHERE id = 1;

UPDATE roles
SET salary = 10
WHERE id = 3;

UPDATE employees
SET first_name = 'Tom',
role_id = 3
WHERE id = 5;

DELETE employees
WHERE id = 1;

DELETE employees as e
INNER JOIN roles as r  
ON e.role_id = r.id
WHERE r.id = 3;

