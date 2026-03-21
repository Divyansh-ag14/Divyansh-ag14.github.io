# Portfolio — Divyansh Agarwal

Personal portfolio website built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just open `index.html`.

## Live Site

Deployed via GitHub Pages: [divyansh-ag14.github.io/portfolio](https://divyansh-ag14.github.io/portfolio/)

## Run Locally

```bash
# Clone the repo
git clone https://github.com/Divyansh-ag14/portfolio.git
cd portfolio

# Option 1: Python
python -m http.server 8080

# Option 2: Node
npx serve .

# Option 3: Just open the file
open index.html
```

Then visit `http://localhost:8080`.

> A local server is recommended over opening the file directly so that PDF embedding and page transitions work correctly.

## Project Structure

```
portfolio/
├── index.html          # Main landing page (hero, skills, experience, blog, contact)
├── projects.html       # Projects page with filtering
├── resume.html         # Resume viewer with embedded PDF
├── css/
│   └── style.css       # All styles (~3500 lines, dark/light theme)
├── js/
│   └── main.js         # All interactions and animations
└── assets/
    ├── my_photo.png    # Profile photo
    ├── resume.pdf      # Resume PDF
    ├── favicon.svg     # Site favicon
    └── *_projects/     # Project screenshots (architecture/ and result/)
```

## How to Update Content

### Add a New Project

1. Open `projects.html`
2. Find the `<div class="projects-grid">` section
3. Add a new project card:

```html
<div class="project-card reveal" data-category="your-category">
    <div class="project-card-image">
        <img src="assets/your_project/architecture/screenshot.png" alt="Project Name">
        <div class="project-card-overlay">
            <a href="https://github.com/your-repo" target="_blank" class="project-link">View Project</a>
        </div>
    </div>
    <div class="project-card-content">
        <h3 class="project-card-title">Project Name</h3>
        <p class="project-card-desc">Short description of the project.</p>
        <div class="project-card-tags">
            <span class="tag">Python</span>
            <span class="tag">PyTorch</span>
        </div>
    </div>
</div>
```

4. Add project images to `assets/your_project/`
5. If it's a featured project, also add it to the featured section in `index.html`

### Update Work Experience

Edit the timeline items in `index.html` inside `<section id="experience">`. Each role follows this structure:

```html
<div class="timeline-item reveal">
    <div class="timeline-dot"></div>
    <div class="timeline-content tilt-card">
        <div class="exp-header">
            <div>
                <h3 class="exp-title">Job Title</h3>
                <p class="exp-company">Company Name</p>
            </div>
            <div class="exp-meta">
                <span class="exp-date">Start - End</span>
                <span class="exp-location">City, Country</span>
            </div>
        </div>
        <ul class="exp-achievements">
            <li>Achievement 1</li>
            <li>Achievement 2</li>
        </ul>
    </div>
</div>
```

### Update Skills

Edit the skill cards in `index.html` inside `<section id="skills">`. Each card has a title, description, and tags.

### Update Currently Building

Edit the `<section id="currently-building">` in `index.html` to change the project name, description, highlights, and tech tags.

### Update Resume

Replace `assets/resume.pdf` with your updated PDF. The filename must stay the same.

### Add a Blog Post

Edit the blog section in `index.html` inside `<section id="blogs">`. Each post links to your Medium article.

### Change Profile Photo

Replace `assets/my_photo.png` with your new photo. Keep the same filename, or update the `src` in `index.html`.

## Features

- **Dark / Light theme** with animated toggle
- **Particle background** with interactive mouse tracking
- **3D tilt effect** on cards
- **Magnetic buttons** that attract toward cursor
- **Text scramble** animation on section titles
- **Parallax scrolling** on background elements
- **Page transitions** between pages
- **Scroll spotlight** following cursor
- **Film grain overlay** for texture
- **Typing animation** in hero section
- **Scroll-triggered reveals** with staggered cascade
- **Responsive** down to mobile

## Tech Stack

- HTML5, CSS3, JavaScript (vanilla — no frameworks)
- Google Fonts (Inter, JetBrains Mono)
- GitHub Pages for hosting
