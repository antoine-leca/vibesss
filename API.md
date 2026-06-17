# API Vibesss

## Description

Bienvenue dans la documentation de notre `API RESTful` pour la plateforme de blogging **Vibesss**. Cette API vous permet de créer, lire, mettre à jour et supprimer des informations relatives aux utilisateurs, aux blogs, aux articles, aux commentaires, aux signalements (reports) et aux notifications. Elle est construite en utilisant les normes `REST` et est accessible via des requêtes `HTTP standard`. Les données sont retournées au format `JSON` pour une utilisation facile dans n'importe quelle application ou site web (notamment notre frontend React). Dans les sections suivantes, nous allons détailler les différentes fonctionnalités et routes de l'API ainsi que des exemples de requêtes et de réponses.

---

## Endpoints :

### Authentification :

- Inscription d'un utilisateur : `POST /auth/register`
- Connexion d'un utilisateur : `POST /auth/login`
- Déconnexion d'un utilisateur : `GET /auth/logout`

### Utilisateurs :

- Récupérer tous les utilisateurs : `GET /users`
- Récupérer un utilisateur par ID : `GET /users/:id`
- Mettre à jour un utilisateur : `PATCH /users/:id` *(Nécessite token)*
- Rechercher par email : `POST /users/email` *(Nécessite token)*
- Rechercher par pseudo : `POST /users/pseudo` *(Nécessite token)*
- Supprimer un utilisateur : `DELETE /users/:id` *(Nécessite token)*

### Blogs :

- Récupérer tous les blogs : `GET /blogs`
- Récupérer un blog par ID : `GET /blogs/:id`
- Récupérer les blogs d'un utilisateur : `GET /blogs/user/:id`
- Créer un blog : `POST /blogs` *(Nécessite token)*
- Mettre à jour un blog : `PUT /blogs/:id` *(Nécessite token)*
- Supprimer un blog : `DELETE /blogs/:id` *(Nécessite token)*

### Articles :

- Récupérer tous les articles : `GET /articles`
- Récupérer un article par ID : `GET /articles/:id`
- Récupérer les articles d'un blog : `GET /blogs/:blogId/articles`
- Créer un article : `POST /articles` *(Nécessite token)*
- Mettre à jour un article : `PUT /articles/:id` *(Nécessite token)*
- Supprimer un article : `DELETE /articles/:id` *(Nécessite token)*
- Supprimer tous les articles d'un utilisateur : `DELETE /articles/user/:userId` *(Nécessite token)*

### Commentaires :

- Récupérer tous les commentaires : `GET /comments`
- Récupérer un commentaire par ID : `GET /comments/:id`
- Récupérer les commentaires d'un article : `GET /articles/:articleId/comments`
- Ajouter un commentaire : `POST /comments` *(Nécessite token)*
- Mettre à jour un commentaire : `PUT /comments/:id` *(Nécessite token)*
- Supprimer un commentaire : `DELETE /comments/:id` *(Nécessite token)*

### Thèmes & Catégories :

- Récupérer tous les thèmes : `GET /themes`
- Créer un thème : `POST /themes` *(Nécessite token)*
- Récupérer toutes les catégories de blogs : `GET /blogs_categories`
- Récupérer les catégories d'un blog : `GET /blogs_categories/blog/:blogId`
- Associer une catégorie à un blog : `POST /blogs_categories` *(Nécessite token)*
- Retirer une catégorie d'un blog : `DELETE /blogs_categories/:blogId/:categoryId` *(Nécessite token)*

### Interactions (Likes & Signalements) :

- Liker un article : `POST /users_articles` *(Nécessite token)*
- Retirer son Like : `DELETE /users_articles` *(Nécessite token)*
- Récupérer tous les signalements : `GET /reports`
- Ajouter un signalement : `POST /reports`
- Mettre à jour un signalement : `PUT /reports/:id`
- Supprimer un signalement : `DELETE /reports/:id`

### Notifications :

- Récupérer toutes les notifications : `GET /notifications` *(Nécessite token)*
- Récupérer les notifications non lues d'un utilisateur : `GET /notifications/unread/:userId` *(Nécessite token)*
- Récupérer toutes les notifications d'un utilisateur : `GET /notifications/user/:userId` *(Nécessite token)*
- Créer une notification : `POST /notifications` *(Nécessite token)*
- Marquer une notification comme lue : `PUT /notifications/:id` *(Nécessite token)*
- Supprimer une notification : `DELETE /notifications/:id` *(Nécessite token)*

### Administration & Rôles :

