const { hash, authAccount } = require("../authHelper");
const UsersTable = require("../tables/usersTable");

const getAllUsers = async (req, res) => {
  try {
    const { isAuthed, status, message } = await authAccount(
      req.headers.token,
      "ADMIN"
    );

    if (isAuthed) {
      const users = await UsersTable.getAll();

      res.status(200).json(users);
    } else {
      res.status(status).json({ message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUserByID = async (req, res) => {
  try {
    const { isAuthed, status, message } = await authAccount(
      req.headers.token,
      "ADMIN"
    );

    if (isAuthed) {
      const { id } = req.params;
      const user = await UsersTable.getByID({ id });

      res.status(200).json(user);
    } else {
      res.status(status).json({ message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      photo,
      firstname,
      lastname,
      birthDate,
      register,
      gender,
      address,
      phonenumber,
      email,
    } = req.body;

    const { user, isAuthed, status, message } = await authAccount(
      req.headers.token
    );

    if (isAuthed) {
      const result = await UsersTable.update({
        id: user.id,
        photo,
        firstname,
        lastname,
        birthDate,
        register,
        gender,
        address,
        phonenumber,
        email,
      });

      res.status(200).json(result);
    } else {
      res.status(status).json({ message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const { user, isAuthed, status, message } = await authAccount(
      req.headers.token
    );

    if (isAuthed) {
      if (user.password === hash(oldPassword)) {
        const result = await UsersTable.changePassword({
          id: user.id,
          new_password: hash(newPassword),
        });

        res.status(200).json(result);
      } else {
        res.status(409).json({ message: "Хуучин нууц үг таарахгүй байна!" });
      }
    } else {
      res.status(status).json({ message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { isAuthed, status, message } = await authAccount(
      req.headers.token,
      "ADMIN"
    );

    if (isAuthed) {
      const { id } = req.params;

      const result = await UsersTable.delete({ id });
      res.status(200).json(result);
    } else {
      res.status(status).json({ message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  updateUser,
  changePassword,
  deleteUser,
};
