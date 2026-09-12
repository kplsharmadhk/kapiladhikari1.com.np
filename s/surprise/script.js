/**
 * Cinematic Romantic Surprise Experience - For Nimika
 * Self-contained Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation State
    let currentScreenIndex = 0;
    let isTransitioning = false;
    
    const screens = Array.from(document.querySelectorAll('.story-screen'));
    const totalScreens = screens.length;
    
    const particleContainer = document.getElementById('particle-container');
    const mobileSignature = document.getElementById('mobile-signature');
    
    // Accessibility check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ==========================================================================
       1. NEPALI UNICODE GRAPHEME SEGMENTATION & REVEAL SYSTEM
       ========================================================================== */
    
    /**
     * Splits string safely into grapheme clusters (ensures Nepali diacritics don't detach)
     */
    function splitIntoGraphemes(text) {
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter('ne', { granularity: 'grapheme' });
            return Array.from(segmenter.segment(text), s => s.segment);
        }
        // Fallback for browsers without Intl.Segmenter
        return Array.from(text);
    }

    /**
     * Prepares `.anim-text` elements by converting characters to individual spans
     */
    function prepareTextElements() {
        const textElements = document.querySelectorAll('.anim-text');
        
        textElements.forEach(el => {
            const rawText = el.getAttribute('data-text') || el.textContent.trim();
            const graphemes = splitIntoGraphemes(rawText);
            
            el.innerHTML = ''; // Clear plain text
            
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

    /**
     * Triggers character-by-character reveal inside active screen
     */
    function animateScreenText(screenEl) {
        if (prefersReducedMotion) {
            const chars = screenEl.querySelectorAll('.char-span');
            chars.forEach(c => c.classList.add('revealed'));
            return;
        }

        const animBlocks = screenEl.querySelectorAll('.anim-text');
        
        animBlocks.forEach((block, blockIndex) => {
            const chars = block.querySelectorAll('.char-span');
            const blockDelay = blockIndex * 320; // Delay between sentences

            chars.forEach((charSpan, charIndex) => {
                setTimeout(() => {
                    charSpan.classList.add('revealed');
                }, blockDelay + (charIndex * 36)); // Stagger per character
            });
        });
    }

    /**
     * Resets character spans when leaving a screen
     */
    function resetScreenText(screenEl) {
        const chars = screenEl.querySelectorAll('.char-span');
        chars.forEach(c => c.classList.remove('revealed'));
    }

    /* ==========================================================================
       2. SCREEN NAVIGATION & TRANSITIONS
       ========================================================================== */

    function switchScreen(targetIndex) {
        // Safe navigation guard to prevent transition locks or out-of-bounds errors
        if (targetIndex === currentScreenIndex || targetIndex >= totalScreens || targetIndex < 0) {
            return;
        }

        isTransitioning = true;

        const currentScreen = screens[currentScreenIndex];
        const nextScreen = screens[targetIndex];

        // Particle sparkle burst on click
        spawnParticleBurst(20);

        // Phase 1: Fade out current screen
        currentScreen.classList.remove('active');

        // Phase 2: Wait for CSS fade out transition, then activate next screen
        setTimeout(() => {
            resetScreenText(currentScreen);

            nextScreen.classList.add('active');
            currentScreenIndex = targetIndex;

            // Trigger character animation on new screen
            animateScreenText(nextScreen);

            // Toggle Mobile Romantic Signature visibility (Active after Screen 0)
            if (mobileSignature) {
                if (targetIndex > 0) {
                    mobileSignature.classList.add('visible');
                } else {
                    mobileSignature.classList.remove('visible');
                }
            }

            // Phase 3: Unlock transition state safely after animation finishes
            setTimeout(() => {
                isTransitioning = false;
            }, 700);

        }, 550);
    }

    /* ==========================================================================
       3. AMBIENT PARTICLE SYSTEM
       ========================================================================== */

    const SYMBOLS = ['✦', '✧', '♡', '♥', '·', '•'];

    function createParticle() {
        if (prefersReducedMotion || !particleContainer) return;
        
        // Dom node performance cap
        if (particleContainer.childElementCount > 30) return;

        const particle = document.createElement('div');
        particle.className = 'particle';

        const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        particle.textContent = symbol;

        const startX = Math.random() * 100;
        const size = Math.random() * (20 - 10) + 10;
        const duration = Math.random() * (16 - 9) + 9;
        const maxOpacity = Math.random() * (0.65 - 0.25) + 0.25;
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
            setTimeout(createParticle, i * 35);
        }
    }

    // Ambient loop
    setInterval(createParticle, 1100);

    /* ==========================================================================
       4. INITIALIZATION & LISTENERS
       ========================================================================== */

    function init() {
        // 1. Prepare Graphemes
        prepareTextElements();

        // 2. Animate Screen 0 Initial Text
        setTimeout(() => {
            animateScreenText(screens[0]);
        }, 300);

        // 3. Attach Click Event Handlers to Navigation Buttons
        screens.forEach((screen, index) => {
            const btn = screen.querySelector('.cinematic-btn');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!isTransitioning) {
                        switchScreen(index + 1);
                    }
                });
            }
        });

        // 4. Keyboard Navigation (Desktop Accessibility)
        document.addEventListener('keydown', (e) => {
            if (isTransitioning) return;
            
            if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') {
                if (currentScreenIndex < totalScreens - 1) {
                    switchScreen(currentScreenIndex + 1);
                }
            } else if (e.key === 'ArrowLeft') {
                if (currentScreenIndex > 0) {
                    switchScreen(currentScreenIndex - 1);
                }
            }
        });

        // 5. Handle Orientation & Viewport Adjustments
        window.addEventListener('resize', () => {
            window.scrollTo(0, 0);
        });
    }

    // Run setup
    init();
});
