import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

const isLoggedIn = false;
const userData: { email: string } | null = isLoggedIn
  ? { email: "email@gmail.com" }
  : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route index />
        <Route path="login" />
        <Route path="register" />
      </Route>
    </>,
  ),
);
