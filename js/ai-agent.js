/**
 * DanBot - Daniel Sánchez's Interactive AI Recruiter Assistant
 * Provides recruiters and hiring managers an interactive agentic preview of Daniel's expertise.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAiAssistant();
});

const danielKnowledgeBase = {
  summary: `**Daniel Sánchez** is a Senior Software Engineer and AI/Automation Specialist with **5+ years of enterprise experience** at **Equifax**. He specializes in architecting end-to-end agentic AI systems using **LangGraph**, full-stack microservices (**Python**, **Java 17+**, **Spring Boot**, **Angular 19**), and dual-cloud enterprise architectures (**GCP Certified Professional Cloud Architect** and **AWS Certified Solutions Architect**).`,
  
  langgraph: `### 🤖 LangGraph & Agentic AI Experience
Daniel designed and deployed an enterprise multi-agent automation platform using **LangGraph** & **Python** to replace legacy testing frameworks at Equifax:
- **Orchestration**: Built a supervisor-worker graph architecture that automatically decomposes complex E2E user flows into parallel worker agents.
- **Self-Healing Loop**: Incorporated reflection nodes where an LLM evaluates failed DOM interactions and heals broken selectors in real time.
- **Direct Business Impact**:
  - ⏱️ **640 man-hours saved per month**
  - ⚡ **3x faster regression turnaround** (slashed from 3 weeks to 1 week)
  - 📉 **82% reduction** in false-positive test flakiness.`,

  cloud: `### ☁️ Cloud Architecture & Certifications
Daniel holds top-tier industry credentials with hands-on enterprise production experience:
- **Google Cloud Certified Professional - Cloud Architect**
  - Series ID: \`98085\` | Active through Sept 2027
  - Enterprise stack: BigQuery, Cloud Functions, Cloud Scheduler, IAM, Pub/Sub, Looker
- **AWS Certified Solutions Architect – Associate**
  - Stack: EC2, S3, RDS, Lambda, VPC, IAM
- **ISC2 Certified in Cybersecurity (CC)**
  - Zero-Trust security, OAuth 2.0, JWT token rotation, secure CI/CD pipelines.`,

  impact640: `### 🚀 How Daniel Saved 640 Hours/Month
At Equifax, regression testing before major release trains took **3 full weeks** of manual QA effort and fragile script maintenance.
Daniel:
1. Re-architected the legacy testing paradigm into an autonomous **LangGraph multi-agent system**.
2. Enabled automated test plan generation and autonomous self-correction of UI locators via LLM reflection loops.
3. Automated test execution across parallel containers in Docker/CI.
4. This compressed test runs from **21 days down to 5 days** (a 3x acceleration), unlocking **640 engineering hours back each month** for high-value feature development!`,

  fullstack: `### 💻 Full-Stack & Backend Tech Stack
- **Languages**: Python 3+ (Expert), Java 17+, TypeScript, JavaScript, SQL/PL-SQL.
- **Backend Frameworks**: Spring Boot, Node.js, Express, FastAPI/Flask, RESTful microservices, event-driven pipelines.
- **Frontend**: Angular 19, React, Vue.js, Tailwind CSS, Modern HTML5/ESNext.
- **Data & Storage**: Google BigQuery, PostgreSQL, Oracle DB, MSSQL, Redis, ETL validation pipelines.
- **DevOps**: Docker, GitHub Actions, Jenkins, GitHub Copilot champion.`,

  leadership: `### 👥 Leadership, Mentorship & Collaboration
- **Tech Lead**: Led offshore engineering squads across two major enterprise automation initiatives at Equifax.
- **Solution Architecture**: Defined architecture blueprints, microservice contracts, and database validation schemas.
- **Mentorship**: Regularly conducted peer code reviews, led knowledge-sharing workshops on AI agent frameworks, and mentored junior and mid-level engineers.
- **Agile**: Experienced in Scrum/Agile, sprint planning, Jira/Confluence backlog grooming, and cross-functional stakeholder communication.`,

  contact: `### 📬 Contact & Availability
- **Status**: 🟢 Open to Senior Software Engineer, Staff Engineer, and AI Solutions Architect opportunities.
- **Location**: San José, Costa Rica (Available for Remote roles worldwide).
- **Email**: [sanchez04d@outlook.com](mailto:sanchez04d@outlook.com)
- **Phone / WhatsApp**: +506 61800125
- **LinkedIn**: [linkedin.com/in/dan7spirit](https://www.linkedin.com/in/dan7spirit)
- **GitHub**: [github.com/dan7spirit](https://github.com/dan7spirit)
- **Education**: Bachelor's Degree in Computer Science from **Tecnológico de Costa Rica (TEC)**.`,

  etl: `### 📊 Enterprise ETL & Data Validation Platform
Daniel engineered a robust multi-engine data integrity suite across **BigQuery**, **PostgreSQL**, **Oracle**, and **MSSQL**.
- Implemented automated cross-database reconciliation algorithms ensuring zero data loss during cloud data lake migrations.
- Authored complex PL/SQL procedures and automated Python validation suites.
- Reduced multi-day manual data verification routines to under 45 minutes.`
};

function initAiAssistant() {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chipButtons = document.querySelectorAll('.chat-chip-btn');
  const assistantWidget = document.getElementById('ai-assistant-widget');
  const openWidgetBtns = document.querySelectorAll('.open-ai-chat-btn');
  const closeWidgetBtn = document.getElementById('close-ai-chat-btn');

  // Toggle floating widget visibility
  openWidgetBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (assistantWidget) {
        assistantWidget.classList.remove('hidden');
        if (chatInput) chatInput.focus();
      }
    });
  });

  if (closeWidgetBtn && assistantWidget) {
    closeWidgetBtn.addEventListener('click', () => {
      assistantWidget.classList.add('hidden');
    });
  }

  // Handle suggested chip clicks
  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (!query) return;
      handleUserQuery(query);
    });
  });

  // Handle user submit
  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', () => {
      submitInput();
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        submitInput();
      }
    });
  }

  function submitInput() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    handleUserQuery(text);
  }

  function handleUserQuery(query) {
    appendMessage('user', query);

    // Show typing indicator
    const typingId = showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingId);
      const answer = generateAnswer(query);
      appendMessage('bot', answer);
    }, 600 + Math.random() * 400);
  }

  function appendMessage(sender, text) {
    if (!chatMessages) return;

    const msgWrapper = document.createElement('div');
    msgWrapper.className = `flex gap-3 ${sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`;

    if (sender === 'bot') {
      msgWrapper.innerHTML = `
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg shadow-cyan-500/20">
          AI
        </div>
        <div class="max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 bg-slate-800/90 border border-slate-700/60 text-slate-200 text-sm leading-relaxed shadow-md">
          ${formatMarkdown(text)}
        </div>
      `;
    } else {
      msgWrapper.innerHTML = `
        <div class="max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm leading-relaxed shadow-md font-medium">
          ${escapeHtml(text)}
        </div>
        <div class="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold shrink-0">
          You
        </div>
      `;
    }

    chatMessages.appendChild(msgWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    if (!chatMessages) return null;
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'flex gap-3 justify-start animate-fade-in';
    div.innerHTML = `
      <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
        AI
      </div>
      <div class="rounded-2xl rounded-tl-sm px-4 py-3 bg-slate-800/80 border border-slate-700/60 flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style="animation-delay: 0.15s"></span>
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style="animation-delay: 0.3s"></span>
      </div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function generateAnswer(rawQuery) {
    const q = rawQuery.toLowerCase();

    if (q.includes('langgraph') || q.includes('agent') || q.includes('automation') || q.includes('ai')) {
      return danielKnowledgeBase.langgraph;
    }
    if (q.includes('cloud') || q.includes('gcp') || q.includes('aws') || q.includes('certif')) {
      return danielKnowledgeBase.cloud;
    }
    if (q.includes('640') || q.includes('save') || q.includes('hour') || q.includes('speed') || q.includes('regression')) {
      return danielKnowledgeBase.impact640;
    }
    if (q.includes('stack') || q.includes('backend') || q.includes('frontend') || q.includes('python') || q.includes('spring') || q.includes('angular') || q.includes('java')) {
      return danielKnowledgeBase.fullstack;
    }
    if (q.includes('lead') || q.includes('mentor') || q.includes('team') || q.includes('manage') || q.includes('culture')) {
      return danielKnowledgeBase.leadership;
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('remote') || q.includes('location') || q.includes('salary') || q.includes('available')) {
      return danielKnowledgeBase.contact;
    }
    if (q.includes('etl') || q.includes('data') || q.includes('database') || q.includes('bigquery') || q.includes('oracle') || q.includes('sql')) {
      return danielKnowledgeBase.etl;
    }
    if (q.includes('education') || q.includes('university') || q.includes('tec') || q.includes('degree')) {
      return `### 🎓 Academic Background
Daniel graduated with a **Bachelor's Degree in Computer Science & Informatics** from **Tecnológico de Costa Rica (TEC)** (2016–2020), the country's foremost technical institution renowned for rigorous software engineering, distributed systems, and mathematics curricula.`;
    }

    // Default intelligent overview
    return `${danielKnowledgeBase.summary}\n\nFeel free to ask me specifically about:\n- 🤖 His **LangGraph & Agentic AI** implementations\n- ☁️ His **GCP Cloud Architect** & **AWS** certifications\n- ⚡ How he saved **640 engineering hours/mo**\n- 📬 How to **interview or contact** Daniel directly`;
  }

  function formatMarkdown(text) {
    let html = text
      .replace(/^### (.*$)/gim, '<h4 class="font-bold text-cyan-300 text-base mb-2 font-display">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 text-xs font-mono border border-cyan-500/20">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-cyan-400 hover:text-cyan-300 underline font-medium">$1</a>')
      .replace(/^- (.*$)/gim, '<div class="flex items-start gap-2 my-1"><span class="text-cyan-400 text-xs mt-1">▹</span><span>$1</span></div>')
      .replace(/\n\n/g, '<div class="my-2"></div>');
    return html;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
