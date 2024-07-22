INSERT INTO departments (name)
VALUES 
('Sales'),
('Marketing'),
('Human Resources'),
('Maintenance'),
('Operations Management'),
('Customer Relations');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Sales Manager', 80000.00, 1),
('Sales Assistant', 50000.00, 1),
('Marketing Director', 150000.00, 2),
('HR Manager', 90000.00, 3),
('Maintenance Technician', 65000.00, 4),
('Operations Manager ', 185000.00, 5),
('Customer Relations Specialist', 85000.00, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Jane', 'Smith', 1, NULL),
('Courtney', 'Green', 2, 1),
('Chad', 'Johnson', 3, NULL),
('Melony', 'Martinez', 4, NULL),
('David', 'Kingston', 5, 6),
('Maria', 'Garcia', 6, NULL);