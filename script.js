"use strict";

const cardContainer = document.querySelector(".card_container");
const chanceElement = document.querySelector(".chance");
const resultMsg = document.querySelector(".result");
const resetBtn = document.querySelector(".resetBtn");
const body = document.querySelector("body");

class App {
  _flippedCard = [];
  _cardFlipped = 0;
  _cardImage = [
    "image/css.jpg",
    "image/git.jpg",
    "image/grunt.jpg",
    "image/sass.jpg",
    "image/gulp.jpg",
    "image/git.jpg",
    "image/gulp.jpg",
    "image/grunt.jpg",
    "image/css.jpg",
    "image/sass.jpg",
  ];
  _chance = 10;
  _score = 0;
  _playing = true;

  constructor() {
    this._initialGame();
    cardContainer.addEventListener("click", this._flippingCard.bind(this));
    body.addEventListener("click", this._resetGame.bind(this));
  }

  //? ----INITIAL LOGIC

  _initialGame() {
    this._shuffleCard();

    const markup = this._cardImage
      .map(img => {
        return `
            <div class="card">
            <div class="card_inner" data-value="${img.slice(
              6,
              img.indexOf(".")
            )}">
                <div class="card_front">
                    <img src="image/cardback.jpg">
                </div>
    
                <div class="card_back">
                    <img src="${img}">
                </div>
            </div>
            </div>
          `;
      })
      .join("\n");

    cardContainer.innerHTML = "";
    cardContainer.insertAdjacentHTML("beforeend", markup);
  }

  _shuffleCard() {
    const randomNum = Math.floor(Math.random() * 10);

    this._cardImage = [
      ...this._cardImage.slice(randomNum, 10),
      ...this._cardImage.slice(0, randomNum),
    ];
  }

  _resetGame(e) {
    const btn = e.target.closest(".resetBtn");
    if (!btn) return;

    this._initialGame();
    this._playing = true;
    body.style.backgroundColor = "var(--blue)";
    resultMsg.classList.add("hide");
    resetBtn.classList.add("hidden");
    this._score = 0;
    this._chance = 10;
    chanceElement.textContent = `Chance: ${this._chance}`;
  }

  //? ----GAME LOGIC----

  _flippingCard(e) {
    const card = e.target.closest(".card_inner");
    if (
      !card ||
      card.classList.contains("complete") ||
      this._flippedCard.length === 2 ||
      this._playing === false
    )
      return;

    this._flippedCard.push(card);
    this._cardFlipped++;

    card.style.transform = "rotateY(180deg)";

    if (this._cardFlipped === 2) setTimeout(this._setCard.bind(this), 600);
  }

  _setCard() {
    this._chanceConsume();

    if (this._checkPair()) {
      //? WIN 🏆
      this._scoring();
      this._flippedCard.forEach(card => {
        //prettier-ignore
        card.querySelector(".card_back").style.backgroundColor = "var(--victory)";
        card.classList.add("complete");
      });
    } else {
      //? LOSE 💥
      this._flippedCard.forEach(card => {
        card.style.transform = "rotateY(0deg)";
      });
    }

    this._flippedCard = [];
    this._cardFlipped = 0;
  }

  _checkPair() {
    const values = this._flippedCard.map(card => card.dataset.value);

    if (values[0] === values[1]) return true;

    return false;
  }

  //? ----SCORING LOGIC----
  _chanceConsume() {
    this._chance--;
    chanceElement.textContent = `Chance: ${this._chance}`;

    if (this._chance === 0 && this._score < 5) this._lose();
    else if (this._score === 5) this._win();
  }

  _scoring() {
    this._score++;

    if (this._score === 5) this._win();
  }

  _win() {
    this._playing = false;
    body.style.backgroundColor = "#60b347";
    resultMsg.textContent = `YOU WIN 👑`;
    resultMsg.classList.remove("hide");
    resetBtn.classList.remove("hidden");
  }

  _lose() {
    this._playing = false;
    body.style.backgroundColor = "#d05663";
    resultMsg.textContent = `YOU LOSE💥`;
    resultMsg.classList.remove("hide");
    resetBtn.classList.remove("hidden");
  }
}

const app = new App();
