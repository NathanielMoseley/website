document.head.appendChild(document.createElement("base")).setAttribute("href", 
  document.currentScript.src.replace("/script.js", "")
);

document.addEventListener("DOMContentLoaded", () => {
  // Fake visitor counter using localStorage
  const counter = document.getElementById("count");
  let visits = localStorage.getItem("visits") || 123;

  visits++;
  localStorage.setItem("visits", visits);
  counter.textContent = visits.toString().padStart(6, "0");
});

// Mystery button (progressive enhancement)
document.getElementById("mysteryBtn").addEventListener("click", () => {
  alert("You found nothing. Or did you?");
});

// Subtle performance trick: lazy load images
document.querySelectorAll("img").forEach(img => {
  img.loading = "lazy";
});

function setActiveLink(url) {
  document.querySelectorAll("#sidebar a").forEach(a => {
    if (a.getAttribute("href") === url) {
      a.closest('.box').classList.add("active");
    } else {
      a.closest('.box').classList.remove("active");
    }
  });
}

async function loadPage(url, { push = true } = {}) {
  try {
    const response = await fetch(url);
    const text = await response.text();

    // Parse returned HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    // Extract only the content section
    const newContent = doc.querySelector("#content");

    if (!newContent) {
      throw new Error("No #content found in " + url);
    }

    // Replace current content
    document.querySelector("#content").innerHTML = newContent.innerHTML;
  } catch (err) {
    console.error(err);

    // Very authentic 90s fallback 😄
    document.querySelector("#content").innerHTML = `
      <h2>404!!!</h2>
      <p>This page is under construction!!!</p>
      <img src="under_construction.gif">
    `;
  }

  if (push) {
    // Update browser URL on click (no reload)
    history.pushState({}, "", url);
  }

  setActiveLink(url);

  document.dispatchEvent(new Event("DOMContentLoaded")); // Re-run any DOMContentLoaded logic for new content
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (!link) return;

  const url = link.getAttribute("href");

  // Ignore external links
  if (url.startsWith("http") || url.startsWith("mailto:")) return;

  e.preventDefault();
  loadPage(url);
});

window.addEventListener("popstate", () => {
  loadPage(location.pathname, { push: false });
});

document.querySelector('.futurama').addEventListener('click', () => {
  window.open('https://www.youtube.com/watch?v=edCqF_NtpOQ', '_blank').focus();
});