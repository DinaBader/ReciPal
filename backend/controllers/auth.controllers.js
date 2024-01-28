const User = require("../models/user.model");
const Recipe = require("../models/recipe.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  let user;
  if (usernameOrEmail.includes("@")) {
    user = await User.findOne({ email: usernameOrEmail });
  } else {
    user = await User.findOne({ username: usernameOrEmail });
  }
  if (!password) {
    return res.status(400).send({ message: "Password is required" });
  }

  if (!user) {
    return res
      .status(400)
      .send({ message: "Invalid username/email or password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(400)
      .send({ message: "Invalid username/email or password" });
  }

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
  res.status(200).send({
    user: userDetails,
    token,
  });
};

const register = async (req, res) => {
  const { email, password, role, username } = req.body;
  if (!password || !email || !username) {
    return res.status(400).send({ message: "all fields are required" });
  }
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).send({ message: "Email or username already exists" });
  }

  try {
    const recipes = await Recipe.find();
    const user = new User({
      email,
      password,
      role,
      image: "default.jpg",
      username,
      finshed_recipes: recipes.map((recipe) => ({
        recipe: recipe._id,
        completed: false,
      })),
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
    res.status(200).send({ user: userDetails, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};


module.exports = {
  login,
  register,
};
