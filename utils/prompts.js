import inquirer from 'inquirer';
import { getAllDepartments, getAllRoles, getAllEmployees } from './queries.js';

// main menu and choices for the user
export const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'View employees by manager',
        'View employees by department',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'View department budget',
        'Exit',
      ],
    },
  ]);
  return action;
};

// prompt for the name of a new department
export const getNewDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:',
      validate: (input) => (input ? true : 'Department name cannot be empty.'),
    },
  ]);
  return name;
};

// prompt for details of a new role
export const getNewRole = async () => {
  const departments = await getAllDepartments();
  const departmentChoices = departments.map((dept) => ({
    name: dept.name,
    value: dept.id,
  }));

  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the new role:',
      validate: (input) => (input ? true : 'Role title cannot be empty.'),
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter the salary for the new role:',
      validate: (input) =>
        input > 0 ? true : 'Salary must be a positive number.',
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for the new role:',
      choices: departmentChoices,
    },
  ]);

  return { title, salary, departmentId };
};

// prompt for details of a new employee
export const getNewEmployee = async () => {
  const roles = await getAllRoles();
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const employees = await getAllEmployees();
  const managerChoices = employees.map((emp) => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id,
  }));
  managerChoices.unshift({ name: 'None', value: null });

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "Enter the employee's first name:",
      validate: (input) => (input ? true : "First name cannot be empty."),
    },
    {
      type: 'input',
      name: 'lastName',
      message: "Enter the employee's last name:",
      validate: (input) => (input ? true : "Last name cannot be empty."),
    },
    {
      type: 'list',
      name: 'roleId',
      message: "Select the employee's role:",
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Select the employee's manager (if any):",
      choices: managerChoices,
    },
  ]);

  return { firstName, lastName, roleId, managerId };
};

// prompt to select an employee and their new role
export const getUpdatedEmployeeRole = async () => {
  const employees = await getAllEmployees();
  const employeeChoices = employees.map((emp) => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id,
  }));

  const roles = await getAllRoles();
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to update:',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the new role for the employee:',
      choices: roleChoices,
    },
  ]);

  return { employeeId, roleId };
};

// prompt to select a department
export const selectDepartment = async () => {
  const departments = await getAllDepartments();
  const departmentChoices = departments.map((dept) => ({
    name: dept.name,
    value: dept.id,
  }));

  const { departmentId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select a department:',
      choices: departmentChoices,
    },
  ]);

  return departmentId;
};

// prompt to select an employee
export const selectEmployee = async () => {
  const employees = await getAllEmployees();
  const employeeChoices = employees.map((emp) => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id,
  }));

  const { employeeId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select an employee:',
      choices: employeeChoices,
    },
  ]);

  return employeeId;
};

// prompt to select a role
export const selectRole = async () => {
  const roles = await getAllRoles();
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Select a role:',
      choices: roleChoices,
    },
  ]);

  return roleId;
};
