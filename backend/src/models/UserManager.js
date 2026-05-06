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
                user.status,
                user.id
            ]
        );
    }
    // find avec mdp de passe pour la comparaison hash/front
    findUserByEmail(email) {
        return this.database.query(
            `SELECT * FROM users WHERE email = ?`, 
            [email]
        );
    }

    // 
    //  ----------------------------------- FIND AVEC RETRAIT DU CHAMPS PASSWORD -------------------------------

    findUserByPseudo(pseudo) {
        return this.database.query(
            `SELECT id, firstname, lastname, pseudo, email, bio, profile_picture, status, created_at FROM users WHERE pseudo = ?`, 
            [pseudo]
        );
    }

    findAllUsers() {
        return this.database.query(
            `SELECT id, firstname, lastname, pseudo, email, bio, profile_picture, status, created_at FROM users`
        );
    }

    findUser(id) {
        return this.database.query(
            `SELECT id, firstname, lastname, pseudo, email, bio, profile_picture, status, created_at FROM users where id = ?`,
            [id]
        );
    }
}


module.exports = UserManager;