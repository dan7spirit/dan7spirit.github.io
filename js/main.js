/**
 * Main Application Logic for Daniel Sánchez's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initCounters();
  initNavigation();
  initThemeToggle();
  initProjectFilter();
  initModals();
  initCopyButtons();
});

/* ==========================================================================
   Interactive Background Canvas (Constellation / Neural Mesh)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 65);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 20 + 5;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.color = Math.random() > 0.6 ? '#38bdf8' : (Math.random() > 0.5 ? '#818cf8' : '#34d399');
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * this.density * 0.25;
          const directionY = forceDirectionY * force * this.density * 0.25;
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.55;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connect() {
    const maxDist = 110;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDist) {
          const opacity = (1 - distance / maxDist) * 0.18;
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    animationFrameId = requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   Impact Counters Animation
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.metric-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endVal = parseInt(target.getAttribute('data-target'), 10);
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        let startVal = 0;
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(startVal + (endVal - startVal) * easeOut);
          target.textContent = `${prefix}${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = `${prefix}${endVal}${suffix}`;
          }
        }
        requestAnimationFrame(updateCounter);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   Navigation & Scroll Spy
   ========================================================================== */
function initNavigation() {
  const nav = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('py-3', 'shadow-lg', 'bg-slate-950/85', 'backdrop-blur-md');
      nav.classList.remove('py-5');
    } else {
      nav.classList.remove('py-3', 'shadow-lg', 'bg-slate-950/85', 'backdrop-blur-md');
      nav.classList.add('py-5');
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Active section spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(`.nav-link[href*="${sectionId}"]`).forEach(link => {
          link.classList.add('text-cyan-400', 'font-semibold');
        });
      } else {
        document.querySelectorAll(`.nav-link[href*="${sectionId}"]`).forEach(link => {
          link.classList.remove('text-cyan-400', 'font-semibold');
        });
      }
    });
  });
}

/* ==========================================================================
   Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('daniel_portfolio_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeIcon(true);
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('daniel_portfolio_theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
    showToast(isLight ? 'Switched to Light Theme' : 'Switched to Dark Theme');
  });

  function updateThemeIcon(isLight) {
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    if (moonIcon && sunIcon) {
      if (isLight) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
    }
  }
}

/* ==========================================================================
   Project Filtering
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
        b.classList.add('bg-slate-800/50', 'text-slate-400', 'border-slate-700/50');
      });
      btn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
      btn.classList.remove('bg-slate-800/50', 'text-slate-400', 'border-slate-700/50');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   Modals (Case Studies & Interactive Resume)
   ========================================================================== */
