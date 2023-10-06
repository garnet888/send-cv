const AdminTable = require("../tables/adminTable");
const { hash, setToken } = require("../authHelper");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const passwordHash = hash(password);

    const { admin } = await AdminTable.getByUsername({ username });

    if (admin) {
      if (admin.password === passwordHash) {
        setToken({
          email: admin.username,
          password: admin.password,
          res,
        });
      } else {
        console.error("Буруу нууц үг");
        res.status(409).json({ message: "Нууц үг буруу байна!" });
      }
    } else {
      console.error("Буруу хэрэглэгчийн нэр!");
      res.status(409).json({ message: "Хэрэглэгчийн нэр буруу байна!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
