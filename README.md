Vibesss - Immersive Blogging Platform
Vibesss is a modern blogging platform designed to offer a seamless writing and reading experience. Share your "vibes" through rich articles and a customizable interface.

🛠️ Quick Installation
1. Clone and Install
Bash
git clone <your_repo_url>
cd vibesss
npm install
2. Database
Create a .env file in the backend folder and run the migration: npm run migrate

 Tech Stack
Frontend
React 19 & Vite: Performance and speed.

Tailwind CSS & DaisyUI: Modern and responsive interface.

Tiptap: Rich Text Editor.

Lucide React: Elegant icons.

Backend
Node.js & Express 5: Robust API.

MySQL: Structured data management.

Argon2 & JWT: Security and enhanced authentication.

Sanitize-HTML: Protection against XSS vulnerabilities.

Key Features
Advanced Editing
Article creation with rich formatting (bold, images, etc.).

Character counter integrated directly into the editor.

 Super-Admin Moderation
Direct Actions: Deletion of articles, blogs, and comments directly from the public view for admins.

Reporting Dashboard: Centralized management of community reports.

 Social Interaction
Comment system with replies.

Dynamic likes on articles.

Content reporting (Spam, Harassment, etc.).

 Project Structure
Plaintext
vibesss/
├── backend/                # Express API & Database
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # SQL Queries (AbstractManager)
│   │   └── router.js       # API Routes
│   └── database.sql        # Schemas & Initial data
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Moderation & blog UI
│   │   ├── services/       # API calls
│   │   └── pages/          # Home, BlogSpace, Profile
└── docker-compose.yml      # Docker Orchestration
 Team
Project created by TeamBossLady