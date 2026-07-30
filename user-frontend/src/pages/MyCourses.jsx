import { useEffect, useState } from "react";
import { getMyEnrollments } from "../api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    getMyEnrollments(token)
      .then((data) => setEnrollments(data.enrollments || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="page">
      <Navbar active="my-courses" />
      <main className="content">
        <h1>My courses</h1>

        {loading && <p className="muted">Loading your courses...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && enrollments.length === 0 && (
          <div className="empty-state">
            <p className="muted">You haven't enrolled in any courses yet.</p>
          </div>
        )}

        <div className="course-list">
          {enrollments.map((enrollment) => (
            <div className="course-row" key={enrollment._id}>
              <div>
                <p className="course-title">{enrollment.course?.title}</p>
                <p className="muted small">{enrollment.course?.description}</p>
              </div>
              <span className="price">₹{enrollment.course?.price}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
