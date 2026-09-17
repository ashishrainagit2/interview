(function () {
  var form = document.getElementById("hire-form");
  var alertBox = document.getElementById("form-alert");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var name = String(data.get("name") || "").trim();
    var email = String(data.get("email") || "").trim();
    var service = String(data.get("service") || "").trim();
    var message = String(data.get("message") || "").trim();
    var company = String(data.get("company") || "").trim();
    var budget = String(data.get("budget") || "").trim();

    if (!name || !email || !message || !service) {
      show("Please fill name, email, service, and message.");
      return;
    }

    var body = [
      "Name: " + name,
      "Email: " + email,
      "Company: " + (company || "—"),
      "Service: " + service,
      "Budget: " + (budget || "—"),
      "",
      message
    ].join("\n");

    var mailto =
      "mailto:ashish95614@gmail.com" +
      "?subject=" +
      encodeURIComponent("Work inquiry — " + service) +
      "&body=" +
      encodeURIComponent(body);

    show("Opening your email app with the message drafted.");
    window.location.href = mailto;
  });

  function show(text) {
    if (!alertBox) return;
    alertBox.textContent = text;
    alertBox.classList.add("is-visible");
  }
})();
