const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");
const UsersTable = require("./tables/usersTable");

const APP_SECRET = process.env.APP_SECRET;

const hash = (string) => {
  return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
};

const setToken = ({ id, email, password, res }) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({ id, email, password }, APP_SECRET, {
      expiresIn: 3600,
    });

    res.json({ token });
    resolve({ token });
  });
};

const authAccount = (token) => {
  return new Promise((resolve, reject) => {
    let isAuthed = false;

    if (token) {
      const { email, password } = jwt.decode(token, APP_SECRET);

      UsersTable.getByEmail({ email })
        .then(({ user }) => {
          if (user && user.password === password) {
            isAuthed = true;
          }

          resolve({ user, isAuthed });
        })
        .catch((error) => reject(error));
    } else {
      resolve({ isAuthed });
    }
  });
};

module.exports = { hash, setToken, authAccount };
