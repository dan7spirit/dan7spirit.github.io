# Daniel Sánchez — Senior Software Engineer & AI Solutions Architect Portfolio

An enterprise-grade, high-conversion web portfolio designed specifically to attract top technical recruiters, engineering managers, and executive hiring teams.

Built with a futuristic dark aesthetic, interactive LangGraph multi-agent simulation, recruiter AI assistant, certified credential verifications, and one-click printable ATS resume.

---

## 🌟 Key Features

1. **High-Impact Recruiter Hook (The 6-Second Scan)**
   - Bold hero value proposition highlighting **5+ years at Equifax**, **Dual-Cloud credentials (GCP & AWS)**, and **LangGraph Agentic AI**.
   - Live metrics ticker showcasing **640+ hrs/month saved**, **3x faster regression cycles**, and **2 offshore squads led**.

2. **Interactive LangGraph Agent Architecture Visualizer**
   - Live, step-by-step interactive simulation of the real production multi-agent automation platform Daniel architected at Equifax.
   - Interactive nodes: *CI Ingestion* → *Supervisor Agent* → *Worker Fleet* → *LLM Self-Healing Reflection Node* → *BigQuery Telemetry*.
   - Live terminal log stream and LangGraph `TypedDict` JSON state inspector.

3. **"Ask Daniel's Recruiter AI" Interactive Assistant (DanBot)**
   - Embedded interactive AI agent trained on Daniel's exact resume, cloud credentials, full-stack technologies, and leadership experience.
   - Quick suggested prompt chips for recruiters (LangGraph experience, GCP/AWS certs, 640 hrs/mo impact, contact info).

4. **Production Engineering Case Studies**
   - Deep-dive architectural breakdowns with filter tabs:
     - *LangGraph Autonomous E2E Automation Platform (Equifax)*
     - *Cloud-Native Workforce Analytics & Looker Suite (Equifax)*
     - *Enterprise Process Automation Portal & Microservices (Angular 19 & Spring Boot)*
     - *Multi-Engine Hybrid ETL & Data Lake Integrity Platform (BigQuery, PostgreSQL, Oracle, MSSQL)*
     - *Autonomous Logistics Invoice Reconciliation System (Case Study)*
   - Interactive modals detailing System Overview, Architecture Implementation, and Measurable Outcomes.

5. **Verified Certifications & Accreditations Showcase**
   - **Google Cloud Certified Professional - Cloud Architect** (Series ID: `98085`, Valid to Sept 2027) with direct link to verified PDF certificate!
   - **AWS Certified Solutions Architect – Associate** (Amazon Web Services).
   - **ISC2 Certified in Cybersecurity (CC)** (Infosec, Zero-Trust, OAuth 2.0).

6. **Interactive Resume & 1-Click ATS Print-to-PDF**
   - Interactive modal rendering a clean, ATS-compliant executive resume.
   - Direct button to print or save as a 2-page PDF formatted cleanly via `@media print` CSS.
   - Direct download link for the original `.DOCX` file (`assets/Daniel_Sanchez_Resume.docx`).

7. **Recruiter Conversion Hub**
   - 1-click clipboard copy for email (`sanchez04d@outlook.com`) and phone (`+506 61800125`) with toast notifications.
   - Pre-filled `mailto:` email action with job opportunity template.
   - Direct links to LinkedIn (`linkedin.com/in/dan7spirit`) and GitHub (`github.com/dan7spirit`).

---

## 🚀 How to Run Locally

You can run this portfolio locally with any standard HTTP server (no `npm install` or compilation required):

```bash
# Option 1: Python HTTP server
cd /home/canserbero/Documents/portfolio
python3 -m http.server 8080

# Then open in your browser:
# http://localhost:8080
```

```bash
# Option 2: Node.js (if npx serve is available)
npx serve .
```

Or simply double-click [index.html](file:///home/canserbero/Documents/portfolio/index.html) in your file manager to open it in Chrome, Firefox, or Brave!

---

## 🌐 1-Click Free Deployment Options

### 1. GitHub Pages (Recommended - 2 minutes)
Since Daniel already has a GitHub account at `github.com/dan7spirit`:
1. Create a repository on GitHub named `dan7spirit.github.io` (or `portfolio`).
2. Push this directory:
   ```bash
   cd /home/canserbero/Documents/portfolio
   git init
   git branch -M main
   git remote add origin https://github.com/dan7spirit/dan7spirit.github.io.git
   git add .
   git commit -m "feat: launch high-impact engineering portfolio"
   git push -u origin main
   ```
3. Go to **Repository Settings > Pages** and select `main` branch. Your site will immediately be live at:
   `https://dan7spirit.github.io`

### 2. Vercel
1. Install Vercel CLI: `npm i -g vercel` or import the GitHub repo on [vercel.com](https://vercel.com).
2. Run `vercel --prod` inside this directory.

### 3. Netlify
1. Drag and drop the `portfolio/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Instant live URL in 5 seconds!

---

## 📁 Project Structure

```
portfolio/
├── index.html                           # Modern, responsive single-page portfolio
├── README.md                            # Documentation and deployment guide
├── assets/
│   ├── favicon.svg                      # Custom high-tech DS monogram favicon
│   ├── avatar-illustration.svg          # Cybernetic stylized engineer avatar
│   ├── Daniel_Sanchez_Resume.docx       # Original resume for recruiter download
│   └── Google_Cloud_Architect_Certificate.pdf  # Verified GCP Certificate PDF
├── css/
│   └── styles.css                       # Glassmorphism, animations, print media rules
└── js/
    ├── main.js                          # Canvas mesh, counters, modals, toasts, filters
    ├── ai-agent.js                      # DanBot interactive recruiter AI assistant
    └── agent-visualizer.js              # Interactive LangGraph workflow simulator
```
