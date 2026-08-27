const commentController = require("../controllers/commentController");
const models = require("../models");

jest.mock("../models", () => ({
  comment: { insert: jest.fn(), find: jest.fn() },
  article: { find: jest.fn() },
  notif: { insert: jest.fn() },
}));

describe("commentController.add", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("n'envoie PAS de notification lorsque l'auteur commente son propre article", async () => {
    const userId = 42;
    const articleId = 101;
    const commentId = 777;

    models.comment.insert.mockResolvedValue([{ insertId: commentId }]);
    models.comment.find.mockResolvedValue([[{ 
      id: commentId, 
      content: "Super article !", 
      article_id: articleId, 
      user_id: userId, 
      pseudo: "testuser", 
      profile_picture: null 
    }]]);
    models.article.find.mockResolvedValue([[{ user_id: userId }]]);

    const req = {
      body: {
        content: "Super article !",
        article_id: articleId,
        user_id: userId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    };

    await commentController.add(req, res);

    expect(models.comment.insert).toHaveBeenCalledWith({
      content: "Super article !",
      article_id: articleId,
      user_id: userId,
    });
    expect(models.notif.insert).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ 
      id: commentId, 
      content: "Super article !", 
      article_id: articleId, 
      user_id: userId, 
      pseudo: "testuser", 
      profile_picture: null 
    });
  });
});
