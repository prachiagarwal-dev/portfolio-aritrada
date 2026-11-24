import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { sendContactMessage } from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  function update(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSending(true);

    try {
      await sendContactMessage(form);

      toast.success("Your message has been sent.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.message || "Unable to send your message.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="contact-page">
      <p className="eyebrow">LET'S WORK TOGETHER</p>
      <h1>Have a project in mind?</h1>
      <p>Tell Aritra about your design requirements.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Your name</label>
        <input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />

        <label>Email address</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />

        <label>Subject</label>
        <input
          required
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
        />

        <label>Tell us about your project</label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />

        <button disabled={sending}>
          {sending ? "Sending..." : "Send enquiry"}
        </button>
      </form>
    </main>
  );
}