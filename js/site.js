async function loadPartial(id, file) {
  const target = document.getElementById(id);
  if (!target) return;

  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`${file} could not be loaded`);
    }

    target.innerHTML = await response.text();

    // Initialise the mobile menu once the header has loaded
    if (id === "site-header") {
      const toggle = target.querySelector(".menu-toggle");
      const nav = target.querySelector(".nav-links");

      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          nav.classList.toggle("open");
          toggle.setAttribute(
            "aria-expanded",
            nav.classList.contains("open")
          );
        });
      }
    }

  } catch (error) {
    console.error(error);
  }
}

Promise.all([
  loadPartial("site-header", "header.html"),
  loadPartial("site-footer", "footer.html")
]);