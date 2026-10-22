import { marked } from "marked";
import { documentation, milestones, projectMedia, repositories } from "./content.js";
import "./styles.css";

const app = document.querySelector("#app");
const githubOrg = "https://github.com/AKASA-Lab";
const themeKey = "aeroponics-theme";
const savedTheme = localStorage.getItem(themeKey);
document.documentElement.dataset.theme = savedTheme === "dark" ? "dark" : "light";

function route() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (!hash) return { type: "home" };
  const [path] = hash.split("#");
  if (path === "github") return { type: "github" };
  const match = path.match(/^docs\/([a-z-]+)$/);
  if (match) {
    const page = documentation.find((entry) => entry.slug === match[1]);
    if (page) return { type: "docs", page };
  }
  return { type: "not-found" };
}

function navLink(href, label, className = "") {
  return `<a class="${className}" href="${href}">${label}</a>`;
}

function photoGallery(className = "photo-gallery") {
  const photos = className.includes("home-gallery")
    ? projectMedia.setupPhotos.slice(0, 3)
    : projectMedia.setupPhotos;
  return `<div class="${className}">${photos.map((photo) => `
    <figure>
      <img src="${photo.src}" alt="${photo.alt}" loading="lazy" />
      <figcaption>${photo.caption}</figcaption>
    </figure>`).join("")}</div>`;
}

function imageFigure(image, className = "diagram-figure") {
  return `<figure class="${className}">
    <img src="${image.src}" alt="${image.alt}" loading="lazy" />
    <figcaption>${image.caption}</figcaption>
  </figure>`;
}

function flowGallery(items, label) {
  return `
    <ol class="flow-gallery" aria-label="${label}">
      ${items.map((item, index) => `
        <li class="flow-card">
          <figure>
            <img src="${item.src}" alt="${item.alt}" loading="lazy" />
            <figcaption><span class="flow-step">0${index + 1}</span>${item.label}</figcaption>
          </figure>
        </li>`).join("")}
    </ol>`;
}

function pageVisuals(slug) {
  if (slug === "references") {
    return `
      <h2>NASA aeroponics background image</h2>
      ${imageFigure(projectMedia.nasaAeroponicsArchive, "archive-figure")}`;
  }
  if (slug === "experimental-setup") {
    return `${imageFigure(projectMedia.systemArchitecture)}${photoGallery()}`;
  }
  if (slug === "model-development") {
    return imageFigure(projectMedia.visionConcept);
  }
  return "";
}

