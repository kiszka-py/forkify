import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

const controlRecipes = async function () {
  try {
    // Get id from hash
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // Get recipe data
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
    // controlServings();
  } catch (error) {
    // console.error(`controller`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function (e) {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    // Render results
    resultsView.render(model.getSearchResultsPage(4));

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (goToPage) {
  console.log(goToPage);
  // Render results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings in state
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);

  // Update the recipe view
};

// controlRecipes("5ed6604591c37cdc054bca5d");

// window.addEventListener("hashchange", controlRecipes);
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
