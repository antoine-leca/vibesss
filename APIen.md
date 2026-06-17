# Vibesss API

## Description

Welcome to the documentation of our `RESTful API` for the **Vibesss** blogging platform. This API allows you to create, read, update, and delete information related to users, blogs, articles, comments, reports, and notifications. It is built using `REST` standards and is accessible via `standard HTTP` requests. The data is returned in `JSON` format for easy use in any application or website (especially our React frontend). In the following sections, we will detail the different features and routes of the API as well as request and response examples.

---

## Endpoints:

### Authentication:

- Register a user: `POST /auth/register`
- Login a user: `POST /auth/login`
- Logout a user: `GET /auth/logout`

### Users:

- Retrieve all users: `GET /users`
- Retrieve a user by ID: `GET /users/:id`
- Update a user: `PATCH /users/:id` *(Requires token)*
- Search by email: `POST /users/email` *(Requires token)*
- Search by pseudo: `POST /users/pseudo` *(Requires token)*
- Delete a user: `DELETE /users/:id` *(Requires token)*

### Blogs:

- Retrieve all blogs: `GET /blogs`
- Retrieve a blog by ID: `GET /blogs/:id`
- Retrieve blogs by a specific user: `GET /blogs/user/:id`
- Create a blog: `POST /blogs` *(Requires token)*
- Update a blog: `PUT /blogs/:id` *(Requires token)*
- Delete a blog: `DELETE /blogs/:id` *(Requires token)*

### Articles:

- Retrieve all articles: `GET /articles`
- Retrieve an article by ID: `GET /articles/:id`
- Retrieve articles from a specific blog: `GET /blogs/:blogId/articles`
- Create an article: `POST /articles` *(Requires token)*
- Update an article: `PUT /articles/:id` *(Requires token)*
- Delete an article: `DELETE /articles/:id` *(Requires token)*
- Delete all articles by a specific user: `DELETE /articles/user/:userId` *(Requires token)*

### Comments:

- Retrieve all comments: `GET /comments`
- Retrieve a comment by ID: `GET /comments/:id`
- Retrieve comments for a specific article: `GET /articles/:articleId/comments`
- Add a comment: `POST /comments` *(Requires token)*
- Update a comment: `PUT /comments/:id` *(Requires token)*
- Delete a comment: `DELETE /comments/:id` *(Requires token)*

### Themes & Categories:

- Retrieve all themes: `GET /themes`
- Create a theme: `POST /themes` *(Requires token)*
- Retrieve all blog categories: `GET /blogs_categories`
- Retrieve categories for a specific blog: `GET /blogs_categories/blog/:blogId`
- Associate a category with a blog: `POST /blogs_categories` *(Requires token)*
- Remove a category from a blog: `DELETE /blogs_categories/:blogId/:categoryId` *(Requires token)*

### Interactions (Likes & Reports):

- Like an article: `POST /users_articles` *(Requires token)*
- Remove a Like (Unlike): `DELETE /users_articles` *(Requires token)*
- Retrieve all reports: `GET /reports`
- Add a report (spam, harassment, etc.): `POST /reports`
- Update a report status: `PUT /reports/:id`
- Delete a report: `DELETE /reports/:id`

### Notifications:

- Retrieve all notifications: `GET /notifications` *(Requires token)*
- Retrieve unread notifications for a user: `GET /notifications/unread/:userId` *(Requires token)*
- Retrieve all notifications for a user: `GET /notifications/user/:userId` *(Requires token)*
- Create a notification: `POST /notifications` *(Requires token)*
- Mark a notification as read: `PUT /notifications/:id` *(Requires token)*
- Delete a notification: `DELETE /notifications/:id` *(Requires token)*

### Administration & Roles:

- Retrieve existing roles: `GET /roles`
- Assign a role to a user: `POST /users_roles` *(Requires token)*
- Retrieve admin statistics: `GET /admin/stats`
- Retrieve recent activities: `GET /admin/activities`

