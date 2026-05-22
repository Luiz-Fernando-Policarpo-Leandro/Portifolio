const CONFIG = {
  GITHUB_USERNAME: "Luiz-Fernando-Policarpo-Leandro",
  CACHE_KEY: "github_data",
  ANIMATION_DELAY: 150,
  MODAL_ANIMATION_DELAY: 200,
  COUNTER_DURATION: 2500,
  COUNTER_DELAY: 500,
  AUTO_SLIDE_INTERVAL: 4000,
};

const FALLBACK_DATA = {
  public_repos: 29,
  languages: ["Python", "JavaScript", "HTML", "CSS", "C#", "C++", "Shell"],
  data_info: ["MySQL", "PostgreSQL", "Redis", "Docker", "AWS", "Git", "Linux"],
};

const ICON_MAP = {
  html: "html5",
  css: "css3",
  javascript: "javascript",
  python: "python",
  typescript: "typescript",
  java: "java",
  "c#": "csharp",
  "c++": "cplusplus",
  shell: "bash",
  "jupyter notebook": "jupyter",
  aws: "amazonwebservices",
  "ruby on rails": "rails",
  postgresql: "postgresql",
  nodejs: "nodejs",
  "api rest": "json",
  "ci/cd": "jenkins",
};

const FALLBACK_PROJECT = {
  id: "portfolio",
  title: "Portfolio Pessoal",
  summary: "Site pessoal para apresentação de projetos e habilidades.",
  problem: "Necessidade de apresentar projetos de forma clara.",
  solution: "Aplicação estática com dados desacoplados em JSON.",
  learning: "Separação entre dados e interface.",
  tags: ["HTML", "CSS", "JavaScript"],
  github: "https://github.com/Luiz-Fernando-Policarpo-Leandro",
  demo: null,
  images: [],
};

let lastScrollY = window.scrollY;
let scrollDirection = null;
let hasScrolled = false;
let autoSlideTimer = null;

function getScrollDirection() {
  if (!hasScrolled) return "down";
  const currentScrollY = window.scrollY;
  if (currentScrollY < lastScrollY) return "up";
  if (currentScrollY > lastScrollY) return "down";
  return scrollDirection || "down";
}

function slideIn(element, delay = 0) {
  const direction = getScrollDirection() === "up" ? 40 : -40;
  element.style.visibility = "visible";
  element.style.opacity = "0";
  element.style.transform = `translateY(${direction}px)`;
  element.dataset.slid = "true";

  setTimeout(() => {
    element.style.transition =
      "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  }, delay);
}

function animateElements(container, delayStep = 150) {
  const elements = Array.from(container.querySelectorAll(".anim-init"));
  if (elements.length === 0) return;

  const direction = getScrollDirection();
  const orderedElements =
    direction === "up" ? [...elements].reverse() : elements;

  let currentDelay = 0;
  orderedElements.forEach((el) => {
    if (el.dataset.slid === "true") return;
    el.dataset.slid = "false";
    el.style.opacity = "0";
    el.style.transform = "";
    slideIn(el, currentDelay);
    currentDelay += delayStep;
  });
}

function animateCounter(elementId, targetValue) {
  const el = document.getElementById(elementId);
  if (el.dataset.animated === "true") return;
  el.dataset.animated = "true";
  el.style.color = "#fff";

  const startTime = performance.now() + CONFIG.COUNTER_DELAY;
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    if (elapsed < 0) {
      requestAnimationFrame(update);
      return;
    }
    const progress = Math.min(elapsed / CONFIG.COUNTER_DURATION, 1);
    el.innerText = Math.floor(ease(progress) * targetValue);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.innerText = targetValue;
      el.style.color = "";
    }
  };
  requestAnimationFrame(update);
}

function getIconName(lang) {
  return ICON_MAP[lang.toLowerCase().trim()] || lang.toLowerCase().trim();
}

function renderTagsWithIcons(tags) {
  return tags
    .map(
      (tag) =>
        `<span class="tag-item"><i class="devicon-${getIconName(tag)}-plain"></i><span>${tag}</span></span>`,
    )
    .join("");
}

function renderIconList(items, containerId) {
  document.getElementById(containerId).innerHTML = items
    .map(
      (lang) =>
        `<div class="skill-item"><i class="devicon-${getIconName(lang)}-plain colored"></i><span class="skill-item-text">${lang}</span></div>`,
    )
    .join("");
}

async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

function stopAutoSlide() {
  clearInterval(autoSlideTimer);
}

