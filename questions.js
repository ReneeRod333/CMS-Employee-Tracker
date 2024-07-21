const inquirer = require("inquirer");
const pgClient = require('./db/connection');

// Function to prompt questions.
function startQuestions() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Employees":
                    addEmployees();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
            }
        });
}

// Function to veiw all employees.
async function viewAllEmployees() {
    const sql = `
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
    `;

    try {
        const employees = await pgClient.query(sql);
        // console.log(employees);
        console.table(employees.rows);
    } catch (error) {
        console.log(error);
    }
}

// Function to veiw all roles.
async function viewAllRoles() {
    const sql = `
    SELECT
    r.id,
    r.title,
    d.name AS "department",
    r.salary

    FROM roles AS r

    INNER JOIN departments AS d 
    ON r.department_id = d.id;
    `;

    try {
        const roles = await pgClient.query(sql);
        // console.log(roles);
        console.table(roles.rows);
    } catch (error) {
        console.log(error);
    }
}

// Function to veiw all departments.
async function viewAllDepartments() {
    const sql = `
    SELECT
    d.id,
    d.name

    FROM departments AS d;
    `;

    try {
        const departments = await pgClient.query(sql);
        // console.log(departments);
        console.table(departments.rows);
    } catch (error) {
        console.log(error);
    }
}

module.exports = startQuestions;