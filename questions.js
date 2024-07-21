const inquirer = require("inquirer");
const pgClient = require('./db/connection');
const BASE_URL = "http://localhost:3000";

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

//Function to add department.
async function addDepartment() {
    const answer = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter a new department name:",
    });

    try {
        const response = await fetch(`${BASE_URL}/api/departments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: answer.name })
        });
        const data = await response.json();
    } catch (error) {
        console.log(error);
    }
}

//Function to add role.
async function addRole() {
  try {
    const departmentResponse = await fetch(`${BASE_URL}/api/departments`);
    const departments = await departmentResponse.json();
    const answers = await inquirer.prompt([{
        type: "input",
        name: "title",
        message: "Enter a title for new role:",
    }, {
        type: "input",
        name: "salary",
        message: "Enter salary amount",
    }, {
        type: "list",
        name: "department",
        message: "Select department for new role:",
        choices: departments.data.map(
            (department) => department.name
        )
    }]);
    const department = departments.data.find(
        (department) => department.name === answers.department
    );
    const body = {
        title: answers.title,
        salary: answers.salary,
        department_id: department.id
    }
    const response = await fetch(`${BASE_URL}/api/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

    module.exports = startQuestions;