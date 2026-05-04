const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
    constructor() {
        super({table: "articles"});
    }

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

    update(article) {
    return this.database.query(
    `UPDATE ${this.table} SET user_id = ?, blog_id = ?, title = ?, content_text = ?, content_image = ?, release_date = ?, status = ? WHERE id = ?`,
    [
        article.user_id,
        article.blog_id,
        article.title,
        article.content_text,
        article.content_image,
        article.release_date,
        article.status,
        article.id

    ]
    );
}

    deleteAllByUserId(userId) {
        return this.database.query(
            `DELETE FROM ${this.table} WHERE user_id = ?`,
            [userId]
        );
    }
}


module.exports = ArticleManager;
