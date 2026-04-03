document.head.appendChild(document.createElement("base")).setAttribute("href", 
  document.currentScript.src.replace(new RegExp("/js/script(?:\\..{8})?\\.js"), "/")
);

document.addEventListener("DOMContentLoaded", () => {
  // Repeat on load new pages any binds made in here targetting dynamic #content and #header sections
  document.getElementById("mysteryBtn")?.addEventListener("click", () => {
    alert("You found nothing. Or did you?");
  });

  document.querySelector('q')?.addEventListener('click', (e) => {
    window.open(e.target.getAttribute('cite'), '_blank').focus();
  });

  // Subtle performance trick: lazy load images
  document.querySelectorAll("img").forEach(img => {
    img.loading = "lazy";
  });

  // Fake visitor counter using localStorage
  let visits = localStorage.getItem("visits") || 123;
  visits++;
  localStorage.setItem("visits", visits);

  const counter = document.getElementById("count");
  if (!counter) return;
  counter.textContent = visits.toString().padStart(6, "0");
});

function setActiveLink(url) {
  document.querySelectorAll("#sidebar a").forEach(a => {
    if (a.getAttribute("href") === url) {
      a.closest('.box').classList.add("active");
    } else {
      a.closest('.box')?.classList.remove("active");
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

    const newHeader = doc.querySelector("#header");
    const newContent = doc.querySelector("#content");

    if (!newContent) {
      throw new Error("No #content found in " + url);
    }

    if (newHeader) {
      document.querySelector("#header").innerHTML = newHeader.innerHTML;
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