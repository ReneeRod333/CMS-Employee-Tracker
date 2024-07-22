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
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Employee":
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
                case "Exit":
                    pgClient.end();
                    process.exit();
                    break;
            }
        });
}

// Function to veiw all employees.
async function viewAllEmployees() {
    try {
        const response = await fetch(`${BASE_URL}/api/employees`);
        const employees = await response.json();
        console.table(employees.data);
        startQuestions();
    } catch (error) {
        console.log(error);
    }
}

// Function to veiw all roles.
async function viewAllRoles() {
    try {
        const response = await fetch(`${BASE_URL}/api/roles`);
        const roles = await response.json();
        console.table(roles.data);
        startQuestions();
    } catch (error) {
        console.log(error);
    }
}

// Function to veiw all departments.
async function viewAllDepartments() {
    try {
        const response = await fetch(`${BASE_URL}/api/departments`);
        const departments = await response.json();
        console.table(departments.data);
        startQuestions();
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
        startQuestions();
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
        startQuestions();
    } catch (error) {
        console.log(error);
    }
}

//Function to add employee.
async function addEmployees() {
    try {
        const roleResponse = await fetch(`${BASE_URL}/api/roles`);
        const roles = await roleResponse.json();
        const managerResponse = await fetch(`${BASE_URL}/api/employees`);
        const managersData = await managerResponse.json();
        const managers = [...managersData.data, {first_name: "N/A", id: null, last_name: ""}]
        const answers = await inquirer.prompt([{
            type: "input",
            name: "first_name",
            message: "Enter employee's first name:",
        }, {
            type: "input",
            name: "last_name",
            message: "Enter employee's last name:",
        }, {
            type: "list",
            name: "role",
            message: "Select employee's role:",
            choices: roles.data.map(
                (role) => role.title
            )
        }, {
            type: "list",
            name: "manager",
            message: "Select employee's manager:",
            choices: managers.map(
                (manager) => `${manager.first_name} ${manager.last_name}`
            )
        }]);
        const role = roles.data.find(
            (role) => role.title === answers.role
        );
        const manager = managers.find(
            (manager) => `${manager.first_name} ${manager.last_name}` === answers.manager
        );
        const body = {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: role.id,
            manager_id: manager.id,
        }
        const response = await fetch(`${BASE_URL}/api/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        startQuestions();
    } catch (error) {
        console.log(error);
    }
}

//Function to update employee.
async function updateEmployeeRole() {
    try {
        const roleResponse = await fetch(`${BASE_URL}/api/roles`);
        const roles = await roleResponse.json();
        const employeeResponse = await fetch(`${BASE_URL}/api/employees`);
        const employees = await employeeResponse.json();
        const answers = await inquirer.prompt([{
            type: "list",
            name: "employee",
            message: "Select employee:",
            choices: employees.data.map(
                (employee) => `${employee.first_name} ${employee.last_name}`
            )
        }, {
            type: "list",
            name: "role",
            message: "Select employee's role:",
            choices: roles.data.map(
                (role) => role.title
            )
        }]);
        const employee = employees.data.find(
            (employee) => `${employee.first_name} ${employee.last_name}` === answers.employee
        );
        const role = roles.data.find(
            (role) => role.title === answers.role
        );
        const body = {
            role_id: role.id,
        }
        const response = await fetch(`${BASE_URL}/api/employees/${employee.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        startQuestions();
    } catch (error) {
        console.log(error);
    }
}

module.exports = startQuestions;