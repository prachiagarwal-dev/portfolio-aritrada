
import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Layers,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

import initialData from "../data/initialData";
import Navbar from "../components/Navbar";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const projects = initialData.projects || [];

  const project = useMemo(() => {
    const requested = decodeURIComponent(slug || "").toLowerCase();

    return projects.find((item) =>
      String(item.slug || "").toLowerCase() === requested ||
      String(item.id || "").toLowerCase() === requested
    );
  }, [slug, projects]);

  if (
    !project ||
    project.hidden === true ||
    project.is_deleted === true ||
    project.published === false
  ) {
    return (
      <>
        <Navbar />
        <main className="project-not-found">
          <h1>Project not found</h1>
          <p>This project could not be found.</p>
          <Link to="/">Back to portfolio</Link>
        </main>
      </>
    );
  }

  // Your initialData uses cover and gallery[].image.
  const cover = project.cover || project.gallery?.[0]?.image || "";

  const gallery = [
    ...(cover
      ? [{
          title: "Main Project Artwork",
          image: cover,
          alt: project.title
        }]
      : []),
    ...(project.gallery || [])
  ];

  // Avoid showing the same cover twice.
  const uniqueGallery = gallery.filter((item, index, array) => {
    const image = typeof item === "string" ? item : item.image;
    return image && array.findIndex((entry) =>
      (typeof entry === "string" ? entry : entry.image) === image
    ) === index;
  });

  const openImage = (image, title) => {
    setSelectedImage({ image, title });
  };

  const changeImage = (direction) => {
    if (!selectedImage) return;

    const currentIndex = uniqueGallery.findIndex((item) => {
      const image = typeof item === "string" ? item : item.image;
      return image === selectedImage.image;
    });

    const nextIndex =
      (currentIndex + direction + uniqueGallery.length) %
      uniqueGallery.length;

    const next = uniqueGallery[nextIndex];
    const image = typeof next === "string" ? next : next.image;

    setSelectedImage({
      image,
      title: next.title || project.title
    });
  };

  return (
    <>
      <Navbar />

      <main className="project-details-page">
        <div className="project-details-container">

          <Link to="/#portfolio" className="project-back-link">
            <ArrowLeft size={18} />
            Back to all projects
          </Link>

          <header className="project-details-header">
            <span className="project-details-eyebrow">
              <Layers size={17} />
              {project.category || "Creative Project"}
            </span>

            <h1>{project.title}</h1>

            <p>
              {project.summary || project.description}
            </p>
          </header>

          {cover && (
            <section className="project-main-cover">
              <img
                src={cover}
                alt={project.title}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </section>
          )}

          {project.description && (
            <section className="project-description">
              <span className="project-details-eyebrow">
                ABOUT THE PROJECT
              </span>
              <h2>Creative Overview</h2>
              <p>{project.description}</p>
            </section>
          )}

          {uniqueGallery.length > 0 && (
            <section className="project-gallery-section">
              <div className="project-gallery-heading">
                <div>
                  <span className="project-details-eyebrow">
                    <ImageIcon size={17} />
                    VISUAL COLLECTION
                  </span>
                  <h2>Project Gallery</h2>
                </div>

                <span className="gallery-count">
                  {uniqueGallery.length} artworks
                </span>
              </div>

              <div className="project-gallery-grid">
                {uniqueGallery.map((item, index) => {
                  const image =
                    typeof item === "string" ? item : item.image;

                  const title =
                    typeof item === "string"
                      ? `Artwork ${index + 1}`
                      : item.title || `Artwork ${index + 1}`;

                  const description =
                    typeof item === "string"
                      ? ""
                      : item.description || "";

                  const alt =
                    typeof item === "string"
                      ? title
                      : item.alt || title;

                  return (
                    <article
                      className="project-gallery-card"
                      key={`${image}-${index}`}
                    >
                      <button
                        type="button"
                        className="project-gallery-image"
                        onClick={() => openImage(image, title)}
                        aria-label={`View ${title}`}
                      >
                        <img
                          src={image}
                          alt={alt}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                            event.currentTarget.parentElement.classList.add(
                              "image-load-error"
                            );
                          }}
                        />
                        <span className="gallery-view-icon">
                          <ArrowUpRight size={22} />
                        </span>
                      </button>

                      <div className="project-gallery-card-content">
                        <span>PLATE {String(index + 1).padStart(2, "0")}</span>
                        <h3>{title}</h3>
                        {description && <p>{description}</p>}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          <div className="project-details-footer">
            <Link to="/#portfolio">
              <ArrowLeft size={18} />
              Explore other projects
            </Link>

            <Link to="/#contact">
              Discuss a project
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      {selectedImage && (
        <div
          className="project-lightbox"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Project image preview"
        >
          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            <X size={28} />
          </button>

          <button
            className="lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              changeImage(-1);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={selectedImage.image}
            alt={selectedImage.title}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            className="lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              changeImage(1);
            }}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          <p>{selectedImage.title}</p>
        </div>
      )}
    </>
  );
}
