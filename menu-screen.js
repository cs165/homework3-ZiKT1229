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
    this.menuItems();
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  menuItems() {
    FLASHCARD_DECKS.forEach((deck) => {
      const title = document.createElement('div');
      title.textContent = deck.title;
      this.choices.appendChild(title);
    });
  }
}
