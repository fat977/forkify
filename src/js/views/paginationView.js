import View from './View';
import iconsUrl from '../../img/icons.svg';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _errorMessage = 'No recipes found for your query!';
  _message = '';

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1 , and there are some pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${iconsUrl}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto=${
          curPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${iconsUrl}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `;
    }
    // other page
    if (curPage < numPages) {
      return `
       <button data-goto=${
         curPage - 1
       } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${iconsUrl}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto=${
          curPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${iconsUrl}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }
    // page 1 , and there are NO  pages
    return '';
  }
}

export default new PaginationView();
