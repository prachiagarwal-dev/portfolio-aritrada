import React from "react";
import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-main">
          <div className="footer-brand">
            <h2>Aritra Das Sharma<span>.</span></h2>
            <p>Graphic Designer & Multimedia Faculty</p>
          </div>

          <div className="footer-connect">
            <h3>Connect</h3>
            <a href="mailto:aritradassharma16@gmail.com">
              Email
            </a>
            <a href="tel:+919038397432">
              Call
            </a>
          </div>

          <div className="footer-contact">
            <h3>Contact</h3>
            <p>Kolkata, India</p>
            <a href="mailto:aritradassharma16@gmail.com">
              aritradassharma16@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-admin">
          <Link to="/admin/login">
            <LockKeyhole size={15} />
            Admin Login
          </Link>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Aritra Das Sharma. All rights reserved.</p>
          <a href="#home">Back to top ↑</a>
        </div>

      </div>
    </footer>
  );
}