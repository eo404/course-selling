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

export const loginAdmin = (email, password) =>
  request("/admin/login", { method: "POST", body: { email, password } });

export const registerAdmin = (name, email, password) =>
  request("/admin/register", { method: "POST", body: { name, email, password } });

export const getCourses = () => request("/courses");

export const getCourse = (id) => request(`/courses/${id}`);

export const createCourse = (course, token) =>
  request("/courses", { method: "POST", body: course, token });

export const updateCourse = (id, course, token) =>
  request(`/courses/${id}`, { method: "PATCH", body: course, token });

export const deleteCourse = (id, token) =>
  request(`/courses/${id}`, { method: "DELETE", token });
