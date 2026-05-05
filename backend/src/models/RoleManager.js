const AbstractManager = require("./AbstractManager");

class RoleManager extends AbstractManager {
    constructor() {
        super({ table: "roles" });
    }

    insert(role) {
        return this.database.query(`INSERT INTO ${this.table}(label) VALUES (?)`, [
            role.label
        ]);
    }

    update(role) {
        return this.database.query(
            `UPDATE ${this.table} SET label = ? WHERE id = ?`,
            [
                role.label,
                role.id
            ]
        );
    }
}

module.exports = RoleManager;