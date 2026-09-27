import { createRoot } from "react-dom/client";

import "./index.css";

//react roter

import { RouterProvider } from "react-router-dom";
import { router } from "../src/router/router.jsx";

//store redux
import { Provider } from "react-redux";
import { store } from "./App/store.js";

// hook 
import { UserProvider } from "../src/Hook/UserContext.jsx";
import { LoginUserProvider } from "../src/Hook/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UserProvider>
      <LoginUserProvider>
        <RouterProvider router={router} />
      </LoginUserProvider>
    </UserProvider>
  </Provider>,
);
