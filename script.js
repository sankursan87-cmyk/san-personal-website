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
