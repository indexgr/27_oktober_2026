/* EDIT THIS LIST to replace the sample images, captions, and chat placeholders. */
(() => {
  "use strict";
  const memories = [
    { image: "assets/images/memory-01.svg", alt: "Placeholder kenangan pertama", eyebrow: "A MEMORY TO KEEP", title: "Little moments, held close.", description: "Ganti gambar dan teks contoh ini dengan kenangan kalian sendiri." },
    { image: "assets/images/memory-02.svg", alt: "Placeholder kenangan kedua", eyebrow: "ONE OF OUR DAYS", title: "A day worth remembering.", description: "Tambahkan cerita singkat tentang foto ini—cukup satu atau dua kalimat." },
    { image: "assets/images/memory-03.svg", alt: "Placeholder kenangan ketiga", eyebrow: "JUST US", title: "The world felt a little softer.", description: "Pilih momen yang membuatmu tersenyum setiap kali mengingatnya." },
    { image: "assets/images/memory-04.svg", alt: "Placeholder kenangan keempat", eyebrow: "CHAPTER SIXTEEN", title: "Sixteen meetings, countless memories.", description: "Di sini kamu bisa menaruh foto dari pertemuan yang paling berkesan." }
  ];

  const image = document.getElementById("slideshowImage");
  const counter = document.getElementById("imageCounter");
  const eyebrow = document.getElementById("memoryEyebrow");
  const title = document.getElementById("memoryTitle");
  const description = document.getElementById("memoryDescription");
  const dots = document.getElementById("galleryDots");
  let index = 0;
  let autoPlayId = null;

  function renderDots() {
    if (!dots) return;
    dots.innerHTML = "";
    memories.forEach((memory, i) => {
      const button = document.createElement("button");
      button.className = "gallery-dot";
      button.type = "button";
      button.setAttribute("aria-label", `Tampilkan foto ${i + 1}`);
      button.setAttribute("aria-current", String(i === index));
      button.addEventListener("click", () => showMemory(i));
      dots.appendChild(button);
    });
  }

  function showMemory(nextIndex) {
    index = (nextIndex + memories.length) % memories.length;
    const memory = memories[index];
    if (image) {
      image.classList.add("changing");
      window.setTimeout(() => {
        image.src = memory.image;
        image.alt = memory.alt;
        image.onload = () => image.classList.remove("changing");
        image.onerror = () => image.classList.remove("changing");
      }, 180);
    }
    if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;
    if (eyebrow) eyebrow.textContent = memory.eyebrow;
    if (title) title.textContent = memory.title;
    if (description) description.textContent = memory.description;
    renderDots();
  }

  document.getElementById("previousMemory")?.addEventListener("click", () => showMemory(index - 1));
  document.getElementById("nextMemory")?.addEventListener("click", () => showMemory(index + 1));
  renderDots();

  // Gentle auto-advance while the gallery is visible; manual controls remain available.
  const gallery = document.getElementById("memories");
  if ("IntersectionObserver" in window && gallery) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        if (!autoPlayId) autoPlayId = window.setInterval(() => showMemory(index + 1), 6500);
      } else if (autoPlayId) {
        window.clearInterval(autoPlayId);
        autoPlayId = null;
      }
    }, { threshold: 0.25 });
    observer.observe(gallery);
  }
})();
