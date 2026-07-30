import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCourses, deleteCourse } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data.courses || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;
    try {
      await deleteCourse(id, token);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="page">
      <header className="topbar">
        <span className="brand">Coursely admin</span>
        <div className="topbar-actions">
          <Link to="/courses/new">
            <button>New course</button>
          </Link>
          <button className="ghost" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="content">
        <h1>Courses</h1>

        {loading && <p className="muted">Loading courses...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && courses.length === 0 && (
          <div className="empty-state">
            <p>No courses yet.</p>
            <Link to="/courses/new">
              <button>Create your first course</button>
            </Link>
          </div>
        )}

        <div className="course-list">
          {courses.map((course) => (
            <div className="course-row" key={course._id}>
              <div>
                <p className="course-title">{course.title}</p>
                <p className="muted small">
                  {course.isPublished ? "Published" : "Draft"} · ₹{course.price}
                </p>
              </div>
              <div className="row-actions">
                <Link to={`/courses/${course._id}/edit`}>
                  <button className="ghost">Edit</button>
                </Link>
                <button className="danger" onClick={() => handleDelete(course._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
