import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8083/blog"; // Update this if your backend port or URL differs

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    content: "",
    author: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ id: null, title: "", content: "", author: "" });
      setIsEditing(false);
      fetchBlogs();
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>📝 Blog Manager</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
        <h2>{isEditing ? "✏️ Edit Blog" : "➕ Create Blog"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={form.author}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          rows={5}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
          {isEditing ? "Update" : "Create"}
        </button>
      </form>

      <h2>📚 All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "6px" }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>
              <strong>Author:</strong> {blog.author}<br />
              <small>🕒 {new Date(blog.createdAt).toLocaleString()}</small>
            </p>
            <button onClick={() => handleEdit(blog)} style={{ marginRight: "0.5rem", padding: "0.3rem 0.7rem" }}>
              Edit
            </button>
            <button onClick={() => handleDelete(blog.id)} style={{ padding: "0.3rem 0.7rem", color: "white", backgroundColor: "red", border: "none", borderRadius: "4px" }}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
