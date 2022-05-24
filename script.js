"use strict";

const cardContainer = document.querySelector(".card_container");

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

  constructor() {
    this._initialTheGame();
    cardContainer.addEventListener("click", this._flippingCard.bind(this));
  }

  _initialTheGame() {
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

    cardContainer.insertAdjacentHTML("beforeend", markup);
  }

  _flippingCard(e) {
    const card = e.target.closest(".card_inner");
    if (!card || card.classList.contains("complete")) return;

    this._flippedCard.push(card);
    this._cardFlipped++;

    card.style.transform = "rotateY(180deg)";

    if (this._cardFlipped === 2) setTimeout(this._setCard.bind(this), 600);
  }

  _setCard() {
    if (this._checkPair()) {
      //? WIN 🏆
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
}

const app = new App();