- Récupérer les rôles existants : `GET /roles`
- Assigner un rôle à un utilisateur : `POST /users_roles` *(Nécessite token)*
- Récupérer les statistiques admin : `GET /admin/stats`
- Récupérer les activités récentes : `GET /admin/activities`

---

## Exemple Articles

### Récupérer tous les articles

Requête :

```http
GET /articles
Réponse :

JSON
{
    "articles": [
        {
            "id": 1,
            "title": "Introduction à React 19",
            "content": "<p>Découvrez les nouvelles fonctionnalités de React 19 pour vos interfaces...</p>",
            "cover_image": "[https://example.com/images/react19.jpg](https://example.com/images/react19.jpg)",
            "created_at": "2024-05-15T10:30:00Z",
            "updated_at": "2024-05-15T10:30:00Z",
            "blog_id": 3,
            "author_id": 1,
            "likes_count": 42
        },
        {
            "id": 2,
            "title": "Optimiser son backend Node.js",
            "content": "<p>Quelques astuces pour rendre Express encore plus rapide...</p>",
            "cover_image": "[https://example.com/images/node.jpg](https://example.com/images/node.jpg)",
            "created_at": "2024-05-16T14:15:00Z",
            "updated_at": "2024-05-16T14:15:00Z",
            "blog_id": 1,
            "author_id": 2,
            "likes_count": 15
        }
    ]
}
Récupérer un article par son ID
Requête :

HTTP
GET /articles/1
Réponse :

JSON
{
    "id": 1,
    "title": "Introduction à React 19",
    "content": "<p>Découvrez les nouvelles fonctionnalités de React 19 pour vos interfaces...</p>",
    "cover_image": "[https://example.com/images/react19.jpg](https://example.com/images/react19.jpg)",
    "created_at": "2024-05-15T10:30:00Z",
    "updated_at": "2024-05-15T10:30:00Z",
    "blog_id": 3,
    "author_id": 1,
    "likes_count": 42
}
Ajouter un article (Nécessite Token)
Requête :

HTTP
POST /articles
Authorization: Bearer <votre_token_jwt>
Avec un corps de requête (JSON) :

JSON
{
    "title": "Mon premier article sur Vibesss",
    "content": "<h1>Hello World!</h1><p>Je suis ravi de partager mes vibes ici.</p>",
    "cover_image": "[https://example.com/images/hello.jpg](https://example.com/images/hello.jpg)",
    "blog_id": 3,
    "author_id": 1
}
Mise à jour d'un article (Nécessite Token)
Requête :

HTTP
PUT [https://api.vibesss.com/articles/1](https://api.vibesss.com/articles/1)
Authorization: Bearer <votre_token_jwt>

Body :
{
    "title": "Introduction complète à React 19",
    "content": "<h1>Hello World!</h1><p>Je suis ravi de partager mes vibes ici. Mise à jour : React 19 est génial.</p>",
    "cover_image": "[https://example.com/images/hello_v2.jpg](https://example.com/images/hello_v2.jpg)"
}
Réponse attendue :

HTTP
HTTP/1.1 200 OK

Body :
{
    "id": 1,
    "title": "Introduction complète à React 19",
    "content": "<h1>Hello World!</h1><p>Je suis ravi de partager mes vibes ici. Mise à jour : React 19 est génial.</p>",
    "cover_image": "[https://example.com/images/hello_v2.jpg](https://example.com/images/hello_v2.jpg)",
    "updated_at": "2024-05-17T09:00:00Z"
}
Effacer un article (Nécessite Token)
Requête :

HTTP
DELETE [https://api.vibesss.com/articles/1](https://api.vibesss.com/articles/1)
Authorization: Bearer <votre_token_jwt>
Réponse attendue :

HTTP
HTTP/1.1 204 No Content
Gestion des erreurs
Pour la gestion des erreurs, l'API retourne le maximum d'informations pour que le développeur puisse comprendre l'erreur et effectuer une correction, mais également suffisamment d'informations pour que le frontend puisse les utiliser afin de retourner les problèmes fonctionnels à l'utilisateur final.

Voici les différents cas d'erreur explicités pour Vibesss :

Plaintext
400 - Bad Request : La requête est mal formée (ex: champs manquants lors de la création d'un article).
401 - Unauthorized : L'utilisateur n'est pas authentifié (Token JWT manquant ou invalide).
403 - Forbidden : L'utilisateur n'est pas autorisé à accéder ou modifier cette ressource (ex: essayer de modifier l'article d'un autre utilisateur).
404 - Not Found : La ressource demandée n'existe pas (ex: l'article n'a pas été trouvé dans la base de données MySQL).
500 - Internal Server Error : Erreur inattendue côté serveur.
Gestion des filtres par URL
(À venir)

Typage
(À venir)