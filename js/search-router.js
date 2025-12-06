// search-router.js
document.addEventListener("DOMContentLoaded", () => {
  // Desktop search in navbar
  const desktopInput = document.getElementById("desktopSearchInput");
  // Mobile search input in the modal
  const mobileInput = document.getElementById("searchInput");

  [desktopInput, mobileInput].forEach(input => {
    if (!input) return;

    input.addEventListener("input", e => {
      const term = e.target.value.trim();
      if (!term) return;

      // 1️⃣ Save the term so index.html can read it
      sessionStorage.setItem("liveSearch", term);

      // 2️⃣ Are we already on index.html?
      const path = window.location.pathname;
      const onIndex =
        path.endsWith("index.html") ||
        path === "/" ||
        path === "" ||
        path.endsWith("/index");

      if (!onIndex) {
        // 3️⃣ Not on index → go there
        window.location.href = "index.html";
      } else {
        // 4️⃣ Already on index → tell page to search
        document.dispatchEvent(new CustomEvent("liveSearch", { detail: term }));
      }
    });
  });
});
