// src/pages/Admin.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  User,
  FolderKanban,
  Wrench,
  Briefcase,
  Image as ImageIcon,
  Share2,
  Eye,
  EyeOff,
  Trash2,
  RotateCcw,
  Plus,
  Save,
  LogOut,
  Upload,
  CheckCircle2,
  ArrowLeft,
  Sliders,
} from "lucide-react";

import {
  getSession,
  verifyAdminSession,
  clearSession,
} from "../services/api";

const slugify = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

const DEFAULT_PROJECT_FORM = {
  title: "",
  slug: "",
  category: "Logo Design",
  coverImage: "",
  overview: "",
  objectives: "",
  concept: "",
  process: "",
  colorPalette: "#0F172A, #F59E0B, #FFFFFF",
  typography: "Syne Bold & Plus Jakarta Sans",
  software: "Adobe Illustrator, Adobe Photoshop",
  deliverables: "Print-Ready PDF & High-Res Source Files",
  galleryCaption: "Primary Artwork Plate",
  galleryDescription: "",
  hidden: false,
  is_deleted: false,
};

const DEFAULT_SKILL_FORM = {
  name: "",
  shortCode: "",
  percentage: 90,
  color: "#f59e0b",
  category: "Creative Suite",
  description: "",
};

const DEFAULT_GALLERY_FORM = {
  title: "",
  category: "Digital Illustration",
  imageUrl: "",
  description: "",
};

