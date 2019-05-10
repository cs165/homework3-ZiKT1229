// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
    
    // 開始執行這個 app
    this.flashcards.resultShow = this.results.show.bind(this.results);
    this.results.menuShow = this.menu.show.bind(this.menu);
    this.results.cardShow = this.flashcards.show.bind(this.flashcards);
    this.results.getScore = this.flashcards.getScore.bind(this.flashcards);
    this.results.setScore = this.flashcards.setScore.bind(this.flashcards);
    this.results.getDeck = this.flashcards.getDeck.bind(this.flashcards);
    this.results.setDeck = this.flashcards.setDeck.bind(this.flashcards);
    this.startGame();
  }

  startGame() {
    // 渲染 menu 開始選擇
    this.createMenuItems();
  }

  createMenuItems() {
    const choices = document.getElementById('choices');
    FLASHCARD_DECKS.forEach((DECK) => {
      const title = document.createElement('div');
      title.textContent = DECK.title;
      title.addEventListener('click', (event) => {
        this.menu.hide();
        this.flashcards.show(DECK.words, true);
      });
      choices.appendChild(title);
    });
  }
}
