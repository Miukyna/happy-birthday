document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================== */

    const intro =
        document.getElementById("intro");

    const main =
        document.getElementById("main");

    const openBtn =
        document.getElementById("openBtn");


    /* =========================
       MUSIC
    ========================== */

    const music =
        new Audio("music/universe.mp3");

    music.loop = true;

    music.volume = 0.65;


    const musicControl =
        document.getElementById(
            "musicControl"
        );

    const musicIcon =
        document.getElementById(
            "musicIcon"
        );

    const musicText =
        document.getElementById(
            "musicText"
        );


    const floatingMusic =
        document.getElementById(
            "floatingMusic"
        );

    const floatingIcon =
        document.getElementById(
            "floatingIcon"
        );


    let musicStarted = false;


    /* =========================
       OPEN WEBSITE
    ========================== */

    openBtn.addEventListener(
        "click",
        async () => {

            intro.classList.add("hide");


            setTimeout(() => {

                main.classList.remove(
                    "hidden"
                );

            }, 400);


            /*
                Музыка запускается именно
                после нажатия пользователя.
                Поэтому браузер не должен
                блокировать autoplay.
            */

            try {

                await music.play();

                musicStarted = true;

                setMusicState(true);

            } catch (error) {

                console.log(
                    "Не удалось запустить музыку:",
                    error
                );

            }

        }
    );


    /* =========================
       MUSIC STATE
    ========================== */

    function setMusicState(
        isPlaying
    ) {

        if (isPlaying) {

            musicIcon.textContent =
                "Ⅱ";

            musicText.textContent =
                "Музыка играет";

            floatingIcon.textContent =
                "♫";

            floatingMusic.classList.add(
                "music-playing"
            );

        } else {

            musicIcon.textContent =
                "▶";

            musicText.textContent =
                "Включить музыку";

            floatingIcon.textContent =
                "♪";

            floatingMusic.classList.remove(
                "music-playing"
            );

        }

    }


    /* =========================
       TOGGLE MUSIC
    ========================== */

    async function toggleMusic() {

        if (!musicStarted) {

            try {

                await music.play();

                musicStarted = true;

                setMusicState(true);

            } catch (error) {

                console.log(error);

            }

            return;

        }


        if (music.paused) {

            try {

                await music.play();

                setMusicState(true);

            } catch (error) {

                console.log(error);

            }

        } else {

            music.pause();

            setMusicState(false);

        }

    }


    musicControl.addEventListener(
        "click",
        toggleMusic
    );


    floatingMusic.addEventListener(
        "click",
        toggleMusic
    );


    /* =========================
       SCROLL REVEAL
    ========================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            observer.observe(element);

        }
    );


    /* =========================
       ASSOCIATION MODAL
    ========================== */

    const associations =
        document.querySelectorAll(
            ".association"
        );


    const modal =
        document.getElementById(
            "associationModal"
        );


    const modalClose =
        document.getElementById(
            "modalClose"
        );


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );


    const modalText =
        document.getElementById(
            "modalText"
        );


    const modalIcon =
        document.getElementById(
            "modalIcon"
        );


    associations.forEach(
        (card) => {

            card.addEventListener(
                "click",
                () => {

                    modalTitle.textContent =
                        card.dataset.title;


                    modalText.textContent =
                        card.dataset.text;


                    const icon =
                        card.querySelector(
                            "span"
                        );


                    modalIcon.textContent =
                        icon
                            ? icon.textContent
                            : "❤️";


                    modal.classList.add(
                        "active"
                    );


                    document.body.style.overflow =
                        "hidden";

                }
            );

        }
    );


    /* =========================
       CLOSE MODAL
    ========================== */

    function closeModal() {

        modal.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    const modalBg =
        modal.querySelector(
            ".modal-bg"
        );


    modalBg.addEventListener(
        "click",
        closeModal
    );


    /* =========================
       ESCAPE
    ========================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );

});/* =========================
   ZOOTOPIA VIDEO
========================= */

const watchMoment =
    document.getElementById(
        "watchMoment"
    );

const videoModal =
    document.getElementById(
        "videoModal"
    );

const videoModalBg =
    document.getElementById(
        "videoModalBg"
    );

const videoClose =
    document.getElementById(
        "videoClose"
    );

const zootopiaVideo =
    document.getElementById(
        "zootopiaVideo"
    );


watchMoment.addEventListener(
    "click",
    () => {

        videoModal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

        /*
            Фоновую музыку сайта
            ставим на паузу, чтобы она
            не мешала звуку видео.
        */

        if (!music.paused) {
            music.pause();
            setMusicState(false);
        }


        zootopiaVideo.currentTime = 0;

        zootopiaVideo.play()
            .catch(() => {});

    }
);


function closeVideo() {

    videoModal.classList.remove(
        "active"
    );

    zootopiaVideo.pause();

    zootopiaVideo.currentTime = 0;

    document.body.style.overflow =
        "";


    /*
        После закрытия видео
        возвращаем музыку сайта.
    */

    music.play()
        .then(() => {

            musicStarted = true;

            setMusicState(true);

        })
        .catch(() => {});

}


videoClose.addEventListener(
    "click",
    closeVideo
);


videoModalBg.addEventListener(
    "click",
    closeVideo
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            videoModal.classList.contains(
                "active"
            )
        ) {

            closeVideo();

        }

    }
);