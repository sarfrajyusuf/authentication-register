require("dotenv").config();
const mongoose = require("mongoose");

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, { family: 4 });
    console.log(`Server Connected`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = ConnectDB;
