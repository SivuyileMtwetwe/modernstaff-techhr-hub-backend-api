import { pool } from "../config/db.js"; // MySQL Connection
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js"; // MongoDB User model

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

async function syncEmployees() {
  try {
    // 🔹 Step 1: Get all employees from MySQL
    const [employees] = await pool.execute("SELECT * FROM Employees");

    for (let employee of employees) {
      // 🔹 Step 2: Check if the employee already exists in MongoDB
      const existingUser = await User.findOne({ contact: employee.contact });

      if (!existingUser) {
        // 🔹 Step 3: Generate a hashed default password ("password123")
        const hashedPassword = await bcrypt.hash("password123", 10);

        // 🔹 Step 4: Save the employee in MongoDB with login details
        const newUser = new User({
          name: employee.name,
          contact: employee.contact,
          password: hashedPassword,
          role: "Employee",
        });

        await newUser.save();
        console.log(`✅ Login details created: ${employee.name}`);
      } else {
        console.log(`⚠️ Employee already has login credentials: ${employee.name}`);
      }
    }

    console.log("✅ Employee login sync completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Sync error:", error);
  }
}

// Run the Sync Script
syncEmployees();
