(function () {
  var canvas = document.getElementById("startrack");
  if (!canvas || !canvas.getContext) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ctx = canvas.getContext("2d");
  var cache = document.createElement("canvas");
  var cacheCtx = cache.getContext("2d", { alpha: true });
  var raf = 0;
  var running = false;
  var drawTimes = 0;
  var longside = 1;
  var resizeTimer = 0;

  function rand(min, max) {
    return min + Math.round(Math.random() * (max - min));
  }

  function lightTheme() {
    return document.documentElement.dataset.theme === "light";
  }

  function starColor() {
    if (lightTheme()) {
      return (
        "rgba(" +
        rand(50, 110) +
        "," +
        rand(50, 100) +
        "," +
        rand(60, 110) +
        "," +
        rand(18, 55) / 100 +
        ")"
      );
    }
    return (
      "rgba(" +
      rand(140, 255) +
      "," +
      rand(140, 255) +
      "," +
      rand(150, 255) +
      "," +
      rand(30, 100) / 100 +
      ")"
    );
  }

  function paintCache(count) {
    cacheCtx.clearRect(0, 0, cache.width, cache.height);
    var i = count;
    while (i--) {
      cacheCtx.beginPath();
      cacheCtx.arc(
        rand(-cache.width, cache.width),
        rand(-cache.height, cache.height),
        1.2,
        0,
        Math.PI * 2,
        true
      );
      cacheCtx.fillStyle = starColor();
      cacheCtx.fill();
    }
  }

  function frame() {
    ctx.drawImage(cache, -cache.width / 2, -cache.height / 2);
    drawTimes += 1;
    if (drawTimes > 400 && drawTimes % 8 === 0) {
      ctx.fillStyle = lightTheme() ? "rgba(243,239,232,.06)" : "rgba(0,0,0,.04)";
      ctx.fillRect(-longside * 3, -longside * 3, longside * 6, longside * 6);
    }
    ctx.rotate((0.025 * Math.PI) / 180);
  }

  function loop() {
    if (!running) return;
    frame();
    raf = window.requestAnimationFrame(loop);
  }

  function setup() {
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if (!width || !height) return;

    running = false;
    if (raf) {
      window.cancelAnimationFrame(raf);
      raf = 0;
    }

    var ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    longside = Math.max(canvas.width, canvas.height);
    cache.width = Math.floor(longside * 2.2);
    cache.height = Math.floor(longside * 2.2);

    var count = reduce ? 2800 : width < 720 ? 6000 : 14000;
    paintCache(count);

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.fillStyle = lightTheme() ? "rgb(243,239,232)" : "rgb(20,20,20)";
    ctx.fillRect(0, 0, width, height);
    ctx.setTransform(1, 0, 0, 1, canvas.width, 0);
    ctx.lineCap = "round";
    drawTimes = 0;
    ctx.drawImage(cache, -cache.width / 2, -cache.height / 2);

    if (!reduce && !document.hidden) {
      running = true;
      raf = window.requestAnimationFrame(loop);
    }
  }

  document.addEventListener("visibilitychange", function () {
    if (reduce) return;
    if (document.hidden) {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      return;
    }
    if (!running) {
      running = true;
      raf = window.requestAnimationFrame(loop);
    }
  });

  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(setup, 200);
  });

  window.addEventListener("themechange", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(setup, 40);
  });

  if (document.readyState === "complete") setup();
  else window.addEventListener("load", setup);
})();
