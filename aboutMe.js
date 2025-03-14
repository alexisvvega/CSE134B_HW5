document.addEventListener("DOMContentLoaded", function () {
    const funFactCards = document.querySelectorAll(".fun-fact-card");

    funFactCards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });
});