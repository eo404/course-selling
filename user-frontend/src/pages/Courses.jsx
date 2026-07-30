import { useEffect, useState } from "react";
import { getCourses, enrollInCourse } from "../api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollingId, setEnrollingId] = useState(null);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    getCourses()
      .then((data) => setCourses(data.courses || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEnroll = async (courseId) => {
    setEnrollingId(courseId);
    try {
      await enrollInCourse(courseId, token);
      setEnrolledIds((prev) => [...prev, courseId]);
    } catch (err) {
      alert(err.message);
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="page">
      <Navbar active="courses" />
      <main className="content">
        <h1>Browse courses</h1>

        {loading && <p className="muted">Loading courses...</p>}
        {error && <p className="error">{error}</p>}

        <div className="course-grid">
          {courses.map((course) => {
            const isEnrolled = enrolledIds.includes(course._id);
            return (
              <div className="course-card" key={course._id}>
                <div className="thumb" style={course.thumbnail ? { backgroundImage: `url(${course.thumbnail})` } : {}} />
                <div className="card-body">
                  <p className="course-title">{course.title}</p>
                  <p className="muted small">{course.description}</p>
                  <div className="card-footer">
                    <span className="price">₹{course.price}</span>
                    <button
                      disabled={isEnrolled || enrollingId === course._id}
                      onClick={() => handleEnroll(course._id)}
                    >
                      {isEnrolled ? "Enrolled" : enrollingId === course._id ? "Enrolling..." : "Enroll"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!loading && courses.length === 0 && <p className="muted">No courses available yet.</p>}
      </main>
    </div>
  );
}
