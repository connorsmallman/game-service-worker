class GameCategoryGroup {
  constructor(element) {
    this.element = element;
    this.categories = [...this.element.querySelectorAll('[data-game-category]')];
    this.categoryGroup = this.element.dataset.gameCategoryGroup;

    this.initialize();
  }

  initialize() {
    for (const category of this.categories) {
      // check if category is visable
      if (category.getAttribute('aria-hidden') === 'false') {
        this._fetchCategory(category.dataset.gameCategory)
          .then(response => this.render(category, response));
      }
    }

    // add observer to element and listen for attribute changes
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        const category = mutation.target;
        const isAttributeMutation = mutation.type === 'attributes';
        const isHidden = category.getAttribute('aria-hidden') === 'true';

        if (isAttributeMutation && category.dataset.hasOwnProperty('gameCategory') && !isHidden) {
          const categoryName = category.dataset.gameCategory;
          this._fetchCategory(categoryName)
            .then(response => this.render(category, response));
        }
      }
    });

    observer.observe(this.element, {
      subtree: true,
      childList: true,
      attributes: true
    });
  }

  _fetchCategory(categoryName) {
    return fetch(`/api/categoryGroups/${this.categoryGroup}/${categoryName}`).then(response => response.json())
  }

  render(parentNode, { dirty, category, games }) {
    if (dirty !== undefined) {
      if (dirty) {
        this._render(parentNode, games);
      }

      return;
    }

    this._render(parentNode, games);
  }

  _render(parentNode, games) {
    console.log(games);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GameCategoryGroup(document.querySelector('[data-game-category-group]'));

  // cheap tabs
  const tabs = document.querySelector('[data-toggle="tab"]');

  tabs.addEventListener('click', (ev) => {
    const panelName = ev.target.dataset.tab;

    for (const tab of [...document.querySelectorAll('[data-panel]')]) {
      tab.setAttribute('aria-hidden', (tab.dataset.panel === panelName) ? 'false' : 'true');
    }
  });
});
