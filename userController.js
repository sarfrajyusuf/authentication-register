require("dotenv").config();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

module.exports.register = async (req, res) => {
  try {
    //get user
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body, "======");
    // return;
    //check validation
    if (!firstName && lastName && email && password) {
      return res.status(400).json({
        status: 400,
        msg: "All fields are required",
        body: {},
      });
    }
    //check email exist or not
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        status: 400,
        msg: "user already exist",
        body: {},
      });
    }
    //password encrypted
    const hashPassword = await bcrypt.hash(password, 10);

    //user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    // Create token
    const token = jwt.sign({ user_id: user._id, email }, "cqlsys123", {
      expiresIn: "2h",
    });
    // save user token
    user.token = token;

    return res.status(201).json({
      status: 201,
      msg: "user registered successfully",
      body: { user },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Something Went Wrong",
      body: {},
    });
  }
};

//=================== login ============//

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        status: 400,
        msg: "email and password not exist",
      });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      //token
      const token = jwt.sign({ user_id: user._id, email }, "cqlsys123", {
        expiresIn: "2h",
      });
      // save user token
      user.token = token;

      return res.status(200).json({
        status: 200,
        msg: "user login successfully",
        body: {
          user,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    // res.status(200).send("Welcome 🙌 ");
    const user = await User.find({});
    if (user) {
      return res.status(200).json({
        status: 200,
        msg: "all users",
        body: { user },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      msg: "somthing went wrong",
      body: {},
    });
  }
};
