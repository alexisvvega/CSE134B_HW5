document.addEventListener("DOMContentLoaded", function () {
    const funFactCards = document.querySelectorAll(".fun-fact-card");

    funFactCards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const codeElement = document.getElementById("thank-you-code");
    const codeContent = codeElement.textContent.trim();
    codeElement.textContent = ""; // Clear the initial content
  
    let i = 0;
    function typeWriter() {
      if (i < codeContent.length) {
        codeElement.textContent += codeContent.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // Adjust typing speed here
      }
    }
  
    // Trigger typing effect on hover or click
    codeElement.addEventListener("mouseenter", typeWriter);
    codeElement.addEventListener("click", typeWriter);
  });
  