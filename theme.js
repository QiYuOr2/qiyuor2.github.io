(function () {
  var button = document.getElementById("theme-toggle");
  if (!button) return;

  var colors = { light: "#fbfbf9", dark: "#111214" };
  var themeColors = { light: "#f1f4ef", dark: "#111214" };

  function setThemeColor(color) {
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    if (!metas.length) return;
    metas[0].setAttribute("content", color);
    metas[0].removeAttribute("media");
    for (var i = metas.length - 1; i > 0; i--) {
      metas[i].parentNode.removeChild(metas[i]);
    }
  }

  function current() {
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
  }

  function apply(theme) {
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    root.style.backgroundColor = colors[theme];
    if (document.body) document.body.style.backgroundColor = colors[theme];
    setThemeColor(themeColors[theme]);
    var toDark = theme === "dark";
    button.setAttribute("aria-label", toDark ? "切换到浅色" : "切换到深色");
    button.setAttribute("title", toDark ? "切换到浅色" : "切换到深色");
  }

  button.addEventListener("click", function (event) {
    var next = current() === "light" ? "dark" : "light";
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function commit() {
      apply(next);
      try {
        localStorage.setItem("theme", next);
      } catch (error) {}
    }

    if (!document.startViewTransition || reduce) {
      commit();
      return;
    }

    var x = event.clientX;
    var y = event.clientY;
    var endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    var transition = document.startViewTransition(function () {
      commit();
    });
    transition.ready.then(function () {
      document.documentElement.animate(
        {
          clipPath: [
            "circle(0px at " + x + "px " + y + "px)",
            "circle(" + endRadius + "px at " + x + "px " + y + "px)",
          ],
        },
        {
          duration: 400,
          easing: "ease-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  });

  apply(current());
})();
