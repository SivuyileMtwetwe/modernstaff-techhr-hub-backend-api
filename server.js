import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const PORT = process.env.PORT

const app = express();

const pool = mysql.createPool({
  host: process.env.HOSTNAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});



app.listen(PORT, ()=>{
    console.log("Welcome to the modern-tech server running on port "+PORT);
})
