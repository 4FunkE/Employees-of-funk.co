/* eslint-disable no-use-before-define */
// Import and require mysql2 and inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');

// to use .env varibles
require('dotenv').config();

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
  console.log('Connected to the employee database.')
).promise(); // Using promises for async/await support

// Connect to the database or throw error
db.connect((err) => {
  if (err) {
    throw err;
  }
});

// logo.js
const asciiLogo = require('asciiart-logo');

const logo = asciiLogo({
  name: 'FunkE Art Studio',
  font: 'Doom',
  lineChars: 20,
  padding: 2,
  margin: 2,
}).render();

console.log(logo);

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
    default:
      console.log('Invalid action!');
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
      `SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department 
        FROM employee 
        INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id`
    );
    console.table(employees);
  } catch (err) {
    console.error('Could not retrieve employees', err);
  }
  await mainMenu(); // Show the main menu again
}

// function to view all departments
async function viewAllDepartments() {
  try {
    const [departments] = await db.query('SELECT * FROM department');
    console.table(departments);
  } catch (err) {
    console.error('Error retrieving departments', err);
  }
  await mainMenu();
}

// function to view all roles if available
async function viewAllRoles() {
  try {
    const [roles] = await db.query(
      `SELECT role.id, role.title AS title, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON role.department_id = department.id`
    );
    console.table(roles);
  } catch (err) {
    console.error('Error retrieving roles', err);
  }
  await mainMenu();
}

//function to get the role_id based on the role title.
async function getRoleIdByTitle(roleTitle) {
  try {
    const result = await db.query('SELECT id FROM role WHERE title = ?', [roleTitle]);
    if (result.length === 0) {
      console.error(`Role with title "${roleTitle}" not found.`);
      return null; // Return a default value (null) to handle the missing role.
    }
    return result[0][0].id;
  } catch (error) {
    console.error('Error fetching roleId:', error);
    return null; // Return a default value (null) to handle any errors.
  }
}

// function to add an Employee
async function addEmployee() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the employee\'s first name:',
        validate: (input) => {
          if (input.trim() !== '') {
            return true;
          } else {
            return 'Please enter the first name.';
          }
        },
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the employee\'s last name:',
        validate: (input) => {
          if (input.trim() !== '') {
            return true;
          } else {
            return 'Please enter the last name.';
          }
        },
      },
      {
        type: 'list',
        name: 'roleTitle',
        message: 'What is the employee\'s role?',
        choices: ['Art Instructor', 'Studio Manager', 'Sculpture Artist', 'Photographer','Printmaker', 'Drawing Instructor', 'Ceramics Artist', 'Gallery Curator', 'Art Educator', 'Art Researcher'],
      },
    ]);
    const { firstName, lastName, roleTitle } = answers;
    const roleId = await getRoleIdByTitle(roleTitle);
    await db.query(
      'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)',
      [firstName, lastName, roleId]
    );
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Employee Error:', error);
  }
  await mainMenu();
}

// function to add a role
async function addRole() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
        validate: (input) => {
          if (input.trim() !== '') {
            return true;
          } else {
            return 'Please enter a role name.';
          }
        },
      },
      {
        type: 'input',
        name: 'income',
        message: 'What is the salary of the role?',
        validate: (input) => {
          if (input.trim() !== '' && !isNaN(input)) {
            return true;
          } else {
            return 'Please enter a valid salary amount.';
          }
        },
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'What department does the role belong to?',
        choices: ['Painting', 'Sculpture', 'Photography', 'Printmaking', 'Drawing', 'Ceramics'],
      },
    ]);
    const { title, income, department_id } = answers;
    await db.query(
      'INSERT INTO role (title , salary, department_id) VALUES (?,?,?)',
      [title, income, department_id]
    );
    console.log('Role added successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
  await mainMenu();
}

// function to add a Department
async function addDepartment() {
  try {
    const answers = await inquirer.prompt({
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department',
      validate: (input) => {
        if (input.trim() !== '') {
          return true;
        } else {
          return 'Please enter a department name.';
        }
      },
    });

    const departmentName = answers.departmentName;
    await db.query(
      'INSERT INTO department (name) VALUES (?)',
      [departmentName]
    );
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
  await mainMenu();
}

//function to updateemployee record
async function updateRole() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Which employee role do you want to update?',
        choices: ['Emily Funk', 'Brandon Cruz', 'Brie Funk', 'Athena Cruz', 'Noemi Bou', 'Kevin Funk', 'Olivia Funk', 'Andy BLuz', 'Alex Lemons', 'Cris Beatz'],
      },
      {
        type: 'list',
        name: 'roleName',
        message: 'which role would you like to assign the selected employee?',
        choices: ['Art Instructor', 'Studio Manager', 'Sculpture Artist', 'Photographer','Printmaker', 'Drawing Instructor', 'Ceramics Artist', 'Gallery Curator', 'Art Educator', 'Art Researcher'],
      },
    ]);

    const { id, roleName } = answers;
    let query;
    let value;

    switch (roleName) {
    case 'First Name':
      query = 'UPDATE employee SET first_name = ? WHERE id = ?';
      value = await inquirer.prompt({
        type: 'input',
        name: 'firstName',
        message: 'Enter the new first name:',
        validate: (input) => {
          if (input.trim() !== '') {
            return true;
          } else {
            return 'Please enter a first name.';
          }
        },
      });
      value = value.firstName;
      break;
    case 'Last Name':
      query = 'UPDATE employee SET last_name = ? WHERE id = ?';
      value = await inquirer.prompt({
        type: 'input',
        name: 'lastName',
        message: 'Enter the new last name:',
        validate: (input) => {
          if (input.trim() !== '') {
            return true;
          } else {
            return 'Please enter a last name.';
          }
        },
      });
      value = value.lastName;
      break;
    case 'Role ID':
      query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      value = await inquirer.prompt({
        type: 'input',
        name: 'roleId',
        message: 'Enter the new role ID:',
        validate: (input) => {
          if (input.trim() !== '' && !isNaN(input)) {
            return true;
          } else {
            return 'Please enter a valid role ID.';
          }
        },
      });
      value = value.roleId;
      break;
    default:
      break;
    }

    await db.query(query, [value, id]);

    console.log('Employee updated successfully.');
  } catch (error) {
    console.error('Error:', error);
  }

  await mainMenu();
}

mainMenu();