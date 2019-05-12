// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.deck = null;
    this.wrongDeck = {};
    this.resultShow = null;
    this.right = this.containerElement.querySelector('.correct');
    this.wrong = this.containerElement.querySelector('.incorrect');
    this.rightScore = 0;
    this.wrongScore = 0;
    this.score = this.score.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  show(words, flag) {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    if (flag) {
      this.deck = words;
      Object.keys(words).forEach((key) => {
        // 新增卡片
        const newCard = new Flashcard(flashcardContainer, key, words[key], this.hide, this.resultShow, this.score);
        newCard.setDeck = this.setDeck.bind(this);
      });
    } else {
      Object.keys(this.wrongDeck).forEach((key) => {
        // 新增卡片
        const newCard = new Flashcard(flashcardContainer, key, words[key], this.hide, this.resultShow, this.score);
        newCard.setDeck = this.setDeck.bind(this);
      });
      this.wrongDeck = {};
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  // 計算分數
  score(answer) {
    if (answer) {
      this.rightScore += 1;
      this.right.textContent = `${this.rightScore}`;
    } else {
      this.wrongScore += 1;
      this.wrong.textContent = `${this.wrongScore}`;
    }
  }

  getScore(flag) {
    return flag ? this.rightScore : this.wrongScore;
  }

  setScore(newScore, flag) {
    if (flag) {
      this.rightScore = newScore;
      this.right.textContent = ``;
    } else {
      this.wrongScore = newScore;
      this.wrong.textContent = ``;
    }
  }

  getDeck(flag) {
    return flag ? this.deck : this.wrongDeck;
  }

  setDeck(newCard) {
    this.wrongDeck[newCard] = this.deck[newCard];
  }
}