export default function Admin({
  data = {},
  savePortfolioData,
  resetToDefault,
}) {
  const navigate = useNavigate();

  // Authentication
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  // Dashboard
  const [activeTab, setActiveTab] = useState("overview");
  const [statusMsg, setStatusMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  // Forms
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState(DEFAULT_PROJECT_FORM);
  const [newSkill, setNewSkill] = useState(DEFAULT_SKILL_FORM);
  const [newGallery, setNewGallery] = useState(DEFAULT_GALLERY_FORM);

  // Safe data defaults
  const projects = data.projects || [];
  const skills = data.skills || [];
  const gallery = data.gallery || [];
  const experience = data.experience || [];
  const education = data.education || [];
  const socials = data.socials || [];
  const categories = (data.categories || []).filter(
    (category) => category !== "All"
  );
  const profile = data.profile || {};

  const notify = (message) => {
    setStatusMsg(message);
    window.setTimeout(() => setStatusMsg(""), 3500);
  };

  // Verify Express JWT session created by AdminLogin.jsx
  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      try {
        const savedSession = getSession();

        if (!savedSession?.token) {
          if (active) {
            setAuthChecking(false);
            navigate("/admin/login", { replace: true });
          }
          return;
        }

        const valid = await verifyAdminSession();

        if (!active) return;

        if (valid) {
          setIsAuthenticated(true);
          setAdminEmail(savedSession.admin?.email || "");
        } else {
          clearSession();
          setIsAuthenticated(false);
          navigate("/admin/login", { replace: true });
        }
      } catch (error) {
        console.error("Admin session verification failed:", error);

        if (active) {
          clearSession();
          setIsAuthenticated(false);
          navigate("/admin/login", { replace: true });
        }
      } finally {
        if (active) setAuthChecking(false);
      }
    };

    checkSession();

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    setIsAuthenticated(false);
    navigate("/admin/login", { replace: true });
  };

  // Update portfolio safely
  const updateData = async (updatedData, message = "Changes saved.") => {
    if (typeof savePortfolioData !== "function") {
      notify("Save function is not connected. Check App.jsx.");
      return;
    }

    try {
      await savePortfolioData(updatedData);
      notify(message);
    } catch (error) {
      console.error("Portfolio save failed:", error);
      notify(error.message || "Could not save changes.");
    }
  };

  // Local file upload fallback.
  // This reads the selected file as a data URL and saves it with portfolio data.
  // For large files, use a server/Supabase Storage upload endpoint instead.
  const handleFileUpload = async (file, onSuccessUrl) => {
    if (!file) return;

    setUploading(true);

    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Could not read this file."));

        reader.readAsDataURL(file);
      });

      onSuccessUrl(dataUrl);
      notify("File loaded. Save the related portfolio section to keep it.");
    } catch (error) {
      console.error("File upload failed:", error);
      alert(`Upload error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // ---------------- PROJECT MANAGEMENT ----------------

  const handleSaveProject = async (event) => {
    event.preventDefault();

    if (!projectForm.title.trim()) {
      notify("Please enter a project title.");
      return;
    }

    const generatedSlug = projectForm.slug.trim()
      ? slugify(projectForm.slug)
      : slugify(projectForm.title);

    const parsedPalette = projectForm.colorPalette
      .split(",")
      .map((color) => color.trim())
      .filter(Boolean);

    const parsedSoftware = projectForm.software
      .split(",")
      .map((software) => software.trim())
      .filter(Boolean);

    let updatedProjects;

    if (editingProjectId) {
      updatedProjects = projects.map((project) => {
        if (project.id !== editingProjectId) return project;

        return {
          ...project,
          id: project.id,
          slug: generatedSlug || project.slug,
          title: projectForm.title.trim(),
          category: projectForm.category,
          coverImage: projectForm.coverImage,
          overview: projectForm.overview,
          objectives: projectForm.objectives,
          concept: projectForm.concept,
          process: projectForm.process,
          colorPalette: parsedPalette,
          typography: projectForm.typography,
          software: parsedSoftware,
          deliverables: projectForm.deliverables,
          hidden: Boolean(projectForm.hidden),
          is_deleted: Boolean(projectForm.is_deleted),
          gallery: [
            {
              url: projectForm.coverImage,
              fallback: projectForm.coverImage,
              caption: projectForm.galleryCaption || projectForm.title,
              description:
                projectForm.galleryDescription || projectForm.overview,
            },
            ...(project.gallery?.slice(1) || []),
          ],
        };
      });
    } else {
      const newId = `proj-${generatedSlug}-${Date.now()}`;

      const newProject = {
        id: newId,
        slug: generatedSlug,
        title: projectForm.title.trim(),
        category: projectForm.category,
        featured: true,
        hidden: Boolean(projectForm.hidden),
        is_deleted: Boolean(projectForm.is_deleted),
        coverImage: projectForm.coverImage,
        fallbackCover: projectForm.coverImage,
        overview: projectForm.overview,
        objectives: projectForm.objectives,
        concept: projectForm.concept,
        process: projectForm.process,
        colorPalette: parsedPalette,
        typography: projectForm.typography,
        software: parsedSoftware,
        deliverables: projectForm.deliverables,
        gallery: [
          {
            url: projectForm.coverImage,
            fallback: projectForm.coverImage,
            caption: projectForm.galleryCaption || projectForm.title,
            description: projectForm.galleryDescription || projectForm.overview,
          },
        ],
      };

      updatedProjects = [newProject, ...projects];
    }

    await updateData(
      { ...data, projects: updatedProjects },
      editingProjectId ? "Project updated successfully." : "New project added."
    );

    setEditingProjectId(null);
    setProjectForm(DEFAULT_PROJECT_FORM);
  };

  const startEditProject = (project) => {
    setEditingProjectId(project.id);

    setProjectForm({
      title: project.title || "",
      slug: project.slug || slugify(project.title),
      category: project.category || "Logo Design",
      coverImage: project.coverImage || "",
      overview: project.overview || "",
      objectives: project.objectives || "",
      concept: project.concept || "",
      process: project.process || "",
      colorPalette: (project.colorPalette || []).join(", "),
      typography: project.typography || "",
      software: (project.software || []).join(", "),
      deliverables: project.deliverables || "",
      galleryCaption: project.gallery?.[0]?.caption || "",
      galleryDescription: project.gallery?.[0]?.description || "",
      hidden: Boolean(project.hidden),
      is_deleted: Boolean(project.is_deleted),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleProjectFlag = async (projectId, field) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? { ...project, [field]: !project[field] }
        : project
    );

    await updateData(
      { ...data, projects: updatedProjects },
      `Project ${field === "hidden" ? "visibility" : "status"} updated.`
    );
  };

  // ---------------- SKILL MANAGEMENT ----------------

  const updateSkill = async (skillId, changes) => {
    const updatedSkills = skills.map((skill) =>
      skill.id === skillId ? { ...skill, ...changes } : skill
    );

    await updateData({ ...data, skills: updatedSkills });
  };

  const addSkill = async (event) => {
    event.preventDefault();

    if (!newSkill.name.trim()) return;

    const skill = {
      id: `skill-${Date.now()}`,
      ...newSkill,
      name: newSkill.name.trim(),
      percentage: Math.min(
        100,
        Math.max(1, Number(newSkill.percentage) || 90)
      ),
      hidden: false,
      is_deleted: false,
    };

    await updateData(
      { ...data, skills: [...skills, skill] },
      "New skill added."
    );

    setNewSkill(DEFAULT_SKILL_FORM);
  };

  // ---------------- GALLERY MANAGEMENT ----------------

  const addGalleryItem = async (event) => {
    event.preventDefault();

    if (!newGallery.title.trim()) return;

    const item = {
      id: `gal-${Date.now()}`,
      ...newGallery,
      title: newGallery.title.trim(),
      fallbackUrl: newGallery.imageUrl,
      hidden: false,
      is_deleted: false,
    };

    await updateData(
      { ...data, gallery: [item, ...gallery] },
      "Artwork added to gallery."
    );

    setNewGallery(DEFAULT_GALLERY_FORM);
  };

  const deleteGalleryItem = async (galleryId) => {
    const updatedGallery = gallery.map((item) =>
      item.id === galleryId ? { ...item, is_deleted: true } : item
    );

    await updateData({ ...data, gallery: updatedGallery }, "Artwork moved to trash.");
  };

  // ---------------- PROFILE MANAGEMENT ----------------

  const updateProfile = (field, value) => {
    updateData({
      ...data,
      profile: {
        ...profile,
        [field]: value,
      },
    });
  };

  // ---------------- EXPERIENCE / EDUCATION ----------------

  const updateExperience = (id, field, value) => {
    const updated = experience.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );

    updateData({ ...data, experience: updated });
  };

  const updateEducation = (id, field, value) => {
    const updated = education.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );

    updateData({ ...data, education: updated });
  };

  // ---------------- SECTION / SOCIAL MANAGEMENT ----------------

  const sectionSettings = data.sections || data.sectionSettings || {};

  const updateSectionVisibility = (key) => {
    const updatedSections = {
      ...sectionSettings,
      [key]: !sectionSettings[key],
    };

    // Keep the existing data property name.
    if (data.sections) {
      updateData({ ...data, sections: updatedSections });
    } else {
      updateData({ ...data, sectionSettings: updatedSections });
    }
  };

  const updateSocial = (socialId, changes) => {
    const updatedSocials = socials.map((social) =>
      social.id === socialId ? { ...social, ...changes } : social
    );

    updateData({ ...data, socials: updatedSocials });
  };

  // ---------------- DASHBOARD DATA ----------------

  const TABS = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "profile", label: "Profile & Resume", icon: User },
    { id: "skills", label: "Skills (%)", icon: Wrench },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "experience", label: "Exp & Edu", icon: Briefcase },
    { id: "sections", label: "Sections & Socials", icon: Sliders },
  ];

  const activeProjectCount = projects.filter(
    (project) => !project.hidden && !project.is_deleted
  ).length;

  const hiddenOrDeletedCount = projects.filter(
    (project) => project.hidden || project.is_deleted
  ).length;

  // ---------------- AUTH LOADING ----------------

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-400">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  // ---------------- ADMIN DASHBOARD ----------------

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                View Live Site
              </Link>

              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold">
                Admin Session Active
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
              Portfolio Content Management System
            </h1>

            {adminEmail && (
              <p className="text-xs text-slate-400 mt-1">
                Signed in as {adminEmail}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {statusMsg && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
                {statusMsg}
              </span>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs font-semibold border border-white/10"
            >
              <LogOut className="w-4 h-4" />
              Lock CMS
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25"
                    : "glass-panel text-slate-300 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ================= OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs text-slate-400">Published Projects</p>
                <p className="font-display text-4xl font-extrabold text-white mt-2">
                  {activeProjectCount}
                </p>
              </div>

              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs text-slate-400">Hidden / Trash Projects</p>
                <p className="font-display text-4xl font-extrabold text-amber-400 mt-2">
                  {hiddenOrDeletedCount}
                </p>
              </div>

              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs text-slate-400">Software Skills</p>
                <p className="font-display text-4xl font-extrabold text-white mt-2">
                  {skills.filter((skill) => !skill.is_deleted).length}
                </p>
              </div>

              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs text-slate-400">Website Status</p>
                <p className="font-display text-2xl font-extrabold text-emerald-400 mt-3">
                  {data.settings?.published !== false
                    ? "LIVE & PUBLIC"
                    : "UNPUBLISHED"}
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Restore Default Portfolio Seed
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Reset all sections to the initial portfolio data.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Reset all portfolio content to the initial defaults?"
                    )
                  ) {
                    resetToDefault?.();
                    notify("Initial portfolio data restored.");
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold"
              >
                Reset Initial Data
              </button>
            </div>
          </div>
        )}

        {/* ================= PROJECTS ================= */}
        {activeTab === "projects" && (
          <div className="grid lg:grid-cols-12 gap-8">

            {/* PROJECT FORM */}
            <form
              onSubmit={handleSaveProject}
              className="lg:col-span-6 glass-panel rounded-3xl p-7 space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-xl font-bold text-white">
                  {editingProjectId ? "Edit Project" : "Add New Project"}
                </h2>

                {editingProjectId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProjectId(null);
                      setProjectForm(DEFAULT_PROJECT_FORM);
                    }}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        title: event.target.value,
                        slug: editingProjectId
                          ? projectForm.slug
                          : slugify(event.target.value),
                      })
                    }
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={projectForm.slug}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        slug: slugify(event.target.value),
                      })
                    }
                    className="admin-input font-mono text-amber-300"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        category: event.target.value,
                      })
                    }
                    className="admin-input"
                  >
                    {categories.length ? (
                      categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))
                    ) : (
                      <option value={projectForm.category}>
                        {projectForm.category}
                      </option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Cover Image Path or Upload
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={projectForm.coverImage}
                      onChange={(event) =>
                        setProjectForm({
                          ...projectForm,
                          coverImage: event.target.value,
                        })
                      }
                      className="admin-input min-w-0"
                      placeholder="/images/projects/example.jpg"
                    />

                    <label className="px-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-pointer flex items-center">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) =>
                          handleFileUpload(event.target.files?.[0], (url) =>
                            setProjectForm((previous) => ({
                              ...previous,
                              coverImage: url,
                            }))
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Project Overview
                </label>
                <textarea
                  rows={4}
                  required
                  value={projectForm.overview}
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      overview: event.target.value,
                    })
                  }
                  className="admin-input"
                  placeholder="Write a detailed project description..."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.objectives}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        objectives: event.target.value,
                      })
                    }
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Design Concept
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.concept}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        concept: event.target.value,
                      })
                    }
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Creative Process
                </label>
                <textarea
                  rows={3}
                  value={projectForm.process}
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      process: event.target.value,
                    })
                  }
                  className="admin-input"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Color Palette (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.colorPalette}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        colorPalette: event.target.value,
                      })
                    }
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Software Used
                  </label>
                  <input
                    type="text"
                    value={projectForm.software}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        software: event.target.value,
                      })
                    }
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Typography
                  </label>
                  <input
                    type="text"
                    value={projectForm.typography}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        typography: event.target.value,
                      })
                    }
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Deliverables
                  </label>
                  <input
                    type="text"
                    value={projectForm.deliverables}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        deliverables: event.target.value,
                      })
                    }
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Gallery Caption
                  </label>
                  <input
                    type="text"
                    value={projectForm.galleryCaption}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        galleryCaption: event.target.value,
                      })
                    }
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Gallery Description
                  </label>
                  <input
                    type="text"
                    value={projectForm.galleryDescription}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        galleryDescription: event.target.value,
                      })
                    }
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1">
                <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectForm.hidden}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        hidden: event.target.checked,
                      })
                    }
                  />
                  Hidden from public site
                </label>

                <label className="inline-flex items-center gap-2 text-xs text-rose-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectForm.is_deleted}
                    onChange={(event) =>
                      setProjectForm({
                        ...projectForm,
                        is_deleted: event.target.checked,
                      })
                    }
                  />
                  Soft deleted
                </label>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm"
              >
                <Save className="w-4 h-4" />
                {uploading
                  ? "Please wait..."
                  : editingProjectId
                  ? "Save Project Changes"
                  : "Publish New Project"}
              </button>
            </form>

            {/* PROJECT LIST */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-white">
                Manage Projects ({projects.length})
              </h2>

              {projects.length === 0 && (
                <div className="glass-panel rounded-2xl p-6 text-sm text-slate-400">
                  No projects are available yet.
                </div>
              )}

              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    project.is_deleted
                      ? "opacity-50 border-rose-500/40"
                      : project.hidden
                      ? "opacity-75 border-amber-500/40"
                      : ""
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-amber-400">
                        {project.category}
                      </span>

                      {project.hidden && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          HIDDEN
                        </span>
                      )}

                      {project.is_deleted && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                          DELETED
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-white">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-mono break-all">
                      /project/{project.slug}
                    </p>

                    <p className="text-[10px] text-slate-500 break-all">
                      ID: {project.id}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditProject(project)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-xs font-semibold text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      title={project.hidden ? "Show project" : "Hide project"}
                      onClick={() => toggleProjectFlag(project.id, "hidden")}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300"
                    >
                      {project.hidden ? (
                        <EyeOff className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      title={
                        project.is_deleted ? "Restore project" : "Move to trash"
                      }
                      onClick={() =>
                        toggleProjectFlag(project.id, "is_deleted")
                      }
                      className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400"
                    >
                      {project.is_deleted ? (
                        <RotateCcw className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PROFILE & RESUME ================= */}
        {activeTab === "profile" && (
          <div className="glass-panel rounded-3xl p-8 space-y-6 max-w-4xl">
            <h2 className="font-display text-xl font-bold text-white">
              Edit Profile, Biography & Resume
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={profile.name || ""}
                  onChange={(event) =>
                    updateProfile("name", event.target.value)
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={profile.title || ""}
                  onChange={(event) =>
                    updateProfile("title", event.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Profile Photo URL or Upload
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profile.profileImage || ""}
                    onChange={(event) =>
                      updateProfile("profileImage", event.target.value)
                    }
                    className="admin-input min-w-0"
                  />

                  <label className="px-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer flex items-center">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        handleFileUpload(event.target.files?.[0], (url) =>
                          updateProfile("profileImage", url)
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Resume PDF URL or Upload
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profile.resumeUrl || ""}
                    onChange={(event) =>
                      updateProfile("resumeUrl", event.target.value)
                    }
                    className="admin-input min-w-0"
                  />

                  <label className="px-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer flex items-center">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(event) =>
                        handleFileUpload(event.target.files?.[0], (url) =>
                          updateProfile("resumeUrl", url)
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Detailed Biography
              </label>
              <textarea
                rows={5}
                value={profile.biography || ""}
                onChange={(event) =>
                  updateProfile("biography", event.target.value)
                }
                className="admin-input"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <input
                type="email"
                value={profile.email || ""}
                onChange={(event) => updateProfile("email", event.target.value)}
                placeholder="Email"
                className="admin-input"
              />

              <input
                type="text"
                value={profile.phone || ""}
                onChange={(event) => updateProfile("phone", event.target.value)}
                placeholder="Phone"
                className="admin-input"
              />

              <input
                type="text"
                value={profile.location || ""}
                onChange={(event) =>
                  updateProfile("location", event.target.value)
                }
                placeholder="Location"
                className="admin-input"
              />
            </div>
          </div>
        )}

        {/* ================= SKILLS ================= */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-6">
              <h2 className="font-display text-xl font-bold text-white mb-4">
                Edit Software Proficiency
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {skills
                  .filter((skill) => !skill.is_deleted)
                  .map((skill) => (
                    <div
                      key={skill.id}
                      className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-bold text-white">
                          {skill.name}
                        </span>
                        <span className="font-display font-extrabold text-amber-400">
                          {skill.percentage}%
                        </span>
                      </div>

                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={skill.percentage || 90}
                        onChange={(event) =>
                          updateSkill(skill.id, {
                            percentage: Number(event.target.value),
                          })
                        }
                        className="w-full accent-amber-500"
                      />

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateSkill(skill.id, {
                              hidden: !skill.hidden,
                            })
                          }
                          className="text-xs px-3 py-1 rounded bg-white/10 text-slate-200"
                        >
                          {skill.hidden ? "Show Skill" : "Hide Skill"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateSkill(skill.id, { is_deleted: true })
                          }
                          className="text-xs px-3 py-1 rounded bg-rose-500/20 text-rose-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <form
              onSubmit={addSkill}
              className="glass-panel rounded-3xl p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
            >
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Software Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adobe Photoshop"
                  value={newSkill.name}
                  onChange={(event) =>
                    setNewSkill({ ...newSkill, name: event.target.value })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Proficiency %
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newSkill.percentage}
                  onChange={(event) =>
                    setNewSkill({
                      ...newSkill,
                      percentage: event.target.value,
                    })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newSkill.category}
                  onChange={(event) =>
                    setNewSkill({ ...newSkill, category: event.target.value })
                  }
                  className="admin-input"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </button>
            </form>
          </div>
        )}

        {/* ================= GALLERY ================= */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <form
              onSubmit={addGalleryItem}
              className="glass-panel rounded-3xl p-6 space-y-4"
            >
              <h2 className="font-display text-xl font-bold text-white">
                Add Gallery Artwork
              </h2>

              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Artwork Title"
                  value={newGallery.title}
                  onChange={(event) =>
                    setNewGallery({
                      ...newGallery,
                      title: event.target.value,
                    })
                  }
                  className="admin-input"
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={newGallery.category}
                  onChange={(event) =>
                    setNewGallery({
                      ...newGallery,
                      category: event.target.value,
                    })
                  }
                  className="admin-input"
                />

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newGallery.imageUrl}
                    onChange={(event) =>
                      setNewGallery({
                        ...newGallery,
                        imageUrl: event.target.value,
                      })
                    }
                    className="admin-input min-w-0"
                  />

                  <label className="px-3 rounded-xl bg-amber-500 text-slate-950 font-bold cursor-pointer flex items-center">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        handleFileUpload(event.target.files?.[0], (url) =>
                          setNewGallery((previous) => ({
                            ...previous,
                            imageUrl: url,
                          }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <textarea
                rows={4}
                required
                placeholder="Describe this artwork, its purpose, design choices and visual approach..."
                value={newGallery.description}
                onChange={(event) =>
                  setNewGallery({
                    ...newGallery,
                    description: event.target.value,
                  })
                }
                className="admin-input"
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm"
              >
                Add to Gallery
              </button>
            </form>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery
                .filter((item) => !item.is_deleted)
                .map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel rounded-2xl p-4 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm">
                        {item.title}
                      </p>
                      <p className="text-xs text-amber-400">
                        {item.category}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteGalleryItem(item.id)}
                      className="p-2 rounded-lg bg-rose-500/20 text-rose-300"
                      title="Move artwork to trash"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ================= EXPERIENCE & EDUCATION ================= */}
        {activeTab === "experience" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-white">
                Work Experience
              </h2>

              {experience
                .filter((item) => !item.is_deleted)
                .map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2"
                  >
                    <input
                      type="text"
                      value={item.designation || ""}
                      onChange={(event) =>
                        updateExperience(
                          item.id,
                          "designation",
                          event.target.value
                        )
                      }
                      className="admin-input font-bold"
                      placeholder="Designation"
                    />

                    <input
                      type="text"
                      value={item.organisation || ""}
                      onChange={(event) =>
                        updateExperience(
                          item.id,
                          "organisation",
                          event.target.value
                        )
                      }
                      className="admin-input text-amber-400"
                      placeholder="Organisation"
                    />

                    <textarea
                      rows={3}
                      value={item.description || ""}
                      onChange={(event) =>
                        updateExperience(
                          item.id,
                          "description",
                          event.target.value
                        )
                      }
                      className="admin-input"
                      placeholder="Description"
                    />
                  </div>
                ))}

              {experience.length === 0 && (
                <p className="text-sm text-slate-400">
                  No experience entries found.
                </p>
              )}
            </div>

            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-white">
                Education
              </h2>

              {education
                .filter((item) => !item.is_deleted)
                .map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2"
                  >
                    <input
                      type="text"
                      value={item.course || ""}
                      onChange={(event) =>
                        updateEducation(item.id, "course", event.target.value)
                      }
                      className="admin-input font-bold"
                      placeholder="Course"
                    />

                    <input
                      type="text"
                      value={item.institution || ""}
                      onChange={(event) =>
                        updateEducation(
                          item.id,
                          "institution",
                          event.target.value
                        )
                      }
                      className="admin-input text-amber-400"
                      placeholder="Institution"
                    />

                    <textarea
                      rows={3}
                      value={item.description || ""}
                      onChange={(event) =>
                        updateEducation(
                          item.id,
                          "description",
                          event.target.value
                        )
                      }
                      className="admin-input"
                      placeholder="Description"
                    />
                  </div>
                ))}

              {education.length === 0 && (
                <p className="text-sm text-slate-400">
                  No education entries found.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ================= SECTIONS & SOCIALS ================= */}
        {activeTab === "sections" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-white">
                Section Visibility Controls
              </h2>

              {Object.keys(sectionSettings).length === 0 && (
                <p className="text-sm text-slate-400">
                  No section visibility settings were found in your portfolio
                  data.
                </p>
              )}

              {Object.keys(sectionSettings).map((key) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/70 border border-white/10"
                >
                  <span className="capitalize text-sm font-medium text-white">
                    {key.replace(/([A-Z])/g, " $1")} Section
                  </span>

                  <button
                    type="button"
                    onClick={() => updateSectionVisibility(key)}
                    className={`px-3.5 py-1 rounded-lg text-xs font-bold ${
                      sectionSettings[key]
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {sectionSettings[key] ? "Visible" : "Hidden"}
                  </button>
                </div>
              ))}
            </div>

            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-400" />
                Social Media Links
              </h2>

              {socials.map((social) => (
                <div
                  key={social.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-white/10"
                >
                  <span className="w-24 text-xs font-bold text-amber-400">
                    {social.platform}
                  </span>

                  <input
                    type="url"
                    value={social.url || ""}
                    onChange={(event) =>
                      updateSocial(social.id, { url: event.target.value })
                    }
                    className="admin-input flex-1 min-w-0"
                    placeholder="https://..."
                  />

                  <button
                    type="button"
                    onClick={() =>
                      updateSocial(social.id, {
                        visible: social.visible === false,
                      })
                    }
                    className="text-xs px-2.5 py-1 rounded bg-white/10 text-slate-200"
                  >
                    {social.visible === false ? "Off" : "On"}
                  </button>
                </div>
              ))}

              {socials.length === 0 && (
                <p className="text-sm text-slate-400">
                  No social links found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Small reusable input styles */}
      <style>{`
        .admin-input {
          width: 100%;
          padding: 10px 13px;
          border-radius: 12px;
          background: #0f172a;
          border: 1px solid rgba(255,255,255,0.10);
          color: #fff;
          font-size: 13px;
          outline: none;
        }

        .admin-input:focus {
          border-color: rgba(245,158,11,0.7);
          box-shadow: 0 0 0 2px rgba(245,158,11,0.10);
        }

        .admin-input::placeholder {
          color: #64748b;
        }

        .admin-input option {
          background: #0f172a;
          color: #fff;
        }
      `}</style>
    </div>
  );
}