import View from "./View";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _data;
  _errorMessage = `No results found for your query! Please try again.`;
  _message = "";

  _generateMarkup() {
    return this._data
      .map((result) => this._generateMarkupPreview(result))
      .join("");
  }

  _generateMarkupPreview(result) {
    {
      return `
            <li class="preview">
                <a class="preview__link" href="#${result.id}">
                    <figure class="preview__fig">
                        <img src="${result.image}" alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${result.title}</h4>
                        <p class="preview__publisher">${result.publisher}</p>
                    </div>
                </a>
            </li>
          `;
    }
  }
}

// <use href="${icons}#icon-user"></use>

export default new ResultsView();
