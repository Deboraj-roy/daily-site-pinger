const fs = require('fs');
const sites = require('./sites.json');

async function pingSite(url) {
  try {
    const res = await fetch(url);
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

  // Generate index.html
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
  <style>
    body{font-family:Arial,sans-serif;}
    table{width:90%;margin:auto;border-collapse:collapse;}
    th,td{padding:8px;border:1px solid #ccc;}
    th{background:#007acc;color:#fff;}
    tr:nth-child(even){background:#f4f4f4;}
    a{text-decoration:none;color:#007acc;}
  </style>
</head>
<body>
  <h1 style="text-align:center;">Daily Site Status Report</h1>
  <p style="text-align:center;">Last checked: ${new Date().toLocaleString()}</p>
  <table>
    <thead><tr><th>URL</th><th>Status</th><th>Success</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
}

main();
