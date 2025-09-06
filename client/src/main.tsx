import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SketchBoard from "./components/board/SketchBoard.tsx";
import OnboardingUser from "./components/onboarding/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnboardingUser />,
  },
  {
    path: "/:room",
    element: <SketchBoard />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
