const images = [
  "images/img1.jpg",
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img5.jpg",
  "images/img6.jpg",
  "images/img6.jpg",
  "images/img7.jpg",
  "images/img7.jpg",
  "images/img8.jpg",
  "images/img8.jpg",
];

document.getElementById("reset-button").addEventListener("click", resetGame);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const memoryCard = document.getElementById("memory-card");
  const shuffledImages = shuffle(images);

  shuffledImages.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;

    const frontFace = document.createElement("img");
    frontFace.src = "images/front-img.jpg";
    frontFace.classList.add("front-face");

    const backFace = document.createElement("img");
    backFace.src = image;
    backFace.classList.add("back-face");

    card.appendChild(frontFace);
    card.appendChild(backFace);
    memoryCard.appendChild(card);

    card.addEventListener("click", flipCard);
  });
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = images.length / 2;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  matchedPairs++;

  if (matchedPairs === totalPairs) {
    displayWinMessage();
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function displayWinMessage() {
  const winMessage = document.createElement("div");
  winMessage.textContent = "You Win!";
  winMessage.classList.add("win-message");
  document.body.appendChild(winMessage);
}

function resetGame() {
  const gameBoard = document.getElementById("memory-card");
  gameBoard.innerHTML = "";

  matchedPairs = 0;

  const winMessage = document.querySelector(".win-message");
  if (winMessage) {
    winMessage.remove();
  }

  resetBoard();

  createBoard();
}

createBoard();
