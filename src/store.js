import React from "react";
import {
  veggieOptions,
  saucesOptions,
  breadOptions,
  menuOptions
} from "./enum";

export const ConfigurationContext = React.createContext();
async function submit(endpoint, sandwichOrder) {
  // this
  const result = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      ...sandwichOrder
    })
  });
  const resultJson = await result.json();
  alert(JSON.stringify(resultJson.message, null, " "));
}

export function useSandwichFormData() {
  const config = React.useContext(ConfigurationContext);

  const [state, setState] = React.useState({
    name: "Customer",
    menu: menuOptions[2],
    veggies: [],
    sauces: []
  });

  function motherOfHandler(key) {
    return function handler(e) {
      switch (key) {
        case "menu":
        case "name": {
          setState({
            ...state,
            [key]: e.target.value
          });
          break;
        }
        case "veggies": {
          if (e.target.checked) {
            const newVeggies = state.veggies.map(item => item);
            newVeggies.push(e.target.value);
            setState({
              ...state,
              veggies: newVeggies
            });
          } else {
            setState({
              ...state,
              veggies: state.veggies.filter(item => item !== e.target.value)
            });
          }
          break;
        }
        case "sauces": {
          if (e.target.checked) {
            const newSauces = state.sauces.map(item => item);
            newSauces.push(e.target.value);
            if (newSauces.length > 2) {
              newSauces.shift();
            }
            setState({
              ...state,
              sauces: newSauces
            });
          } else {
            setState({
              ...state,
              sauces: state.sauces.filter(item => item !== e.target.value)
            });
          }
          break;
        }
        default:
          break;
      }
      // key ?
    };
  }

  function submitOrderInfo() {
    submit(config.endpoint, state);
  }

  return {
    state,
    setState,
    motherOfHandler,
    submitOrderInfo
  };
}
