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

    this.resultMethod = null;
    this.callResult = this.callResult.bind(this);
    this.right = document.getElementsByClassName('correct')[0];
    this.left = document.getElementsByClassName('incorrect')[0];
    this.rightScore = 0;
    this.leftScore = 0;
    this.score = this.score.bind(this);
    this.cardDeck = {};
    this.wrongDeck = {};
    this.getCardDeck = this.getCardDeck.bind(this);
    this.setCardDeck = this.setCardDeck.bind(this);
  }

  show(words, menuMethod, resultMethod) {
    this.wrongDeck = {};
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    this.resultMethod = resultMethod;
    this.cardDeck = words;
    Object.keys(words).forEach((key) => {
      // 新增卡片
      const newCard = new Flashcard(flashcardContainer, key, words[key], menuMethod, this.callResult, this.hide, this.score, this.getCardDeck, this.setCardDeck);
    });
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
      this.leftScore += 1;
      this.left.textContent = `${this.leftScore}`;
    }
  }

  // 渲染 result 畫面
  callResult(menuMethod) {
    this.resultMethod(this.rightScore, this.leftScore, menuMethod, this.show, this.setCardDeck, this.getCardDeck);
    this.rightScore = 0;
    this.leftScore = 0;
    this.right.textContent = ``;
    this.left.textContent = ``;
  }

  getCardDeck(flag) {
    if (flag) return this.cardDeck;
    return this.wrongDeck;
  }

  setCardDeck(flag, key, value) {
    if (flag) {
      this.cardDeck = key;
    } else {
      this.wrongDeck[key] = value;
    }
  }
}
