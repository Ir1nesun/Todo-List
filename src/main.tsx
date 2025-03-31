import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProviderComponent } from "./theme/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/Todo-List">
      <Provider store={store}> 
        <ThemeProviderComponent> 
          <App />
        </ThemeProviderComponent>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

