// ---- Mobile nav toggle ----
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ---- Accessibility widget ----
// Self-built (not a third-party overlay) — see README for why.
(function () {
  var STORAGE_KEY = "a11y-prefs";
  var root = document.documentElement;
  var toggleBtn = document.getElementById("a11yToggle");
  var panel = document.getElementById("a11yPanel");
  var resetBtn = document.getElementById("a11yReset");
  var defaults = {
    textStep: 0,
    contrast: false,
    dyslexia: false,
    motion: false,
    underline: false,
  };

  function loadPrefs() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw
        ? Object.assign({}, defaults, JSON.parse(raw))
        : Object.assign({}, defaults);
    } catch (e) {
      return Object.assign({}, defaults);
    }
  }
  function savePrefs(p) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch (e) {}
  }
  function applyPrefs(p) {
    root.classList.remove("a11y-text-1", "a11y-text-2", "a11y-text-3");
    if (p.textStep > 0) root.classList.add("a11y-text-" + p.textStep);
    root.classList.toggle("a11y-contrast", !!p.contrast);
    root.classList.toggle("a11y-dyslexia", !!p.dyslexia);
    root.classList.toggle("a11y-reduce-motion", !!p.motion);
    root.classList.toggle("a11y-underline-links", !!p.underline);
    panel.querySelectorAll("[data-a11y-toggle]").forEach(function (input) {
      input.checked = !!p[input.dataset.a11yToggle];
    });
  }

  var prefs = loadPrefs();
  applyPrefs(prefs);

  toggleBtn.addEventListener("click", function () {
    var open = !panel.hasAttribute("hidden");
    if (open) {
      panel.setAttribute("hidden", "");
      toggleBtn.setAttribute("aria-expanded", "false");
    } else {
      panel.removeAttribute("hidden");
      toggleBtn.setAttribute("aria-expanded", "true");
    }
  });

  document.addEventListener("click", function (e) {
    if (
      !panel.hasAttribute("hidden") &&
      !panel.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      panel.setAttribute("hidden", "");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hasAttribute("hidden")) {
      panel.setAttribute("hidden", "");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.focus();
    }
  });

  panel.querySelectorAll("[data-a11y-action]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var action = btn.dataset.a11yAction;
      if (action === "text-increase")
        prefs.textStep = Math.min(3, prefs.textStep + 1);
      if (action === "text-decrease")
        prefs.textStep = Math.max(0, prefs.textStep - 1);
      if (action === "text-reset") prefs.textStep = 0;
      savePrefs(prefs);
      applyPrefs(prefs);
    });
  });

  panel.querySelectorAll("[data-a11y-toggle]").forEach(function (input) {
    input.addEventListener("change", function () {
      prefs[input.dataset.a11yToggle] = input.checked;
      savePrefs(prefs);
      applyPrefs(prefs);
    });
  });

  resetBtn.addEventListener("click", function () {
    prefs = Object.assign({}, defaults);
    savePrefs(prefs);
    applyPrefs(prefs);
  });
})();
