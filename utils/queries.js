import { pool } from './dbConnection.js';

export const getAllDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  return result.rows;
};

export const getAllRoles = async () => {
  const result = await pool.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON role.department_id = department.id
  `);
  return result.rows;
};

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

export const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

export const addRole = async ({ title, salary, departmentId }) => {
  await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, departmentId]
  );
};

export const addEmployee = async ({ firstName, lastName, roleId, managerId }) => {
  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [firstName, lastName, roleId, managerId]
  );
};

export const updateEmployeeRole = async (employeeId, roleId) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
};
