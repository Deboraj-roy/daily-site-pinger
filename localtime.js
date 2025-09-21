document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("last-checked");
  if (!el) return;

  const utcDate = el.getAttribute("data-utc");
  if (!utcDate) return;

  const date = new Date(utcDate);

  // Format to visitor's local timezone
  const formatted = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Replace fallback UTC text
  el.textContent =
    formatted +
    " (" +
    Intl.DateTimeFormat().resolvedOptions().timeZone +
    ")";
});
