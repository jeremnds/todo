import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Layout from "./components/Layout.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import "./globals.css";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "todos",
        element: <App />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "",
        element: <Login />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>,
);
