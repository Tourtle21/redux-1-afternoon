import {createStore} from 'redux';

const initialState = {
    name: '',
    category: '',
    first_name: '',
    last_name: '',
    ingredients: [],
    instructions: [],
    recipes: [],
    id:0,
};

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_FIRST_NAME = "UPDATE_FIRST_NAME";
export const UPDATE_LAST_NAME = "UPDATE_LAST_NAME";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INSTRUCTION = "ADD_INSTRUCTION";
export const ADD_RECIPE = "ADD_RECIPE";
export const RESET = "RESET";
export const DELETE_RECIPE = "DELETE_REECIPE";

function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_NAME:
            return {...state, name:payload};
        case UPDATE_CATEGORY:
            return {...state, category:payload}; 
        case UPDATE_FIRST_NAME:
            return {...state, first_name:payload}; 
        case UPDATE_LAST_NAME:
            return {...state, last_name:payload}; 
        case ADD_INGREDIENT:
            let newIngredients = [...state.ingredients];
            newIngredients.push(payload);
            return {...state, ingredients:newIngredients}; 
        case ADD_INSTRUCTION:
            let newInstructions = [...state.instructions];
            newInstructions.push(payload);
            return {...state, instructions:newInstructions}; 
        case ADD_RECIPE:
            const {name, category, first_name, last_name, ingredients, instructions, id} = state;
            const newRecipe = {name, category, first_name, last_name, ingredients, instructions, id};
            const newRecipes = [...state.recipes];
            newRecipes.push(newRecipe);
            return {...state, ...{recipes:newRecipes, id:state.id+1}}; 
        case RESET:
            const newState = {...state};
            for (let key in newState) {
                if (key !== 'recipes' && key !== 'id') {
                    if (typeof newState[key] === 'string') {
                        newState[key] = '';
                    } else {
                        newState[key] = [];
                    }
                }
            }
            return newState;
        case DELETE_RECIPE:
            const allRecipes = [...state.recipes];
            let index = allRecipes.findIndex(recipes => recipes.id === +payload);
            allRecipes.splice(index, 1);
            console.log(allRecipes)
            return {...state, recipes: allRecipes};
        default: 
            return state;
    }
}

export default createStore(reducer);