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

    this.rightScore = 0;
    this.leftScore = 0;
    this.resultScore = 0;
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
    this.rightScore = numberCorrect;
    this.leftScore = numberWrong;
    this.resultScore = Math.floor(100 * this.rightScore / (this.rightScore + this.leftScore));
    document.getElementsByClassName('percent')[0].textContent = `${this.resultScore}`;
    document.getElementsByClassName('correct')[1].textContent = `${this.rightScore}`;
    document.getElementsByClassName('incorrect')[1].textContent = `${this.leftScore}`;
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
