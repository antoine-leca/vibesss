const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const BlogService = {
  create: (blogData) => fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blogData),
  }),

  update: (id, blogData) => fetch(`${API_URL}/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blogData),
  }),

  getAll: () => fetch(`${API_URL}/blogs`).then(res => res.json()),

  getByUserId: (userId) => fetch(`${API_URL}/blogs/user/${userId}`).then(res => res.json()),
};

export default BlogService;