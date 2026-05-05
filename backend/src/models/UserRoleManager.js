const AbstractManager = require("./AbstractManager");

class UserRoleManager extends AbstractManager {
    constructor() {
        super({ table: "users_roles" });
    }

    insert(userId, roleId) {
        return this.database.query(`INSERT INTO ${this.table} (user_id, role_id) VALUES (?,?)`,
            [userId, roleId]
        );
    }

    delete(userId, roleId) {
        return this.database.query(
            `DELETE FROM ${this.table} WHERE user_id = ? AND role_id = ?`,
            [userId, roleId]
        );
    }
}

module.exports = UserRoleManager;