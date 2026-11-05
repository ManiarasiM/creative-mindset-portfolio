const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "Close" : "Menu";
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  }));
}
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll("form[data-demo-form]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const notice = form.querySelector(".notice");
    if (notice) notice.textContent = "Thank you for connecting our team will reach you soon!";
    form.reset();
  });
});


// Lightweight card tilt: enabled only for fine pointers and disabled for reduced motion.
const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (canTilt && !reduceMotion) {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 4;
      const rotateX = (0.5 - y) * 4;
      card.style.transform = `translateY(-6px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}


// Interactive Code Crew orbit: selecting an input updates the central message.
const creativeStage = document.querySelector(".creative-stage");
if (creativeStage) {
  const orbitNodes = creativeStage.querySelectorAll(".orbit-node");
  const coreTitle = creativeStage.querySelector("[data-core-title]");
  const coreMessage = creativeStage.querySelector("[data-core-message]");

  orbitNodes.forEach(node => {
    node.addEventListener("click", () => {
      orbitNodes.forEach(item => {
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
      });
      node.classList.add("is-active");
      node.setAttribute("aria-pressed", "true");
      if (coreTitle) coreTitle.textContent = node.dataset.title || "One creative vision.";
      if (coreMessage) coreMessage.textContent = node.dataset.message || "Four inputs, one shared vision.";
      creativeStage.classList.add("is-selected");
    });
  });

  // Fine-pointer parallax gives the composition a slight depth response to mouse movement.
  const canParallax = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  creativeStage.addEventListener("pointerenter", () => creativeStage.classList.add("is-hovered"));
  creativeStage.addEventListener("pointerleave", () => creativeStage.classList.remove("is-hovered"));
  creativeStage.addEventListener("pointerdown", () => creativeStage.classList.add("is-hovered"));

  if (canParallax && !reducedMotion) {
    creativeStage.addEventListener("pointermove", event => {
      const bounds = creativeStage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      creativeStage.style.setProperty("--tilt-y", `${x * 3}deg`);
      creativeStage.style.setProperty("--tilt-x", `${-y * 3}deg`);
    });
    creativeStage.addEventListener("pointerleave", () => {
      creativeStage.style.setProperty("--tilt-y", "0deg");
      creativeStage.style.setProperty("--tilt-x", "0deg");
    });
  }
}
