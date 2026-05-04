        const AbstractManager = require("./AbstractManager");

        class UserLikeArticleManager extends AbstractManager {
            constructor() {
                super({ table : "users_articles" });
            }


        insert(userId, articleId){
                return this.database.query(`INSERT INTO ${this.table} (user_id, article_id) VALUES (?,?)`,
                [userId, articleId]
                );
            }

        deleteLike(userId, articleId) {
                return this.database.query(
                `DELETE FROM ${this.table} WHERE user_id = ? AND article_id = ?`,
                [userId, articleId]
            );
            }
            
        }

        module.exports = UserLikeArticleManager;