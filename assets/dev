চমৎকার! 🚀 তাহলে চল শুরু করি। আমি তোমার জন্য **ready-to-deploy GitHub setup** সাজিয়ে দিচ্ছি। এতে থাকবে:

* **Main Repo** → শুধুমাত্র dashboard report (index.html + CSS) দেখানোর জন্য।
* **Dev Repo** → যেখানে workflow চলবে, সাইটগুলোকে প্রতিদিন হিট করবে, report বানাবে, এবং main repo-তে push করবে।
* **GitHub Actions Workflow** → write permission সহ, কোন PAT দরকার নেই।

---

## **১. Main Repo Setup**

নাম সাজেস্ট করছি → **`daily-site-dashboard`**
👉 কাজ: রিপোর্ট দেখাবে (GitHub Pages enabled থাকবে)

### Main Repo structure:

```
daily-site-dashboard/
│
├─ index.html   # auto updated
├─ style.css
└─ assets/      # future assets (images/icons if needed)
```

**style.css (optional, simple design):**

```css
body { font-family: Arial, sans-serif; margin: 20px; }
h1 { text-align: center; color: #007acc; }
table { width: 95%; margin: auto; border-collapse: collapse; }
th, td { padding: 10px; border: 1px solid #ccc; text-align: left; }
th { background: #007acc; color: #fff; }
tr:nth-child(even) { background: #f9f9f9; }
a { color: #007acc; text-decoration: none; }
```

GitHub Pages enable করো (`Settings → Pages → Branch: main`)

---

## **২. Dev Repo Setup**

নাম সাজেস্ট করছি → **`daily-site-updater`**

### Dev Repo structure:

```
daily-site-updater/
│
├─ sites.json          # সাইট লিস্ট
├─ hitav.js            # পিং স্ক্রিপ্ট
├─ package.json        # node deps (node-fetch)
└─ .github/workflows/main.yml   # GitHub Actions workflow
```

---

### **sites.json**

তুমি যে লিংকগুলো দিলে সেগুলো এখানে:

```json
[
  "https://orange-cherry-fa56.mrouf7353.workers.dev/",
  "https://deboraj-roy.github.io/Library-Management-System-SinglePage/login",
  "https://bookstoredeb.runasp.net/",
  "http://eticket.runasp.net/",
  "http://movie-store.runasp.net/",
  "http://movie-store.runasp.net/Home/Index",
  "https://deboraj-roy.github.io/Resume/",
  "https://plumwillyt.bsite.net/",
  "https://deboraj-roy.github.io/Library-Management-System-SinglePage/",
  "https://librarydeb.netlify.app/",
  "https://librarydeb7.netlify.app/",
  "http://deblmsapi.runasp.net/",
  "https://green-breeze-a7aa.mrouf7353.workers.dev/",
  "https://www.p13839740.somee.com/",
  "https://lazynoja.bsite.net/",
  "http://mangoweb.runasp.net/",
  "https://aubreeazure.bsite.net/swagger/index.html",
  "http://crudnet.runasp.net/Employee",
  "http://mangoproduct.runasp.net/index.html",
  "http://mangoorder.runasp.net/index.html",
  "http://mangoemail.runasp.net/index.html",
  "http://mangocoupon.runasp.net/index.html",
  "http://debmangoauth.runasp.net/index.html",
  "http://deblmsapi.runasp.net/index.html",
  "http://mangogatewaysolution.runasp.net/",
  "http://mangoshoppingcart.runasp.net/index.html",
  "http://mangoreward.runasp.net"
]
```

---

### **hitav.js**

```javascript
import fs from 'fs';
import fetch from 'node-fetch';
import sites from './sites.json' assert { type: "json" };

async function pingSite(url) {
  try {
    const res = await fetch(url, { method: 'GET' });
    return { url, status: res.status, ok: res.ok };
  } catch (err) {
    return { url, status: 0, ok: false, error: err.message };
  }
}

async function main() {
  const results = [];
  for (const url of sites) {
    const r = await pingSite(url);
    results.push(r);
  }

  const html = generateHTML(results);
  fs.writeFileSync('index.html', html, 'utf-8');
}

function generateHTML(results) {
  const rows = results.map(r => `
    <tr>
      <td><a href="${r.url}" target="_blank">${r.url}</a></td>
      <td>${r.status}</td>
      <td>${r.ok ? '✅' : '❌'}</td>
    </tr>
  `).join('\n');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Daily Site Status Report</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Daily Site Status Report</h1>
  <p style="text-align:center;">Last checked: ${new Date().toLocaleString()}</p>
  <table>
    <thead><tr><th>URL</th><th>Status</th><th>Success</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
}

main();
```

---

### **package.json**

```json
{
  "name": "daily-site-updater",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "node-fetch": "^3.3.2"
  }
}
```

---

### **.github/workflows/main.yml**

```yaml
name: Daily Site Ping

permissions:
  contents: write

on:
  schedule:
    - cron: '0 4 * * *' # 10 AM BD
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Dev Repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install Dependencies
        run: npm install

      - name: Run Hit Script
        run: node hitav.js

      - name: Push Report to Main Repo
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "Update daily report"
          branch: main
          repository: your-username/daily-site-dashboard
          file_pattern: index.html
```

---

## ✅ এখন করণীয়

1. **Main Repo বানাও** → `daily-site-dashboard`
2. **Dev Repo বানাও** → `daily-site-updater`
3. Dev Repo → সব ফাইল (sites.json, hitav.js, package.json, workflow) push করো
4. Workflow → প্রতিদিন সকাল ১০টায় (BD time) run হবে
5. Main Repo → GitHub Pages enable → সেখানে auto-updated dashboard show হবে

---

🔥 এভাবে pure GitHub ecosystem ব্যবহার করে পুরো automation system ফ্রি-তে চলে যাবে।

---

তুমি কি চাও আমি এখনই এই দুইটা repo’র জন্য **ready-to-upload ZIP package** সাজিয়ে দিই, যাতে তুমি শুধু GitHub এ create repo → upload → done করতে পারো?
