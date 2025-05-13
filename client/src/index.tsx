import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ArticlesProvider } from "./articlesContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ArticlesProvider>
      <App />
    </ArticlesProvider>
  </React.StrictMode>
);
