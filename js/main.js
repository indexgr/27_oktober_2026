/* Main interactions, music control, scroll reveals, and the private letter reveal. */
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const music = $("backgroundMusic");
  const musicToggle = $("musicToggle");
  const musicLabel = $("musicLabel");
  const toast = $("toast");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 3200);
  }

  // Decorative stars are generated locally, with no external library.
  const starfield = document.querySelector(".starfield");
  if (starfield) {
    const count = window.matchMedia("(max-width: 680px)").matches ? 55 : 100;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--duration", `${2.5 + Math.random() * 4.5}s`);
      star.style.animationDelay = `${Math.random() * -7}s`;
      if (Math.random() > .82) {
        star.style.width = "3px";
        star.style.height = "3px";
      }
      fragment.appendChild(star);
    }
    starfield.appendChild(fragment);
  }

  // Reveal sections as the visitor scrolls.
  const revealSections = document.querySelectorAll(".reveal-section");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealSections.forEach(section => revealObserver.observe(section));
  } else {
    revealSections.forEach(section => section.classList.add("is-visible"));
  }

  $("startStory")?.addEventListener("click", () => {
    // Unlock scrolling only after the visitor presses Start our story.
    document.documentElement.classList.remove("intro-locked");
    document.body.classList.remove("intro-locked");

    // Begin the story and try to start music from this user gesture.
    $("our-time")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (music && music.paused) {
      music.play().then(() => setMusicState(true)).catch(() => {
        setMusicState(false);
        showToast("Musik belum tersedia. Tambahkan assets/audio/teman-hidup.mp3.");
      });
    }
  });

  function setMusicState(isPlaying) {
    if (musicToggle) {
      musicToggle.classList.toggle("is-playing", isPlaying);
      musicToggle.setAttribute("aria-pressed", String(isPlaying));
    }
    if (musicLabel) musicLabel.textContent = isPlaying ? "Pause our song" : "Play our song";
  }

  musicToggle?.addEventListener("click", () => {
    if (!music) return;
    if (music.paused) {
      music.play().then(() => setMusicState(true)).catch(() => {
        setMusicState(false);
        showToast("Tambahkan file assets/audio/teman-hidup.mp3 terlebih dahulu.");
      });
    } else {
      music.pause();
      setMusicState(false);
    }
  });
  music?.addEventListener("ended", () => setMusicState(false));
  music?.addEventListener("pause", () => setMusicState(false));
  music?.addEventListener("play", () => setMusicState(true));

  const letter = $("loveLetter");
  const letterBody = $("letterBody");
  const openLetter = $("openLetter");
  const replayLetter = $("replayLetter");
  const paragraphs = [
    "Sayang,",
    "Kadang aku masih nggak menyangka kalau perjalanan kita bisa sampai di titik ini. Dari obrolan sederhana tentang seblak di Telegram, lanjut ke WhatsApp, sampai akhirnya kita punya cerita yang begitu banyak untuk dikenang. Dulu mungkin kita nggak pernah membayangkan sejauh apa langkah ini akan membawa kita.",
    "Kita pernah punya awal, pernah kehilangan arah, lalu menjalani waktu sebagai dua orang yang saling asing. Tujuh bulan itu menjadi bagian dari perjalanan yang nggak mudah. Tapi hari ini, saat melihat kita kembali berjalan bersama, aku merasa bersyukur karena hidup memberi kita kesempatan untuk menulis bab yang baru.",
    "Terima kasih, Ayu, karena sudah hadir kembali di hidupku. Terima kasih untuk setiap waktu yang kamu luangkan, untuk setiap percakapan, tawa, perhatian, dan kenangan yang kita kumpulkan. Terima kasih karena sampai hari ini kita masih bisa saling mengenal, belajar memahami, dan menciptakan cerita kita sendiri.",
    "Aku tahu hubungan bukan cuma tentang hari-hari yang indah. Ada hal yang perlu dipelajari, ada perbedaan yang perlu dipahami, dan ada usaha yang harus terus dijaga. Aku nggak berharap semuanya selalu sempurna. Aku cuma bersyukur karena sekarang kita punya kesempatan untuk menjalani semuanya dengan lebih dewasa dan lebih menghargai satu sama lain.",
    "Nggak terasa, sekarang kita sudah sampai di dua tahun sejak kita memilih untuk bersama lagi, dan sudah melewati enam belas pertemuan yang menjadi bagian dari cerita kita. Mungkin buat orang lain angka itu sederhana, tapi buatku setiap momen punya arti karena ada kamu di dalamnya.",
    "Semoga ke depannya kita masih bisa mengumpulkan banyak cerita baru—mengunjungi tempat yang belum pernah kita datangi, tertawa karena hal-hal kecil, saling menguatkan saat hari terasa berat, dan terus menemukan alasan untuk bersyukur. Aku ingin kita selalu ingat bahwa kesempatan kedua ini adalah sesuatu yang berharga.",
    "Happy 2nd anniversary, Sayang. Terima kasih sudah menjadi bagian dari hidupku dan perjalanan yang sedang kita bangun. Kalau suatu hari nanti kita melihat kembali halaman ini, semoga kita bisa tersenyum dan berkata bahwa kita sudah melewati banyak hal dengan hati yang tetap mau berusaha.",
    "Dengan penuh rasa syukur dan sayang,\nGilang ♡"
  ];

  let typingTimer = null;
  function typeLetter() {
    window.clearInterval(typingTimer);
    if (!letterBody) return;
    letterBody.innerHTML = "";
    let paragraphIndex = 0;
    let characterIndex = 0;
    let currentParagraph = null;
    let content = paragraphs[0];

    function typeNext() {
      if (paragraphIndex >= paragraphs.length) {
        window.clearInterval(typingTimer);
        typingTimer = null;
        return;
      }
      if (!currentParagraph) {
        currentParagraph = document.createElement("p");
        letterBody.appendChild(currentParagraph);
        content = paragraphs[paragraphIndex];
        characterIndex = 0;
      }
      if (characterIndex < content.length) {
        currentParagraph.textContent += content.charAt(characterIndex);
        characterIndex++;
        // Slightly faster than a literal typewriter so the letter remains comfortable to read.
        return;
      }
      paragraphIndex++;
      currentParagraph = null;
      if (paragraphIndex >= paragraphs.length) {
        window.clearInterval(typingTimer);
        typingTimer = null;
        return;
      }
      // Brief pause between paragraphs.
      window.clearInterval(typingTimer);
      typingTimer = window.setTimeout(() => {
        typingTimer = window.setInterval(typeNext, 17);
      }, 330);
    }
    typingTimer = window.setInterval(typeNext, 17);
  }

  function revealLetter() {
    if (!letter) return;
    letter.hidden = false;
    openLetter?.classList.add("is-open");
    if (openLetter) openLetter.innerHTML = "<span>Letter opened</span><span aria-hidden=\"true\">♡</span>";
    typeLetter();
    window.setTimeout(() => letter.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  }

  openLetter?.addEventListener("click", revealLetter);
  replayLetter?.addEventListener("click", typeLetter);
  $("backToLetter")?.addEventListener("click", () => {
    letter?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
