// Import and require mysql2 and inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');

// to use .env varibles 
require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password protected
      password: process.env.DB_password,
      database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
  ).promise(); // Using promises for async/await support

  // logo.js
const asciiLogo = require("asciiart-logo");

const logo = asciiLogo({
  name: "FunkE Art Studio",
  font: "Doom",
  lineChars: 20,
  padding: 2,
  margin: 2,
}).render();

console.log(logo);

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    // Call the function to display the main menu
    mainMenu();
  });

// Display the main menu
async function mainMenu() {
    try {
        const answers = await inquirer.prompt([
          {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Exit',
          ],
        },
      ]);

      switch (answers.action) {
          case 'View All Employees':
            await viewAllEmployees();
            break;
          case 'Add Employee':
            await addEmployee();
            break;
          case 'Update Employee Role':
            await updateRole();
            break;
          case 'View All Roles':
            await viewAllRoles();
            break;
          case 'Add Role':
            await addRole();
            break;
          case 'View All Departments':
            await viewAllDepartments();
            break;
          case 'Add Department':
            await addDepartment();
            break;
          case 'Exit':
            console.log('Goodbye!');
            db.end(); // Close the database connection before exiting
            break;
        }
    } catch (err) {
        console.error('Error', err.message);
        db.end(); // Close the database connection in case of an error
      }
  }

// create functions for answers actions
// function to view all Emloyees
async function viewAllEmployees() {
    try {
      const [employees] = await db.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.name AS department 
        FROM employees 
        INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id`
      );
      console.table(employees);
    } catch (err) {
      console.error("Could not retrieve employees", err);
    }
    await mainMenu(); // Show the main menu again
  }

// function to view all departments
async function viewAllDepartments() {
    try {
      const [results] = await connection.query("SELECT * FROM departments");
      console.table(results);
    } catch (err) {
      console.error("Error retrieving departments: ", err);
    }
    mainMenu();
  }
  
  // function to view all roles if available
  async function viewAllRoles() {
    const query = `
      SELECT roles.id, roles.title AS title, roles.salary, departments.name AS department
      FROM roles
      INNER JOIN departments ON roles.department_id = departments.id
    `;
    try {
      const [results] = await connection.query(query);
      console.table(results);
    } catch (err) {
      console.error("Error retrieving roles: ", err);
    }
    mainMenu();
  }

  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the employee's first name:",
          validate: (input) => {
            if (input.trim() !== "") {
              return true;
            } else {
              return "Please enter the first name.";
            }
          },
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the employee's last name:",
          validate: (input) => {
            if (input.trim() !== "") {
              return true;
            } else {
              return "Please enter the last name.";
            }
          },
        },
        {
          type: "input",
          name: "roleId",
          message: "Enter the employee's role ID:",
          validate: (input) => {
            if (input.trim() !== "" && !isNaN(input)) {
              return true;
            } else {
              return "Please enter a valid role ID.";
            }
          },
        },
        {
          type: "input",
          name: "managerId",
          message: "Enter the employee's manager ID:",
          validate: (input) => {
            if (input.trim() !== "" && !isNaN(input)) {
              return true;
            } else {
              return "Please enter a valid manager ID.";
            }
          },
        },
      ])
      .then((answers) => {
        const { firstName, lastName, roleId, managerId } = answers;
        connection.query(
          "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [firstName, lastName, roleId, managerId],
          (err) => {
            if (err) {
              console.error("Error adding employee:", err);
            } else {
              console.log("Employee added successfully.");
            }
            mainMenu();
          }
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        mainMenu();
      });
  }

  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the new role:",
          validate: (input) => {
            if (input.trim() !== "") {
              return true;
            } else {
              return "Please enter a role title.";
            }
          },
        },
        {
          type: "input",
          name: "profits",
          message: "Enter the salary of the new role:",
          validate: (input) => {
            if (input.trim() !== "" && !isNaN(input)) {
              return true;
            } else {
              return "Please enter a valid salary amount.";
            }
          },
        },
        {
          type: "input",
          name: "department_id",
          message: "Enter department ID:",
          validate: (input) => {
            if (input.trim() !== "" && !isNaN(input)) {
              return true;
            } else {
              return "Please enter a valid department ID.";
            }
          },
        },
      ])
      .then((answers) => {
        const { title, profits, department_id } = answers;
        connection.query(
          "INSERT INTO roles (title , salary, department_id) VALUES (?,?,?)",
          [title, profits, department_id],
          (err) => {
            if (err) {
              console.error("Error adding role:", err);
            } else {
              console.log("Role added successfully.");
            }
            mainMenu();
          }
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        mainMenu();
      });
  }

  
  function addDepartment() {
    inquirer
      .prompt({
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department",
        validate: (input) => {
          if (input.trim() !== "") {
            return true;
          } else {
            return "Please enter a department name.";
          }
        },
      })
      .then((answers) => {
        const departmentName = answers.departmentName;
        connection.query(
          "INSERT INTO departments (name) VALUES (?)",
          [departmentName],
          (err) => {
            if (err) {
              console.err("Error adding department:", err);
            } else {
              console.log(" Department added succesfully.");
            }
            mainMenu();
          }
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        mainMenu();
      });
  }


  mainMenu();