import { RESULTS_PER_PAGE } from "../config";
import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  #curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this.#curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / RESULTS_PER_PAGE);

    // Page 1, and thera are other pages
    if (this.#curPage === 1 && numPages > 1) {
      return this.#generateMarkupButton("next");
    }

    // Last page
    if (this.#curPage === numPages && numPages > 1) {
      return this.#generateMarkupButton("prev");
    }

    // Other page
    if (this.#curPage < numPages) {
      return `${this.#generateMarkupButton("prev")}${this.#generateMarkupButton(
        "next"
      )}`;
    }

    // Only 1 page
    return ``;
  }

  #generateMarkupButton(type) {
    return `
        <button data-goto="${
          type === "prev" ? this.#curPage - 1 : this.#curPage + 1
        }" class="btn--inline pagination__btn--${type}">
            <span>Page ${
              type === "prev" ? this.#curPage - 1 : this.#curPage + 1
            }</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      type === "prev" ? "left" : "right"
    }"></use>
            </svg>
        </button>
    `;
  }
}

export default new PaginationView();
