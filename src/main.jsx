import { createRoot } from "react-dom/client";

import "./index.css";

//react roter

import { RouterProvider } from "react-router-dom";
import { router } from "../src/router/router.jsx";

//store redux
import { Provider } from "react-redux";
import { store } from "./App/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
