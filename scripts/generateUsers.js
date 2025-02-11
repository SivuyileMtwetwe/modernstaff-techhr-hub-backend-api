import bcrypt from 'bcryptjs';
import db from '../config/db.js';

// Function to generate a random password
const generatePassword = () => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  return `emp${randomNumber}`; // Example: emp1234
};

// Function to insert users into the database
const insertUsers = async () => {
  try {
    // Fetch all employees from the Employees table
    const [employees] = await db.query('SELECT * FROM Employees');

    // Loop through each employee and create a user
    for (const employee of employees) {
      const username = employee.name.toLowerCase().replace(/\s+/g, '.') + '.' + employee.employee_id;
      const password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      // Insert the user into the Users table
      await db.query(
        'INSERT INTO Users (username, password, role, employee_id) VALUES (?, ?, ?, ?)',
        [username, hashedPassword, 'employee', employee.employee_id]
      );

      console.log(`User created for ${employee.name}: Username - ${username}, Password - ${password}`);
    }

    console.log('All users created successfully!');
  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    db.end(); // Close the database connection
  }
};

// Run the script
insertUsers();


// const insertAdminUser = async () => {
//     try {
//       const username = 'admin';
//       const password = 'admin123'; // Replace with your desired password
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       await db.query(
//         'INSERT INTO Users (username, password, role, employee_id) VALUES (?, ?, ?, ?)',
//         [username, hashedPassword, 'admin', null]
//       );
  
//       console.log(`Admin user created: Username - ${username}, Password - ${password}`);
//     } catch (error) {
//       console.error('Error creating admin user:', error);
//     } finally {
//       db.end(); // Close the database connection
//     }
//   };
  
//   // Run the script
//   insertAdminUser();