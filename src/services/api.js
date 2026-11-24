
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const SESSION_KEY = "aritra_admin_session";

// Save admin session
export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

// Get admin session
export function getSession() {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// Clear admin session
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// Safely read API response
async function readResponse(response) {
  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text || "Invalid server response" };
  }

  if (!response.ok) {
    throw new Error(
      data.message || `Server error (${response.status})`
    );
  }

  return data;
}

// Admin login
export async function adminLogin(email, password) {
  let response;

  try {
    response = await fetch(`${API_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch {
    throw new Error(
      `Cannot connect to server at ${API_URL}. Check whether your backend is running.`
    );
  }

  const data = await readResponse(response);

  if (!data.success || !data.token) {
    throw new Error(data.message || "Admin login failed.");
  }

  const session = {
    token: data.token,
    admin: data.admin,
  };

  saveSession(session);

  return session;
}

// Verify admin session
export async function verifyAdminSession() {
  const session = getSession();

  if (!session?.token) {
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/api/admin/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    if (!response.ok) {
      clearSession();
      return false;
    }

    const data = await readResponse(response);

    return data.success === true;
  } catch (error) {
    console.error("Session verification error:", error);
    return false;
  }
}

// Admin logout
export async function adminLogout() {
  clearSession();
}

// Contact form
export async function sendContactMessage(formData) {
  let response;

  try {
    response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch {
    throw new Error(
      "Cannot connect to the server. Please try again later."
    );
  }

  return await readResponse(response);
}
