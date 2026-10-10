const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    siteNav.classList.remove("is-open");
  }
});

const galleryItems = [...document.querySelectorAll(".gallery-item")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const visibleCount = document.querySelector("#visible-count");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let shown = 0;

    galleryItems.forEach((item) => {
      const isVisible = filter === "all" || item.dataset.category === filter;
      item.hidden = !isVisible;
      shown += Number(isVisible);
    });

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    visibleCount.textContent = String(shown).padStart(2, "0");
  });
});

const bookingForm = document.querySelector("#booking-form");
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const name = formData.get("name");
  const service = formData.get("service");
  const date = formData.get("date") || "Flexible";
  const inspiration = formData.get("inspiration") || "No extra details yet";
  const message = `Hi Vishwa,\n\nI'd like to book ${service}.\nIdeal date: ${date}\n\nA little about my idea: ${inspiration}\n\nThanks,\n${name}`;
  const whatsappUrl = new URL("https://wa.me/919081829873");
  whatsappUrl.searchParams.set("text", message);
  window.location.href = whatsappUrl.toString();
});

const shareButton = document.querySelector(".nav-share");
if (shareButton) {
  const shareData = {
    title: "Keshav Nail Art",
    text: "See beautiful nail art ideas and book an appointment with Keshav Nail Art.",
    url: window.location.href
  };

  shareButton.addEventListener("click", async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
        shareButton.textContent = "Link copied";
        setTimeout(() => {
          shareButton.textContent = "Share";
        }, 1800);
        return;
      }

      window.prompt("Copy this link:", window.location.href);
    } catch (error) {
      console.warn("Share failed", error);
    }
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();