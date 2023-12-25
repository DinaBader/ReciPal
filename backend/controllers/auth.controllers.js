const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const { firstname, lastname, email,age,password,role} = req.body;
    if (!firstname || !lastname || !password || !age || !email) {
      res.status(400).send({ message: "all fields are required" });
    }
    
    try {  
      const user = new User({
        firstname,
        lastname,
        email,
        age,
        password,
        role,
        image:""
      });
  
      await user.save();
      const { password: hashedPassword, ...userDetails } = user.toJSON();
      const token = jwt.sign(
        {
          ...userDetails,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2 days",
        }
      );
      res.status(200).send({ user:userDetails,token });
      return;
    } catch (e) {
      console.error(e)
      res.status(500).send({ error: e });
    }
  };
  
  module.exports = {
    register,
  };