const projectData = {
  'langgraph-agent': {
    title: 'LangGraph Autonomous E2E Automation Platform',
    role: 'Principal Architect & Lead Engineer',
    company: 'Equifax',
    impact: '640 man-hours saved/month · 3x regression speedup (3 wks → 1 wk)',
    tech: ['LangGraph', 'Python 3', 'Selenium', 'LLM Agents', 'PyTest', 'Docker', 'CI/CD'],
    overview: 'Architected an end-to-end intelligent automation platform replacing a legacy, high-maintenance test framework. Deployed an agent-orchestrated architecture capable of dynamic plan synthesis, DOM state observation, self-healing locator reflection, and automated regression reporting.',
    architecture: [
      'Supervisor Orchestrator Agent decomposing regression suites into isolated sub-graphs.',
      'Worker Execution Agents driving parallel Selenium headless browser clusters.',
      'Reflection & Self-Correction Node powered by LLMs to dynamically inspect changed DOM trees and heal broken UI locators without manual intervention.',
      'Automated Telemetry pipeline feeding test outcomes and execution timings directly into BigQuery and team Slack channels.'
    ],
    results: [
      'Reduced regression test cycle turnaround from 3 weeks down to 1 single week.',
      'Saved 640 engineering man-hours each month across the QA and development teams.',
      'Decreased flaky test false-positives by over 82% via reflection loops.'
    ]
  },
  'gcp-analytics': {
    title: 'Cloud-Native Enterprise Analytics & Looker Suite',
    role: 'Cloud Solutions Architect & Full-Stack Developer',
    company: 'Equifax',
    impact: 'Automated executive insights across global business units',
    tech: ['GCP Cloud Functions', 'Cloud Scheduler', 'BigQuery', 'Vue.js', 'Looker', 'Python', 'Google Apps Script'],
    overview: 'Engineered a serverless, event-driven employee workforce analytics and reporting pipeline for global executive leadership. Replaced disparate manual spreadsheets with an automated multi-tenant cloud analytics suite.',
    architecture: [
      'GCP Cloud Scheduler triggering periodic ingestion and data reconciliation jobs.',
      'Python-based Cloud Functions extracting, sanitizing, and transforming high-volume operational metrics.',
      'BigQuery partitioning and clustering optimized for high-speed multi-dimensional analytics.',
      'Interactive executive dashboards built with Vue.js and Looker with role-based metric filtering.'
    ],
    results: [
      'Eliminated 100% of manual reporting consolidation effort.',
      'Sub-second query response across millions of analytical log records in BigQuery.',
      'Delivered strategic visibility to VP and executive leadership teams.'
    ]
  },
  'fullstack-portal': {
    title: 'Enterprise Process Automation Portal & Microservices',
    role: 'Full-Stack Software Engineer',
    company: 'Equifax',
    impact: '40 hours/month eliminated · Sub-200ms API latency',
    tech: ['Angular 19', 'Spring Boot', 'Java 17+', 'REST APIs', 'OAuth 2.0 / JWT', 'PostgreSQL'],
    overview: 'Designed and deployed an internal enterprise web portal that automates critical business operations, service request dispatching, and administrative workflows for internal clients.',
    architecture: [
      'Modular Single-Page Application (SPA) built with Angular 19 and reactive state management.',
      'Spring Boot microservices architected with clean domain-driven hexagonal principles.',
      'Zero-trust security layer enforcing OAuth 2.0 and JWT token rotation for role-based access.',
      'Automated transaction handling with PostgreSQL connection pooling and auditing.'
    ],
    results: [
      'Reduced manual operational workload by 40 hours per month.',
      'Zero security vulnerabilities identified during enterprise infosec audits.',
      'Seamless deployment through automated GitHub Actions CI/CD pipelines.'
    ]
  },
  'etl-lake': {
    title: 'Multi-Engine Hybrid ETL & Data Lake Integrity Platform',
    role: 'Data & Software Engineer',
    company: 'Equifax',
    impact: 'Zero data discrepancies across petabyte-scale lake migrations',
    tech: ['BigQuery', 'PostgreSQL', 'Oracle', 'MSSQL', 'PL/SQL', 'Python', 'Automated QA'],
    overview: 'Architected a multi-database data integrity and validation engine to certify complex data lake migrations across hybrid SQL/NoSQL and legacy RDBMS architectures.',
    architecture: [
      'Python data validation framework executing cross-engine checksum and row-level diff algorithms.',
      'Complex PL/SQL stored procedures for relational reconciliation on Oracle and MSSQL.',
      'BigQuery data validation jobs verifying petabyte-scale data lakes with schema conformity checks.',
      'Real-time anomaly detection dispatching instant alerts on schema drift or data truncation.'
    ],
    results: [
      'Successfully validated 100% of mission-critical financial datasets with zero production downtime.',
      'Identified and corrected legacy schema anomalies prior to enterprise cutover.',
      'Reduced data validation turnaround from several days to under 45 minutes.'
    ]
  },
  'logistics-reconciliation': {
    title: 'Autonomous Logistics Invoice Reconciliation Architecture',
    role: 'Lead Solutions Architect (Case Study)',
    company: 'Enterprise Logistics Case Study',
    impact: '90% manual touchpoint reduction · 5,200+ monthly invoices',
    tech: ['Document AI / OCR', 'Dispatcher-Worker Architecture', 'Dead Letter Queues', 'ElasticSearch', 'Python'],
    overview: 'Architected an automated multi-stage invoice reconciliation system processing 5,200+ land transport invoices per month for Accounts Payable, resolving severe payment bottlenecks.',
    architecture: [
      'Dispatcher Service: Monitored shared inboxes, verified against Approved Vendor Lists, and enqueued tasks.',
      'Worker Bot Fleet: Decoupled workers asynchronously picking tasks, sending PDFs to Google Document AI OCR.',
      'Validation Engine: Performing 3-way matching between Invoices, Purchase Orders, and Transport Management Systems ($5 tolerance check).',
      'Dead Letter Queue & ElasticSearch: Unmatched or low-confidence documents routed to human-in-the-loop review with full audit trails.'
    ],
    results: [
      'Drastically reduced invoice processing time from 4 days to near-real-time.',
      'Estimated $520/month Document AI OCR operational cost against thousands in labor savings.',
      'Zero lost invoices and end-to-end telemetry through ElasticSearch.'
    ]
  }
};

function initModals() {
  const caseModal = document.getElementById('case-study-modal');
  const resumeModal = document.getElementById('resume-modal');

  // Open Case Study Modal
  document.querySelectorAll('.open-case-study-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];
      if (!data) return;

      document.getElementById('modal-project-title').textContent = data.title;
      document.getElementById('modal-project-meta').textContent = `${data.role} · ${data.company}`;
      document.getElementById('modal-project-impact').textContent = data.impact;
      document.getElementById('modal-project-overview').textContent = data.overview;

      // Tech tags
      const techContainer = document.getElementById('modal-project-tech');
      techContainer.innerHTML = '';
      data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'px-2.5 py-1 text-xs font-mono rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-500/30';
        span.textContent = t;
        techContainer.appendChild(span);
      });

      // Architecture points
      const archContainer = document.getElementById('modal-project-arch');
      archContainer.innerHTML = '';
      data.architecture.forEach(point => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2 text-sm text-slate-300';
        li.innerHTML = `<span class="text-cyan-400 mt-1">▹</span><span>${point}</span>`;
        archContainer.appendChild(li);
      });

      // Results points
      const resContainer = document.getElementById('modal-project-results');
      resContainer.innerHTML = '';
      data.results.forEach(res => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2 text-sm text-slate-300';
        li.innerHTML = `<span class="text-emerald-400 mt-1">✓</span><span>${res}</span>`;
        resContainer.appendChild(li);
      });

      caseModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modals
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (caseModal) caseModal.classList.add('hidden');
      if (resumeModal) resumeModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });

  // Click outside to close
  window.addEventListener('click', (e) => {
    if (e.target === caseModal) {
      caseModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
    if (e.target === resumeModal) {
      resumeModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Open Resume Modal
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Print Resume
  const printResumeBtn = document.getElementById('print-resume-btn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   Clipboard Copy & Toasts
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: "${text}"`);
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span class="text-emerald-400">✓ Copied!</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        showToast('Failed to copy to clipboard');
      });
    });
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-cyan-500/40 text-slate-100 shadow-2xl text-sm font-medium backdrop-blur-md transform transition-all duration-300 translate-y-3 opacity-0';
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Global helper for toast
window.showToast = showToast;
