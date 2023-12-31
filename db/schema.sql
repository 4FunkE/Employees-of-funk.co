-- drop db to create db
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Uses the employee_db database
USE employee_db;

-- Creates the table "department" within employee_db
CREATE TABLE department (
  -- Creates a numeric column called "id"
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column up to 30 characters called "name" which cannot contain null
  name VARCHAR(30) NOT NULL
);

-- Creates the table "role" within employee_db
CREATE TABLE role (
  -- Creates a numeric column called "id"
--   Auto-increment is a property that automatically assigns a unique value to a column whenever a new row is inserted into a table.
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column up to 30 characters called "title" which cannot contain null
  title VARCHAR(30) NOT NULL,
--   Makes a column called "salary" entered in decimal form
  salary DECIMAL NOT NULL,
--   Makes a column called "department_id" entered as an interger
  department_id INT NOT NULL,
--   the department_id connects to the dapartment tables, id sections
FOREIGN KEY (department_id) 
REFERENCES department(id)
);

-- Creates the table "employee" within employee_db
CREATE TABLE employee (
  -- Creates a numeric column called "id"
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column up to 30 characters called "first_name" which cannot contain null
  first_name VARCHAR(30) NOT NULL,
  -- Makes a string column up to 30 characters called "last_name" which cannot contain null
  last_name VARCHAR(30) NOT NULL,
  -- Makes a column called "role_id" entered as an integer
  role_id INT NOT NULL,
  -- Makes a column called "manager_id" entered as an integer, null if employee has no manager
  manager_id INT,
  -- The role_id connects to the role table's id column
  FOREIGN KEY (role_id) 
  REFERENCES role(id),
  -- The manager_id connects to the employee table's id column
  FOREIGN KEY (manager_id) 
  REFERENCES department(id)
);