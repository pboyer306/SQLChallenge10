import { mainMenu } from './utils/prompts.js';
import {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
} from './utils/queries.js';
import { pool } from './utils/dbConnection.js';

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
        console.log('Department added successfully!');
        break;
      }

      case 'Add a role': {
        const { title, salary, departmentId } = await getNewRole();
        await pool.query(
          'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
          [title, salary, departmentId]
        );
        console.log('Role added successfully!');
        break;
      }

      
      case 'Add an employee': {
        const { firstName, lastName, roleId, managerId } = await getNewEmployee(); 
        await pool.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
          [firstName, lastName, roleId, managerId || null]
        );
        console.log('Employee added successfully!');
        break;
      }

      case 'Update employee role': {
        const employeeId = await getEmployeeToUpdate(); 
        const newRole = await getNewRoleForEmployee(); 
        await pool.query(
          'UPDATE employee SET role_id = $1 WHERE id = $2',
          [newRole, employeeId]
        );
        console.log('Employee role updated successfully!');
        break;
      }

      case 'Exit':
        console.log('Goodbye!');
        running = false; 
        break;

      default:
        console.log('Invalid option!');
    }
  }
};

main();

