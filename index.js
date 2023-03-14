require("dotenv").config();
const ConnectDB = require("./config/db");
const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server working good");
});
app.use("/api/users", userRouter);
// app.use("/api/users", userRouter);
const PORT = process.env.PORT || 5001;
ConnectDB();
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
