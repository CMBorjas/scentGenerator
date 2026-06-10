<div align="center">
  <h1>Scent Generator</h1>
  <p><strong>A pleasant and putrid scent generator designed for the Memory Palace technique.</strong></p>
  <p>
    <a href="https://cchristian-mandujano.vercel.app/ResumeWebsite/projects/scent-generator">Live Demo</a> •
    <a href="#-installation--usage">Usage</a> •
    <a href="#-api-integration">API</a> •
    <a href="#-roadmap--future-ideas">Roadmap</a>
  </p>
</div>

---

## Overview

The **Scent Generator** is an application built to generate and manage various scents to anchor memories using the Memory Palace technique. By pairing a randomly selected pleasant scent with a pungent one, the generator creates striking, unexpected sensory combinations that are highly memorable.

> *Created by Christian Mandujano Borjas on 03/21/2025*

---

## Key Features

- **Sensory Synthesis**: Generates random dual-scent profiles based on carefully curated lists (`pleasant.txt` & `pungent.txt`).
- **Live Interactive UI**: A sleek, web-based version available for direct browser use via the included `index.html`.
- **Micro-API Ready**: Hostable via GitHub Pages, where other apps can `fetch()` the scent lists directly over HTTPS (use with rate limits in mind).
- **Rust CLI Engine**: A fast, text-based terminal interface for local generation.

---

## Installation & Usage

Choose your preferred way to interact with the Scent Generator:

### 1. Web Version (Browser)
No installation needed. You can use the web version in two ways:
- **Live Demo (Portfolio):** Visit the [Cyberpunk Scent Generator](https://cchristian-mandujano.vercel.app/ResumeWebsite/projects/scent-generator)
- **Local Web View:** Simply open `index.html` in your web browser. 

### 2. Rust CLI (Terminal)
To run the Scent Generator in your terminal natively:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CMBorjas/scentGenerator.git
   cd scentGenerator
   ```
2. **Run the application:**
   ```bash
   cargo run
   ```
   *(Note: Ensure you have [Rust and Cargo](https://rustup.rs/) installed.)*

> **Usage Tip:** Press `Enter` to generate a combo, or type `exit` or `q` to quit.

---

## API Integration

If this repository is hosted statically (e.g., GitHub Pages), external applications can directly fetch the raw text files to use the data as a micro-service:

- **Pleasant Scents:** `https://cmborjas.github.io/scentGenerator/pleasant.txt`
- **Pungent Scents:** `https://cmborjas.github.io/scentGenerator/pungent.txt`

*(Note: When implementing this in your own projects, please keep network rate limits in mind.)*

### 🛡️ Dedicated API Wrapper (Node.js)
If you wish to run a dedicated backend server with protection against abuse, a Node.js API Wrapper is included in the `api-wrapper/` directory. It features built-in rate limiting (100 requests / 15 minutes) and optional API Key authentication.

1. Navigate to the API directory:
   ```bash
   cd api-wrapper
   npm install
   ```
2. (Optional) Configure authentication:
   ```bash
   cp .env.example .env
   # Edit .env to set SCENT_API_KEY if desired
   ```
3. Start the server:
   ```bash
   node index.js
   ```

**Endpoints:**
- `GET /api/generate` - Returns a random scent combination.
- `GET /api/scents` - Returns the full raw lists.

*(Note: If `SCENT_API_KEY` is set in your `.env`, you must pass the `x-api-key` header in your requests.)*

---

## Roadmap & Future Ideas

We have big plans for the Scent Generator! Here are the upcoming features and ideas:

- [x] **API Wrapper (Top Priority):** Created a dedicated API wrapper in Node.js that implements rate limits and key generation.
- [ ] **Multi-Scent Generation:** Add the ability to generate profiles with more than 2 scents.
- [ ] **Location-Based Scents:** Generate scents tailored to specific location types (e.g., kitchen, bathroom, bedroom).
- [ ] **Local Storage:** Integrate browser local storage to save favorite scent combinations.
- [ ] **Robust CLI Error Handling:** Upgrade the Rust CLI to gracefully handle edge cases and missing files.
- [ ] **API Authentication:** Implement secure authentication for the upcoming API wrapper.
- [ ] **Expanded Categories:** Add more granular scent categories.
- [ ] **Dynamic Updates:** Auto-update the text files from user input and crowdsourced data.
- [ ] **Module Exports:** Enable the core engine to be used by other repositories as an imported module (both Web & Rust).

---

## Implementation Details
*Currently utilizing static HTML/JS for the web interface and Rust/Cargo for the local CLI. Further technical architecture documentation will be added here as the API wrapper is developed.*

## Troubleshooting
*If the CLI fails to run, ensure that both `pleasant.txt` and `pungent.txt` are in the same directory as the executable. Web errors are usually related to CORS or fetch paths if the files are moved.*

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<div align="center">
  <sub>Built for memory masters and developers alike.</sub>
</div>
