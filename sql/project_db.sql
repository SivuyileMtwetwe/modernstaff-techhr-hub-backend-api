CREATE TABLE Departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    employment_history TEXT,
    contact VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('Present', 'Absent', 'Leave') NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

CREATE TABLE LeaveRequests (
    leave_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('Approved', 'Denied', 'Pending') NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);


CREATE TABLE Payroll (
    payroll_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    hours_worked INT NOT NULL,
    leave_deductions INT NOT NULL,
    final_salary DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);
;
INSERT INTO Departments (department_name) VALUES 
('Development'),
('HR'),
('QA'),
('Sales'),
('Marketing'),
('Design'),
('IT'),
('Finance'),
('Support');


INSERT INTO Employees (name, position, department_id, salary, employment_history, contact) VALUES
('Sibongile Nkosi', 'Software Engineer', 1, 70000.00, 'Joined in 2015, promoted to Senior in 2018', 'sibongile.nkosi@moderntech.com'),
('Lungile Moyo', 'HR Manager', 2, 80000.00, 'Joined in 2013, promoted to Manager in 2017', 'lungile.moyo@moderntech.com'),
('Thabo Molefe', 'Quality Analyst', 3, 55000.00, 'Joined in 2018', 'thabo.molefe@moderntech.com'),
('Keshav Naidoo', 'Sales Representative', 4, 60000.00, 'Joined in 2020', 'keshav.naidoo@moderntech.com'),
('Zanele Khumalo', 'Marketing Specialist', 5, 58000.00, 'Joined in 2019', 'zanele.khumalo@moderntech.com'),
('Sipho Zulu', 'UI/UX Designer', 6, 65000.00, 'Joined in 2016', 'sipho.zulu@moderntech.com'),
('Naledi Moeketsi', 'DevOps Engineer', 7, 72000.00, 'Joined in 2017', 'naledi.moeketsi@moderntech.com'),
('Farai Gumbo', 'Content Strategist', 5, 56000.00, 'Joined in 2021', 'farai.gumbo@moderntech.com'),
('Karabo Dlamini', 'Accountant', 8, 62000.00, 'Joined in 2018', 'karabo.dlamini@moderntech.com'),
('Fatima Patel', 'Customer Support Lead', 9, 58000.00, 'Joined in 2016', 'fatima.patel@moderntech.com');



INSERT INTO Attendance (employee_id, date, status) VALUES
(1, '2024-11-25', 'Present'),
(1, '2024-11-26', 'Absent'),
(1, '2024-11-27', 'Present'),
(1, '2024-11-28', 'Present'),
(1, '2024-11-29', 'Present'),

(2, '2024-11-25', 'Present'),
(2, '2024-11-26', 'Present'),
(2, '2024-11-27', 'Absent'),
(2, '2024-11-28', 'Present'),
(2, '2024-11-29', 'Present'),

(3, '2024-11-25', 'Present'),
(3, '2024-11-26', 'Present'),
(3, '2024-11-27', 'Present'),
(3, '2024-11-28', 'Absent'),
(3, '2024-11-29', 'Present');


INSERT INTO LeaveRequests (employee_id, date, reason, status) VALUES
(1, '2024-11-22', 'Sick Leave', 'Approved'),
(1, '2024-12-01', 'Personal', 'Pending'),
(2, '2024-11-15', 'Family Responsibility', 'Denied'),
(2, '2024-12-02', 'Vacation', 'Approved'),
(3, '2024-11-10', 'Medical Appointment', 'Approved'),
(3, '2024-12-05', 'Personal', 'Pending');


INSERT INTO Payroll (employee_id, hours_worked, leave_deductions, final_salary) VALUES
(1, 160, 8, 69500.00),
(2, 150, 10, 79000.00),
(3, 170, 4, 54800.00),
(4, 165, 6, 59700.00),
(5, 158, 5, 57850.00),
(6, 168, 2, 64800.00),
(7, 175, 3, 71800.00),
(8, 160, 0, 56000.00),
(9, 155, 5, 61500.00),
(10, 162, 4, 57750.00);
