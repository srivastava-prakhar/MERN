const user = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if username exists
    const usernameCheck = await user.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already in use", status: false });

    // Check if email exists
    const emailCheck = await user.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already in use", status: false });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await user.create({
      email,
      username,
      password: hashedPassword,
    });

    // Convert to plain object and remove password
    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

    // Send response
    return res.json({ status: true, user: userWithoutPassword });
  } catch (ex) {
    next(ex);
  }
};

// module.exports.login = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const User = await user.findOne({ username });
//     if (!User)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     const isPasswordValid = await bcrypt.compare(password, User.password);
//     if (!isPasswordValid) {
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     }
//     delete User.password;

//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// };
// const bcrypt = require("bcrypt"); 
// const UserModel = require("../models/UserModel"); // Ensure this path is correct

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const User = await user.findOne({ username });

    if (!User) {
      return res.status(400).json({ msg: "Incorrect Username or Password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Incorrect Username or Password", status: false });
    }

    // Convert to plain object and remove password
    const userWithoutPassword = User.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({ status: true, User: userWithoutPassword });

  } catch (ex) {
    next(ex);
  }
};





module.exports.setAvatar = async (req, res) => {
  try {
    console.log("Received setAvatar request:", req.body, req.params.id);

    const userId = req.params.id;
    const { avatarImage } = req.body;

    if (!avatarImage) {
      return res.status(400).json({ msg: "Avatar image is required" });
    }

    const userData = await user.findByIdAndUpdate(
      userId,
      { isAvatarImageSet: true, avatarImage },
      { new: true }
    );

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.json({ status: true, user: userData });
  } catch (ex) {
    console.error("Error setting avatar:", ex);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await user
      .find({ _id: { $ne: req.params.id } })
      .select(["email", "username", "avatarImage", "_id"]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
