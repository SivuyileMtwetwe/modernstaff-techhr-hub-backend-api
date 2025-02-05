import { pool } from "../config/db.js"; // MySQL connection
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js"; // MongoDB User model

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

async function syncEmployees() {
  try {
    // 🔹 Step 1: Fetch all employees from MySQL
    const [employees] = await pool.execute("SELECT * FROM Employees");

    for (let employee of employees) {
      // 🔹 Step 2: Check if the employee already exists in MongoDB
      const existingUser = await User.findOne({ contact: employee.contact });

      if (!existingUser) {
        // 🔹 Step 3: Generate a default password (hashed)
        const defaultPassword = await bcrypt.hash("password123", 10);

        // 🔹 Step 4: Create user in MongoDB
        const newUser = new User({
          name: employee.name,
          contact: employee.contact,
          password: defaultPassword,
          role: "Employee",
        });

        await newUser.save();
        console.log(`✅ Employee synced: ${employee.name}`);
      } else {
        console.log(`⚠️ Employee already exists: ${employee.name}`);
      }
    }

    console.log("✅ Employee sync completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Sync error:", error);
  }
}

// Run Sync
syncEmployees();
