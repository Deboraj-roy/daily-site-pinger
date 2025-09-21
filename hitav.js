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
