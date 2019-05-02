// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText, resultMethod, hide, score) {
    this.containerElement = containerElement;

    this._flipCard = this._flipCard.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);

    this.resultMethod = resultMethod;
    this.hide = hide;
    this.score = score;

    this.orignX = 0;
    this.orignY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.deg = 0;
    this.draged = false;
    this.moved = false;
    this._dragCard = this._dragCard.bind(this);
    this._moveCard = this._moveCard.bind(this);
    this._drogCard = this._drogCard.bind(this);
    this.flashcardElement.addEventListener('pointerdown', this._dragCard);
    this.flashcardElement.addEventListener('pointermove', this._moveCard);
    this.flashcardElement.addEventListener('pointerup', this._drogCard);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    if (this.moved) return;
    this.flashcardElement.classList.toggle('show-word');
  }

  _dragCard(event) {
    this.draged = true;
    this.orignX = event.clientX;
    this.orignY = event.clientY;
    event.target.parentNode.style.transitionDuration = '';
  }

  _moveCard(event) {
    if (!this.draged) return;
    this.moved = true;
    this.deltaX = event.clientX - this.orignX;
    this.deltaY = event.clientY - this.orignY;
    this.deg = 0.2 * this.deltaX;
    event.target.parentNode.style.transformOrigin = `${this.deg > 0 ? '100%' : '0%'} 100%`;
    event.target.parentNode.style.transform = `rotate(${this.deg}deg) translate(${this.deltaX}px, ${this.deltaY}px)`;
    if (this.deltaX > 150) {
      document.body.style.backgroundColor = '#97b7b7';
    } else if (this.deltaX < -150) {
      document.body.style.backgroundColor = '#97b7b7';
    } else {
      document.body.style.backgroundColor = '';
    }
  }

  _drogCard(event) {
    if (this.draged) {
      this.draged = false;
      this.moved = false;
      if (this.deltaX > 150) {
        this.containerElement.removeChild(this.flashcardElement);
        this.score(true);
        console.log('right');
      } else if (this.deltaX < -150) {
        this.containerElement.removeChild(this.flashcardElement);
        this.score(false);
        console.log('wrong');
      }
      document.body.style.backgroundColor = '';
      event.target.parentNode.style.transform = '';
      event.target.parentNode.style.transformOrigin = '';
      event.target.parentNode.style.transitionDuration = '.6s';
      if (this.containerElement.childNodes.length === 0) {
        this.hide();
        this.resultMethod();
      }
    }
  }
}