function closeModal() {
  stopAutoSlide();
  const modalInner = document.querySelector(".modal-inner");
  if (modalInner) modalInner.scrollTop = 0;
  document.getElementById("projectModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

function animateSkills(direction) {
  const skillBoxes = Array.from(
    document.querySelectorAll("#habilidades .skill-box"),
  );

  skillBoxes.forEach((box) => {
    const h4 = box.querySelector("h4.anim-init");
    const listItems = Array.from(box.querySelectorAll(".skill-item"));
    const repoCount = box.querySelector("#repo-count");
    const repoLabel = repoCount?.nextElementSibling;

    let elements = [];
    if (h4) elements.push(h4);
    elements.push(...listItems);
    if (repoCount) elements.push(repoCount);
    if (repoLabel) elements.push(repoLabel);

    if (direction === "up") {
      elements = elements.reverse();
    }

    elements.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform =
        direction === "up" ? "translateY(40px)" : "translateY(-40px)";
      setTimeout(() => {
        el.style.transition =
          "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * 100);
    });
  });
}

const initScrollAnimations = (() => {
  const observerOptions = { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" };
  let skillsAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains("revealed")) {
          entry.target.classList.add("revealed");

          if (entry.target.id === "habilidades" && !skillsAnimated) {
            skillsAnimated = true;
            animateSkills(getScrollDirection());
            const repoCount = entry.target.querySelector("#repo-count");
            if (repoCount?.dataset.target) {
              animateCounter("repo-count", parseInt(repoCount.dataset.target));
            }
          } else if (entry.target.id !== "habilidades") {
            animateElements(entry.target, CONFIG.ANIMATION_DELAY);
            const repoCount = entry.target.querySelector("#repo-count");
            if (repoCount?.dataset.target) {
              animateCounter("repo-count", parseInt(repoCount.dataset.target));
            }
          }
        }
      } else if (entry.target.classList.contains("revealed")) {
        entry.target.classList.remove("revealed");
        entry.target.querySelectorAll(".anim-init").forEach((el) => {
          el.dataset.slid = "false";
          el.style.transition = "opacity 0.4s ease-out";
          el.style.opacity = "0";
        });
        if (entry.target.id === "habilidades") {
          skillsAnimated = false;
          entry.target
            .querySelectorAll(".skill-box h4, .skill-box .skill-item")
            .forEach((el) => {
              el.style.transition = "opacity 0.4s ease-out";
              el.style.opacity = "0";
            });
        }
      }
    });
  }, observerOptions);

  return () => {
    document
      .querySelectorAll(".scroll-reveal")
      .forEach((el) => observer.observe(el));
    document.querySelectorAll(".reveal-stagger").forEach((el) => {
      if (!el.closest("#habilidades")) observer.observe(el);
    });
    document
      .querySelectorAll("#habilidades")
      .forEach((el) => observer.observe(el));
  };
})();

async function loadCertificates() {
  try {
    const certificates = await fetch("./data/certificates.json").then((r) =>
      r.json(),
    );
    const container = document.getElementById("certificates-list");
    container.innerHTML = certificates
      .map((cert) => {
        const hasUrl = cert.url?.trim();
        const imageHtml = cert.image
          ? `<div class="cert-image" style="background-image: url('${cert.image}')"></div>`
          : `<div class="cert-image"></div>`;
        const contentHtml = `
          ${imageHtml}
          <div class="cert-content">
            <strong>${cert.title}</strong>
            <p class="muted">${cert.description}</p>
            ${hasUrl ? `<span class="cert-link-btn">Ver Certificado ↗</span>` : ""}
          </div>`;
        return hasUrl
          ? `<div class="list-item cert-item"><a href="${cert.url}" target="_blank" rel="noopener">${contentHtml}</a></div>`
          : `<div class="list-item cert-item">${contentHtml}</div>`;
      })
      .join("");
  } catch (e) {
    console.warn("Falha ao carregar certificados");
  }
}

function getProjectImagePath(projectId, index) {
  return `assets/imgs/${projectId}/${index}.webp`;
}

