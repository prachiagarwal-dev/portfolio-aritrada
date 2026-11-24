
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
 
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/project/:slug"
          element={<ProjectDetails />}
        />

        <Route
          path="/projects"
          element={<Navigate to="/#portfolio" replace />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <main className="project-not-found">
              <h1>404</h1>
              <p>Page not found.</p>
              <a href="/">Return to portfolio</a>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
