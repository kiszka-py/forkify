import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

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
  } catch (error) {
    alert(error);
  }
};

// controlRecipes("5ed6604591c37cdc054bca5d");

// window.addEventListener("hashchange", controlRecipes);
["load", "hashchange"].forEach((event) =>
  window.addEventListener(event, controlRecipes)
);
