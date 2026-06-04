const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const BlogService = {
  create: (blogData) => fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Transmet le cookie HttpOnly pour la création
    body: JSON.stringify(blogData),
  }),

  update: (id, blogData) => fetch(`${API_URL}/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Transmet le cookie HttpOnly pour la modification
    body: JSON.stringify(blogData),
  }),

  getByUserId: (userId) => fetch(`${API_URL}/blogs/user/${userId}`, {
    credentials: "include" // Transmet le cookie HttpOnly pour la lecture
  }).then(res => {
    if (!res.ok) throw new Error(`Erreur lors de la récupération du blog: ${res.status}`);
    return res.json();
  }),
};

export default BlogService;