import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "@pages/AuthPage/AuthPage";
import MainPage from "@pages/MainPage/MainPage";
import NavBarLayout from "@pages/NavBarLayout";

const router = createBrowserRouter([
  { path: "/", element: <AuthPage /> },
  {
    path: "/main",
    element: (
      <NavBarLayout>
        <MainPage />
      </NavBarLayout>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
