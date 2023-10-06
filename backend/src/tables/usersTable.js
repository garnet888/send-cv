const pool = require("../databasePool");

class UsersTable {
  static signup({ firstname, lastname, phonenumber, email, password }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO users(
            firstname,
            lastname,
            phonenumber,
            email,
            password
          ) VALUES ($1, $2, $3, $4, $5)`,
        [firstname, lastname, phonenumber, email, password],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users
          ORDER BY id DESC`,
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows);
          }
        }
      );
    });
  }

  static getByID({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users
          WHERE id = $1`,
        [id],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows[0]);
          }
        }
      );
    });
  }

  static getByEmail({ email }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users
          WHERE email = $1`,
        [email],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ user: response.rows[0] });
          }
        }
      );
    });
  }

  static update({
    id,
    photo,
    firstname,
    lastname,
    birthDate,
    register,
    gender,
    address,
    phonenumber,
    email,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE users SET
            photo = $2,
            firstname = $3,
            lastname = $4,
            birth_date = $5,
            register = $6,
            gender = $7,
            address = $8,
            phonenumber = $9,
            email = $10
          WHERE id = $1`,
        [
          id,
          photo,
          firstname,
          lastname,
          birthDate,
          register,
          gender,
          address,
          phonenumber,
          email,
        ],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static changePassword({ id, new_password }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE users SET
            password = $2
          WHERE id = $1`,
        [id, new_password],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static delete({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM users
          WHERE id = $1`,
        [id],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }
}

module.exports = UsersTable;
