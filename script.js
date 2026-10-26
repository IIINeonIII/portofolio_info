/* ==========================================================================
   Cursor mist near the hero quote
   ========================================================================== */
const quote = document.querySelector(".hero-quote");

if (quote) {
    let lastParticleTime = 0;

    document.addEventListener("mousemove", (event) => {
        const rect = quote.getBoundingClientRect();
        const margin = 55;

        const isNearQuote =
            event.clientX >= rect.left - margin &&
            event.clientX <= rect.right + margin &&
            event.clientY >= rect.top - margin &&
            event.clientY <= rect.bottom + margin;

        if (!isNearQuote) return;

        // Limit particle creation for smoother performance.
        const now = Date.now();

        if (now - lastParticleTime < 45) return;

        lastParticleTime = now;

        const particle = document.createElement("span");
        particle.className = "mist-particle";

        const size = 6 + Math.random() * 14;
        const driftX = (Math.random() - 0.5) * 65;
        const driftY = -10 - Math.random() * 55;

        particle.style.left = `${event.clientX}px`;
        particle.style.top = `${event.clientY}px`;
        particle.style.setProperty("--mist-size", `${size}px`);
        particle.style.setProperty("--mist-x", `${driftX}px`);
        particle.style.setProperty("--mist-y", `${driftY}px`);

        document.body.appendChild(particle);

        particle.addEventListener("animationend", () => {
            particle.remove();
        }, { once: true });
    });
}

/* ==========================================================================
   Featured projects carousel
   ========================================================================== */
(() => {
    const viewport = document.querySelector(".projects-grid");
    const track = document.querySelector(".projects-track");
    const previousButton = document.querySelector("#projects-prev");
    const nextButton = document.querySelector("#projects-next");

    if (!viewport || !track || !previousButton || !nextButton) {
        return;
    }

    const cards = Array.from(track.querySelectorAll(".project-card"));

    if (cards.length === 0) return;

    let currentIndex = 0;

    function getVisibleCount() {
        return window.matchMedia("(max-width: 700px)").matches ? 1 : 2;
    }

    function updateCarousel() {
        const visibleCount = getVisibleCount();
        const maxIndex = Math.max(0, cards.length - visibleCount);

        currentIndex = Math.min(currentIndex, maxIndex);

        // Measure from the first card, so the page's own left offset
        // does not shift the track.
        const offset = cards[currentIndex].offsetLeft - cards[0].offsetLeft;

        track.style.transform = `translateX(-${offset}px)`;

        previousButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;
    }

    previousButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener("click", () => {
        const maxIndex = Math.max(0, cards.length - getVisibleCount());

        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();
})();
