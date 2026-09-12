/**
 * Cinematic Romantic Surprise Experience - For Nimika
 * Self-contained Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       LOCKED STORY CONTENT STRUCTURE
       ========================================================================== */
    const STORY_PAGES = [
        // OPENING
        {
            tag: "A LITTLE SOMETHING",
            isOpening: true,
            heroName: "Nimika",
            subtitle: "आज तिमीलाई केही भन्न मन लाग्यो।",
            btnText: "Open this →",
            btnHint: "take a little moment"
        },
        // PAGE 1
        {
            tag: "PAGE 1 — सुरुमा",
            paragraphs: [
                "Nimika…",
                "आज तिमीलाई केही भन्न मन लाग्यो।",
                "कुरा खासै ठूलो होइन,\nतर मनमा धेरै समयदेखि राखिराखेको कुरा हो।",
                "कहिलेकाहीँ कसैलाई धेरै सम्झिँदा\nत्यो कुरा आफैंसँग मात्र राखिरहन गाह्रो हुँदो रहेछ।",
                "त्यसैले आज,\nमनले जे भन्यो,\nत्यही तिमीलाई भन्न मन लाग्यो।"
            ],
            btnText: "Continue →",
            btnHint: "gently move forward"
        },
        // PAGE 2
        {
            tag: "PAGE 2 — तिम्रो याद",
            paragraphs: [
                "दिनहरू आफ्नै तरिकाले बितिरहेका हुन्छन्।",
                "काम हुन्छ,\nव्यस्तता हुन्छ,\nमान्छेहरू हुन्छन्,\nहाँसो हुन्छ,\nआफ्नै संसार हुन्छ।",
                "तर यी सबैको बीचमा पनि\nकहिलेकाहीँ अचानक तिमी याद आउँछ्यौ।",
                "कुनै विशेष कारणले होइन।",
                "कुनै विशेष समय भएर पनि होइन।",
                "बस्…\nअचानक।",
                "र त्यो एकछिनमा\nवरिपरि सबै कुरा उस्तै हुँदाहुँदै पनि\nमनचाहिँ अलि फरक ठाउँमा पुगेजस्तो लाग्छ।",
                "तिमीतिर।"
            ],
            btnText: "Continue →",
            btnHint: "turn the page"
        },
        // PAGE 3
        {
            tag: "PAGE 3 — किन यस्तो हुन्छ?",
            paragraphs: [
                "सायद यसको कुनै राम्रोसँग बुझाउन सकिने कारण छैन।",
                "किनकि केही मान्छेहरू\nकारण खोजेर मनमा बस्दैनन्।",
                "उनीहरू\nबिस्तारै मनको एउटा यस्तो ठाउँमा पुग्छन्,\nजहाँबाट उनीहरूलाई\nचाहेर पनि सजिलै हटाउन सकिँदैन।",
                "तिमी पनि त्यस्तै भयौ।",
                "कहिले,\nकसरी,\nकति नजिक भयौ—",
                "सायद मैले पनि थाहा पाइनँ।",
                "तर अहिले यति चाहिँ थाहा छ…",
                "तिमीलाई सम्झिँदा\nमनमा एउटा छुट्टै खाली ठाउँ महसुस हुन्छ।"
            ],
            btnText: "Continue →",
            btnHint: "keep reading"
        },
        // PAGE 4 - EMOTIONAL CLIMAX
        {
            tag: "PAGE 4 — सबैभन्दा साँचो कुरा",
            isEmotionalClimax: true,
            paragraphs: [
                "Nimika…",
                "म तिमीलाई धेरै कुरा भन्न सक्छु।",
                "तर ती सबै कुराभन्दा\nएउटा कुरा साँचो छ।",
                "म तिमीलाई miss गर्छु।",
                "धेरै।",
                "कहिलेकाहीँ भन्न मन लाग्छ,\nकहिलेकाहीँ चुप लागेर बस्छु।",
                "तर मनले भने\nहरेक पटक एउटै कुरा भन्छ—",
                "तिमी यहाँ भएको भए\nअहिले यो क्षण अझ राम्रो हुन्थ्यो।",
                "I miss you, Nimika. ❤️"
            ],
            btnText: "Continue →",
            btnHint: "listen closely"
        },
        // PAGE 5
        {
            tag: "PAGE 5 — तिमीप्रतिको भावना",
            paragraphs: [
                "तिमीलाई सम्झनु\nमेरो कुनै routine होइन।",
                "तर तिमीलाई नसम्झिएको दिन\nकहिलेकाहीँ अलि अधुरो जस्तो लाग्छ।",
                "तिम्रो एउटा message,\nतिमीसँगको एउटा कुरा,\nतिम्रो आवाज,\nतिम्रो हाँसो—",
                "यी साना-साना कुराहरू पनि\nकहिलेकाहीँ मनमा धेरै ठूलो भएर आउँछन्।",
                "र त्यतिबेला बुझ्छु—",
                "मान्छे नजिक हुनलाई\nसधैं छेउमै हुनुपर्दैन रहेछ।",
                "कसैको उपस्थिति\nटाढा भएर पनि\nमनभित्र महसुस भइरहन सक्छ।"
            ],
            btnText: "Continue →",
            btnHint: "turn the page"
        },
        // PAGE 6
        {
            tag: "PAGE 6 — यो page किन?",
            paragraphs: [
                "सायद तिमी सोच्दै होलौ—",
                "यति धेरै कुरा\nएउटा page बनाएर किन भन्नुपर्‍यो?",
                "किनकि कतिपय कुरा\nmessage मा लेख्दा\nत्यसको feeling त्यति आउँदैन।",
                "केवल \"I miss you\"\nले मात्र पनि\nमनमा भएको सबै कुरा भन्न सकिँदैन।",
                "त्यसैले सोचेँ…",
                "तिमीले यो खोल्दा\nकेही क्षणका लागि भए पनि\nमेरो मनको त्यो भाग देख्न पाऊ\nजुन तिमीलाई सम्झिरहन्छ।",
                "यो कुनै ठूलो gift होइन।",
                "बस्…",
                "मेरो मनमा तिम्रो लागि भएको\nएउटा सानो ठाउँलाई\nशब्द र केही moments मा राखेर\nतिमीलाई दिन खोजेको हुँ।"
            ],
            btnText: "Continue →",
            btnHint: "gently move forward"
        },
        // PAGE 7 - DEDICATION
        {
            tag: "PAGE 7 — समर्पण",
            isDedication: true,
            paragraphs: [
                "Nimika…",
                "यो page मा भएका\nहरेक शब्द तिम्रै लागि हुन्।",
                "अरू कसैका लागि होइन।",
                "यो बनाउँदा\nमलाई कुनै perfect शब्द खोज्न मन लागेन।",
                "किनकि तिमीप्रतिको भावना\nperfect शब्दले भन्दा\nसाँचो शब्दले नै राम्रोसँग भन्न सकिन्छ।",
                "म तिमीलाई के दिन सक्छु,\nकति दिन सक्छु,\nभविष्यले के ल्याउँछ—",
                "यी सबै कुरा मलाई थाहा छैन।",
                "तर एउटा कुरा भने\nआज भन्न सक्छु।",
                "तिमी मेरो लागि\nसाधारण मान्छे होइनौ।",
                "तिमीलाई सम्झिँदा\nमनको आवाज अलि नरम हुन्छ।",
                "तिम्रो कुरा आउँदा\nअनायास मुस्कान आउँछ।",
                "र तिमी टाढा हुँदा\nमनले तिमीलाई खोज्छ।"
            ],
            btnText: "Continue →",
            btnHint: "keep reading"
        },
        // PAGE 8
        {
            tag: "PAGE 8 — सबैभन्दा व्यक्तिगत कुरा",
            paragraphs: [
                "कहिलेकाहीँ\nमलाई तिमीसँग धेरै कुरा गर्न मन लाग्छ।",
                "दिनभरि भएका साना-साना कुरा पनि।",
                "आज के भयो,\nके सोचिरहेँ,\nके कुराले हँसायो,\nके कुराले झर्को लगायो—",
                "यस्ता सामान्य कुराहरू पनि\nतिमीलाई भन्न मन लाग्यो।",
                "किनकि तिमीसँग कुरा गर्नु\nकुनै विशेष occasion चाहिने कुरा होइन।",
                "तिमी आफैं\nएउटा कारण हौ।",
                "र सायद यही नै\nकसैलाई मनदेखि आफ्नो मान्नु हो।"
            ],
            btnText: "Continue →",
            btnHint: "turn the page"
        },
        // PAGE 9 - HONEST CONFESSION
        {
            tag: "PAGE 9 — यदि मैले भन्न नसकेको कुरा",
            isConfession: true,
            paragraphs: [
                "सायद मैले\nहरेक पटक खुलेर भन्न सकेको छैन।",
                "सायद कतिपय भावना\nम आफैंभित्र राख्छु।",
                "तर त्यसको अर्थ\nत्यो भावना कम छ भन्ने होइन।",
                "बरु कहिलेकाहीँ\nधेरै भएको कारणले\nशब्द कम पर्छन्।",
                "त्यसैले आज\nकुनै घुमाउरो कुरा गर्दिनँ।",
                "Nimika…",
                "म तिमीलाई सम्झन्छु।",
                "म तिमीलाई miss गर्छु।",
                "र तिमी मेरो जीवनमा\nजुन ठाउँमा छौ,\nत्यो ठाउँलाई म मनदेखि नै\nमहत्त्व दिन्छु।"
            ],
            btnText: "Continue →",
            btnHint: "almost there"
        },
        // PAGE 10
        {
            tag: "PAGE 10 — अन्तिम भावना",
            paragraphs: [
                "तिमीलाई थाहा छ?",
                "तिमीलाई miss गर्नुको\nसबैभन्दा नराम्रो कुरा\nतिमीलाई miss गरिरहेको छु\nभनेर भन्न मन लाग्नु हो।",
                "किनकि भन्न मन लागेपछि\nमनले तिमीलाई अझ नजिक खोज्छ।",
                "तर यसको सबैभन्दा राम्रो कुरा पनि छ।",
                "आज मैले\nत्यो कुरा तिमीलाई भन्न पाएँ।",
                "सायद यो page बन्द भएपछि\nसबै कुरा फेरि उस्तै हुन्छ।",
                "आफ्नो संसार,\nआफ्नो काम,\nआफ्नो व्यस्तता।",
                "तर कम्तीमा\nआजको यो केही समय\nतिमीले थाहा पाउनेछ्यौ—",
                "कतै एउटा मान्छे छ,\nजो तिमीलाई सम्झन्छ।",
                "जो तिम्रो presence लाई\nमहत्त्व दिन्छ।",
                "र जो कहिलेकाहीँ\nकुनै कारण बिना पनि\nतिमीलाई खोज्छ।"
            ],
            btnText: "Continue →",
            btnHint: "one last thought"
        },
        // FINAL PAGE
        {
            tag: "FINAL PAGE",
            isFinal: true,
            paragraphs: [
                "Nimika…",
                "बस्,\nआज यति नै।",
                "धेरै कुरा भन्न खोज्दा पनि\nअन्तिममा मनले एउटै कुरा भन्छ—",
                "तिमी खुसी रहनू।",
                "आफ्नो ख्याल राख्नू।",
                "र कहिलेकाहीँ\nमलाई पनि सम्झिनू।",
                "किनकि…",
                "तिमीलाई मैले\nजति शब्दमा भन्न सकेँ,\nत्यसभन्दा धेरै\nमनमा महसुस गरेको छु।",
                "I miss you, Nimika. ❤️"
            ],
            englishFinal: [
                "And if you ever wonder\nwhether this little page\nwas really made just for you—",
                "yes.",
                "It was.",
                "Only for you."
            ],
            signature: "— Made with a little extra love. ❤️"
        }
    ];

    // Navigation State Variables
    let currentScreenIndex = 0;
    let isTransitioning = false;
    
    // DOM Elements
    const storyViewport = document.getElementById('story-viewport');
    const nextBtn = document.getElementById('next-btn');
    const btnText = document.getElementById('btn-text');
    const btnHint = document.getElementById('btn-hint');
    const navigationArea = document.getElementById('navigation-area');
    const particleContainer = document.getElementById('particle-container');
    const mobileSignature = document.getElementById('mobile-signature');
    
    // Reduced Motion Accessibility Check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ==========================================================================
       1. UNICODE GRAPHEME SEGMENTATION (NEPALI SAFE)
       ========================================================================== */
    function splitIntoGraphemes(text) {
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter('ne', { granularity: 'grapheme' });
            return Array.from(segmenter.segment(text), s => s.segment);
        }
        return Array.from(text);
    }

    /* ==========================================================================
       2. DYNAMIC DOM RENDERER
       ========================================================================== */
    function buildScreenDOM(pageData, index) {
        const screen = document.createElement('section');
        screen.className = `story-screen ${index === 0 ? 'active' : ''}`;
        screen.id = `screen-${index}`;
        screen.setAttribute('data-index', index);
        screen.setAttribute('aria-live', 'polite');

        const wrapper = document.createElement('div');
        wrapper.className = 'content-wrapper';

        if (pageData.isOpening) {
            wrapper.classList.add('centered-hero');
            wrapper.innerHTML = `
                <span class="eyebrow glow-text">${pageData.tag}</span>
                <div class="heart-centerpiece-wrapper" aria-hidden="true">
                    <div class="orbit-ring ring-outer"></div>
                    <div class="orbit-ring ring-inner"></div>
                    <div class="glowing-heart-core">
                        <svg class="heart-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#heroHeartGrad)"/>
                            <defs>
                                <linearGradient id="heroHeartGrad" x1="2" y1="3" x2="22" y2="21.35" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stop-color="#ff758c"/>
                                    <stop offset="60%" stop-color="#ff7eb3"/>
                                    <stop offset="100%" stop-color="#8a4af3"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <div class="heart-pulse-aura"></div>
                    </div>
                </div>
                <div class="title-group">
                    <span class="title-sub">For</span>
                    <h1 class="hero-name gradient-text">${pageData.heroName}</h1>
                </div>
                <p class="opening-nepali-subtitle anim-text" data-text="${pageData.subtitle}">${pageData.subtitle}</p>
            `;
        } else {
            let htmlContent = `<div class="section-tag ${pageData.isEmotionalClimax ? 'highlight-tag' : ''}">${pageData.tag}</div>`;

            if (pageData.isEmotionalClimax) {
                htmlContent += `
                    <div class="climax-atmosphere" aria-hidden="true">
                        <div class="climax-glow"></div>
                    </div>
                `;
            }

            htmlContent += `<div class="story-body ${pageData.isEmotionalClimax ? 'climax-body' : ''}">`;

            pageData.paragraphs.forEach(pText => {
                const formattedLines = pText.split('\n').map(line => {
                    if (line.includes('I miss you, Nimika. ❤️')) {
                        return `<span class="emotional-headline gradient-text-warm anim-text" data-text="${line}">${line}</span>`;
                    } else if (line.includes('Nimika…')) {
                        return `<span class="recipient-callout anim-text" data-text="${line}">${line}</span>`;
                    } else if (line.includes('म तिमीलाई miss गर्छु।') || line.includes('हरेक शब्द तिम्रै लागि हुन्।')) {
                        return `<span class="hero-phrase gradient-text anim-text" data-text="${line}">${line}</span>`;
                    } else {
                        return `<span class="anim-text" data-text="${line}">${line}</span>`;
                    }
                }).join('<br>');

                htmlContent += `<div class="text-group"><p>${formattedLines}</p></div>`;
            });

            if (pageData.isFinal && pageData.englishFinal) {
                htmlContent += `<div class="glowing-divider" aria-hidden="true"></div><div class="english-final-block">`;
                pageData.englishFinal.forEach(eText => {
                    const eLines = eText.split('\n').map(line => `<span class="anim-text" data-text="${line}">${line}</span>`).join('<br>');
                    htmlContent += `<div class="text-group"><p>${eLines}</p></div>`;
                });
                htmlContent += `</div>`;
            }

            htmlContent += `</div>`;

            if (pageData.isFinal && pageData.signature) {
                htmlContent += `
                    <footer class="final-footer">
                        <div class="signature-line" aria-hidden="true"></div>
                        <p class="signature-text">${pageData.signature}</p>
                    </footer>
                `;
            }

            wrapper.innerHTML = htmlContent;
        }

        screen.appendChild(wrapper);
        return screen;
    }

    function renderAllPages() {
        storyViewport.innerHTML = '';
        STORY_PAGES.forEach((pageData, idx) => {
            const screenEl = buildScreenDOM(pageData, idx);
            storyViewport.appendChild(screenEl);
        });
        prepareTextSpans();
    }

    /* ==========================================================================
       3. CHARACTER REVEAL ANIMATION SYSTEM
       ========================================================================== */
    function prepareTextSpans() {
        const textElements = storyViewport.querySelectorAll('.anim-text');
        textElements.forEach(el => {
            const rawText = el.getAttribute('data-text') || el.textContent.trim();
            const graphemes = splitIntoGraphemes(rawText);
            
            el.innerHTML = '';
            graphemes.forEach(char => {
                if (char === ' ') {
                    const space = document.createElement('span');
                    space.className = 'space-span';
                    space.innerHTML = '&nbsp;';
                    el.appendChild(space);
                } else {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char-span';
                    charSpan.textContent = char;
                    el.appendChild(charSpan);
                }
            });
        });
    }

    function animateScreenText(screenEl) {
        if (prefersReducedMotion) {
            screenEl.querySelectorAll('.char-span').forEach(c => c.classList.add('revealed'));
            return;
        }

        const animBlocks = screenEl.querySelectorAll('.anim-text');
        animBlocks.forEach((block, blockIndex) => {
            const chars = block.querySelectorAll('.char-span');
            const blockDelay = blockIndex * 240;

            chars.forEach((charSpan, charIndex) => {
                setTimeout(() => {
                    charSpan.classList.add('revealed');
                }, blockDelay + (charIndex * 32));
            });
        });
    }

    function resetScreenText(screenEl) {
        screenEl.querySelectorAll('.char-span').forEach(c => c.classList.remove('revealed'));
    }

    /* ==========================================================================
       4. SCREEN NAVIGATION ENGINE
       ========================================================================== */
    function updateNavigationUI(index) {
        const pageData = STORY_PAGES[index];

        if (pageData.isFinal) {
            navigationArea.classList.add('hidden-nav');
        } else {
            navigationArea.classList.remove('hidden-nav');
            btnText.textContent = pageData.btnText || "Continue →";
            btnHint.textContent = pageData.btnHint || "";
        }

        // Atmosphere adjustment for Emotional Climax (Page 4)
        if (pageData.isEmotionalClimax) {
            document.body.classList.add('quiet-mode');
        } else {
            document.body.classList.remove('quiet-mode');
        }

        // Mobile signature visibility
        if (mobileSignature) {
            if (index > 0) {
                mobileSignature.classList.add('visible');
            } else {
                mobileSignature.classList.remove('visible');
            }
        }
    }

    function switchScreen(targetIndex) {
        // Safe navigation guards to prevent locks or out-of-bounds errors
        if (isTransitioning || targetIndex >= STORY_PAGES.length || targetIndex < 0 || targetIndex === currentScreenIndex) {
            return;
        }

        isTransitioning = true;

        const allScreens = Array.from(storyViewport.children);
        const currentScreen = allScreens[currentScreenIndex];
        const nextScreen = allScreens[targetIndex];

        // Particle sparkle burst on click
        spawnParticleBurst(16);

        // Transition Step 1: Fade out current screen
        currentScreen.classList.remove('active');

        // Transition Step 2: Swap screens and animate text
        setTimeout(() => {
            resetScreenText(currentScreen);

            nextScreen.classList.add('active');
            currentScreenIndex = targetIndex;

            updateNavigationUI(currentScreenIndex);
            animateScreenText(nextScreen);

            // Transition Step 3: GUARANTEED RELEASE OF TRANSITION LOCK
            setTimeout(() => {
                isTransitioning = false;
            }, 600);

        }, 500);
    }

    /* ==========================================================================
       5. AMBIENT PARTICLE SYSTEM
       ========================================================================== */
    const SYMBOLS = ['✦', '✧', '♡', '♥', '·', '•'];

    function createParticle() {
        if (prefersReducedMotion || !particleContainer) return;
        if (particleContainer.childElementCount > 25) return;

        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

        const startX = Math.random() * 100;
        const size = Math.random() * (18 - 10) + 10;
        const duration = Math.random() * (15 - 9) + 9;
        const maxOpacity = Math.random() * (0.6 - 0.2) + 0.2;
        const color = Math.random() > 0.4 ? 'var(--accent-pink)' : 'var(--accent-warm)';

        particle.style.left = `${startX}vw`;
        particle.style.bottom = `-5vh`;
        particle.style.fontSize = `${size}px`;
        particle.style.color = color;
        particle.style.animationDuration = `${duration}s`;
        particle.style.setProperty('--max-opacity', maxOpacity);

        particleContainer.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode === particleContainer) {
                particle.remove();
            }
        }, duration * 1000);
    }

    function spawnParticleBurst(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(createParticle, i * 40);
        }
    }

    setInterval(createParticle, 1200);

    /* ==========================================================================
       6. INITIALIZATION & EVENT LISTENERS
       ========================================================================== */
    function init() {
        renderAllPages();
        updateNavigationUI(0);

        // Animate Screen 0
        setTimeout(() => {
            const firstScreen = storyViewport.children[0];
            if (firstScreen) animateScreenText(firstScreen);
        }, 300);

        // Next Button Click Event
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchScreen(currentScreenIndex + 1);
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') {
                switchScreen(currentScreenIndex + 1);
            } else if (e.key === 'ArrowLeft') {
                switchScreen(currentScreenIndex - 1);
            }
        });

        // Viewport Scroll Fix
        window.addEventListener('resize', () => {
            window.scrollTo(0, 0);
        });
    }

    init();
});
