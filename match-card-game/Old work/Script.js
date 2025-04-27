document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('cover-page').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
    startGame(1);
  });
});

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
let currentLevel = 1;

// Shuffle function
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Function to flip the card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  checkForMatch();
}

// Check for match
function checkForMatch() {
  const firstImage = firstCard.querySelector('.card-front').style.backgroundImage;
  const secondImage = secondCard.querySelector('.card-front').style.backgroundImage;

  if (firstImage === secondImage) {
    firstCard.classList.add('match');
    secondCard.classList.add('match');
    disableCards();
  } else {
    setTimeout(unflipCards, 1000);
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
  firstCard.classList.remove('flipped');
  secondCard.classList.remove('flipped');
  resetBoard();
}

// Reset board state
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Function to start the game
function startGame(level) {
  let gameContainer = document.getElementById('game-container');

  gameContainer.classList.remove('level-1', 'level-2', 'level-3');
  gameContainer.classList.add(`level-${level}`);

  let numberOfCards = level === 1 ? 4 : level === 2 ? 8 : 12;

  document.getElementById('level-title').innerText = `Level ${level}`;
  document.getElementById('level-title').style.display = 'block';

  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  gameBoard.style.display = 'grid';

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
}

// Show Next Level Button
function showNextLevelButton() {
  document.getElementById('next-level-button').style.display = 'block';
}

// Handle Next Level Button Click
document.getElementById('next-level-button').addEventListener('click', function() {
  currentLevel++;
  if (currentLevel > 3) {
    alert('Congratulations! You completed all levels!');
    location.reload();
  } else {
    this.style.display = 'none';
    startGame(currentLevel);
  }
});
