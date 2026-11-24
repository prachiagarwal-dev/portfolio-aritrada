import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LockKeyhole, ArrowLeft } from "lucide-react";

import { authAPI } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      if (email.trim().toLowerCase() !==
          "aritradassharma16@gmail.com") {
        throw new Error("This account is not authorised.");
      }

      const { data, error } = await authAPI.login(
        email.trim(),
        password
      );

      if (error) throw error;

      if (data.user.email !== "aritradassharma16@gmail.com") {
        await authAPI.logout();
        throw new Error("Administrator access denied.");
      }

      toast.success("Welcome to your dashboard!");
      navigate("/admin", { replace: true });

    } catch (error) {
      toast.error(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <Link to="/" className="back-link">
          <ArrowLeft size={17} /> Back to Website
        </Link>

        <div className="login-icon">
          <LockKeyhole size={28} />
        </div>

        <span className="eyebrow">PRIVATE ADMIN AREA</span>

        <h1>Welcome Back.</h1>

        <p>Sign in to manage your creative portfolio.</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Your admin email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button
            className="btn-primary login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <small>Authorised administrator access only.</small>
      </div>
    </div>
  );
}
