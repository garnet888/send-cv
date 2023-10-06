const pool = require("../databasePool");

class AdminTable {
  static getByUsername({ username }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM admin
          WHERE username = $1`,
        [username],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ admin: response.rows[0] });
          }
        }
      );
    });
  }
}

module.exports = AdminTable;
