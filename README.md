# 📡 Daily Site Pinger

A **GitHub Actions–powered workflow** that automatically checks the status of your websites and generates a live dashboard. Perfect for keeping free-hosted sites (like `.runasp.net`, `.netlify.app`, `.github.io`) awake and monitoring uptime.

---

## 🚀 Features

* ⏰ **Automatic Daily Check** via cron at **08 AM BD / 2 AM UTC**
* 🖱️ **Manual Run** directly from the GitHub Actions tab
* 🔄 **On Push Run** whenever the **main branch** is updated
* 📊 **Dashboard Report** served via **GitHub Pages (main branch)**
* ✅ Tracks **URL, HTTP Code, Last Checked Timestamp**
* 🎨 Simple, responsive **HTML + CSS** dashboard
* ⚡ **Robust workflow** — handles missing `reports/` folder and only commits when there are changes

---

## 🗂️ Repository Structure

```

daily-site-pinger/
│
├─ (branch: main)        # GitHub Pages serves this branch
│   ├─ index.html         # Auto-generated dashboard
│   ├─ style.css          # Dashboard styling
│   └─ reports/           # Historical reports (optional; workflow handles missing folder)
│
├─ (branch: dev)          # Workflow + scripts live here
│   ├─ sites.json         # List of URLs to ping
│   ├─ hitav.js           # Node.js site checker
│   ├─ package.json       # Node.js dependencies
│   └─ .github/
│       └─ workflows/
│           ├─ ping.yml           # Daily cron workflow
│           └─ manual-or-push.yml # Manual & push-trigger workflow

````

---

## ⚙️ Setup Instructions

1. **Clone or Fork this repository**

```bash
git clone https://github.com/your-username/daily-site-pinger.git
````

2. **Create two branches**

* `main` → holds the live dashboard
* `dev` → holds scripts + workflows

```bash
git checkout -b dev
git push origin dev
```

3. **Enable GitHub Pages**

* Go to **Settings → Pages**
* Set **Source = main branch → / (root)**
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

5. **Workflows** handle the rest:

* `ping.yml` → runs **daily at 10 AM BD (4 AM UTC)**
* `manual-or-push.yml` → runs on **main branch push** or **manual trigger**

  * Handles missing `reports/` folder gracefully
  * Commits only if there are actual updates

---

## 📊 Example Dashboard Preview

| URL                                                                  | Status | Last Checked        |
| -------------------------------------------------------------------- | ------ | ------------------- |
| [https://bookstoredeb.runasp.net/](https://bookstoredeb.runasp.net/) | ✅ 200  | 2025-09-21 10:00 AM |
| [https://librarydeb.netlify.app/](https://librarydeb.netlify.app/)   | ❌ 500  | 2025-09-21 10:00 AM |

---

## 🛠️ Tech Stack

* **GitHub Actions** – automation & workflow
* **Node.js (hitav.js)** – site status checker
* **HTML/CSS** – dashboard reporting
* **GitHub Pages** – hosting live dashboard

---

## 📌 Tips & Notes

* To **change the run time** → edit cron in `.github/workflows/ping.yml`
* To **manually trigger** → go to **Actions tab → Select Workflow → Run Workflow**
* Ensure workflow permissions:

```yaml
permissions:
  contents: write
```

so it can push updates to the `main` branch.

* Empty `reports/` folder is handled automatically, no errors occur.

---

## 📄 License

MIT License – free to use, modify, and share.
 
 
