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
                "View All Depoartments",
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
    m.first_name + ' ' + m.last_name AS "manager"

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
        console.table(employees);
    } catch (error) {
        console.log(error);
    }
}

module.exports = startQuestions;