const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");
const AdminTable = require("./tables/adminTable");
const UsersTable = require("./tables/usersTable");

const APP_SECRET = process.env.APP_SECRET;

const hash = (string) => {
  return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
};

const setToken = ({ email, password, res }) => {
  try {
    const token = jwt.sign({ email, password }, APP_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const authAccount = (token, role) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isAuthed = false;

      if (token) {
        let DATA = {};
        const { email, password } = jwt.decode(token, APP_SECRET);

        if (role === "ADMIN") {
          const { admin } = await AdminTable.getByUsername({
            username: email,
          });

          DATA = admin;
        } else {
          const { user } = await UsersTable.getByEmail({ email });

          DATA = user;
        }

        if (DATA && DATA.password === password) {
          isAuthed = true;

          resolve({ user: DATA, isAuthed });
        } else {
          resolve({ status: 409, message: "Буруу баталгаажуулалт!" });
        }
      } else {
        resolve({ status: 404, message: "Токен байхгүй байна!" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { hash, setToken, authAccount };
