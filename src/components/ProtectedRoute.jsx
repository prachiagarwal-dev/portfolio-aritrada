import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyAdminSession } from "../services/api";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    verifyAdminSession().then(valid => {
      if (active) {
        setStatus(valid ? "allowed" : "denied");
      }
    });

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="page-loading">
        Checking admin access...
      </div>
    );
  }

  if (status === "denied") {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}
