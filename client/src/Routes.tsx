import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainUI from "./MainUI";
import LearnPage from "./pages/LearnPage";
import GuidePage from "./pages/GuidePage";
import CoursesPage from "./pages/CoursesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DependentRoute from "./DependentRoute";
import LearnModule from "./modules/LearnModule";
import AdminHome from "./pages/AdminHome";
import CoursePage from "./pages/CoursePage";
import ManageUsers from "./pages/ManageUsers";
import EditLearnPage from "./pages/EditLearnPage";

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
                element: <DependentRoute student={<CoursesPage />} faculty={<CoursesPage faculty />} admin={<AdminHome />} />
            }
        ]
    },
    {
        path: "/manage-users",
        element: <MainUI showAnnouncements content={<ManageUsers />} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/:course",
        element: <DependentRoute student={<MainUI showAnnouncements showSidebar />} faculty={<MainUI showAnnouncements showSidebar faculty />} />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <DependentRoute student={<CoursePage />} faculty={<CoursePage faculty />} />
            },
            {
                path: "learn",
                element: <LearnPage />,
            },
            {
                path: "guide",
                element: <GuidePage />
            },
            {
                path: "learn/:id",
                element: <LearnModule />
            },
            {
                path: "manage-activities/:id",
                element: <LearnModule editing />
            },
            {
                path: "manage-activities",
                element: <EditLearnPage />
            }
        ]
    },
    {
        index: true,
        element: <Navigate to="/home" />
    },
]);