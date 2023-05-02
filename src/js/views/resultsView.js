import View from "./View";
import previewView from "./previewView";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _data;
  _errorMessage = `No results found for your query! Please try again.`;
  _message = "";

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

// <use href="${icons}#icon-user"></use>

export default new ResultsView();
