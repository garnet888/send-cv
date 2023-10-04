const UsersTable = require("../tables/usersTable");
const { authAccount, hash } = require("../authHelper");

// const getUserByID = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await UsersTable.getByID({ id });

//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const users = await UsersTable.getAll();

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// const updateUser = (req, res, next) => {
//   const { id, firstname, lastname, phonenumber, email } = req.body;

//   authAccount(req.headers.token)
//     .then(({ isAuthed }) => {
//       if (isAuthed) {
//         UsersTable.update({
//           id,
//           avatar,
//           firstname,
//           lastname,
//           phonenumber,
//           email,
//         })
//           .then((status) => res.json(status))
//           .catch((error) => {
//             next(error);
//           });
//       } else {
//         res.json({
//           status: 409,
//           message: "Баталгаажуулалт буруу байна!",
//         });
//       }
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

// const changePassword = (req, res, next) => {
//   const { oldPassword, newPassword } = req.body;

//   authAccount(req.headers.token)
//     .then(({ user, isAuthed }) => {
//       if (isAuthed) {
//         if (user.password === hash(oldPassword)) {
//           UsersTable.changePassword({
//             id: user.id,
//             new_password: hash(newPassword),
//           })
//             .then((status) => res.json(status))
//             .catch((error) => {
//               next(error);
//             });
//         } else {
//           res.json({
//             status: 409,
//             message: "Хуучин нууц үг таарахгүй байна!",
//           });
//         }
//       } else {
//         res.json({
//           status: 409,
//           message: "Баталгаажуулалт буруу байна!",
//         });
//       }
//     })
//     .catch((error) => next(error));
// };

// const deleteUser = (req, res, next) => {
//   const { id } = req.params;

//   UsersTable.delete({ id })
//     .then((response) => res.json(response))
//     .catch((error) => next(error));
// };

module.exports = {
  getAllUsers,
  // getUserByID,
  // updateUser,
  // changePassword,
  // deleteUser,
};
