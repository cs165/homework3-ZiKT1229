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
    this.item = '';
    this.show = this.show.bind(this);
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  // 渲染 menu 為 constants.js 的內容，並賦予 click event，到下一步
  createMenuItems(flashcardsShow, resultMethod) {
    FLASHCARD_DECKS.forEach((deck) => {
      const title = document.createElement('div');
      title.textContent = deck.title;
      title.addEventListener('click', (event) => {
        this.item = event.target.textContent;
        this.hide();

        // 渲染卡片內容
        flashcardsShow(deck.words, this.show, resultMethod);
      });
      this.choices.appendChild(title);
    });
  }
}
