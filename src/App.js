// React 3 years in 1 day Cheat sheet
// ${type Example name} example
// https://github.com/zapkub/react-in-a-nutshell/blob/master/cheatsheet.md

// Let implement some react here !
import React from "react";
import ReactDOM from "react-dom";
import { useSandwichFormData, ConfigurationContext } from "./store";
import {
  veggieOptions,
  saucesOptions,
  breadOptions,
  menuOptions
} from "./enum";

const StoreContext = React.createContext(undefined);
const StoreProvider = StoreContext.Provider;
const StoreConsumer = StoreContext.Consumer;

function VeggiesInputList() {
  return (
    <StoreConsumer>
      {store => {
        return (
          <>
            <label>Veggies</label>
            <div>
              {veggieOptions.map(item => {
                return (
                  <div key={item}>
                    <input
                      onChange={store.motherOfHandler("veggies")}
                      checked={store.state.veggies.find(
                        veggie => item === veggie
                      )}
                      type="checkbox"
                      value={item}
                    />
                    <label>{item}</label>
                  </div>
                );
              })}
            </div>
          </>
        );
      }}
    </StoreConsumer>
  );
}

function SandwichForm(properties) {
  return (
    <StoreConsumer>
      {store => {
        const { name, menu, veggies, sauces } = store.state;
        return (
          <div>
            <h1 style={{ marginTop: "30px" }}>Subway Order 🐸🦄</h1>
            <label>Name: </label>
            <input onChange={store.motherOfHandler("name")} value={name} />

            <select onChange={store.motherOfHandler("menu")} value={menu}>
              {menuOptions.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>

            <br />
            <VeggiesInputList store={store} />

            <br />
            <label>sauces</label>
            <div>
              {saucesOptions.map(item => {
                return (
                  <div key={item}>
                    <input
                      onChange={store.motherOfHandler("sauces")}
                      type="checkbox"
                      value={item}
                      checked={sauces.find(data => data === item)}
                    />
                    <label>{item}</label>
                  </div>
                );
              })}
            </div>
            <div />

            <br />
            <button onClick={store.submitOrderInfo}>submit</button>
          </div>
        );
      }}
    </StoreConsumer>
  );
}

const Summary = props => {
  return (
    <div>
      <ConfigurationContext.Consumer>
        {config => {
          return <div>{config.endpoint}</div>;
        }}
      </ConfigurationContext.Consumer>
    </div>
  );
};

const App = () => {
  const store = useSandwichFormData();
  return (
    <div className="App">
      <StoreProvider value={store}>
        <Summary />
        <SandwichForm />
      </StoreProvider>
    </div>
  );
};

export default () => {
  return (
  <ConfigurationContext.Provider
    value={{
      endpoint: "https://momoka.rungsikorn.rocks/order"
    }}
  >
    <App />
  </ConfigurationContext.Provider>
  )
}

// ReactDOM.render(
//   <ConfigurationContext.Provider
//     value={{
//       endpoint: "https://momoka.rungsikorn.rocks/order"
//     }}
//   >
//     <App />
//   </ConfigurationContext.Provider>,
//   document.getElementById("root")
// );
// ReactDOM.render(<div />, document.getElementById("root2"));
