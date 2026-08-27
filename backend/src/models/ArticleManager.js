const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
    constructor() {

        super({ table: "articles" });
    }

    // Insérer un article lié à un blog et un utilisateur
    insert(article) {
        return this.database.query(
            `INSERT INTO ${this.table} (user_id, blog_id, title, content_text, content_image, release_date, creation_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                article.user_id,
                article.blog_id,
                article.title,
                article.content_text,
                article.content_image,
                article.release_date,
                article.creation_date,
                article.status
            ]
        );
    }

    // Mettre à jour un article
    update(article) {
        return this.database.query(
            `UPDATE ${this.table} SET title = ?, content_text = ?, content_image = ?, release_date = ?, status = ? WHERE id = ?`,
            [
                article.title,
                article.content_text,
                article.content_image,
                article.release_date,
                article.status,
                article.id
            ]
        );
    }

    // Supprimer tous les articles d'un utilisateur
    deleteAllByUserId(userId) {
        return this.database.query(
            `DELETE FROM ${this.table} WHERE user_id = ?`,
            [userId]
        );
    }

    // Récupérer tous les articles d'un blog spécifique
    findAllByBlogId(blogId) {
        return this.database.query(
            `SELECT * FROM ${this.table} WHERE blog_id = ?`,
            [blogId]
        );
    }
}

module.exports = ArticleManager;
