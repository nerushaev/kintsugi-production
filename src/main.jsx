import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
// import { CookiesProvider } from "react-cookie";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter basename="">
          {/* <CookiesProvider> */}
            <ThemeProvider theme={theme}>
              <GoogleReCaptchaProvider reCaptchaKey="6LcuU1QnAAAAAGX4dvTGlNxxccZa6KGNasZfuTnZ">
                <App />
              </GoogleReCaptchaProvider>
            </ThemeProvider>
          {/* </CookiesProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
