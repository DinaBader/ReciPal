const User = require("../models/user.model");

const findByIdAndUpdate = async (userId, update) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });

    if (!updatedUser) {
      console.log(`User not found.`);
      return null;
    }

    console.log(`User updated successfully.`);
    return updatedUser;
  } catch (error) {
    console.error('couldnt update user:', error);
    throw error;
  }
};

module.exports = {
    findByIdAndUpdate,
};