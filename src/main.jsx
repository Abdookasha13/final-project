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
          "client-id": "AbCI-uO0hFpXFir1xfnuNhRmfYOzwg2RlX9exPIgEwNv9amd9hrHJUdaikv01mJG73QrW88GQqQTCsN5",
          currency: "USD",
        }}
      >
        <App />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
);
