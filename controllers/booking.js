const User = require("../models/user");
exports.postAddUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const user = await User.create({ name: name, email: email });
    res.status(201).json({ newUserDetails: user });
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    const response = await user.destroy();
    res.status(200).json({ res: response });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
