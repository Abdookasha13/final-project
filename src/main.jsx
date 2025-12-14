import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./18n.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider
        options={{
          "client-id": "AXn-fTaL_Gv8l8NQinzaRvcKlpwpHG31z2UvrdMLoettU2q6RvVZEgRizlS1hiItSjm3kX7EEVHPIE8x",
          currency: "USD",
        }}
      >
        <App />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
);
