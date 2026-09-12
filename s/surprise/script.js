document.addEventListener("DOMContentLoaded", function () {
    const page = document.querySelector(".surprise-page");
    const openButton = document.getElementById("open-surprise-button");

    if (!page || !openButton) {
        return;
    }

    openButton.addEventListener("click", function () {
        createHearts();
        createSparkles();

        const card = document.querySelector(".surprise-card");

        if (card) {
            card.style.transition = "all 0.7s ease";
            card.style.transform = "scale(0.9)";
            card.style.opacity = "0";
        }

        setTimeout(function () {
            showMissingMessage();
        }, 650);
    });

    function showMissingMessage() {
        page.innerHTML = `
            <div class="missing-screen">

                <div class="floating-heart heart-1">❤️</div>
                <div class="floating-heart heart-2">💗</div>
                <div class="floating-heart heart-3">💖</div>
                <div class="floating-heart heart-4">💕</div>
                <div class="floating-heart heart-5">💞</div>

                <div class="message-card">

                    <div class="big-heart">
                        ❤️
                    </div>

                    <p class="tiny-title">
                        THERE'S SOMETHING I WANT TO SAY
                    </p>

                    <h1>
                        I Miss<br>
                        <span>You</span>
                    </h1>

                    <p class="main-message" id="typing-message"></p>

                    <div class="divider"></div>

                    <p class="bottom-message">
                        Distance can keep people apart,
                        but it can never stop someone
                        from being missed. ❤️
                    </p>

                    <button
                        type="button"
                        class="continue-button"
                        id="more-button">
                        There's more... 💌
                    </button>

                </div>
            </div>
        `;

        startTyping();

        document
            .getElementById("more-button")
            .addEventListener("click", showNextMessage);
    }

    function startTyping() {
        const message =
            "कहिलेकाहीँ कुनै विशेष कारण चाहिँदैन... " +
            "बस् अचानक कसैको धेरै याद आउँछ। " +
            "आज त्यस्तै भयो। ❤️";

        const element = document.getElementById("typing-message");

        if (!element) {
            return;
        }

        let index = 0;

        function typeText() {
            if (index < message.length) {
                element.textContent += message.charAt(index);
                index++;

                setTimeout(typeText, 42);
            }
        }

        typeText();
    }

    function showNextMessage() {
        page.innerHTML = `
            <div class="missing-screen second-screen">

                <div class="message-card">

                    <div class="big-heart pulse">
                        💗
                    </div>

                    <p class="tiny-title">
                        JUST ONE MORE THING
                    </p>

                    <h1>
                        Missing You<br>
                        <span>More Than You Know</span>
                    </h1>

                    <p class="main-message">
                        तिमीलाई सम्झिँदा कहिलेकाहीँ मुस्कान आउँछ,
                        कहिलेकाहीँ मन अलि खाली–खाली लाग्छ।
                        <br><br>
                        सायद यही नै हो—
                        <strong>
                            कसैलाई साँच्चिकै miss गर्नु।
                        </strong>
                    </p>

                    <p class="love-line">
                        ❤️ I just wanted you to know.
                    </p>

                    <button
                        type="button"
                        class="continue-button"
                        id="meet-button">
                        One Last Thing... ✨
                    </button>

                </div>
            </div>
        `;

        document
            .getElementById("meet-button")
            .addEventListener("click", showMeetQuestion);
    }

    function showMeetQuestion() {
        page.innerHTML = `
            <div class="missing-screen">

                <div class="message-card">

                    <div class="big-heart">
                        🥹❤️
                    </div>

                    <p class="tiny-title">
                        MAYBE WE SHOULD FIX THIS
                    </p>

                    <h1>
                        भेटौँ न<br>
                        <span>कुनै दिन?</span>
                    </h1>

                    <p class="main-message">
                        यति धेरै miss गरिसकेपछि
                        अब भेट्ने एउटा बहाना त चाहिन्छ नि। ❤️
                    </p>

                    <button
                        type="button"
                        class="continue-button"
                        id="date-button">
                        भेट्ने समय छानौँ 🗓️
                    </button>

                </div>
            </div>
        `;

        document
            .getElementById("date-button")
            .addEventListener("click", showDatePicker);
    }

    function showDatePicker() {
        page.innerHTML = `
            <div class="missing-screen">

                <div class="message-card">

                    <div class="big-heart">
                        🗓️❤️
                    </div>

                    <p class="tiny-title">
                        YOUR CHOICE
                    </p>

                    <h1>
                        When Should<br>
                        <span>We Meet?</span>
                    </h1>

                    <p class="main-message">
                        तपाईंलाई मिल्ने मिति र समय छान्नुहोस्। ❤️
                    </p>

                    <div class="date-box">

                        <label for="meet-date">
                            मिति
                        </label>

                        <input
                            type="date"
                            id="meet-date"
                        >

                        <label for="meet-time">
                            समय
                        </label>

                        <input
                            type="time"
                            id="meet-time"
                        >

                    </div>

                    <button
                        type="button"
                        class="continue-button"
                        id="confirm-button">
                        यो समय Fix गरौँ ❤️
                    </button>

                </div>
            </div>
        `;

        document
            .getElementById("confirm-button")
            .addEventListener("click", confirmMeeting);
    }

    function confirmMeeting() {
        const dateInput = document.getElementById("meet-date");
        const timeInput = document.getElementById("meet-time");

        if (!dateInput || !timeInput) {
            return;
        }

        const date = dateInput.value;
        const time = timeInput.value;

        if (!date || !time) {
            alert("कृपया मिति र समय दुवै छान्नुहोस् ❤️");
            return;
        }

        const selectedDate = new Date(`${date}T${time}`);

        const formattedDate = selectedDate.toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

        page.innerHTML = `
            <div class="missing-screen">

                <div class="message-card">

                    <div class="big-heart pulse">
                        💖
                    </div>

                    <p class="tiny-title">
                        IT'S A DATE
                    </p>

                    <h1>
                        See You<br>
                        <span>Soon ❤️</span>
                    </h1>

                    <div class="meeting-details">

                        <div>
                            <span>📅</span>
                            <strong>${formattedDate}</strong>
                        </div>

                        <div>
                            <span>⏰</span>
                            <strong>${time}</strong>
                        </div>

                    </div>

                    <p class="main-message">
                        अब भेट्ने दिनको countdown सुरु भयो। 🥰
                    </p>

                    <p class="love-line">
                        Until then... I'll miss you. ❤️
                    </p>

                </div>
            </div>
        `;

        createHearts();
        createSparkles();
    }

    function createHearts() {
        const hearts = [
            "❤️",
            "💗",
            "💖",
            "💕",
            "💞"
        ];

        for (let i = 0; i < 18; i++) {
            const heart = document.createElement("div");

            heart.className = "background-heart";

            heart.textContent =
                hearts[Math.floor(Math.random() * hearts.length)];

            heart.style.left =
                Math.random() * 100 + "%";

            heart.style.animationDelay =
                Math.random() * 5 + "s";

            heart.style.animationDuration =
                5 + Math.random() * 6 + "s";

            document.body.appendChild(heart);

            setTimeout(function () {
                heart.remove();
            }, 12000);
        }
    }

    function createSparkles() {
        for (let i = 0; i < 35; i++) {
            const sparkle = document.createElement("div");

            sparkle.className = "sparkle";
            sparkle.textContent = "✦";

            sparkle.style.left =
                Math.random() * 100 + "%";

            sparkle.style.top =
                Math.random() * 100 + "%";

            sparkle.style.animationDelay =
                Math.random() * 3 + "s";

            document.body.appendChild(sparkle);

            setTimeout(function () {
                sparkle.remove();
            }, 6000);
        }
    }
});
