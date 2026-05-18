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
                user.hashedPassword
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

    getLatestActivities(){
        return this.database.query(
            `(SELECT id, 'Nouvel article' as type, creation_date as time FROM articles)
            UNION
            (SELECT id, 'Blog créé' as type, creation_date as time FROM blogs)
            UNION
            (SELECT id, 'Signalement' as type, report_date as time FROM reports)
            UNION
            (SELECT id, 'Nouvel utilisateur' as type, created_at as time FROM users)
            ORDER BY time DESC LIMIT 50`
        );
    }
}


module.exports = UserManager;