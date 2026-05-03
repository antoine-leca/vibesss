const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
    constructor() {
        super({table: "users"});
    }

    insert(user) {
        return this.database.query(
            `INSERT INTO ${this.table} (lastname, firstname, pseudo, email, password) VALUES (?, ?, ?, ?, ?)`,
            [
                user.lastname,
                user.firstname,
                user.pseudo,
                user.email,
                user.password
            ]
        );
    }

    update(user) {
        return this.database.query(
            `UPDATE ${this.table} SET lastname = ?, firstname = ?, pseudo = ?, email = ?, password = ?, bio = ?, profile_picture = ?, status = ? WHERE id = ?`,
            [
                user.lastname,
                user.firstname,
                user.pseudo,
                user.email,
                user.password,
                user.bio,
                user.profile_picture,
                user.status
            ]
        );
    }
}


module.exports = UserManager;