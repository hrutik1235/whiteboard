import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OnboardingUser from "./components/onboarding/index.tsx";
import Container from "./components/container/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnboardingUser />,
  },
  {
    path: "/:room",
    element: <Container />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
