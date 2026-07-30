const BASE_URL = "http://localhost:3000/api";

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const registerUser = (username, email, password) =>
  request("/users/register", { method: "POST", body: { username, email, password } });

export const loginUser = (email, password) =>
  request("/users/login", { method: "POST", body: { email, password } });

export const getCourses = () => request("/courses");

export const getCourse = (id) => request(`/courses/${id}`);

export const enrollInCourse = (courseId, token) =>
  request(`/enrollments/${courseId}`, { method: "POST", token });

export const getMyEnrollments = (token) =>
  request("/enrollments/my-courses", { token });

export const getEnrollmentStatus = (courseId, token) =>
  request(`/enrollments/${courseId}/status`, { token });
