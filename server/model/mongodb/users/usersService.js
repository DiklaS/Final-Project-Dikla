const User = require("./Users");

const registerUser = (userData) => {
  const user = new User(userData);
  return user.save({ password: 0 });
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getAllUsers = () => {
  return User.find().select(["-password", "-createdAt", "-__v"]);
};

const getUserById = (id) => {
  return User.findById(id).select(["-password", "-createdAt", "-__v"]);
};

const updateUser = (id, userToUpdate) => {
  //normalize card
  return User.findByIdAndUpdate(id, userToUpdate, {
    new: true,
  }).select(["-password", "-createdAt", "-__v"]);
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
