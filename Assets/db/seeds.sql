-- Departments
INSERT INTO department (name) VALUES ('Engineering'), ('HR'), ('Sales');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES 
('Engineer', 75000, 1),
('HR Manager', 60000, 2),
('Salesperson', 55000, 3);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Alice', 'Smith', 1, NULL),
('Bob', 'Johnson', 2, NULL),
('Charlie', 'Brown', 3, 1);
