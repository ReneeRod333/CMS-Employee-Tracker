DROP DATABASE IF EXISTS cmsemployeetrackerdb;
CREATE DATABASE cmsemployeetrackerdb;

\c cmsemployeetrackerdb;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
)

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id INTEGER,
    salary DECIMAL(8,2),
    FOREIGN KEY (department_id),
    REFERENCES departments(id),
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id),
    REFERENCES roles(id),
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id),
    REFERENCES employees(id),
);

