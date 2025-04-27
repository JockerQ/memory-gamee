const cardsContainer = document.querySelector(".game-container");
const cards = Array.from(document.querySelectorAll(".card"));

// Function to shuffle cards randomly
function shuffleCards() {
    let shuffledCards = cards.sort(() => Math.random() - 0.5);
    shuffledCards.forEach(card => cardsContainer.appendChild(card)); // Reorder in HTML
}

// Shuffle cards when the page loads
window.onload = shuffleCards;

let flippedCards = [];
let matchedPairs = 0;

// Determine level and number of pairs
let totalPairs = 2; // Default for Level 1
if (window.location.pathname.includes("level2")) {
    totalPairs = 3; // Level 2
} else if (window.location.pathname.includes("level3")) {
    totalPairs = 6; // Level 3
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !card.classList.contains('flip')) {
            card.classList.add('flip');
            flippedCards.push(card);
        }

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    });
});

function checkMatch() {
    if (flippedCards[0].dataset.image === flippedCards[1].dataset.image) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                if (window.location.pathname.includes("level1")) {
                    alert('Level 1 Complete! Moving to Level 2...');
                    window.location.href = "level2.html";
                } else if (window.location.pathname.includes("level2")) {
                    alert('Level 2 Complete! Moving to Level 3...');
                    window.location.href = "level3.html";
                } else if (window.location.pathname.includes("level3")) {
                    alert('Congratulations! You completed all levels!');
                    window.location.href = "winner.html";
                }
            }, 500);
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flip'));
            flippedCards = [];
        }, 600);
    }
}
