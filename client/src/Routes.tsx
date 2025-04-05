import { Navigate, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import MainUI from "./MainUI";
import ClassPage from "./Pages/ClassPage";
import LearnPage from "./Pages/LearnPage";
import LearnModule from "./LearnModule";
import GuidePage from "./Pages/GuidePage";
import PracticePage from "./Pages/PracticePage";
import PracticeModule from "./PracticeModule";

export const BROWSER_ROUTER = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/chemistry" />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/chemistry",
        element: <MainUI />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <ClassPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "learn",
                element: <LearnPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "learn/:id",
                element: <LearnModule />,
                errorElement: <ErrorPage />,
            },
            {
                path: "practice",
                element: <PracticePage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "practice/:id",
                element: <PracticeModule />,
                errorElement: <ErrorPage />,
            },
            {
                path: "guide",
                element: <GuidePage />,
                errorElement: <ErrorPage />,
            },
        ]
    }
]);