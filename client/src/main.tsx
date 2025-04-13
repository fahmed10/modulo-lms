import React from "react";
import { createRoot } from "react-dom/client";
import * as MUI from "@mui/material";
import "./index.css";
import {
    RouterProvider
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'katex/dist/katex.min.css'
import { createTheme } from "@mui/material";
import { addStyles } from "react-mathquill";
import { BROWSER_ROUTER } from "./Routes";

addStyles();

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MUI.ThemeProvider theme={theme}>
            <MUI.CssBaseline />
            <RouterProvider router={BROWSER_ROUTER} future={{ v7_startTransition: true }} />
        </MUI.ThemeProvider>
    </React.StrictMode>,
);