function createProjectCard(project, index, direction) {
  const card = document.createElement("div");
  card.className = "project-card";

  const img = document.createElement("img");
  img.src = getProjectImagePath(project.id, 0);
  img.loading = "lazy";
  img.decoding = "async";
  img.onerror = () => {
    img.src = `assets/${project.id}/0.png`;
    img.onerror = () => (img.style.display = "none");
  };

  const overlay = document.createElement("div");
  overlay.className = "project-card-overlay";

  const badgesHtml = project.tags
    ? `<div class="project-card-badges">
        ${project.tags.slice(0, 3).map(tag => `<span class="project-badge">${tag}</span>`).join('')}
      </div>`
    : '';

  const imagesCount = project.images?.length > 0
    ? `<div class="project-card-images-count">${project.images.length} 📷</div>`
    : '';

  overlay.innerHTML = `
    ${imagesCount}
    <h3>${project.title}</h3>
    ${badgesHtml}
    <p class="project-summary">${project.summary}</p>
    <span class="view-btn">Ver Projeto ↗</span>
  `;

  card.appendChild(img);
  card.appendChild(overlay);
  card.addEventListener("click", () => openModal(project));

  const delayMultiplier = direction === "up" ? -1 : 1;
  const cardDelay =
    300 + Math.abs(index * delayMultiplier * CONFIG.ANIMATION_DELAY);

  setTimeout(() => {
    card.classList.add("revealed");
    
    const dir = getScrollDirection();
    img.style.transform = `translateY(${dir === "down" ? -30 : 30}px)`;
    img.style.opacity = "0";

    setTimeout(() => {
      const applyTransition = () => {
        img.style.transition =
          "opacity 0.5s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
      };
      if (img.complete) {
        applyTransition();
      } else {
        img.onload = applyTransition;
      }
    }, 50);
  }, cardDelay);

  return card;
}

async function loadProjects() {
  let projects;
  try {
    projects = await fetch("./data/projects.json").then((r) => {
      if (!r.ok) throw new Error();
      return r.json();
    });
  } catch {
    projects = [FALLBACK_PROJECT];
  }

  const container = document.getElementById("projectsContainer");
  container.innerHTML = "";
  const direction = getScrollDirection();

  projects.forEach((project, index) => {
    const card = createProjectCard(project, index, direction);
    container.appendChild(card);
  });

  initScrollAnimations();
}

function buildModalContent(project) {
  const links = [];
  if (project.github)
    links.push(
      `<a href="${project.github}" target="_blank" class="modal-link">GitHub ↗</a>`,
    );
  if (project.demo)
    links.push(
      `<a href="${project.demo}" target="_blank" class="modal-link">Demo ↗</a>`,
    );

  return `
    <div class="close-btn" id="closeModal">×</div>
    <div class="modal-inner">
      <div class="modal-header">
        <h3 class="anim-init">${project.title}</h3>
        <p class="modal-summary anim-init">${project.summary}</p>
      </div>
      <div class="modal-section anim-init">
        <div class="modal-section-label">Relatorio</div>
        <p>${project.problem}
        ${project.solution}
        Ao processo do projeto, aprimorei e aprimorei o meu conenhecimento em: ${project.learning}</p>
      </div>
      <div class="modal-tags">${renderTagsWithIcons(project.tags)}</div>
      ${links.length > 0 ? `<div class="modal-links">${links.join("")}</div>` : ""}
    </div>`;
}

function buildCarouselHtml(projectId, images, initialIndex = 0) {
  const dots = images
    .map(
      (_, i) =>
        `<button class="carousel-dot${i === initialIndex ? " active" : ""}" data-index="${i}"></button>`,
    )
    .join("");

  return `
    <div class="carousel">
      <div class="carousel-image-wrapper">
        <button class="prev" aria-label="Anterior">‹</button>
        <img id="carousel-img" src="${getProjectImagePath(projectId, images[initialIndex])}" alt="Screenshot do projeto" onerror="this.src='assets/imgs/${projectId}/${images[initialIndex]}.png'" />
        <button class="next" aria-label="Próximo">›</button>
      </div>
      <div class="carousel-dots">${dots}</div>
    </div>`;
}

function setupCarousel(project, currentIndex) {
  const img = document.getElementById("carousel-img");
  const prevBtn = document.querySelector(".carousel .prev");
  const nextBtn = document.querySelector(".carousel .next");
  const dots = document.querySelectorAll(".carousel-dot");

  const updateUI = () => {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  };

  const updateImage = (slideDirection) => {
    img.classList.remove("slide-from-right", "slide-from-left");
    void img.offsetWidth;
    img.src = getProjectImagePath(project.id, project.images[currentIndex]);
    img.onerror = () => {
      img.src = `assets/imgs/${project.id}/${project.images[currentIndex]}.png`;
    };
    img.classList.add(
      slideDirection === "next" ? "slide-from-right" : "slide-from-left",
    );
    updateUI();
  };

  const handleSlide = (direction) => {
    stopAutoSlide();
    currentIndex =
      (currentIndex + direction + project.images.length) %
      project.images.length;
    updateImage(direction === 1 ? "next" : "prev");
    if (project.images.length > 1) startAutoSlide();
  };

  const startAutoSlide = () => {
    if (project.images.length <= 1) return;
    autoSlideTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % project.images.length;
      updateImage("next");
    }, CONFIG.AUTO_SLIDE_INTERVAL);
  };

  prevBtn.onclick = (e) => {
    e.stopPropagation();
    handleSlide(-1);
  };
  nextBtn.onclick = (e) => {
    e.stopPropagation();
    handleSlide(1);
  };

  img.onclick = (e) => {
    e.stopPropagation();
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const half = rect.width / 2;
    if (project.images.length > 1) {
      if (clickX < half) {
        handleSlide(-1);
      } else {
        handleSlide(1);
      }
    }
  };

  dots.forEach((dot) => {
    dot.onclick = () => {
      stopAutoSlide();
      currentIndex = parseInt(dot.dataset.index);
      updateImage("next");
      startAutoSlide();
    };
  });

  if (project.images.length > 1) {
    startAutoSlide();
  }
}

