/* Anniversary timers: edit relationshipStart if the date ever changes. */
(() => {
  "use strict";
  const relationshipStart = new Date("2024-10-27T00:00:00");
  const nextAnniversaryMonth = 9; // October (0-indexed)
  const nextAnniversaryDay = 27;

  const pad = (number) => String(number).padStart(2, "0");
  const setValues = (selector, values, attribute) => {
    const root = document.querySelector(selector);
    if (!root) return;
    Object.entries(values).forEach(([key, value]) => {
      const node = root.querySelector(`[${attribute}="${key}"]`);
      if (node) node.textContent = value;
    });
  };

  function updateElapsed() {
    const now = new Date();
    let diff = Math.max(0, now - relationshipStart);
    const days = Math.floor(diff / 86400000);
    diff %= 86400000;
    const hours = Math.floor(diff / 3600000);
    diff %= 3600000;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    setValues("#elapsedTimer", { days: days.toLocaleString("en-US"), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) }, "data-unit");
  }

  function getNextAnniversary(now) {
    let target = new Date(now.getFullYear(), nextAnniversaryMonth, nextAnniversaryDay, 0, 0, 0);
    if (now >= target) target = new Date(now.getFullYear() + 1, nextAnniversaryMonth, nextAnniversaryDay, 0, 0, 0);
    return target;
  }

  function updateCountdown() {
    const now = new Date();
    const currentYearAnniversary = new Date(now.getFullYear(), nextAnniversaryMonth, nextAnniversaryDay, 0, 0, 0);
    const panel = document.getElementById("anniversaryPanel");
    const eyebrow = document.getElementById("countdownEyebrow");
    const title = document.getElementById("countdownTitle");

    if (now.getMonth() === nextAnniversaryMonth && now.getDate() === nextAnniversaryDay) {
      if (eyebrow) eyebrow.textContent = "TODAY IS OUR DAY";
      if (title) title.textContent = "Happy anniversary, Sayang. ♡";
      setValues("#countdownTimer", { days: "♡", hours: "♡", minutes: "♡", seconds: "♡" }, "data-count");
      if (panel) panel.classList.add("anniversary-today");
      return;
    }
    if (now > currentYearAnniversary) {
      if (eyebrow) eyebrow.textContent = "UNTIL OUR NEXT ANNIVERSARY";
      if (title) title.textContent = "Another chapter is waiting for us.";
    }
    const target = getNextAnniversary(now);
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000);
    diff %= 86400000;
    const hours = Math.floor(diff / 3600000);
    diff %= 3600000;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    setValues("#countdownTimer", { days: days.toLocaleString("en-US"), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) }, "data-count");
  }

  function tick() { updateElapsed(); updateCountdown(); }
  tick();
  window.setInterval(tick, 1000);
})();
