import { pool } from './db/connection.js';

import {
  mainMenu,
  getNewDepartment,
  getNewRole,
  getNewEmployee,
  getUpdatedEmployeeRole,
  selectDepartment,
  selectEmployee,
  selectRole,
} from './utils/prompts.js';

import {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  getDepartmentBudget,
} from './utils/queries.js';

const main = async () => {
  let running = true;

  while (running) {
    const action = await mainMenu();

    switch (action) {
      case 'View all departments':
        console.table(await getAllDepartments());
        break;

      case 'View all roles':
        console.table(await getAllRoles());
        break;

      case 'View all employees':
        console.table(await getAllEmployees());
        break;

      case 'Add a department': {
        const name = await getNewDepartment();
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Department '${name}' added successfully!`);
        break;
      }

      case 'Add a role': {
        const { title, salary, departmentId } = await getNewRole();
        await pool.query(
          'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
          [title, salary, departmentId]
        );
        console.log(`Role '${title}' added successfully!`);
        break;
      }

      case 'Add an employee': {
        const { firstName, lastName, roleId, managerId } = await getNewEmployee();
        await pool.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
          [firstName, lastName, roleId, managerId]
        );
        console.log(
          `Employee '${firstName} ${lastName}' added successfully!`
        );
        break;
      }

      case 'Update an employee role': {
        const { employeeId, roleId } = await getUpdatedEmployeeRole();
        await pool.query(
          'UPDATE employee SET role_id = $1 WHERE id = $2',
          [roleId, employeeId]
        );
        console.log('Employee role updated successfully!');
        break;
      }

      case 'View employees by manager': {
        const managerId = await selectEmployee();
        const result = await pool.query(
          `SELECT e.id, e.first_name, e.last_name, r.title 
           FROM employee e 
           LEFT JOIN role r ON e.role_id = r.id 
           WHERE e.manager_id = $1`,
          [managerId]
        );
        console.table(result.rows);
        break;
      }

      case 'View employees by department': {
        const departmentId = await selectDepartment();
        const result = await pool.query(
          `SELECT e.id, e.first_name, e.last_name, r.title 
           FROM employee e 
           LEFT JOIN role r ON e.role_id = r.id 
           WHERE r.department_id = $1`,
          [departmentId]
        );
        console.table(result.rows);
        break;
      }

      case 'Delete a department': {
        const departmentId = await selectDepartment();
        await deleteDepartment(departmentId);
        console.log('Department deleted successfully!');
        break;
      }

      case 'Delete a role': {
        const roleId = await selectRole();
        await deleteRole(roleId);
        console.log('Role deleted successfully!');
        break;
      }

      case 'Delete an employee': {
        const employeeId = await selectEmployee();
        await deleteEmployee(employeeId);
        console.log('Employee deleted successfully!');
        break;
      }

      case 'View department budget': {
        const departmentId = await selectDepartment();
        const budget = await getDepartmentBudget(departmentId);
        console.log(`Total budget for department: $${budget}`);
        break;
      }

      case 'Exit':
        console.log('Goodbye!');
        running = false;
        break;

      default:
        console.log('Invalid option! Please try again.');
    }
  }

  await pool.end();
};

main().catch((err) => {
  console.error('Error running application:', err);
  process.exit(1);
});
