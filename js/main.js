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
    "Happy 2nd Anniversary Nengnya Aku,",
    "Kadang aku masih nggak menyangka kalau perjalanan kita bisa sampai di titik ini. Berawal dari Leo Bot saling Love dan ngobrol di Telegram, Aku inget banget kita bahas seblak, habis itu entah kenapa kamu mau ngasih nomor kamu ke aku padahal baru kenal sepenuhnya, dan sampai akhirnya sampe sekarang udah 2 tahun kita pacaran.",
    "Sudah 2 tahun berlalu, dan kita sudah di titik ini untuk menuju hal yang lebih serius, aku sangat bangga sama kamu bisa kuat dan selalu sabar bisa melewati segala masalah yang sudah kita lewati.❤️❤️❤️.",
    "Selamat 2tahun ini aku sangat² berterimakasih sama kamu, dan aku minta maaf yang selalu banyak buat kamu nangis ataupun kecewa, maaf kalau aku bukan sosok manusia yang begitu sempurna atau sosok lelaki yang kamu idamkan, lepas dari itu aku sungguh² selalu aku usahakan buat kamu, apapun itu selagi aku mampu.🥺.",
    "Banyak hal yang aku tau tentang dirimu mau dari kelebihan ataupun kekurangan, semoga kedepanya berjalan sesuai yang kita harapkan, dan semoga setiap ada masalah atau bencana yang menimpa kita, kita bisa melewati bersama semuanya.🤲🏻.",
    "Terimakasih banyakk.",
    "I love you❤️❤️❤️,\nGilang Ramdan ♡"
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