---

## Articles Example

### Retrieve all articles

Request:

```http
GET /articles
Response:

JSON
{
    "articles": [
        {
            "id": 1,
            "title": "Introduction to React 19",
            "content": "<p>Discover the new features of React 19 for your interfaces...</p>",
            "cover_image": "[https://example.com/images/react19.jpg](https://example.com/images/react19.jpg)",
            "created_at": "2024-05-15T10:30:00Z",
            "updated_at": "2024-05-15T10:30:00Z",
            "blog_id": 3,
            "author_id": 1,
            "likes_count": 42
        },
        {
            "id": 2,
            "title": "Optimizing your Node.js backend",
            "content": "<p>Some tips to make Express even faster...</p>",
            "cover_image": "[https://example.com/images/node.jpg](https://example.com/images/node.jpg)",
            "created_at": "2024-05-16T14:15:00Z",
            "updated_at": "2024-05-16T14:15:00Z",
            "blog_id": 1,
            "author_id": 2,
            "likes_count": 15
        }
    ]
}
Retrieve an article by ID
Request:

HTTP
GET /articles/1
Response:

JSON
{
    "id": 1,
    "title": "Introduction to React 19",
    "content": "<p>Discover the new features of React 19 for your interfaces...</p>",
    "cover_image": "[https://example.com/images/react19.jpg](https://example.com/images/react19.jpg)",
    "created_at": "2024-05-15T10:30:00Z",
    "updated_at": "2024-05-15T10:30:00Z",
    "blog_id": 3,
    "author_id": 1,
    "likes_count": 42
}
Add an article (Requires Token)
Request:

HTTP
POST /articles
Authorization: Bearer <your_jwt_token>
With a request body (JSON):

JSON
{
    "title": "My first article on Vibesss",
    "content": "<h1>Hello World!</h1><p>I am thrilled to share my vibes here.</p>",
    "cover_image": "[https://example.com/images/hello.jpg](https://example.com/images/hello.jpg)",
    "blog_id": 3,
    "author_id": 1
}
Update an article (Requires Token)
Request:

HTTP
PUT [https://api.vibesss.com/articles/1](https://api.vibesss.com/articles/1)
Authorization: Bearer <your_jwt_token>

Body:
{
    "title": "Complete Introduction to React 19",
    "content": "<h1>Hello World!</h1><p>I am thrilled to share my vibes here. Update: React 19 is awesome.</p>",
    "cover_image": "[https://example.com/images/hello_v2.jpg](https://example.com/images/hello_v2.jpg)"
}
Expected response:

HTTP
HTTP/1.1 200 OK

Body:
{
    "id": 1,
    "title": "Complete Introduction to React 19",
    "content": "<h1>Hello World!</h1><p>I am thrilled to share my vibes here. Update: React 19 is awesome.</p>",
    "cover_image": "[https://example.com/images/hello_v2.jpg](https://example.com/images/hello_v2.jpg)",
    "updated_at": "2024-05-17T09:00:00Z"
}
Delete an article (Requires Token)
Request:

HTTP
DELETE [https://api.vibesss.com/articles/1](https://api.vibesss.com/articles/1)
Authorization: Bearer <your_jwt_token>
Expected response:

HTTP
HTTP/1.1 204 No Content
Error Handling
For error handling, the API must return as much information as possible so the developer can understand the error and apply a fix, but also enough information so the frontend can use it to display functional issues to the end user.

For instance, in a REST API, it is important that the different error cases are clearly explained:

Plaintext
400 - Bad Request: The request is malformed (e.g., missing fields when creating an article).
401 - Unauthorized: The user is not authenticated (Missing or invalid JWT Token).
403 - Forbidden: The user is not authorized to access or modify this resource (e.g., trying to edit another user's article).
404 - Not Found: The requested resource cannot be found (e.g., the article was not found in the MySQL database).
500 - Internal Server Error: Unexpected server-side error.
URL Filters Management
To be done

Typing
To be done