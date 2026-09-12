document.addEventListener("DOMContentLoaded", function () {
    const page = document.querySelector(".surprise-page");
    const openButton = document.getElementById("open-surprise-button");

    if (!page || !openButton) {
        return;
    }

    openButton.addEventListener("click", function () {
        openStory();
    });

    function openStory() {
        const opening = document.getElementById("opening-screen");

        if (!opening) {
            return;
        }

        opening.classList.add("opening-exit");

        createFloatingParticles();

        setTimeout(function () {
            showFirstMessage();
        }, 700);
    }

    function showFirstMessage() {
        page.innerHTML = `
            <section class="story-screen">

                <div class="story-glow"></div>

                <div class="story-content">

                    <p class="story-label">
                        MUTU…
                    </p>

                    <h1 class="story-title">
                        आज तिमीलाई<br>
                        <span>केही भन्न मन लाग्यो।</span>
                    </h1>

                    <div class="story-line"></div>

                    <p class="story-text">
                        धेरै ठूलो कुरा होइन।
                        <br>
                        तर मनमा राखिराख्न पनि मन लागेन।
                    </p>

                    <button
                        type="button"
                        class="story-button"
                        id="story-next-one"
                    >
                        <span>सुन्छौ?</span>
                        <span>→</span>
                    </button>

                </div>

            </section>
        `;

        animateStory();

        document
            .getElementById("story-next-one")
            .addEventListener("click", showSecondMessage);
    }

    function showSecondMessage() {
        page.innerHTML = `
            <section class="story-screen">

                <div class="story-glow"></div>

                <div class="story-content wide">

                    <p class="story-label">
                        JUST SOMETHING I NOTICED
                    </p>

                    <h1 class="story-title medium">
                        दिनभरि आफ्नो काममा
                        <br>
                        व्यस्त हुन्छु।
                    </h1>

                    <p class="story-text large">
                        हाँस्छु, बोल्छु,
                        आफ्नै दुनियाँमा हुन्छु।
                        <br><br>
                        तर कहिलेकाहीँ अचानक…
                    </p>

                    <div class="memory-word">
                        तिम्रो याद आउँछ।
                    </div>

                    <button
                        type="button"
                        class="story-button"
                        id="story-next-two"
                    >
                        <span>अनि?</span>
                        <span>→</span>
                    </button>

                </div>

            </section>
        `;

        animateStory();

        document
            .getElementById("story-next-two")
            .addEventListener("click", showThirdMessage);
    }

    function showThirdMessage() {
        page.innerHTML = `
            <section class="story-screen">

                <div class="story-glow"></div>

                <div class="story-content wide">

                    <p class="story-label">
                        THERE'S NO PARTICULAR REASON
                    </p>

                    <h1 class="story-title medium">
                        कुनै खास कारण हुँदैन।
                    </h1>

                    <p class="story-text large">
                        कुनै खास समय पनि हुँदैन।
                        <br><br>
                        बस्…
                    </p>

                    <div class="memory-word soft">
                        मनले तिमीलाई खोज्छ।
                    </div>

                    <p class="story-text">
                        अनि त्यतिबेला लाग्छ—
                        <br><br>
                        केही मान्छेहरूबाट टाढा भए पनि
                        <br>
                        मनबाट चाहिँ टाढा हुन सकिँदैन रहेछ।
                    </p>

                    <button
                        type="button"
                        class="story-button"
                        id="story-next-three"
                    >
                        <span>एउटा कुरा भनूँ?</span>
                        <span>→</span>
                    </button>

                </div>

            </section>
        `;

        animateStory();

        document
            .getElementById("story-next-three")
            .addEventListener("click", showMainMessage);
    }

    function showMainMessage() {
        page.innerHTML = `
            <section class="story-screen emotional-screen">

                <div class="emotional-glow"></div>

                <div class="story-content">

                    <p class="story-label">
                        THE ONE THING I WANTED TO SAY
                    </p>

                    <div class="heart-mark">
                        ♡
                    </div>

                    <h1 class="main-love-title">
                        Mutu,
                    </h1>

                    <div class="miss-you">
                        I miss you.
                    </div>

                    <p class="story-text emotional-text">
                        बस्।
                        <br>
                        यति सरल कुरा हो।
                    </p>

                    <p class="story-text">
                        तर कहिलेकाहीँ यस्ता सरल कुराहरू नै
                        <br>
                        भन्न सबैभन्दा गाह्रो हुँदो रहेछ।
                    </p>

                    <button
                        type="button"
                        class="story-button"
                        id="story-next-four"
                    >
                        <span>त्यसैले यो page...</span>
                        <span>→</span>
                    </button>

                </div>

            </section>
        `;

        createHeartBurst();
        animateStory();

        document
            .getElementById("story-next-four")
            .addEventListener("click", showReasonMessage);
    }

    function showReasonMessage() {
        page.innerHTML = `
            <section class="story-screen">

                <div class="story-glow"></div>

                <div class="story-content wide">

                    <p class="story-label">
                        WHY I MADE THIS
                    </p>

                    <h1 class="story-title medium">
                        यो page बनाउनुको
                        <br>
                        <span>कारण पनि त्यही हो।</span>
                    </h1>

                    <div class="quote-card">

                        <span class="quote-mark">“</span>

                        <p>
                            तिमीलाई केही भन्न मन लाग्यो,
                            <br>
                            त्यसैले शब्दहरू मात्र लेखेर
                            <br>
                            बस्न मन लागेन।
                        </p>

                        <span class="quote-mark closing">”</span>

                    </div>

                    <p class="story-text">
                        सायद तिमीले यो खोलेर
                        <br>
                        एकछिन मुस्कुराउनेछौ।
                        <br><br>
                        त्यति भए पनि पुग्छ।
                    </p>

                    <button
                        type="button"
                        class="story-button"
                        id="story-next-five"
                    >
                        <span>अन्तिम कुरा…</span>
                        <span>→</span>
                    </button>

                </div>

            </section>
        `;

        animateStory();

        document
            .getElementById("story-next-five")
            .addEventListener("click", showFinalMessage);
    }

    function showFinalMessage() {
        page.innerHTML = `
            <section class="story-screen final-screen">

                <div class="final-glow"></div>

                <div class="story-content final-content">

                    <p class="story-label">
                        FOR YOU, MUTU
                    </p>

                    <div class="final-heart">
                        ♡
                    </div>

                    <h1 class="final-title">
                        तिमीलाई थाहा छ?
                    </h1>

                    <div class="final-message">

                        <p>
                            तिमीलाई miss गर्नुको
                            <br>
                            सबैभन्दा नराम्रो कुरा
                        </p>

                        <p class="highlight-line">
                            तिमीलाई miss गरिरहेको छु
                            <br>
                            भनेर भन्न मन लाग्नु हो।
                        </p>

                        <div class="final-divider"></div>

                        <p>
                            अनि सबैभन्दा राम्रो कुरा…
                        </p>

                        <p class="highlight-line soft-highlight">
                            तिमीलाई यो कुरा
                            <br>
                            भन्न पाउनु हो।
                        </p>

                    </div>

                    <p class="final-goodbye">
                        बस्, आज यति नै।
                        <br><br>
                        आफ्नो ख्याल राख्नु, Mutu.
                    </p>

                    <div class="signature">
                        <span>Made with a little extra love.</span>
                    </div>

                </div>

            </section>
        `;

        createHeartBurst();
        createSparkleField();
        animateStory();
    }

    function animateStory() {
        const content = document.querySelector(".story-content");

        if (!content) {
            return;
        }

        requestAnimationFrame(function () {
            content.classList.add("story-visible");
        });
    }

    function createFloatingParticles() {
        const symbols = ["·", "✦", "✧", "♡"];

        for (let i = 0; i < 24; i++) {
            const particle = document.createElement("span");

            particle.className = "floating-particle";

            particle.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 3 + "s";

            particle.style.animationDuration =
                5 + Math.random() * 7 + "s";

            particle.style.fontSize =
                7 + Math.random() * 12 + "px";

            document.body.appendChild(particle);

            setTimeout(function () {
                particle.remove();
            }, 13000);
        }
    }

    function createHeartBurst() {
        const hearts = ["♡", "♥", "✦"];

        for (let i = 0; i < 14; i++) {
            const heart = document.createElement("span");

            heart.className = "heart-particle";

            heart.textContent =
                hearts[Math.floor(Math.random() * hearts.length)];

            heart.style.left =
                50 + (Math.random() * 40 - 20) + "%";

            heart.style.top =
                48 + (Math.random() * 25 - 12) + "%";

            heart.style.setProperty(
                "--x",
                (Math.random() * 260 - 130) + "px"
            );

            heart.style.setProperty(
                "--y",
                -(80 + Math.random() * 220) + "px"
            );

            heart.style.animationDelay =
                Math.random() * 0.4 + "s";

            document.body.appendChild(heart);

            setTimeout(function () {
                heart.remove();
            }, 3000);
        }
    }

    function createSparkleField() {
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement("span");

            sparkle.className = "final-sparkle";
            sparkle.textContent = "✦";

            sparkle.style.left =
                Math.random() * 100 + "%";

            sparkle.style.top =
                Math.random() * 100 + "%";

            sparkle.style.animationDelay =
                Math.random() * 4 + "s";

            sparkle.style.animationDuration =
                3 + Math.random() * 4 + "s";

            document.body.appendChild(sparkle);

            setTimeout(function () {
                sparkle.remove();
            }, 8000);
        }
    }
});
