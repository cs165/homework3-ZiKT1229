// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.choices = document.getElementById('choices');
    this._item = '';
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  createMenuItems(flashcardsShow, resultMethod) {
    FLASHCARD_DECKS.forEach((deck) => {
      const title = document.createElement('div');
      title.textContent = deck.title;
      title.addEventListener('click', (event) => {
        this.item = event.target.textContent;
        this.hide();
        flashcardsShow(deck.words, resultMethod);
      });
      this.choices.appendChild(title);
    });
  }

  get item() {
    return this._item;
  }

  set item(item) {
    this._item =item;
  }
}
