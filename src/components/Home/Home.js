import React, { Component } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./../RecipeCard/RecipeCard";
import "./Home.css";
import store, {RESET} from '../../store';

class Home extends Component {
  constructor(props) {
    super(props);
    const reduxStore = store.getState();
    console.log(reduxStore.recipes)
    this.state = {
      recipes: reduxStore.recipes
    };
  }

  componentDidMount() {
    store.dispatch({
      type: RESET
    })
    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        recipes: reduxState.recipes
      })
    })
  }

  render() {
    const recipes = this.state.recipes.map((recipe, i) => {
      return (
        <RecipeCard
          key={i}
          name={recipe.name}
          category={recipe.category}
          authorFirst={recipe.first_name}
          authorLast={recipe.last_name}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          id={recipe.id}
        />
      );
    });
    return (
      <div className="Home">
        <Link to="/add/name">
          <button>Create New Recipe</button>
        </Link>
        <div className="card_container">{recipes}</div>
      </div>
    );
  }
}

export default Home;
