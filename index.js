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
  );

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    // Call the function to display the main menu
    mainMenu();
  });

// Display the main menu
function mainMenu() {
    inquirer
      .prompt([
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
      ])