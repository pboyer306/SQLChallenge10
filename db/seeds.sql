-- Seed data for departments
INSERT INTO department (name) VALUES 
('Engineering'),
('Sales'),
('Marketing'),
('Human Resources'),
('Finance');

-- Seed data for roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 90000, 1),
('Lead Developer', 120000, 1),    
('Sales Manager', 70000, 2),      
('Sales Associate', 50000, 2),    
('Marketing Manager', 80000, 3), 
('Marketing Coordinator', 55000, 3), 
('HR Manager', 85000, 4),
('Finance Analyst', 75000, 5);  

-- Seed data for employees
-- Employees in Engineering (Department 1)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Johnson', 1, NULL),
('Bob', 'Smith', 2, 1);

-- Employees in Sales (Department 2)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Charlie', 'Brown', 3, NULL), 
('David', 'Williams', 4, 3); 

-- Employees in Marketing (Department 3)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Emily', 'Davis', 5, NULL), 
('Frank', 'Miller', 6, 5);   

-- Employees in Human Resources (Department 4)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Grace', 'Garcia', 7, NULL); 

-- Employees in Finance (Department 5)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Hannah', 'Martinez', 8, NULL);
