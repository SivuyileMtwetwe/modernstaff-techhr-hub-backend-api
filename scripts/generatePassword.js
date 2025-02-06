import bcrypt from "bcryptjs";

const password = "password123"; // Change this if needed

bcrypt.hash(password, 10).then((hashedPassword) => {
  console.log("Hashed Password:", hashedPassword);
});
