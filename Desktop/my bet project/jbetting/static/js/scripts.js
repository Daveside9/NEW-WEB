document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners or other interactive elements
    const betButtons = document.querySelectorAll(".match button");

    betButtons.forEach(button => {
        button.addEventListener("click", function() {
            alert("Bet placed on odds " + this.textContent);
        });
    });
});
