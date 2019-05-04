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

    this.menuMethod = null;
    this.rightScore = 0;
    this.leftScore = 0;
    this.resultScore = 0;

    this.continueEvent = this.continueEvent.bind(this);
    this.toMenuEvent = this.toMenuEvent.bind(this);
    this.continue.addEventListener('click', this.continueEvent);
    this.toMenu.addEventListener('click', this.toMenuEvent);
  }

  show(numberCorrect, numberWrong, menuMethod) {
    this.containerElement.classList.remove('inactive');
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
    if (this.leftScore) {

    } else {
      
    }
  }

  toMenuEvent() {
    this.hide();
    this.menuMethod();
  }
}
