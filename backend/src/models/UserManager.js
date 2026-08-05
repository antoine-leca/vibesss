    const AbstractManager = require("./AbstractManager");

    class UserManager extends AbstractManager {
        constructor() {
            super({ table: "users" });
        }

        insert(user) {
            return this.database.query(
                `INSERT INTO ${this.table} (lastname, firstname, pseudo, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    user.lastname,
                    user.firstname,
                    user.pseudo,
                    user.email,
                    user.hashedPassword,
                    user.role_id || 1 // Attribution par défaut du rôle utilisateur (1) si non spécifié
                ]
            );
        }

        // Mise à jour partielle (PATCH) pour firstname, lastname, bio
        update(id, firstname, lastname, bio) {
            return this.database.query(
                `UPDATE ${this.table} SET lastname = ?, firstname = ?, bio = ? WHERE id = ?`,
                [
                    lastname,
                    firstname,
                    bio,
                    id
                ]
            );
        }

        // Nouvelle méthode pour modifier le rôle d'un utilisateur (remplace l'ancien UserRoleManager)
        updateRole(id, roleId) {
            return this.database.query(
                `UPDATE ${this.table} SET role_id = ? WHERE id = ?`,
                [roleId, id]
            );
        }

        // Récupération de l'utilisateur avec son rôle et mot de passe (pour le login)
        findUserByEmail(email) {
            return this.database.query(
                `SELECT u.*, r.label AS role_name 
                FROM users u
                JOIN roles r ON u.role_id = r.id
                WHERE u.email = ?`,
                [email]
            );
        }

        // ----------------------------------- FIND AVEC RETRAIT DU CHAMP PASSWORD -------------------------------

        findUserByPseudo(pseudo) {
            return this.database.query(
                `SELECT u.id, u.firstname, u.lastname, u.pseudo, u.email, u.bio, u.profile_picture, u.status, u.role_id, u.created_at, r.label AS role_name
                FROM users u
                JOIN roles r ON u.role_id = r.id
                WHERE u.pseudo = ?`, 
                [pseudo]
            );
        }

        findAllUsers() {
            return this.database.query(
                `SELECT u.id, u.firstname, u.lastname, u.pseudo, u.email, u.bio, u.profile_picture, u.status, u.role_id, u.created_at,
                        r.label AS role_name,
                        (u.role_id = 2) AS is_admin
                FROM users u
                JOIN roles r ON u.role_id = r.id`
            );
        }

        findUser(id) {
            return this.database.query(
                `SELECT u.id, u.firstname, u.lastname, u.pseudo, u.email, u.bio, u.profile_picture, u.status, u.role_id, u.created_at, r.label AS role_name
                FROM users u
                JOIN roles r ON u.role_id = r.id
                WHERE u.id = ?`,
                [id]
            );
        }

        getLatestActivities() {
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