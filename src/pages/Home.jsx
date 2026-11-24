
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Layers,
  Sparkles,
  Briefcase,
  Palette,
  Send,
  CheckCircle2,
  ExternalLink,
  X,
  Image as ImageIcon,
} from "lucide-react";

import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import initialData from "../data/initialData";
import Navbar from "../components/Navbar";
export default function Home({ data: receivedData }) {
  const data = receivedData || initialData;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ------------------------------------------
  // DATA
  // ------------------------------------------

  const profile = data.profile || initialData.profile;

  const sections = {
    ...initialData.sectionSettings,
    ...(data.sectionSettings || {}),
    ...(data.sections || {}),
  };

  const settings = {
    ...initialData.websiteSettings,
    ...(data.websiteSettings || {}),
    ...(data.settings || {}),
  };

  const socials = (data.socials || []).filter(
    (item) => !item.hidden && item.visible !== false
  );

  const activeProjects = (data.projects || initialData.projects).filter(
    (project) => !project.hidden && !project.is_deleted
  );

  const activeSkills = (data.skills || initialData.skills).filter(
    (skill) => !skill.hidden && !skill.is_deleted
  );

  const activeExperience = (data.experience || []).filter(
    (item) => !item.hidden && !item.is_deleted
  );

  const activeEducation = (data.education || []).filter(
    (item) => !item.hidden && !item.is_deleted
  );

  const activeServices = (data.services || []).filter(
    (item) => !item.hidden && !item.is_deleted
  );

  const activeCertifications = (data.certifications || []).filter(
    (item) => !item.hidden && !item.is_deleted
  );

  const activeAchievements = (data.achievements || []).filter(
    (item) => !item.hidden && !item.is_deleted
  );

  const activeTestimonials = (data.testimonials || []).filter(
    (item) => !item.hidden && !item.is_deleted
  );

  // ------------------------------------------
  // CATEGORY NORMALIZATION
  // ------------------------------------------

  const categories = useMemo(() => {
    const categoryNames = (data.categories || initialData.categories)
      .filter((category) => {
        if (typeof category === "string") return true;
        return !category.hidden && !category.is_deleted;
      })
      .map((category) => {
        return typeof category === "string"
          ? category
          : category.name;
      })
      .filter(Boolean);

    const projectCategories = activeProjects.map(
      (project) => project.category
    );

    return [
      "All",
      ...new Set([...categoryNames, ...projectCategories]),
    ];
  }, [data.categories, activeProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return activeProjects;
    }

    return activeProjects.filter(
      (project) => project.category === selectedCategory
    );
  }, [selectedCategory, activeProjects]);

  // ------------------------------------------
  // IMAGE FALLBACK
  // ------------------------------------------

  const handleImageFallback = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.style.display = "none";
  };

  // ------------------------------------------
  // CONTACT FORM
  // ------------------------------------------

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSentSuccess(false);

    if (
      !contactForm.name.trim() ||
      !contactForm.email.trim() ||
      !contactForm.message.trim()
    ) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setSending(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from("contact_messages")
          .insert([
            {
              name: contactForm.name.trim(),
              email: contactForm.email.trim(),
              subject:
                contactForm.subject.trim() || "Portfolio Inquiry",
              message: contactForm.message.trim(),
            },
          ]);

        if (error) throw error;

        setSentSuccess(true);

        setContactForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const mailSubject = encodeURIComponent(
          contactForm.subject || "Portfolio Inquiry"
        );

        const mailBody = encodeURIComponent(
          `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`
        );

        window.location.href =
          `mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}`;

        return;
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setErrorMessage(
        error.message || "Unable to send your message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  // ------------------------------------------
  // MAINTENANCE MODE
  // ------------------------------------------

  if (settings.published === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#08090d] text-white">
        <Sparkles className="w-12 h-12 text-orange-400 mb-5" />

        <h1 className="font-display text-3xl font-bold">
          Portfolio Maintenance Mode
        </h1>

        <p className="text-slate-400 mt-3 max-w-md">
          Aritra is currently updating his latest creative work.
          Please check back shortly.
        </p>

        <Link
          to="/admin/login"
          className="mt-7 px-6 py-3 rounded-xl bg-orange-500 text-black font-bold"
        >
          Admin Login
        </Link>
      </div>
    );
  }

  // ------------------------------------------
  // MAIN WEBSITE
  // ------------------------------------------

  return (
    <>
          <Navbar />
    <main className="overflow-x-hidden bg-[#08090d] text-white">

    
      {/* HERO SECTION */}

      <section
        id="home"
        className="relative min-h-[85vh] flex items-center py-28 px-5 sm:px-8 lg:px-12"
      >
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">

          <div className="lg:col-span-7 space-y-7">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Available for Design Commissions & Academic Roles
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                {profile.name || "Aritra Das Sharma"}
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-slate-300 mt-4">
                {profile.role || "Graphic Designer & Multimedia Faculty"}
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {profile.introduction ||
                "Creating meaningful visual experiences through graphic design, multimedia and visual communication."}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">

              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm transition-all hover:-translate-y-1"
              >
                View Portfolio
                <ArrowUpRight size={18} />
              </a>

              <a
                href={profile.resumeUrl || "/resume.pdf"}
                download="Aritra_Das_Sharma_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all"
              >
                <Download size={17} />
                Download Resume
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-orange-500/40 text-orange-300 hover:bg-orange-500/10 font-semibold text-sm transition-all"
              >
                <Mail size={17} />
                Contact Me
              </a>

            </div>

            {socials.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-3">
                {socials.map((social, index) => (
                  <a
                    key={social.id || social.platform || index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs hover:bg-orange-500 hover:text-black transition-all"
                  >
                    {social.platform || social.name}
                  </a>
                ))}
              </div>
            )}

          </div>

          <div className="lg:col-span-5 flex justify-center">

            <div className="relative group w-72 sm:w-80 lg:w-[390px]">

              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-orange-500 via-amber-400 to-purple-600 opacity-30 blur-2xl group-hover:opacity-60 transition-all" />

              <div className="relative rounded-[2rem] overflow-hidden border border-white/15 bg-slate-900 shadow-2xl">

                <img
                  src={profile.photo || profile.profileImage || "/images/profile/aritra-profile.png"}
                  alt={profile.name || "Aritra Das Sharma"}
                  onError={handleImageFallback}
                  className="w-full h-[420px] object-cover object-top"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent">

                  <h2 className="font-display text-2xl font-bold">
                    {profile.name || "Aritra Das Sharma"}
                  </h2>

                  <p className="text-orange-300 text-sm mt-1">
                    {profile.role || "Graphic Designer"}
                  </p>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}

      {sections.about !== false && (
        <section
          id="about"
          className="py-24 px-5 sm:px-8 lg:px-12 border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto">

            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={17} />
              About Me
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-12">
              Visual Craftsmanship Meets Creative Mentorship
            </h2>

            <div className="grid lg:grid-cols-12 gap-8">

              <div className="lg:col-span-7 bg-white/[0.04] border border-white/10 rounded-3xl p-8">

                <h3 className="text-xl font-bold text-orange-400 mb-5">
                  Professional Biography
                </h3>

                <p className="text-slate-300 leading-8 text-sm sm:text-base">
                  {profile.biography || profile.introduction}
                </p>

                <div className="mt-7 pt-6 border-t border-white/10">

                  <h4 className="font-bold text-white mb-3">
                    Creative Journey
                  </h4>

                  <p className="text-slate-400 leading-7 text-sm">
                    {profile.journey ||
                      "A creative journey focused on graphic design, multimedia, visual communication and creative education."}
                  </p>

                </div>

              </div>

              <div className="lg:col-span-5 space-y-6">

                <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">

                  <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                    <Palette className="text-orange-400" />
                    Design Philosophy
                  </h3>

                  <p className="text-slate-300 leading-7 text-sm">
                    {profile.philosophy ||
                      "Design should communicate clearly, create visual impact and serve its purpose through thoughtful composition, typography and colour."}
                  </p>

                </div>

                <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">

                  <h3 className="font-bold text-lg mb-4">
                    Core Creative Focus
                  </h3>

                  <p className="text-orange-300 leading-7 text-sm">
                    {profile.interests ||
                      "Print design, digital design, brand identity, image editing, retouching, typography, colour theory and layout principles."}
                  </p>

                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* PORTFOLIO SECTION */}

      {sections.portfolio !== false && (
        <section
          id="portfolio"
          className="py-24 px-5 sm:px-8 lg:px-12 bg-white/[0.015] border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">

              <div>
                <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <Layers size={17} />
                  Selected Works
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-bold">
                  Creative Portfolio & Case Studies
                </h2>
              </div>

              <p className="text-slate-400 text-sm max-w-md leading-7">
                Explore graphic design, branding, print media, promotional
                artwork, packaging and multimedia projects.
              </p>

            </div>

            {/* ONE CATEGORY FILTER */}

            <div className="flex flex-wrap gap-2 mb-12">

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-orange-500 text-black shadow-lg shadow-orange-500/20"
                      : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}

            </div>

            {/* PROJECT GRID */}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

              {filteredProjects.map((project, index) => {

                const image =
                  project.cover ||
                  project.coverImage ||
                  project.image ||
                  "";

                const projectUrl =
                  project.slug ||
                  project.id;

                return (
                  <article
                    key={project.id || project.slug || index}
                    className="group rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2"
                  >

                    <Link
                      to={`/project/${encodeURIComponent(projectUrl)}`}
                      className="block"
                    >

                      <div className="relative h-64 bg-slate-900 overflow-hidden">

                        {image ? (
                          <img
                            src={image}
                            alt={project.title}
                            loading="lazy"
                            onError={handleImageFallback}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <ImageIcon size={35} />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 text-orange-300 text-xs font-semibold">
                          {project.category || "Graphic Design"}
                        </span>

                        <span className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-orange-500 text-black flex items-center justify-center group-hover:rotate-45 transition-transform">
                          <ArrowUpRight size={21} />
                        </span>

                      </div>

                      <div className="p-6">

                        <h3 className="font-display text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-slate-400 text-sm leading-7 line-clamp-4">
                          {project.summary || project.description}
                        </p>

                        <div className="flex items-center gap-2 mt-5 text-orange-400 text-xs font-bold uppercase tracking-wider">
                          Explore Project
                          <ArrowUpRight size={15} />
                        </div>

                      </div>

                    </Link>

                  </article>
                );
              })}

            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                No projects found in this category.
              </div>
            )}

            <p className="text-center text-slate-500 text-xs mt-10">
              Showing {filteredProjects.length} of {activeProjects.length} projects
            </p>

          </div>
        </section>
      )}

      {/* SKILLS SECTION */}

      {sections.skills !== false && (
        <section
          id="skills"
          className="py-24 px-5 sm:px-8 lg:px-12 border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto">

            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={17} />
              Creative Stack
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-5">
              Software & Creative Skills
            </h2>

            <p className="text-slate-400 text-sm max-w-2xl mb-12 leading-7">
              A collection of graphic design software, multimedia tools
              and creative capabilities.
            </p>

            {(() => {
              const groups = data.skillGroups || initialData.skillGroups;

              if (groups?.length) {
                return groups.map((group) => {
                  const groupSkills = activeSkills.filter(
                    (skill) => group.skills?.includes(skill.id)
                  );

                  if (!groupSkills.length) return null;

                  return (
                    <div key={group.id} className="mb-14">

                      <div className="mb-7">
                        <h3 className="font-display text-2xl font-bold text-white">
                          {group.name}
                        </h3>

                        <p className="text-slate-400 text-sm mt-2">
                          {group.subtitle || group.description}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                        {groupSkills.map((skill) => (
                          <div
                            key={skill.id}
                            className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 hover:border-orange-500/50 transition-all group"
                          >

                            <div className="flex items-center justify-between mb-5">

                              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold">
                                {skill.shortCode || skill.name.slice(0, 2)}
                              </div>

                              <span className="text-xl font-bold text-orange-400">
                                {skill.percentage ?? 90}%
                              </span>

                            </div>

                            <h4 className="font-bold text-white mb-2">
                              {skill.name}
                            </h4>

                            <p className="text-xs text-slate-400 mb-4">
                              {skill.group || group.name}
                            </p>

                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(0, Number(skill.percentage ?? 90))
                                  )}%`,
                                }}
                              />
                            </div>

                          </div>
                        ))}

                      </div>

                    </div>
                  );
                });
              }

              return (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {activeSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="rounded-2xl bg-white/[0.04] border border-white/10 p-6"
                    >
                      <h3 className="font-bold text-white">{skill.name}</h3>
                      <p className="text-xs text-slate-400 mt-2">
                        {skill.group || "Creative Skills"}
                      </p>
                      <p className="text-orange-400 font-bold mt-3">
                        {skill.percentage ?? 90}%
                      </p>
                    </div>
                  ))}
                </div>
              );
            })()}

          </div>
        </section>
      )}

      {/* EXPERIENCE SECTION */}

      {sections.experience !== false && (
        <section
          id="experience"
          className="py-24 px-5 sm:px-8 lg:px-12 bg-white/[0.015] border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto">

            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Briefcase size={17} />
              Career Timeline
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-12">
              Professional Experience
            </h2>

            {activeExperience.length ? (
              <div className="grid md:grid-cols-2 gap-6">

                {activeExperience.map((experience, index) => (
                  <div
                    key={experience.id || index}
                    className="rounded-3xl bg-white/[0.04] border border-white/10 p-8 hover:border-orange-500/40 transition-all"
                  >

                    <span className="text-orange-400 text-xs font-bold uppercase">
                      {experience.dates ||
                        `${experience.startDate || ""} – ${experience.endDate || "Present"}`}
                    </span>

                    <h3 className="text-xl font-bold mt-4">
                      {experience.title || experience.designation}
                    </h3>

                    <p className="text-orange-300 font-semibold mt-2">
                      {experience.organisation}
                    </p>

                    <p className="text-slate-400 text-sm leading-7 mt-5">
                      {experience.description}
                    </p>

                  </div>
                ))}

              </div>
            ) : (
              <p className="text-slate-400">
                Professional experience details will be updated soon.
              </p>
            )}

          </div>
        </section>
      )}

      {/* EDUCATION SECTION */}

      {sections.education !== false && activeEducation.length > 0 && (
        <section
          id="education"
          className="py-20 px-5 sm:px-8 lg:px-12 border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto">

            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10">
              Education
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {activeEducation.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-7 rounded-2xl bg-white/[0.04] border border-white/10"
                >
                  <h3 className="font-bold text-lg">
                    {item.degree || item.title}
                  </h3>

                  <p className="text-orange-400 mt-2">
                    {item.institution || item.organisation}
                  </p>

                  <p className="text-slate-400 text-sm mt-3">
                    {item.dates || item.year}
                  </p>

                  {item.description && (
                    <p className="text-slate-400 text-sm mt-3 leading-6">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}

            </div>

          </div>
        </section>
      )}

      {/* SERVICES SECTION */}

      {sections.services !== false && activeServices.length > 0 && (
        <section
          id="services"
          className="py-20 px-5 sm:px-8 lg:px-12 border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto">

            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10">
              Creative Services
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeServices.map((service, index) => (
                <div
                  key={service.id || index}
                  className="p-7 rounded-2xl bg-white/[0.04] border border-white/10"
                >
                  <Palette className="text-orange-400 mb-4" />
                  <h3 className="font-bold text-lg">
                    {service.title || service.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-7 mt-3">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* CERTIFICATIONS SECTION */}

      {sections.certifications !== false && activeCertifications.length > 0 && (
        <section
          id="certifications"
          className="py-20 px-5 sm:px-8 lg:px-12 border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto">

            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10">
              Certifications
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCertifications.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-6 rounded-2xl bg-white/[0.04] border border-white/10"
                >
                  <h3 className="font-bold">
                    {item.title || item.name}
                  </h3>
                  <p className="text-orange-400 text-sm mt-2">
                    {item.issuer || item.organisation}
                  </p>
                  <p className="text-slate-400 text-xs mt-2">
                    {item.date || item.year}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ACHIEVEMENTS SECTION */}

      {sections.achievements !== false && activeAchievements.length > 0 && (
        <section
          id="achievements"
          className="py-20 px-5 sm:px-8 lg:px-12 border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto">

            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10">
              Achievements
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeAchievements.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-6 rounded-2xl bg-white/[0.04] border border-white/10"
                >
                  <h3 className="font-bold">
                    {item.title || item.name}
                  </h3>
                  <p className="text-slate-400 text-sm mt-3">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* TESTIMONIALS SECTION */}

      {sections.testimonials !== false && activeTestimonials.length > 0 && (
        <section
          id="testimonials"
          className="py-20 px-5 sm:px-8 lg:px-12 border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto">

            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10">
              Testimonials
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {activeTestimonials.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-7 rounded-2xl bg-white/[0.04] border border-white/10"
                >
                  <p className="text-slate-300 leading-7">
                    “{item.message || item.description}”
                  </p>
                  <h3 className="font-bold mt-5">
                    {item.name || item.author}
                  </h3>
                  <p className="text-orange-400 text-xs mt-1">
                    {item.position || item.role}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* CONTACT SECTION */}

      {sections.contact !== false && (
        <section
          id="contact"
          className="py-24 px-5 sm:px-8 lg:px-12 border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">

            <div className="lg:col-span-5">

              <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Mail size={17} />
                Connect With Aritra
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
                Let's Create Something{" "}
                <span className="text-orange-400">
                  Memorable
                </span>{" "}
                Together.
              </h2>

              <p className="text-slate-400 leading-7 mt-6 text-sm">
                Whether you need a brand identity, book cover,
                packaging artwork, promotional design or academic
                multimedia consultation, send a message.
              </p>

              <div className="space-y-5 mt-10">

                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 text-slate-300 hover:text-orange-400 transition-colors"
                >
                  <span className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Mail size={19} />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500 mb-1">
                      Email
                    </span>
                    {profile.email}
                  </span>
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-4 text-slate-300 hover:text-orange-400 transition-colors"
                >
                  <span className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Phone size={19} />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500 mb-1">
                      Phone
                    </span>
                    {profile.phone}
                  </span>
                </a>

                <div className="flex items-center gap-4 text-slate-300">
                  <span className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <MapPin size={19} />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500 mb-1">
                      Location
                    </span>
                    {profile.location || "Kolkata, India"}
                  </span>
                </div>

              </div>

            </div>

            <div className="lg:col-span-7">

              <form
                onSubmit={handleContactSubmit}
                className="p-7 sm:p-10 rounded-3xl bg-white/[0.04] border border-white/10 space-y-6"
              >

                <h3 className="font-display text-2xl font-bold">
                  Send a Project Inquiry
                </h3>

                <div className="grid sm:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Your Name *
                    </label>

                    <input
                      required
                      value={contactForm.name}
                      onChange={(event) =>
                        setContactForm({
                          ...contactForm,
                          name: event.target.value,
                        })
                      }
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm outline-none focus:border-orange-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(event) =>
                        setContactForm({
                          ...contactForm,
                          email: event.target.value,
                        })
                      }
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm outline-none focus:border-orange-400"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Subject
                  </label>

                  <input
                    value={contactForm.subject}
                    onChange={(event) =>
                      setContactForm({
                        ...contactForm,
                        subject: event.target.value,
                      })
                    }
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm outline-none focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Project Details *
                  </label>

                  <textarea
                    rows={5}
                    required
                    value={contactForm.message}
                    onChange={(event) =>
                      setContactForm({
                        ...contactForm,
                        message: event.target.value,
                      })
                    }
                    placeholder="Tell Aritra about your project, timeline and requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm outline-none focus:border-orange-400 resize-y"
                  />
                </div>

                {errorMessage && (
                  <p className="text-red-400 text-sm">
                    {errorMessage}
                  </p>
                )}

                {sentSuccess && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle2 size={19} />
                    Your message has been submitted successfully.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-bold text-sm transition-all"
                >
                  <Send size={17} />
                  {sending ? "Sending..." : "Send Project Inquiry"}
                </button>

              </form>

            </div>

          </div>
        </section>
      )}

      {/* FOOTER */}

      <footer className="border-t border-white/10 px-5 sm:px-8 lg:px-12 py-8">

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

          <div>
            <h3 className="font-display font-bold text-lg">
              ARITRA<span className="text-orange-400">.</span>
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Graphic Designer & Multimedia Faculty
            </p>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <a
            href="#home"
            className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-2"
          >
            Back to top
            <ArrowUpRight size={14} />
          </a>

        </div>

      </footer>

      {/* IMAGE LIGHTBOX */}

      {lightboxItem && (
        <div
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-5"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="max-w-4xl w-full bg-slate-950 border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="flex justify-end p-3">
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-orange-500 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            <img
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="w-full max-h-[70vh] object-contain"
            />

            <div className="p-6">
              <h3 className="font-bold text-xl">
                {lightboxItem.title}
              </h3>

              <p className="text-slate-400 text-sm mt-3 leading-7">
                {lightboxItem.description}
              </p>
            </div>

          </div>
        </div>
      )}

    </main>
    </>
  );
}
