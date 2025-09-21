import fs from "fs";
import fetch from "node-fetch";
import sites from "./sites.json" assert { type: "json" };

async function pingSite(url) {
  try {
    const res = await fetch(url, { method: "GET" });
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
  fs.writeFileSync("index.html", html, "utf-8");
}

function generateHTML(results) {
  const rows = results
    .map(
      (r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><a href="${r.url}" target="_blank">${r.url}</a></td>
      <td>${r.status}</td>
      <td>${r.ok ? "✅" : "❌"}</td>
    </tr>`
    )
    .join("\n");

  const lastChecked = new Date().toISOString(); // UTC timestamp

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Daily Site Status Report</title>
  <link rel="stylesheet" href="style.css">
  <script defer src="localtime.js"></script>
   <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { width: 90%; margin: 0 auto; border-collapse: collapse; }
    th, td { padding: 8px 12px; border: 1px solid #140303; }
    th { background-color: #6d5e08; color: white; }
  </style>
</head>
<body>
  <h1 style="text-align:center;">Daily Site Status Report</h1>
  <p style="text-align:center;">
    Last checked: 
    <span id="last-checked" data-utc="${lastChecked}">
      ${lastChecked} (UTC)
    </span>
  </p>
  <table>
    <thead>
      <tr>
        <th>SL</th>
        <th>Site</th>
        <th>Status Code</th>
        <th>OK</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>`;
}

main();
