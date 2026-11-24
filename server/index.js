
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const JWT_SECRET = process.env.JWT_SECRET || "";

const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || "http://localhost:5173";

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
  throw new Error(
    "Missing ADMIN_EMAIL, ADMIN_PASSWORD or JWT_SECRET in .env"
  );
}

app.use(
  cors({
    origin: CLIENT_ORIGIN.split(",").map((v) => v.trim()),
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "2mb" }));

function safeCompare(a, b) {
  const first = Buffer.from(String(a));
  const second = Buffer.from(String(b));

  if (first.length !== second.length) {
    return false;
  }

  return crypto.timingSafeEqual(first, second);
}

function authenticateToken(req, res, next) {
  const header = req.headers.authorization || "";

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Please log in.",
    });
  }

  try {
    req.admin = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please log in again.",
    });
  }
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio server is running.",
  });
});

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body || {};

  const validEmail = safeCompare(
    String(email || "").trim().toLowerCase(),
    ADMIN_EMAIL.trim().toLowerCase()
  );

  const validPassword = safeCompare(
    String(password || ""),
    ADMIN_PASSWORD
  );

  if (!validEmail || !validPassword) {
    return res.status(401).json({
      success: false,
      message: "Incorrect email or password.",
    });
  }

  const token = jwt.sign(
    {
      email: ADMIN_EMAIL,
      role: "admin",
    },
    JWT_SECRET,
    { expiresIn: "12h" }
  );

  return res.json({
    success: true,
    token,
    admin: {
      email: ADMIN_EMAIL,
      role: "admin",
    },
  });
});

// Verify admin session
app.get("/api/admin/verify", authenticateToken, (req, res) => {
  res.json({
    success: true,
    admin: {
      email: req.admin.email,
      role: req.admin.role,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
