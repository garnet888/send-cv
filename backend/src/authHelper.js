const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");
const UsersTable = require("./tables/usersTable");

const APP_SECRET = process.env.APP_SECRET;

const hash = (string) => {
  return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
};

const setToken = ({ id, email, password, res }) => {
  try {
    const token = jwt.sign({ id, email, password }, APP_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const authAccount = async (res, token) => {
  try {
    let isAuthed = false;

    if (token) {
      const { email, password } = jwt.decode(token, APP_SECRET);

      const { user } = await UsersTable.getByEmail({ email });

      if (user && user.password === password) {
        isAuthed = true;

        res.status(200).json({ user, isAuthed });
      } else {
        res.status(404).json({ message: "Буруу баталгаажуулалт" });
      }
    } else {
      res.status(404).json({ message: "Токен байхгүй байна!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { hash, setToken, authAccount };
