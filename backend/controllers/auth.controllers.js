const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login=async (req,res)=>{
  const {usernameOrEmail,password}=req.body;

  const isEmail = userNameOrEmail.includes('@');

  let user;
  if (isEmail) {
    user = await User.findOne({ email: userNameOrEmail });
  } else {
    user = await User.findOne({ userName: userNameOrEmail });
  }

  if (!user) {
    return res.status(400).send({ message: "Invalid username/email or password" });
  }
  
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).send({ message: "Invalid username/email or password" });
  }

  const {password: hashedPassword ,...userDetails}=user.toJSON();
  const token = jwt.sign(
      {
          ...userDetails,
      },
      process.env.JWT_SECRET,{
          expiresIn: "2 days"
      }
  );
  res.status(200).send({
      user: userDetails,
      token,
    });
}


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
    login,
    register,
  };