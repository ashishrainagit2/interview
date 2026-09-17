(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.parentElement;
      var key = btn.getAttribute("data-filter");
      group.querySelectorAll(".filter").forEach(function (el) {
        el.classList.toggle("is-on", el === btn);
      });
      document.querySelectorAll(group.getAttribute("data-target")).forEach(function (item) {
        var tags = item.getAttribute("data-tags") || "";
        item.hidden = key !== "all" && tags.indexOf(key) === -1;
      });
    });
  });
})();
