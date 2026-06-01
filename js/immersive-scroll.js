(() => {
  if (!window.gsap || !window.ScrollTrigger || !window.Lenis) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("motion-ready");

  if (!reduceMotion) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");

        if (id && id.length > 1) {
          event.preventDefault();
          lenis.scrollTo(id, { offset: -60 });
        }
      });
    });
  }

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray(".reveal-left").forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
      },
    });
  });

  gsap.utils.toArray(".reveal-right").forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
      },
    });
  });

  gsap.utils.toArray("[data-stagger]").forEach((group) => {
    gsap.from(group.children, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: group,
        start: "top 80%",
      },
    });
  });

  gsap.utils.toArray("[data-speed]").forEach((element) => {
    const speed = parseFloat(element.dataset.speed) || 0.2;

    gsap.to(element, {
      yPercent: -speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  gsap.utils.toArray(".pin-section").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
    });
  });

  const hero = document.querySelector(".hero, #hero, [data-hero]");

  if (hero) {
    gsap.to(hero, {
      scale: 0.92,
      opacity: 0.6,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
})();
