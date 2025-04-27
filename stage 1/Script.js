const images = [
  'image1.jpg', 'image1.jpg',
  'image2.jpg', 'image2.jpg',
  'image3.jpg', 'image3.jpg',
  'image4.jpg', 'image4.jpg',
  'image5.jpg', 'image5.jpg',
  'image6.jpg', 'image6.jpg'
];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Shuffle function
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Function to flip the card
function flipCard() {
  if (lockBoard) return; // Prevent further clicks if the board is locked
  if (this === firstCard) return; // Prevent double-click on the same card

  this.classList.add('flipped'); // Add 'flipped' class

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true; // Lock the board until the two cards are processed
  checkForMatch();
}

// Check for match
function checkForMatch() {
  const firstImage = firstCard.querySelector('.card-front').style.backgroundImage;
  const secondImage = secondCard.querySelector('.card-front').style.backgroundImage;

  if (firstImage === secondImage) {
    // Cards match: add 'match' class to both cards
    firstCard.classList.add('match');
    secondCard.classList.add('match');
    disableCards();
  } else {
    // Cards don't match: add 'nomatch' class to both cards
    firstCard.classList.add('nomatch');
    secondCard.classList.add('nomatch');
    unflipCards();
  }
}

// Disable matching cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Unflip non-matching cards
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped', 'nomatch');
    secondCard.classList.remove('flipped', 'nomatch');
    resetBoard();
  }, 1500); // Flip back after 1.5 seconds
}

// Reset board state
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Function to generate cards based on the level
function startGame(level) {
  let numberOfCards;
  if (level === 'easy') {
    numberOfCards = 4;
  } else if (level === 'medium') {
    numberOfCards = 8;
  } else if (level === 'hard') {
    numberOfCards = 12;
  }

  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Clear the board

  const selectedImages = images.slice(0, numberOfCards);
  shuffle(selectedImages);

  selectedImages.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front" style="background-image: url('${image}')"></div>
        <div class="card-back">?</div>
      </div>
    `;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });

  gameBoard.classList.add('has-cards');
}

// Event listener for level buttons
document.querySelectorAll('.level-button').forEach(button => {
  button.addEventListener('click', function() {
    const level = this.getAttribute('data-level');
    startGame(level);
  });
});
