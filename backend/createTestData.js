require("dotenv").config();

const mysql = require("mysql2/promise");
const argon2 = require("argon2");

const createTestData = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("Connecté à la base de données\n");

    // 1. Créer un utilisateur de test
    const passwordHash = await argon2.hash("password123");
    
    const [userResult] = await connection.execute(
      "INSERT INTO users (pseudo, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)",
      ["testuser", "test@example.com", passwordHash, "Test", "User"]
    );
    const userId = userResult.insertId;
    console.log(`Utilisateur créé: ID ${userId}`);

    // 2. Créer un blog
    const [blogResult] = await connection.execute(
      "INSERT INTO blogs (title, description, user_id, theme_id) VALUES (?, ?, ?, ?)",
      ["Test Blog", "A test blog for comments", userId, 1]
    );
    const blogId = blogResult.insertId;
    console.log(`Blog créé: ID ${blogId}`);

    // 3. Créer un article
    const [articleResult] = await connection.execute(
      "INSERT INTO articles (title, content_text, user_id, blog_id, status) VALUES (?, ?, ?, ?, ?)",
      ["Test Article", "<p>This is a test article for comments</p>", userId, blogId, "published"]
    );
    const articleId = articleResult.insertId;
    console.log(`Article créé: ID ${articleId}`);

    // 4. Créer un commentaire
    const [commentResult] = await connection.execute(
      "INSERT INTO comments (content, article_id, user_id, moderation_status) VALUES (?, ?, ?, ?)",
      ["This is a test comment!", articleId, userId, "approved"]
    );
    const commentId = commentResult.insertId;
    console.log(`Commentaire créé: ID ${commentId}\n`);

    console.log("Données de test créées:");
    console.log(`   - Utilisateur: testuser (ID ${userId})`);
    console.log(`   - Blog: Test Blog (ID ${blogId})`);
    console.log(`   - Article: Test Article (ID ${articleId})`);
    console.log(`   - Commentaire: This is a test comment! (ID ${commentId})`);
    console.log(`\n🧪 Testez avec: http://localhost:5173/test/comments/${articleId}`);

    await connection.end();
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      console.log("Les données de test existent déjà");
    } else {
      console.error("Erreur:", error.message);
    }
    process.exit(1);
  }
};

createTestData();
