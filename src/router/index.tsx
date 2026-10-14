import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import RootLayout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import NotFound from "../pages/NotFound";
import ErrorHandler from "../components/errors/ErrorHandler";

const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isAllowed={userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <h2>Profile</h2>
            </ProtectedRoute>
          }
        />

        <Route
          path="login"
          element={
            <ProtectedRoute
              isAllowed={!userData?.jwt}
              redirectPath="/"
              data={userData}
            >
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="register"
          element={
            <ProtectedRoute
              isAllowed={!userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <Register />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </>,
  ),
);

export default router;
