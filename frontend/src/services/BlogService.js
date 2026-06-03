const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const BlogService = {
  create: async (blogData) => {
    try {
      const response = await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de la création du blog:", error);
      throw error;
    }
  },
};

export default BlogService;