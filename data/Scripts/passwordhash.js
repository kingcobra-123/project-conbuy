
// Script for hashing passwords for test users

import bcrypt from "bcrypt";

async function hashPasswords(passwords) {
  const hashedPasswords = [];
  for (const password of passwords) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    hashedPasswords.push(hashedPassword);
  }
  return hashedPasswords;
}

const testUserCredentials = [
  {
    email: "test1@gmail.com",
    password: "test1",
  },
  {
    email: "test2@gmail.com",
    password: "test2",
  },
  {
    email: "test3@gmail.com",
    password: "test3",
  },
  {
    email: "test4@gmail.com",
    password: "test4",
  },
  {
    email: "test5@gmail.com",
    password: "test5",
  },
  {
    email: "conbuyofficial@gmail.com",
    password: "conbuyofficial",
  },
];

const testPasswords = testUserCredentials.map((user) => user.password);

hashPasswords(testPasswords)
  .then((hashed) => {
    console.log("Hashed Passwords:", hashed);
  })
  .catch((err) => {
    console.error("Error hashing passwords:", err);
  });
