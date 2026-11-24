
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }) {
  if (!project || project.hidden || project.is_deleted) {
    return null;
  }

  const image = project.cover || project.coverImage || "";
  const route = project.slug || project.id;

  return (
    <Link
      to={`/project/${encodeURIComponent(route)}`}
      className="group block rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] hover:border-orange-400/50 transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden bg-slate-900">
        {image ? (
          <img
            src={image}
            alt={project.title || "Graphic design project"}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            Image unavailable
          </div>
        )}

        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 text-orange-400 text-xs">
          {project.category}
        </span>

        <span className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-orange-500 text-black flex items-center justify-center">
          <ArrowUpRight size={21} />
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed">
          {project.summary || project.description}
        </p>
      </div>
    </Link>
  );
}
