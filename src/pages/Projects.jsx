import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import initialData from "../data/initialData";
import { getPortfolio } from "../services/portfolio";

export default function Projects() {
  const [projects, setProjects] = useState(initialData.projects || []);

  useEffect(() => {
    let active = true;

    getPortfolio()
      .then((data) => {
        if (active) setProjects(data.projects || initialData.projects || []);
      })
      .catch(() => {
        if (active) setProjects(initialData.projects || []);
      });

    return () => {
      active = false;
    };
  }, []);

  const visible = projects.filter((item) =>
    item.hidden !== true &&
    item.is_deleted !== true &&
    item.published !== false
  );

  return (
    <main className="all-projects-page">
      <div className="all-projects-inner">
        <Link to="/" className="project-back-link">
          <ArrowLeft size={18} /> Back home
        </Link>

        <p className="section-eyebrow">SELECTED CREATIVE WORK</p>
        <h1>All Projects<span>.</span></h1>
        <p className="all-projects-intro">
          Explore graphic design, print, digital and visual identity work.
        </p>

        <div className="projects-grid">
          {visible.map((project, index) => (
            <Link
              key={project.id}
              to={`/project/${project.slug || project.id}`}
              className="home-project-card"
            >
              <div className="home-project-image">
                <img
                  src={project.cover || project.gallery?.[0]?.image}
                  alt={project.title}
                  loading="lazy"
                />
                <span className="project-open">
                  <ArrowUpRight size={23} />
                </span>
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="home-project-info">
                <div>
                  <span className="project-category">
                    {project.category}
                  </span>
                  <h3>{project.title}</h3>
                </div>
                <ArrowUpRight size={20} />
              </div>

              <p className="project-summary">
                {project.summary || project.description}
              </p>
            </Link>
          ))}
        </div>

        {visible.length === 0 && (
          <p>No published projects are available yet.</p>
        )}
      </div>
    </main>
  );
}
