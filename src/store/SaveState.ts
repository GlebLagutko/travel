import store from "./index";

export function saveState(newState) {
    console.log("st");
    console.log(newState)
    localStorage.setItem('state', JSON.stringify(newState.getState()));
}
