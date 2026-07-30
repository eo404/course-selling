import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCourse, updateCourse, getCourse } from "../api";
import { useAuth } from "../context/AuthContext";

export default function CourseForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditing) return;
    getCourse(id).then((data) => {
      const c = data.course;
      setTitle(c.title || "");
      setDescription(c.description || "");
      setPrice(c.price ?? "");
      setThumbnail(c.thumbnail || "");
      setIsPublished(Boolean(c.isPublished));
    }).catch((err) => setError(err.message));
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      title,
      description,
      price: Number(price),
      ...(thumbnail ? { thumbnail } : {}),
      ...(isEditing ? { isPublished } : {}),
    };

    try {
      if (isEditing) {
        await updateCourse(id, payload, token);
      } else {
        await createCourse(payload, token);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <span className="brand">Coursely admin</span>
      </header>

      <main className="content narrow">
        <h1>{isEditing ? "Edit course" : "New course"}</h1>

        <form className="card-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />

          <label>Price (₹)</label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label>Thumbnail URL</label>
          <input
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="https://..."
          />

          {isEditing && (
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              Published
            </label>
          )}

          {error && <p className="error">{error}</p>}

          <div className="form-actions">
            <button type="button" className="ghost" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEditing ? "Save changes" : "Create course"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