function sidebar(activeSlug) {
  return `
    <aside class="sidebar" aria-label="Documentation navigation">
      <details class="sidebar-details" open>
        <summary class="sidebar-heading">Documentation</summary>
        <nav class="sidebar-links">
          ${documentation.map((page) => navLink(
            `#/docs/${page.slug}`,
            page.title,
            page.slug === activeSlug ? "sidebar-link active" : "sidebar-link",
          )).join("")}
        </nav>
      </details>
    </aside>`;
}

function shell(content, activeSlug = "", showSidebar = true) {
  return `
    <header class="site-header">
      <a class="wordmark" href="#/" aria-label="Smart Aeroponics System home">
        <svg class="brand-mark" aria-hidden="true" viewBox="0 0 32 32" fill="none">
          <path d="M16 27V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          <path d="M16 17C8.5 17 5 13.5 5 6c7.5 0 11 3.5 11 11Z" fill="currentColor" opacity=".18" />
          <path d="M16 17C8.5 17 5 13.5 5 6c7.5 0 11 3.5 11 11Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
          <path d="M16 22c0-6 3-9 10-9 0 6-3 9-10 9Z" fill="currentColor" opacity=".18" />
          <path d="M16 22c0-6 3-9 10-9 0 6-3 9-10 9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        </svg>
        <span>Smart Aeroponics System</span>
      </a>
      <nav class="top-nav" aria-label="Main navigation">
        ${navLink("#/", "Home", "top-link")}
        ${navLink("#/docs/overview", "Documentation", "top-link")}
        ${navLink("#/github", "GitHub", "top-link")}
        ${navLink("#/docs/demonstrations", "Demonstrations", "top-link")}
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark mode" aria-pressed="false">Dark mode</button>
      </nav>
    </header>
    <main class="${showSidebar ? "docs-layout" : "page-layout"}">
      ${showSidebar ? sidebar(activeSlug) : ""}
      <div class="main-content">${content}</div>
    </main>
    <footer class="site-footer">
      <span>Smart Aeroponics System</span>
      <a href="${githubOrg}" target="_blank" rel="noreferrer">AKASA-Lab on GitHub <span aria-hidden="true">↗</span></a>
    </footer>`;
}

function headingId(text, usedIds) {
  const base = text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-") || "section";
  const count = usedIds.get(base) ?? 0;
  usedIds.set(base, count + 1);
  return count ? `${base}-${count}` : base;
}

function addTableOfContents(container, slug) {
  const headings = [...container.querySelectorAll("h2, h3")];
  if (headings.length < 2) return "";
  const usedIds = new Map();
  headings.forEach((heading) => {
    heading.id = headingId(heading.textContent, usedIds);
  });
  return `
    <nav class="toc" aria-label="On this page">
      <div class="toc-title">On this page</div>
      <ul>${headings.map((heading) => `<li class="${heading.tagName === "H3" ? "toc-nested" : ""}"><a href="#/docs/${slug}#${heading.id}">${heading.textContent}</a></li>`).join("")}</ul>
    </nav>`;
}

function docsPage(page) {
  const growingSpacesToken = "AEROPONICS_GROWING_SPACES_PLACEHOLDER";
  const growingMethodsToken = "AEROPONICS_GROWING_METHODS_PLACEHOLDER";
  const nasaExamplesToken = "AEROPONICS_NASA_EXAMPLES_PLACEHOLDER";
  const markdownContent = page.slug === "motivation"
    ? page.content
      .replace("{{growing-spaces}}", growingSpacesToken)
      .replace("{{growing-methods}}", growingMethodsToken)
    : page.slug === "overview"
      ? page.content.replace("{{nasa-examples}}", nasaExamplesToken)
    : page.content;
  let rendered = marked.parse(markdownContent);
  if (page.slug === "motivation") {
    rendered = rendered
      .replace(`<p>${growingSpacesToken}</p>`, flowGallery(projectMedia.problemContext[0].spaces, "Growing spaces from open fields to indoors"))
      .replace(`<p>${growingMethodsToken}</p>`, flowGallery(projectMedia.problemContext[0].methods, "Growing methods from soil-based farming to aeroponics"));
  } else if (page.slug === "overview") {
    rendered = rendered.replace(
      `<p>${nasaExamplesToken}</p>`,
      `<div class="nasa-gallery">${projectMedia.nasaExamples.map((image) => imageFigure(image, "nasa-figure")).join("")}</div>`,
    );
  }
  const holder = document.createElement("div");
  holder.innerHTML = rendered;
  const toc = addTableOfContents(holder, page.slug);
  const currentIndex = documentation.findIndex((entry) => entry.slug === page.slug);
  const previous = documentation[currentIndex - 1];
  const next = documentation[currentIndex + 1];
  const content = `
    <div class="breadcrumbs"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/docs/overview">Documentation</a><span aria-hidden="true">/</span><span>${page.title}</span></div>
    <div class="article-grid">
      <article class="prose ${page.slug === "motivation" ? "motivation-article" : ""}">${holder.innerHTML}
        ${pageVisuals(page.slug)}
        <nav class="page-nav" aria-label="Previous and next pages">
          ${previous ? navLink(`#/docs/${previous.slug}`, `← ${previous.title}`, "page-nav-link") : "<span></span>"}
          ${next ? navLink(`#/docs/${next.slug}`, `${next.title} →`, "page-nav-link next") : "<span></span>"}
        </nav>
      </article>
      ${toc}
    </div>`;
  return shell(content, page.slug);
}

function homePage() {
  const content = `
    <section class="home-intro">
      <h1>Build a Testbed, Create a dataset. Develop a model.</h1>
      <p class="project-name">Smart Aeroponics System</p>
      <p class="lead">Our project, <em>Intelligent Nutrient Management for Aeroponics</em>, uses fenugreek images to build a dataset and develop a model that can help identify nutrient-deficiency symptoms.</p>
      <div class="home-actions">
        ${navLink("#/docs/overview", "Explore the documentation", "button button-primary")}
        ${navLink(githubOrg, "View on GitHub ↗", "button button-secondary")}
        ${navLink("#/docs/demonstrations", "Demonstrations", "text-link")}
      </div>
    </section>
    <section class="home-section">
      <div class="section-kicker">The study</div>
      <div>
        <h2>Three connected project goals</h2>
        <p>We grow fenugreek in an aeroponic system and study plant responses across combinations of calcium nitrate, potassium sulphate, and ammonium phosphate. Our work connects three goals: build the testbed, collect the time-series dataset, and develop a model to identify deficiency symptoms associated with the tested fertilizer conditions.</p>
        <p>Each treatment is defined by the presence or absence of a fertilizer compound. We do not treat these as experiments that isolate elemental nitrogen, phosphorus, or potassium.</p>
      </div>
    </section>
    <section class="home-section image-note">
      <div class="section-kicker">Project photograph</div>
      <div>${photoGallery("photo-gallery home-gallery")}<p class="image-caption">Photographs of our aeroponic testbed.</p></div>
    </section>
    <section class="home-section">
      <div class="section-kicker">Project progress</div>
      <div class="link-list progress-summary">
        ${milestones.map((milestone) => `<div class="progress-summary-item"><span>${milestone.title}</span><span class="status ${statusClass(milestone.status)}">${milestone.status}</span></div>`).join("")}
        ${navLink("#/docs/project-progress", "View project progress", "resource-link")}
      </div>
    </section>
    <section class="home-section quick-links">
      <div class="section-kicker">Quick links</div>
      <div class="link-list">
        ${navLink("#/docs/experimental-setup", "Experimental setup", "resource-link")}
        ${navLink("#/docs/fertilizer-treatments", "Fertilizer treatments", "resource-link")}
        ${navLink("#/docs/image-dataset", "Image dataset", "resource-link")}
        ${navLink("#/docs/project-progress", "Project progress", "resource-link")}
        <a class="resource-link" href="${projectMedia.presentation}" target="_blank" rel="noreferrer">Project presentation</a>
      </div>
    </section>`;
  return shell(content, "", false);
}

function githubPage() {
  const content = `
    <div class="breadcrumbs"><a href="#/">Home</a><span aria-hidden="true">/</span><span>GitHub</span></div>
    <article class="prose github-page">
      <p class="eyebrow">Source code &amp; project resources</p>
      <h1>GitHub</h1>
      <p class="lead">Project repositories from the AKASA-Lab organization.</p>
      <p><a href="${githubOrg}" target="_blank" rel="noreferrer">Visit github.com/AKASA-Lab ↗</a></p>
      <ul class="repo-list">${repositories.map((repo) => `<li><a href="${repo.url}" target="_blank" rel="noreferrer">${repo.name} ↗</a><span>${repo.description}</span></li>`).join("")}</ul>
    </article>`;
  return shell(content, "", false);
}

function progressPage() {
  return `
    <p class="callout"><strong>Current status.</strong> Our testbed is complete, dataset work is in progress, and model development has not yet begun.</p>
    <ul class="milestone-list">${milestones.map((milestone) => `<li><span>${milestone.title}</span><span class="status ${statusClass(milestone.status)}">${milestone.status}</span></li>`).join("")}</ul>`;
}

function statusClass(status) {
  return `status-${status.toLowerCase().replace(/\s+/g, "-")}`;
}

function render() {
  const current = route();
  if (current.type === "home") {
    app.innerHTML = homePage();
  } else if (current.type === "docs" && current.page.slug === "project-progress") {
    const original = current.page.content;
    const holder = document.createElement("div");
    holder.innerHTML = marked.parse(original);
    const html = holder.innerHTML.replace("</article>", "");
    const content = `
      <div class="breadcrumbs"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/docs/overview">Documentation</a><span aria-hidden="true">/</span><span>Project Progress</span></div>
      <div class="article-grid"><article class="prose">${html}${progressPage()}</article></div>`;
    app.innerHTML = shell(content, current.page.slug);
  } else if (current.type === "docs" && current.page.slug === "demonstrations") {
    const holder = document.createElement("div");
    holder.innerHTML = marked.parse(current.page.content);
    const html = holder.innerHTML;
    const content = `
      <div class="breadcrumbs"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/docs/overview">Documentation</a><span aria-hidden="true">/</span><span>Demonstrations</span></div>
      <div class="article-grid"><article class="prose">${html}
        <h2>Testbed videos</h2>
        <p>Two videos of our aeroponic testbed. Both play muted by default.</p>
        ${projectMedia.videos.map((video, index) => `
          <section class="demo-item" aria-labelledby="demo-title-${index}">
            <h3 id="demo-title-${index}">${video.title} <span class="demo-date">${video.date}</span></h3>
            <video class="demo-video" controls preload="metadata" playsinline muted>
              <source src="${video.src}" type="video/mp4" />
              Your browser does not support embedded video. <a href="${video.src}">Open the testbed video</a>.
            </video>
            <p><a href="${video.src}" target="_blank" rel="noreferrer">Open video in a new tab ↗</a></p>
          </section>`).join("")}
        <h2>Project presentation</h2>
        <p><a href="${projectMedia.presentation}" target="_blank" rel="noreferrer">View or download our project presentation (PDF) ↗</a></p>
      </article></div>`;
    app.innerHTML = shell(content, current.page.slug);
  } else if (current.type === "docs") {
    app.innerHTML = docsPage(current.page);
  } else if (current.type === "github") {
    app.innerHTML = githubPage();
  } else {
    app.innerHTML = shell(`<article class="prose"><h1>Page not found</h1><p>This page does not exist.</p><a href="#/">Return home</a></article>`, "", false);
  }
  const mobileSidebar = app.querySelector(".sidebar-details");
  if (mobileSidebar && window.matchMedia("(max-width: 640px)").matches) {
    mobileSidebar.open = false;
  }
  const sectionId = window.location.hash.split("#").slice(2).join("#");
  if (sectionId) {
    document.getElementById(decodeURIComponent(sectionId))?.scrollIntoView();
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  updateThemeControl();
  document.title = current.type === "docs" ? `${current.page.title} · Intelligent Nutrient Management for Aeroponics` : current.type === "github" ? "GitHub · Intelligent Nutrient Management for Aeroponics" : "Intelligent Nutrient Management for Aeroponics · Smart Aeroponics System";
}

function updateThemeControl() {
  const button = app.querySelector("[data-theme-toggle]");
  if (!button) return;
  const isDark = document.documentElement.dataset.theme === "dark";
  button.textContent = isDark ? "Light mode" : "Dark mode";
  button.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  button.setAttribute("aria-pressed", String(isDark));
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  if (!event.target.closest("[data-theme-toggle]")) return;
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(themeKey, nextTheme);
  updateThemeControl();
});

window.addEventListener("hashchange", render);
render();
