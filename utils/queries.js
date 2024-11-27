import { pool } from '../db/connection.js';


// gets all departments
export const getAllDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  return result.rows;
};

// gets all roles
export const getAllRoles = async () => {
  const result = await pool.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON role.department_id = department.id
  `);
  return result.rows;
};

//gets all employees
export const getAllEmployees = async () => {
  const result = await pool.query(`
    SELECT 
      e.id, 
      e.first_name, 
      e.last_name, 
      role.title AS role, 
      department.name AS department, 
      role.salary, 
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
  return result.rows;
};

// adds the new departmnet
export const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// adds the new role
export const addRole = async ({ title, salary, departmentId }) => {
  await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, departmentId]
  );
};

// adds the new employee
export const addEmployee = async ({ firstName, lastName, roleId, managerId }) => {
  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [firstName, lastName, roleId, managerId]
  );
};

//updates the employees role
export const updateEmployeeRole = async (employeeId, roleId) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
};

//gets the employee by manager
export const getEmployeesByManager = async (managerId) => {
  const { rows } = await pool.query(
    `
    SELECT 
      e.id, 
      e.first_name, 
      e.last_name, 
      role.title AS role 
    FROM employee e
    JOIN role ON e.role_id = role.id
    WHERE e.manager_id = $1
  `,
    [managerId]
  );
  return rows;
};

//gets employee by department
export const getEmployeesByDepartment = async (departmentId) => {
  const { rows } = await pool.query(
    `
    SELECT 
      e.id, 
      e.first_name, 
      e.last_name, 
      role.title AS role 
    FROM employee e
    JOIN role ON e.role_id = role.id
    WHERE role.department_id = $1
  `,
    [departmentId]
  );
  return rows;
};

//deletes department
export const deleteDepartment = async (departmentId) => {
  await pool.query('DELETE FROM department WHERE id = $1', [departmentId]);
};

//deletes role
export const deleteRole = async (roleId) => {
  await pool.query('DELETE FROM role WHERE id = $1', [roleId]);
};

//delete employee
export const deleteEmployee = async (employeeId) => {
  await pool.query('DELETE FROM employee WHERE id = $1', [employeeId]);
};

//gets department by budget
export const getDepartmentBudget = async (departmentId) => {
  const { rows } = await pool.query(
    `
    SELECT SUM(role.salary) AS total_budget 
    FROM employee
    JOIN role ON employee.role_id = role.id
    WHERE role.department_id = $1
  `,
    [departmentId]
  );
  return rows[0].total_budget;
};