function openModal(project) {
  const modal = document.getElementById("projectModal");
  const modalContent = document.getElementById("modalContent");

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  modalContent.innerHTML = buildModalContent(project);

  let currentIndex = 0;
  if (project.images?.length > 0) {
    const modalInner = modalContent.querySelector(".modal-inner");
    const tags = modalInner.querySelector(".modal-tags");
    const carouselHtml = buildCarouselHtml(project.id, project.images);
    tags.insertAdjacentHTML("beforebegin", carouselHtml);
    setupCarousel(project, currentIndex);
  }

  const closeBtn = modalContent.querySelector("#closeModal");
  closeBtn.onclick = closeModal;

  setTimeout(() => {
    const modalInner = modalContent.querySelector(".modal-inner");
    modalInner.scrollTop = 0;
    animateElements(modalInner, 100);
  }, CONFIG.MODAL_ANIMATION_DELAY);
}

async function updateGitHubInfo() {
  let data = JSON.parse(localStorage.getItem(CONFIG.CACHE_KEY) || "null");
  data =
    data || (await fetchJSON("./data/github-fallback.json")) || FALLBACK_DATA;

  document
    .getElementById("repo-count")
    .setAttribute("data-target", data.public_repos);
  document.getElementById("repo-count").innerText = "0";
  renderIconList(data.languages || [], "tech-list");
  renderIconList(data.data_info || [], "data-list");

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(
        `https://api.github.com/users/${CONFIG.GITHUB_USERNAME}/repos?per_page=100`,
        {
          headers: { Accept: "application/vnd.github.v3+json" },
        },
      ),
    ]);

    if (!userRes.ok) throw new Error();

    const reposData = await reposRes.json();
    if (Array.isArray(reposData)) {
      const languages = [
        ...new Set(reposData.map((r) => r.language).filter(Boolean)),
      ];
      const userData = await userRes.json();
      const newData = {
        public_repos: userData.public_repos,
        languages,
        data_info: data.data_info,
        updated_at: new Date().toISOString(),
      };
      localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify(newData));
      document
        .getElementById("repo-count")
        .setAttribute("data-target", newData.public_repos);
      renderIconList(newData.languages, "tech-list");

      const skillsSection = document.getElementById("habilidades");
      if (skillsSection && skillsSection.classList.contains("revealed")) {
        animateSkills(getScrollDirection());
      }
    }
  } catch (e) {
    console.warn("API offline, usando cache");
  }
}

function setupNavigation() {
// Bootstrap navbar já gerencia o toggle automaticamente
// Fechar menu mobile ao clicar em link
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
link.addEventListener("click", () => {
const navbarCollapse = document.querySelector(".navbar-collapse");
if (navbarCollapse.classList.contains("show")) {
const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
bsCollapse?.hide();
}
});
});

// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
const href = this.getAttribute('href');
if (href !== '#') {
e.preventDefault();
const target = document.querySelector(href);
if (target) {
target.scrollIntoView({ behavior: 'smooth' });
}
}
});
});
}

function setupModalEvents() {
  const modal = document.getElementById("projectModal");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (!modal.classList.contains("active")) return;
    const prevBtn = modal.querySelector(".carousel .prev");
    const nextBtn = modal.querySelector(".carousel .next");
    if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
    if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
  });
}

window.addEventListener(
  "scroll",
  () => {
    const currentScrollY = window.scrollY;
    if (hasScrolled) {
      scrollDirection = currentScrollY >= lastScrollY ? "down" : "up";
    }
    lastScrollY = currentScrollY;
    hasScrolled = true;
  },
  { passive: true },
);

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  loadCertificates();
  updateGitHubInfo();
  document.getElementById("year").innerText = new Date().getFullYear();
  setTimeout(initScrollAnimations, 300);
  setupNavigation();
  setupModalEvents();
  initTypingEffect();
});

function initTypingEffect() {
  const texts = [
    "Desenvolvedor Web",
    "Cientista de Dados",
    "Especialista em Backend",
    "Criador de APIs"
  ];
  const element = document.getElementById("typingText");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
}
