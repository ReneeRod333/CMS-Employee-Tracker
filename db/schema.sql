DROP DATABASE IF EXISTS cmsemployeetrackerdb;
CREATE DATABASE cmsemployeetrackerdb;

\c cmsemployeetrackerdb;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
)

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(50) NOT NULL,
    department_id INTEGER,
    salary DECIMAL(8,2),
    FOREIGN KEY (department_id),
    REFERENCES departments(id),
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER,
    manager VARCHAR(50),
    FOREIGN KEY (role_id),
    REFERENCES roles(id),
    ON DELETE SET NULL
);


