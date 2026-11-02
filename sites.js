(function () {
  var section = document.getElementById("sites");
  var list = document.getElementById("site-list");
  if (!section || !list) return;

  fetch("sites.json")
    .then(function (response) {
      if (!response.ok) throw new Error("sites");
      return response.json();
    })
    .then(function (sites) {
      if (!Array.isArray(sites)) return;
      sites.forEach(function (site) {
        if (!site || site.public === false || !site.name || !site.url) return;
        var host;
        try {
          host = new URL(site.url).host;
        } catch (error) {
          return;
        }
        var item = document.createElement("li");
        var link = document.createElement("a");
        var name = document.createElement("span");
        var hostName = document.createElement("span");
        link.href = site.url;
        name.textContent = site.name;
        hostName.className = "host";
        hostName.textContent = host;
        link.append(name, hostName);
        item.append(link);
        list.append(item);
      });
      if (list.children.length) section.hidden = false;
    })
    .catch(function () {});
})();
