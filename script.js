const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
});
navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add("playing");
      musicLabel.textContent = "MUSIC: ON";
      musicToggle.setAttribute("aria-label", "Matikan musik latar");
    } catch (error) {
      musicLabel.textContent = "ADD music.mp3";
      musicToggle.title = "Tambahkan file music.mp3 ke folder website terlebih dahulu.";
    }
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
    musicLabel.textContent = "MUSIC: OFF";
    musicToggle.setAttribute("aria-label", "Aktifkan musik latar");
  }
});


// SAN premium motion: scroll progress, gentle cursor lighting, and 3D logo response.
const progressBar = document.getElementById("scrollProgress");
const cursorGlow = document.getElementById("cursorGlow");
const heroArt = document.getElementById("heroArt");
const logoStage = document.getElementById("logoStage");
const logoDisc = document.getElementById("logoDisc");
let scrollTicking = false;

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  scrollTicking = false;
}
window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollProgress);
    scrollTicking = true;
  }
}, { passive: true });
updateScrollProgress();

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
  if (cursorGlow && event.pointerType === "mouse") {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = "1";
  }
}, { passive: true });

if (heroArt && logoStage && logoDisc && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  heroArt.addEventListener("pointermove", (event) => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    logoStage.style.transform = `translate3d(${x * 9}px, ${y * 7 - 4}px, 0) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    logoDisc.style.transform = `rotateX(${9 - y * 13}deg) rotateY(${-15 + x * 20}deg)`;
  });
  heroArt.addEventListener("pointerleave", () => {
    logoStage.style.transform = "";
    logoDisc.style.transform = "";
  });
}

const revealItems = document.querySelectorAll(".section-heading, .about-card, .work-card, .social-card, .contact-panel");
revealItems.forEach(item => item.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}
