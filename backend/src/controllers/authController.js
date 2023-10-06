const { hash, setToken, authAccount } = require("../authHelper");
const UsersTable = require("../tables/usersTable");

const signup = async (req, res) => {
  try {
    const { firstname, lastname, phonenumber, email, password } = req.body;

    const { user } = await UsersTable.getByEmail({ email });

    if (user) {
      res.status(409).json({
        message: "Бүртгэгдсэн цахим шуудан байна!",
      });
    } else {
      const result = await UsersTable.signup({
        firstname,
        lastname,
        phonenumber,
        email,
        password: hash(password),
      });

      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordHash = hash(password);

    const { user } = await UsersTable.getByEmail({ email });

    if (user) {
      if (user.password === passwordHash) {
        setToken({
          email: user.email,
          password: user.password,
          res,
        });
      } else {
        console.error("Буруу нууц үг");
        res.status(409).json({ message: "Нууц үг буруу байна!" });
      }
    } else {
      console.error("Буруу цахим шуудан");
      res.status(409).json({ message: "Цахим шуудан буруу байна!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const myInfo = async (req, res) => {
  try {
    const { token } = req.headers;

    const { user, isAuthed, status, message } = await authAccount(token);

    if (isAuthed) {
      res.status(200).json(user);
    } else {
      res.status(status).json({ message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login, myInfo };
