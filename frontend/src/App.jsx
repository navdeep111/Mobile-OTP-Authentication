import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Root from "./pages/Root";
import LoginStep1 from "./components/LoginStep1";
import SignupStep1 from "./components/SignupStep1";
import Successful1 from "./components/Successful1";
import Successful2 from './components/Successful2';
import LoginSignUp from "./pages/LoginSignup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      children: [
        {
          path: "",
          element: <LoginSignUp />,
          children: [
            { path: "", element: <LoginStep1 /> },
            { path: "success-login", element: <Successful1 /> },
            { path: "signup", element: <SignupStep1 /> },
            { path: "success-signup", element: <Successful2 /> },
          ],
        },
      ],
    },
  ]);

  return (
    <AppContext>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AppContext>
  );
}
