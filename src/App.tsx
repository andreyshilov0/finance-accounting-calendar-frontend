import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "@pages/AuthPage/AuthPage";
import MainPage from "@pages/MainPage/MainPage";

const router = createBrowserRouter([
  { path: "/login", element: <AuthPage /> },
  { path: "/main", element: <MainPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
