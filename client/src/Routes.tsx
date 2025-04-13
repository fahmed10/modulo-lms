import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainUI from "./MainUI";
import LearnPage from "./pages/LearnPage";
import GuidePage from "./pages/GuidePage";
import PracticePage from "./pages/PracticePage";
import CoursesPage from "./pages/CoursesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DependentRoute from "./DependentRoute";
import LearnModule from "./modules/LearnModule";
import CoursePage from "./pages/CoursePage";

export const BROWSER_ROUTER = createBrowserRouter([
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
                index: true,
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
                index: true,
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
    },
    {
        index: true,
        element: <Navigate to="/home" />
    },
]);