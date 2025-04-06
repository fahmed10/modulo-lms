import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainUI from "./MainUI";
import CoursePage from "./pages/CoursePage";
import LearnPage from "./pages/LearnPage";
import GuidePage from "./pages/GuidePage";
import PracticePage from "./pages/PracticePage";
import CoursesPage from "./pages/CoursesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DependentRoute from "./DependentRoute";
import LearnModule from "./modules/LearnModule";

export const BROWSER_ROUTER = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" />,
    },
    {
        path: "/login",
        element: <MainUI />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <LoginPage />
            }
        ]
    },
    {
        path: "/signup",
        element: <MainUI />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <SignupPage />
            }
        ]
    },
    {
        path: "/home",
        element: <MainUI showAnnouncements />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <DependentRoute student={<CoursesPage />} faculty={null} admin={null} />
            }
        ]
    },
    {
        path: "/:course",
        element: <MainUI showAnnouncements showSidebar />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <CoursePage />
            },
            {
                path: "learn",
                element: <LearnPage />,
            },
            {
                path: "practice",
                element: <PracticePage />
            },
            {
                path: "guide",
                element: <GuidePage />
            },
            {
                path: "learn/:id",
                element: <LearnModule />
            }
        ]
    }
]);