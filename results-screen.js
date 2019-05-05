// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

    this.percent = this.containerElement.getElementsByClassName('percent')[0];
    this.correct = this.containerElement.getElementsByClassName('correct')[0];
    this.incorrect = this.containerElement.getElementsByClassName('incorrect')[0];
    this.continue = this.containerElement.getElementsByClassName('continue')[0];
    this.toMenu = this.containerElement.getElementsByClassName('to-menu')[0];

    this.cardScreenShow = null;
    this.menuMethod = null;
    this.rightScore = 0;
    this.leftScore = 0;
    this.resultScore = 0;

    this.continueEvent = this.continueEvent.bind(this);
    this.toMenuEvent = this.toMenuEvent.bind(this);
    this.continue.addEventListener('click', this.continueEvent);
    this.toMenu.addEventListener('click', this.toMenuEvent);

    this.getCardDeck = null;
    this.setCardDeck = null;
  }

  show(numberCorrect, numberWrong, menuMethod, cardScreenShow, setCardDeck, getCardDeck) {
    this.getCardDeck = getCardDeck;
    this.setCardDeck = setCardDeck;
    this.containerElement.classList.remove('inactive');
    this.cardScreenShow = cardScreenShow;
    this.menuMethod = menuMethod;
    this.rightScore = numberCorrect;
    this.leftScore = numberWrong;
    this.resultScore = Math.floor(100 * this.rightScore / (this.rightScore + this.leftScore));
    this.percent.textContent = `${this.resultScore}`;
    this.correct.textContent = `${this.rightScore}`;
    this.incorrect.textContent = `${this.leftScore}`;
    if (this.leftScore) {
      this.continue.textContent = 'Continue';
    } else {
      this.continue.textContent = 'Start over?';
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  continueEvent() {
    this.hide();
    if (this.leftScore) {
      const newCD = this.getCardDeck(false);
      this.cardScreenShow(newCD, this.menuMethod, this.show);
    } else {
      const newCD = this.getCardDeck(true);
      this.cardScreenShow(newCD, this.menuMethod, this.show);
      this.rightScore = 0;
    }
    this.leftScore = 0;
    this.resultScore = 0;
  }

  toMenuEvent() {
    this.rightScore = 0;
    this.leftScore = 0;
    this.resultScore = 0;
    this.hide();
    this.menuMethod();
  }
}
