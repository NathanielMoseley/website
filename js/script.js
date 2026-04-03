/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/script.js"
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
() {

eval("{document.head.appendChild(document.createElement(\"base\")).setAttribute(\"href\", \n  document.currentScript.src.replace(new RegExp(\"/js/script(?:\\\\..{8})?\\\\.js\"), \"/\")\n);\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  // Fake visitor counter using localStorage\n  let visits = localStorage.getItem(\"visits\") || 123;\n  visits++;\n  localStorage.setItem(\"visits\", visits);\n\n  const counter = document.getElementById(\"count\");\n  if (!counter) return;\n  counter.textContent = visits.toString().padStart(6, \"0\");\n});\n\n// Mystery button (progressive enhancement)\ndocument.getElementById(\"mysteryBtn\")?.addEventListener(\"click\", () => {\n  alert(\"You found nothing. Or did you?\");\n});\n\n// Subtle performance trick: lazy load images\ndocument.querySelectorAll(\"img\").forEach(img => {\n  img.loading = \"lazy\";\n});\n\nfunction setActiveLink(url) {\n  document.querySelectorAll(\"#sidebar a\").forEach(a => {\n    if (a.getAttribute(\"href\") === url) {\n      a.closest('.box').classList.add(\"active\");\n    } else {\n      a.closest('.box')?.classList.remove(\"active\");\n    }\n  });\n}\n\nasync function loadPage(url, { push = true } = {}) {\n  try {\n    const response = await fetch(url);\n    const text = await response.text();\n\n    // Parse returned HTML\n    const parser = new DOMParser();\n    const doc = parser.parseFromString(text, \"text/html\");\n\n    const newHeader = doc.querySelector(\"#header\");\n    const newContent = doc.querySelector(\"#content\");\n\n    if (!newContent) {\n      throw new Error(\"No #content found in \" + url);\n    }\n\n    if (newHeader) {\n      document.querySelector(\"#header\").innerHTML = newHeader.innerHTML;\n    }\n    // Replace current content\n    document.querySelector(\"#content\").innerHTML = newContent.innerHTML;\n  } catch (err) {\n    console.error(err);\n\n    // Very authentic 90s fallback 😄\n    document.querySelector(\"#content\").innerHTML = `\n      <h2>404!!!</h2>\n      <p>This page is under construction!!!</p>\n      <img src=\"under_construction.gif\">\n    `;\n  }\n\n  if (push) {\n    // Update browser URL on click (no reload)\n    history.pushState({}, \"\", url);\n  }\n\n  setActiveLink(url);\n\n  document.dispatchEvent(new Event(\"DOMContentLoaded\")); // Re-run any DOMContentLoaded logic for new content\n}\n\ndocument.addEventListener(\"click\", (e) => {\n  const link = e.target.closest(\"a\");\n\n  if (!link) return;\n\n  const url = link.getAttribute(\"href\");\n\n  // Ignore external links\n  if (url.startsWith(\"http\") || url.startsWith(\"mailto:\")) return;\n\n  e.preventDefault();\n  loadPage(url);\n});\n\nwindow.addEventListener(\"popstate\", () => {\n  loadPage(location.pathname, { push: false });\n});\n\ndocument.querySelector('q')?.addEventListener('click', (e) => {\n  window.open(e.target.getAttribute('cite'), '_blank').focus();\n});\n\n//# sourceURL=webpack://nmoseley-website/./src/js/script.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/script.js"]();
/******/ 	
/******/ })()
;