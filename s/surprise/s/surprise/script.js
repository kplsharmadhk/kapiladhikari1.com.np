document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("open-surprise-button");

    if (button) {
        button.addEventListener("click", function () {
            const page = document.querySelector(".surprise-page");

            page.innerHTML = `
                <section class="message-card">
                    <div class="big-heart">❤️</div>

                    <p class="tiny-title">
                        THERE'S SOMETHING I WANT TO SAY
                    </p>

                    <h1>
                        I Miss<br>
                        <span>You</span>
                    </h1>

                    <p class="main-message">
                        कहिलेकाहीँ कुनै विशेष कारण चाहिँदैन...
                        बस् अचानक कसैको धेरै याद आउँछ।
                        आज त्यस्तै भयो। ❤️
                    </p>

                    <button
                        type="button"
                        class="continue-button"
                        id="more-button">
                        There's more... 💌
                    </button>
                </section>
            `;

            document
                .getElementById("more-button")
                .addEventListener("click", function () {
                    page.innerHTML = `
                        <section class="message-card">
                            <div class="big-heart pulse">💗</div>

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
                                कसैलाई साँच्चिकै miss गर्नु। ❤️
                            </p>

                            <button
                                type="button"
                                class="continue-button"
                                id="meet-button">
                                One Last Thing... ✨
                            </button>
                        </section>
                    `;

                    document
                        .getElementById("meet-button")
                        .addEventListener("click", function () {
                            page.innerHTML = `
                                <section class="message-card">
                                    <div class="big-heart">🥹❤️</div>

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
                                </section>
                            `;

                            document
                                .getElementById("date-button")
                                .addEventListener("click", function () {
                                    page.innerHTML = `
                                        <section class="message-card">
                                            <div class="big-heart">🗓️❤️</div>

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
                                                <label for="meet-date">मिति</label>
                                                <input type="date" id="meet-date">

                                                <label for="meet-time">समय</label>
                                                <input type="time" id="meet-time">
                                            </div>

                                            <button
                                                type="button"
                                                class="continue-button"
                                                id="confirm-button">
                                                यो समय Fix गरौँ ❤️
                                            </button>
                                        </section>
                                    `;

                                    document
                                        .getElementById("confirm-button")
                                        .addEventListener("click", function () {
                                            const date =
                                                document.getElementById("meet-date").value;

                                            const time =
                                                document.getElementById("meet-time").value;

                                            if (!date || !time) {
                                                alert(
                                                    "कृपया मिति र समय दुवै छान्नुहोस् ❤️"
                                                );
                                                return;
                                            }

                                            const selectedDate =
                                                new Date(`${date}T${time}`);

                                            const formattedDate =
                                                selectedDate.toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric"
                                                    }
                                                );

                                            page.innerHTML = `
                                                <section class="message-card">
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
                                                            <strong>
                                                                ${formattedDate}
                                                            </strong>
                                                        </div>

                                                        <div>
                                                            <span>⏰</span>
                                                            <strong>
                                                                ${time}
                                                            </strong>
                                                        </div>
                                                    </div>

                                                    <p class="main-message">
                                                        अब भेट्ने दिनको countdown सुरु भयो। 🥰
                                                    </p>

                                                    <p class="love-line">
                                                        Until then... I'll miss you. ❤️
                                                    </p>
                                                </section>
                                            `;
                                        });
                                });
                        });
                });
        });
    }
});
