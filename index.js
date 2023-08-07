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
    console.log(`Connected to the courses_db database.`)
  );