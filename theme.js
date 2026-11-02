(function () {
  var button = document.getElementById("theme-toggle");
  if (!button) return;

  var colors = { light: "#f3efe8", dark: "#141414" };

  function paint() {
    var theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    var light = theme === "light";
    button.textContent = light ? "深色" : "浅色";
    button.setAttribute("aria-label", light ? "切换到深色" : "切换到浅色");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", colors[theme]);
  }

  button.addEventListener("click", function () {
    var next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    var root = document.documentElement;
    root.dataset.theme = next;
    root.style.colorScheme = next;
    root.style.backgroundColor = colors[next];
    try {
      localStorage.setItem("theme", next);
    } catch (error) {}
    paint();
    window.dispatchEvent(new Event("themechange"));
  });

  paint();
})();
