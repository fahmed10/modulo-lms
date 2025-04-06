import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import MainUI from "./MainUI";
import CoursePage from "./Pages/CoursePage";
import LearnPage from "./Pages/LearnPage";
import LearnModule from "../../old.local/LearnModule";
import GuidePage from "./Pages/GuidePage";
import PracticePage from "./Pages/PracticePage";
import PracticeModule from "../../old.local/PracticeModule";
import CoursesPage from "./Pages/CoursesPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

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
                element: <CoursesPage />
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
                element: <LearnPage />
            },
            {
                path: "learn/:id",
                element: <LearnModule />
            },
            {
                path: "practice",
                element: <PracticePage />
            },
            {
                path: "practice/:id",
                element: <PracticeModule />
            },
            {
                path: "guide",
                element: <GuidePage />
            },
        ]
    }
]);