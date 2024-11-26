import inquirer from 'inquirer';

export const mainMenu = async () => {
  const { options } = await inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'options',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role',
        'Exit',
      ],
    },
  ]);
  return options;
};

export const getNewDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the name of the new department:',
      name: 'name',
    },
  ]);
  return name;
};

export const getNewRole = async () => {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the title of the role:',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Enter the salary for this role:',
      name: 'salary',
      validate: (input) => (!isNaN(input) && input > 0 ? true : 'Please enter a valid salary.'),
    },
    {
      type: 'input',
      message: 'Enter the department ID for this role:',
      name: 'departmentId',
      validate: (input) => (!isNaN(input) && input > 0 ? true : 'Please enter a valid department ID.'),
    },
  ]);
  return { title, salary, departmentId };
};

export const getNewEmployee = async () => {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the first name of the employee:',
      name: 'firstName',
    },
    {
      type: 'input',
      message: 'Enter the last name of the employee:',
      name: 'lastName',
    },
    {
      type: 'input',
      message: 'Enter the role ID for this employee:',
      name: 'roleId',
      validate: (input) => (!isNaN(input) && input > 0 ? true : 'Please enter a valid role ID.'),
    },
    {
      type: 'input',
      message: 'Enter the manager ID for this employee (leave blank if none):',
      name: 'managerId',
      validate: (input) => (input === '' || (!isNaN(input) && input >= 0) ? true : 'Please enter a valid manager ID.'),
    },
  ]);
  return { firstName, lastName, roleId, managerId: managerId || null };
};

export const getEmployeeToUpdate = async (employees) => {
  const { employeeId } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Select the employee whose role you want to update:',
      name: 'employeeId',
      choices: employees.map((e) => ({ name: `${e.first_name} ${e.last_name}`, value: e.id })),
    },
  ]);
  return employeeId;
};

export const getNewRoleForEmployee = async (roles) => {
  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Select the new role for the employee:',
      name: 'roleId',
      choices: roles.map((r) => ({ name: r.title, value: r.id })),
    },
  ]);
  return roleId;
};
