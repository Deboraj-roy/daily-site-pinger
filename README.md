# 📡 Daily Site Pinger

A GitHub Actions–powered workflow that **pings websites daily** and generates a live dashboard with their HTTP status.
This helps keep free-hosted sites (e.g., `.runasp.net`, `.netlify.app`, `.github.io`) awake and ensures you always know if they’re online.

---

## 🚀 Features

* ⏰ **Automatic Daily Check** (via cron at 10 AM BD / 4 AM UTC)
* 🖱️ **Manual Run** from the GitHub Actions tab
* 🔄 **On Push Run** when `dev` branch is updated
* 📊 **Dashboard Report** served via **GitHub Pages (main branch)**
* ✅ Status table with **URL, HTTP Code, Last Checked Timestamp**
* 🎨 Simple, responsive HTML + CSS

---

## 🗂️ Repository Structure

```
daily-site-pinger/
│
├─ (branch: main)        # GitHub Pages serves this branch
│   ├─ index.html         # Auto-generated dashboard
│   ├─ style.css          # Styles for dashboard
│   └─ reports/           # Historical reports (optional)
│
├─ (branch: dev)          # Workflow + scripts live here
│   ├─ sites.json         # List of URLs to ping
│   ├─ hitav.js           # Node.js script that checks sites
│   ├─ package.json       # Node.js dependencies
│   └─ .github/
│       └─ workflows/
│           ├─ ping.yml           # Daily cron workflow
│           └─ manual-or-push.yml # Manual & push-trigger workflow
```

---

## ⚙️ Setup Instructions

1. **Fork or Clone this repo**

   ```bash
   git clone https://github.com/your-username/daily-site-pinger.git
   ```

2. **Create 2 branches**

   * `main` → holds the dashboard
   * `dev` → holds scripts + workflows

   ```bash
   git checkout -b dev
   git push origin dev
   ```

3. **Enable GitHub Pages**

   * Go to **Settings → Pages**
   * Source = `main` branch → `/ (root)`
   * Save

   Your live dashboard will be available at:

   ```
   https://<your-username>.github.io/daily-site-pinger/
   ```

4. **Add your site list** in `sites.json` (in `dev` branch). Example:

   ```json
   [
     "https://bookstoredeb.runasp.net/",
     "https://librarydeb.netlify.app/",
     "http://mangoweb.runasp.net/"
   ]
   ```

5. **Workflows** will handle the rest:

   * `ping.yml` → runs **daily at 10 AM BD (4 AM UTC)**
   * `manual-or-push.yml` → runs when you update `dev` branch or manually trigger it

---

## 📊 Example Dashboard Preview

| URL                                                                  | Status | Last Checked        |
| -------------------------------------------------------------------- | ------ | ------------------- |
| [https://bookstoredeb.runasp.net/](https://bookstoredeb.runasp.net/) | ✅ 200  | 2025-09-21 10:00 AM |
| [https://librarydeb.netlify.app/](https://librarydeb.netlify.app/)   | ❌ 500  | 2025-09-21 10:00 AM |

---

## 🛠️ Tech Used

* **GitHub Actions** for automation
* **Node.js (hitav.js)** for site checks
* **Markdown/HTML/CSS** for reporting
* **GitHub Pages** for hosting

---

## 📌 Tips

* To change run time → edit cron in `.github/workflows/ping.yml`
* To manually run → go to **Actions tab → Select Workflow → Run Workflow**
* Make sure your workflow has:

  ```yaml
  permissions:
    contents: write
  ```

  so it can push updates to `main` branch.

---

## 📄 License

MIT License – free to use and modify.
 