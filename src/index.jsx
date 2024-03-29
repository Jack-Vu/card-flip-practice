import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CardDataContextProvider } from "./context/CardDataContext";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { SoundContextProvider } from "./context/SoundContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SoundContextProvider>
      <CardDataContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CardDataContextProvider>
    </SoundContextProvider>
  </React.StrictMode>
);
