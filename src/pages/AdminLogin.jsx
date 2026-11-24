import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  ArrowLeft
} from "lucide-react";
import { adminLogin } from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await adminLogin(email.trim(), password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err.message || "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">

        <Link to="/" className="back-home">
          <ArrowLeft size={17} />
          Back to portfolio
        </Link>

        <div className="admin-login-icon">
          <LockKeyhole size={30} />
        </div>

        <p className="eyebrow">PRIVATE ACCESS</p>

        <h1>Admin Login</h1>

        <p className="login-description">
          Sign in to manage your portfolio.
        </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="admin-email">
            Email address
          </label>

          <div className="login-input">
            <Mail size={18} />

            <input
              id="admin-email"
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <label htmlFor="admin-password">
            Password
          </label>

          <div className="login-input">
            <LockKeyhole size={18} />

            <input
              id="admin-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? "Signing in..."
              : "Sign in to dashboard"}
          </button>

        </form>
      </div>
    </main>
  );
}
