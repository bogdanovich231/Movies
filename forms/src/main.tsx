import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import NotFound from "./Components/NotFound/NotFound.tsx";
import FormUncontrolled from "./Components/FormUncontrolled/FormUncontrolled.tsx";
import FormHook from "./Components/FormHook/FormHook.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "formuncontrol/",
        element: <FormUncontrolled />,
      },
      {
        path: "formhook",
        element: <FormHook />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
