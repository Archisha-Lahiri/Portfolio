const revealPortrait = document.querySelector(".reveal-portrait");

if (revealPortrait) {
  const backImage = revealPortrait.querySelector(".portrait-back");
  const revealPoints = [];
  const maxRevealPoints = 15;

  revealPortrait.querySelectorAll(".portrait-image").forEach((image) => {
    if (image.complete && image.naturalWidth > 0) {
      image.classList.add("is-loaded");
    }

    image.addEventListener("load", () => {
      image.classList.add("is-loaded");
      revealPortrait.classList.add("has-photos");
    });
  });

  const moveReveal = (event) => {
    const rect = revealPortrait.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;
    const x = point.clientX - rect.left;
    const y = point.clientY - rect.top;

    revealPortrait.style.setProperty("--reveal-x", `${x}px`);
    revealPortrait.style.setProperty("--reveal-y", `${y}px`);

    revealPoints.push({ x, y });
    if (revealPoints.length > maxRevealPoints) {
      revealPoints.shift();
    }

    if (backImage) {
      const mask = revealPoints
        .map((entry, index) => {
          const age = (index + 1) / revealPoints.length;
          const radius = Math.round(44 + age * 70);
          return `radial-gradient(circle ${radius}px at ${entry.x}px ${entry.y}px, #000 0 62%, transparent 66%)`;
        })
        .join(", ");

      backImage.style.webkitMaskImage = mask;
      backImage.style.maskImage = mask;
    }

    revealPortrait.classList.add("is-revealing");
  };

  const clearReveal = () => {
    revealPoints.length = 0;
    revealPortrait.classList.remove("is-revealing");

    if (backImage) {
      backImage.style.webkitMaskImage = "";
      backImage.style.maskImage = "";
    }
  };

  revealPortrait.addEventListener("pointermove", moveReveal);
  revealPortrait.addEventListener("pointerenter", moveReveal);
  revealPortrait.addEventListener("pointerleave", clearReveal);
  revealPortrait.addEventListener("touchstart", moveReveal, { passive: true });
  revealPortrait.addEventListener("touchmove", moveReveal, { passive: true });
  revealPortrait.addEventListener("touchend", clearReveal);
}
