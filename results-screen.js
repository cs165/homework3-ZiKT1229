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

    this.menuShow = null;
    this.cardShow = null;
    this.getScore = null;
    this.setScore = null;
    this.getDeck = null;
    this.setDeck = null;
    this.continueEvent = this.continueEvent.bind(this);
    this.toMenuEvent = this.toMenuEvent.bind(this);
    this.continue.addEventListener('click', this.continueEvent);
    this.toMenu.addEventListener('click', this.toMenuEvent);
  }

  show() {
    this.containerElement.classList.remove('inactive');
    const rightScore = this.getScore(true);
    const wrongScore = this.getScore(false);
    const percentScore = Math.floor(100 * rightScore / (rightScore + wrongScore));
    this.percent.textContent = `${percentScore}`;
    this.correct.textContent = `${rightScore}`;
    this.incorrect.textContent = `${wrongScore}`;
    if (wrongScore) {
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
    if (this.getScore(false)) {
      const deck = this.getDeck(false);
      this.cardShow(deck, false);
      this.setScore(0, false);
    } else {
      const deck = this.getDeck(true);
      this.cardShow(deck, true);
      this.setScore(0, true);
      this.setScore(0, false);
    }
  }

  toMenuEvent() {
    this.setScore(0, true);
    this.setScore(0, false);
    this.hide();
    this.menuShow();
  }
}
