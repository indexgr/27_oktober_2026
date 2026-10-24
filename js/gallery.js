
/* ==========================================
   GALLERY / SLIDESHOW 16 FOTO
   Our 2nd Anniversary — Gilang & Ayu
   ========================================== */

(() => {
  "use strict";

  // DAFTAR 16 FOTO KENANGAN
  // Pastikan semua file foto tersedia di assets/images/
  const memories = [
    {
      image: "assets/images/memory-01.jpeg",
      alt: "Foto kenangan pertama kita",
      eyebrow: "OUR FIRST MEMORY",
      title: "First Time Meet",
      description: "Di hari pertama kita malu banget sampai jatuh pas naik motor. 😭"
    },
    {
      image: "assets/images/memory-02.jpeg",
      alt: "Foto kenangan kedua kita",
      eyebrow: "A LITTLE MOMENT",
      title: "A Beautiful Day",
      description: "Satu hari sederhana yang menjadi bagian dari cerita kita."
    },
    {
      image: "assets/images/memory-03.jpeg",
      alt: "Foto kenangan ketiga kita",
      eyebrow: "JUST THE TWO OF US",
      title: "With You",
      description: "Bersamamu, hal sederhana pun terasa istimewa."
    },
    {
      image: "assets/images/memory-04.jpeg",
      alt: "Foto kenangan keempat kita",
      eyebrow: "A MOMENT TO REMEMBER",
      title: "Our Little Story",
      description: "Satu lagi kenangan yang ingin selalu aku simpan."
    },
    {
      image: "assets/images/memory-05.jpeg",
      alt: "Foto kenangan kelima kita",
      eyebrow: "FIVE OF OUR MEMORIES",
      title: "Another Chapter",
      description: "Setiap momen bersamamu punya ceritanya sendiri."
    },
    {
      image: "assets/images/memory-06.jpeg",
      alt: "Foto kenangan keenam kita",
      eyebrow: "YOU AND ME",
      title: "My Favorite Person",
      description: "Terima kasih sudah menjadi bagian dari hari-hariku."
    },
    {
      image: "assets/images/memory-07.jpeg",
      alt: "Foto kenangan ketujuh kita",
      eyebrow: "LITTLE HAPPINESS",
      title: "A Happy Memory",
      description: "Momen kecil yang selalu punya tempat di hatiku."
    },
    {
      image: "assets/images/memory-08.jpeg",
      alt: "Foto kenangan kedelapan kita",
      eyebrow: "SIDE BY SIDE",
      title: "Together With You",
      description: "Aku senang bisa melewati banyak hal bersamamu."
    },
    {
      image: "assets/images/memory-09.jpeg",
      alt: "Foto kenangan kesembilan kita",
      eyebrow: "HALF OF THE STORY",
      title: "More Memories",
      description: "Cerita kita masih panjang, dan aku ingin terus menjalaninya denganmu."
    },
    {
      image: "assets/images/memory-10.jpeg",
      alt: "Foto kenangan kesepuluh kita",
      eyebrow: "TEN LITTLE MOMENTS",
      title: "A Day With You",
      description: "Hari biasa terasa berbeda saat ada kamu."
    },
    {
      image: "assets/images/memory-11.jpeg",
      alt: "Foto kenangan kesebelas kita",
      eyebrow: "CLOSE TO MY HEART",
      title: "Precious Time",
      description: "Waktu yang kita habiskan bersama selalu berarti."
    },
    {
      image: "assets/images/memory-12.jpeg",
      alt: "Foto kenangan kedua belas kita",
      eyebrow: "OUR JOURNEY",
      title: "Growing Together",
      description: "Kita belajar, bertumbuh, dan saling mengenal lebih jauh."
    },
    {
      image: "assets/images/memory-13.jpeg",
      alt: "Foto kenangan ketiga belas kita",
      eyebrow: "A STORY OF US",
      title: "Still Choosing You",
      description: "Di antara banyak hal, aku masih ingin memilih kamu."
    },
    {
      image: "assets/images/memory-14.jpeg",
      alt: "Foto kenangan keempat belas kita",
      eyebrow: "ANOTHER SWEET MEMORY",
      title: "You Make Me Smile",
      description: "Semoga kita selalu punya alasan untuk tersenyum bersama."
    },
    {
      image: "assets/images/memory-15.jpeg",
      alt: "Foto kenangan kelima belas kita",
      eyebrow: "ALMOST TWO YEARS",
      title: "Our Beautiful Journey",
      description: "Terima kasih sudah menjadi bagian dari perjalanan ini."
    },
    {
      image: "assets/images/memory-16.jpeg",
      alt: "Kenangan keenam belas kita",
      eyebrow: "OUR SECOND ANNIVERSARY",
      title: "Two Years With You",
      description: "Dua tahun perjalanan kita, dan aku masih ingin memilihmu."
    }
  ];

  // AMBIL ELEMEN DARI index.html
  const image = document.getElementById("slideshowImage");
  const counter = document.getElementById("imageCounter");
  const eyebrow = document.getElementById("memoryEyebrow");
  const title = document.getElementById("memoryTitle");
  const description = document.getElementById("memoryDescription");
  const dots = document.getElementById("galleryDots");
  const previousButton = document.getElementById("previousMemory");
  const nextButton = document.getElementById("nextMemory");
  const gallery = document.getElementById("memories");

  // Pastikan elemen galeri tersedia
  if (!image || !counter || !dots) {
    console.error(
      "Elemen galeri tidak ditemukan. Periksa ID di index.html."
    );
    return;
  }

  let index = 0;
  let autoPlayId = null;

  // MEMBUAT TITIK NAVIGASI UNTUK 16 FOTO
  function renderDots() {
    dots.innerHTML = "";

    memories.forEach((memory, i) => {
      const button = document.createElement("button");

      button.className = "gallery-dot";
      button.type = "button";
      button.setAttribute("aria-label", `Tampilkan foto ${i + 1}`);
      button.setAttribute("aria-current", String(i === index));

      button.addEventListener("click", () => {
        showMemory(i);
        restartAutoPlay();
      });

      dots.appendChild(button);
    });
  }

  // MENAMPILKAN FOTO DAN INFORMASINYA
  function showMemory(nextIndex) {
    // Berpindah dari foto terakhir kembali ke foto pertama,
    // atau dari foto pertama ke foto terakhir.
    index = (nextIndex + memories.length) % memories.length;

    const memory = memories[index];

    // Ganti foto dengan efek transisi
    image.classList.add("changing");

    window.setTimeout(() => {
      image.onload = () => {
        image.classList.remove("changing");
      };

      image.onerror = () => {
        image.classList.remove("changing");
        console.error("Foto gagal dimuat:", memory.image);
      };

      image.src = memory.image;
      image.alt = memory.alt;
    }, 180);

    // Perbarui penghitung, misalnya 05 / 16
    counter.textContent =
      `${String(index + 1).padStart(2, "0")} / ` +
      `${String(memories.length).padStart(2, "0")}`;

    // Perbarui keterangan foto
    if (eyebrow) eyebrow.textContent = memory.eyebrow;
    if (title) title.textContent = memory.title;
    if (description) description.textContent = memory.description;

    // Perbarui titik navigasi
    renderDots();
  }

  // TOMBOL FOTO SEBELUMNYA
  previousButton?.addEventListener("click", () => {
    showMemory(index - 1);
    restartAutoPlay();
  });

  // TOMBOL FOTO BERIKUTNYA
  nextButton?.addEventListener("click", () => {
    showMemory(index + 1);
    restartAutoPlay();
  });

  // SLIDESHOW OTOMATIS SETIAP 6,5 DETIK
  function startAutoPlay() {
    if (autoPlayId !== null) return;

    autoPlayId = window.setInterval(() => {
      showMemory(index + 1);
    }, 6500);
  }

  function stopAutoPlay() {
    if (autoPlayId !== null) {
      window.clearInterval(autoPlayId);
      autoPlayId = null;
    }
  }

  function restartAutoPlay() {
    stopAutoPlay();

    // Jalankan kembali jika galeri sedang terlihat
    if (!gallery || !("IntersectionObserver" in window)) {
      startAutoPlay();
    } else if (galleryIsVisible) {
      startAutoPlay();
    }
  }

  let galleryIsVisible = false;

  // Otomatis berjalan saat galeri terlihat di layar
  if ("IntersectionObserver" in window && gallery) {
    const observer = new IntersectionObserver((entries) => {
      galleryIsVisible = entries.some(
        (entry) => entry.isIntersecting
      );

      if (galleryIsVisible) {
        startAutoPlay();
      } else {
        stopAutoPlay();
      }
    }, { threshold: 0.25 });

    observer.observe(gallery);
  } else {
    startAutoPlay();
  }

  // TAMPILKAN FOTO PERTAMA DAN 16 TITIK NAVIGASI
  renderDots();
  showMemory(0);

})();
