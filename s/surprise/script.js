/* =========================================================
   MUTU — MISSING YOU
   PREMIUM SURPRISE EXPERIENCE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const page = document.querySelector(".surprise-page");
    const openButton = document.getElementById(
        "open-surprise-button"
    );

    if (!page || !openButton) {
        return;
    }


    /* =====================================================
       STATE
    ===================================================== */

    let isTransitioning = false;

    let particleTimer = null;
    let sparkleTimer = null;


    /* =====================================================
       OPEN SURPRISE
    ===================================================== */

    openButton.addEventListener("click", function () {

        if (isTransitioning) {
            return;
        }

        openStory();
    });


    function openStory() {

        if (isTransitioning) {
            return;
        }

        const opening =
            document.getElementById("opening-screen");

        if (!opening) {
            return;
        }

        isTransitioning = true;

        opening.classList.add("opening-exit");

        createFloatingParticles();

        setTimeout(function () {

            /*
             * IMPORTANT:
             * Release transition lock BEFORE creating
             * the first story page.
             *
             * This fixes the bug where only the
             * background appeared.
             */
            isTransitioning = false;

            showFirstMessage();

        }, 720);
    }


    /* =====================================================
       CHARACTER REVEAL ENGINE
       Nepali-friendly grapheme animation
    ===================================================== */

    function prepareCharacterAnimation(container) {

        if (!container) {
            return;
        }

        const elements =
            container.querySelectorAll(
                ".story-label, " +
                ".story-title, " +
                ".story-text, " +
                ".memory-word, " +
                ".main-love-title, " +
                ".miss-you, " +
                ".quote-card p, " +
                ".final-title, " +
                ".final-message p, " +
                ".final-goodbye, " +
                ".signature"
            );

        let globalDelay = 0;

        elements.forEach(function (element) {

            if (element.dataset.revealed === "true") {
                return;
            }

            element.dataset.revealed = "true";

            revealTextNodes(
                element,
                globalDelay
            );

            const count =
                getTextCharacterCount(element);

            /*
             * Keep the page feeling alive without
             * making long Nepali sentences too slow.
             */
            globalDelay += Math.min(
                count * 14,
                210
            );
        });
    }


    function revealTextNodes(
        element,
        baseDelay
    ) {

        const walker =
            document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT
            );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(
                walker.currentNode
            );
        }

        textNodes.forEach(function (textNode) {

            const text = textNode.nodeValue;

            if (!text || !text.trim()) {
                return;
            }

            const fragment =
                document.createDocumentFragment();

            const segments =
                getGraphemes(text);

            let visibleIndex = 0;

            segments.forEach(function (character) {

                /*
                 * Preserve spaces and line breaks.
                 */
                if (
                    character === " " ||
                    character === "\n" ||
                    character === "\t"
                ) {

                    fragment.appendChild(
                        document.createTextNode(
                            character
                        )
                    );

                    return;
                }

                const span =
                    document.createElement("span");

                span.className = "reveal-char";

                span.textContent = character;

                /*
                 * Slightly varied timing.
                 * This feels more natural than
                 * every character appearing identically.
                 */
                const variation =
                    (visibleIndex % 3) * 4;

                const characterDelay =
                    baseDelay +
                    visibleIndex * 20 +
                    variation;

                span.style.animationDelay =
                    characterDelay + "ms";

                fragment.appendChild(span);

                visibleIndex++;
            });

            if (textNode.parentNode) {

                textNode.parentNode.replaceChild(
                    fragment,
                    textNode
                );
            }
        });
    }


    /* =====================================================
       NEPALI GRAPHEME SUPPORT
    ===================================================== */

    function getGraphemes(text) {

        if (
            typeof Intl !== "undefined" &&
            typeof Intl.Segmenter === "function"
        ) {

            const segmenter =
                new Intl.Segmenter(
                    "ne",
                    {
                        granularity: "grapheme"
                    }
                );

            return Array.from(
                segmenter.segment(text),
                function (item) {
                    return item.segment;
                }
            );
        }

        return Array.from(text);
    }


    function getTextCharacterCount(element) {

        const text =
            element.textContent || "";

        return getGraphemes(
            text.trim()
        ).length;
    }


    /* =====================================================
       PAGE TRANSITION
    ===================================================== */

    function replacePage(markup, callback) {

        if (isTransitioning) {
            return;
        }

        isTransitioning = true;

        const currentScreen =
            page.querySelector(".story-screen");

        if (currentScreen) {

            currentScreen.style.transition =
                "opacity 0.30s ease, " +
                "transform 0.30s ease";

            currentScreen.style.opacity = "0";

            currentScreen.style.transform =
                "scale(0.985)";
        }

        setTimeout(function () {

            clearTemporaryEffects();

            page.innerHTML = markup;

            /*
             * Ensure the newly-created story page
             * starts from the top.
             */
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });

            /*
             * Let browser paint the new DOM first.
             */
            requestAnimationFrame(function () {

                requestAnimationFrame(function () {

                    if (callback) {
                        callback();
                    }

                    /*
                     * Small delay keeps the transition
                     * visually clean and prevents
                     * accidental double-clicks.
                     */
                    setTimeout(function () {
                        isTransitioning = false;
                    }, 120);
                });
            });

        }, 300);
    }


    /* =====================================================
       PAGE 1
    ===================================================== */

    function showFirstMessage() {

        replacePage(
            `
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
            `,
            function () {

                animateStory();

                bindButton(
                    "story-next-one",
                    showSecondMessage
                );
            }
        );
    }


    /* =====================================================
       PAGE 2
    ===================================================== */

    function showSecondMessage() {

        replacePage(
            `
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
            `,
            function () {

                animateStory();

                bindButton(
                    "story-next-two",
                    showThirdMessage
                );
            }
        );
    }


    /* =====================================================
       PAGE 3
    ===================================================== */

    function showThirdMessage() {

        replacePage(
            `
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
            `,
            function () {

                animateStory();

                bindButton(
                    "story-next-three",
                    showMainMessage
                );
            }
        );
    }


    /* =====================================================
       MAIN EMOTIONAL PAGE
    ===================================================== */

    function showMainMessage() {

        replacePage(
            `
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
            `,
            function () {

                createHeartBurst();

                animateStory();

                bindButton(
                    "story-next-four",
                    showReasonMessage
                );
            }
        );
    }


    /* =====================================================
       WHY THIS PAGE
    ===================================================== */

    function showReasonMessage() {

        replacePage(
            `
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

                        <span class="quote-mark">
                            “
                        </span>

                        <p>
                            तिमीलाई केही भन्न मन लाग्यो,
                            <br>
                            त्यसैले शब्दहरू मात्र लेखेर
                            <br>
                            बस्न मन लागेन।
                        </p>

                        <span class="quote-mark closing">
                            ”
                        </span>

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
            `,
            function () {

                animateStory();

                bindButton(
                    "story-next-five",
                    showFinalMessage
                );
            }
        );
    }


    /* =====================================================
       FINAL PAGE
    ===================================================== */

    function showFinalMessage() {

        replacePage(
            `
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
                        <span>
                            Made with a little extra love.
                        </span>
                    </div>

                </div>

            </section>
            `,
            function () {

                createHeartBurst();

                createSparkleField();

                animateStory();
            }
        );
    }


    /* =====================================================
       BUTTON BINDING
    ===================================================== */

    function bindButton(id, action) {

        const button =
            document.getElementById(id);

        if (!button) {
            return;
        }

        button.addEventListener(
            "click",
            function () {

                if (isTransitioning) {
                    return;
                }

                action();
            }
        );
    }


    /* =====================================================
       STORY REVEAL
    ===================================================== */

    function animateStory() {

        const content =
            document.querySelector(
                ".story-content"
            );

        if (!content) {
            return;
        }

        /*
         * Start with the page hidden,
         * then reveal it smoothly.
         */
        content.classList.remove(
            "story-visible"
        );

        requestAnimationFrame(function () {

            content.classList.add(
                "story-visible"
            );

            setTimeout(function () {

                prepareCharacterAnimation(
                    content
                );

                /*
                 * Keep the navigation button
                 * visually separated from content.
                 */
                adjustStoryNavigation();

            }, 220);
        });
    }


    /* =====================================================
       NAVIGATION POSITION POLISH
       Keeps bottom button away from content.
    ===================================================== */

    function adjustStoryNavigation() {

        const button =
            document.querySelector(
                ".story-button"
            );

        const content =
            document.querySelector(
                ".story-content"
            );

        if (!button || !content) {
            return;
        }

        /*
         * Measure button height and create enough
         * bottom breathing room inside the content.
         */
        const buttonHeight =
            button.getBoundingClientRect().height;

        const extraSpace =
            Math.max(
                buttonHeight + 34,
                86
            );

        content.style.paddingBottom =
            extraSpace + "px";
    }


    /* =====================================================
       RESPONSIVE NAVIGATION
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (!page.querySelector(".story-screen")) {
                return;
            }

            adjustStoryNavigation();
        }
    );


    /* =====================================================
       FLOATING PARTICLES
    ===================================================== */

    function createFloatingParticles() {

        const symbols = [
            "·",
            "✦",
            "✧",
            "♡"
        ];

        if (particleTimer) {
            clearTimeout(particleTimer);
        }

        for (let i = 0; i < 22; i++) {

            const particle =
                document.createElement("span");

            particle.className =
                "floating-particle";

            particle.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];

            particle.style.left =
                (
                    Math.random() * 100
                ) + "%";

            particle.style.animationDelay =
                (
                    Math.random() * 2.8
                ) + "s";

            particle.style.animationDuration =
                (
                    5 +
                    Math.random() * 6
                ) + "s";

            particle.style.fontSize =
                (
                    7 +
                    Math.random() * 11
                ) + "px";

            document.body.appendChild(
                particle
            );

            setTimeout(function () {

                if (particle) {
                    particle.remove();
                }

            }, 12500);
        }

        particleTimer =
            setTimeout(function () {
                particleTimer = null;
            }, 12500);
    }


    /* =====================================================
       HEART BURST
    ===================================================== */

    function createHeartBurst() {

        const hearts = [
            "♡",
            "♥",
            "✦"
        ];

        for (let i = 0; i < 13; i++) {

            const heart =
                document.createElement("span");

            heart.className =
                "heart-particle";

            heart.textContent =
                hearts[
                    Math.floor(
                        Math.random() *
                        hearts.length
                    )
                ];

            heart.style.left =
                (
                    50 +
                    (
                        Math.random() * 36 -
                        18
                    )
                ) + "%";

            heart.style.top =
                (
                    48 +
                    (
                        Math.random() * 20 -
                        10
                    )
                ) + "%";

            heart.style.setProperty(
                "--x",
                (
                    Math.random() * 250 -
                    125
                ) + "px"
            );

            heart.style.setProperty(
                "--y",
                -(
                    80 +
                    Math.random() * 210
                ) + "px"
            );

            heart.style.animationDelay =
                (
                    Math.random() * 0.35
                ) + "s";

            document.body.appendChild(
                heart
            );

            setTimeout(function () {

                if (heart) {
                    heart.remove();
                }

            }, 3000);
        }
    }


    /* =====================================================
       FINAL SPARKLES
    ===================================================== */

    function createSparkleField() {

        clearSparkles();

        for (let i = 0; i < 24; i++) {

            const sparkle =
                document.createElement("span");

            sparkle.className =
                "final-sparkle";

            sparkle.textContent = "✦";

            sparkle.style.left =
                (
                    Math.random() * 100
                ) + "%";

            sparkle.style.top =
                (
                    Math.random() * 100
                ) + "%";

            sparkle.style.animationDelay =
                (
                    Math.random() * 3.5
                ) + "s";

            sparkle.style.animationDuration =
                (
                    3 +
                    Math.random() * 3
                ) + "s";

            document.body.appendChild(
                sparkle
            );

            setTimeout(function () {

                if (sparkle) {
                    sparkle.remove();
                }

            }, 7500);
        }

        sparkleTimer =
            setTimeout(function () {
                sparkleTimer = null;
            }, 7500);
    }


    /* =====================================================
       CLEAN TEMPORARY EFFECTS
    ===================================================== */

    function clearTemporaryEffects() {

        document
            .querySelectorAll(
                ".floating-particle, " +
                ".heart-particle, " +
                ".final-sparkle"
            )
            .forEach(function (element) {
                element.remove();
            });

        if (particleTimer) {

            clearTimeout(
                particleTimer
            );

            particleTimer = null;
        }

        if (sparkleTimer) {

            clearTimeout(
                sparkleTimer
            );

            sparkleTimer = null;
        }
    }


    function clearSparkles() {

        document
            .querySelectorAll(
                ".final-sparkle"
            )
            .forEach(function (element) {
                element.remove();
            });
    }


    /* =====================================================
       INITIAL RESPONSIVE CHECK
    ===================================================== */

    window.addEventListener(
        "load",
        function () {

            if (page.querySelector(".story-screen")) {
                adjustStoryNavigation();
            }
        }
    );

});
