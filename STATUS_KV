const URLS = [
  "https://orange-cherry-fa56.mrouf7353.workers.dev/",
  "https://deboraj-roy.github.io/Library-Management-System-SinglePage/login",
  "https://bookstoredeb.runasp.net/",
  "http://eticket.runasp.net/",
  "http://movie-store.runasp.net/"
  // Add more as needed
];

const TIMEOUT_MS = 10000;

async function fetchWithStatus(url) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(url, { method: "GET", signal: controller.signal });
    clearTimeout(id);
    return { url, status: res.status, ok: res.ok };
  } catch (err) {
    return { url, status: 0, ok: false, error: err.message };
  }
}

export default {
  async scheduled(event, env, ctx) {
    const results = await Promise.all(URLS.map(fetchWithStatus));

    // Save results to KV
    await STATUS_KV.put("latest", JSON.stringify({
      time: new Date().toISOString(),
      results
    }));
  }
};
