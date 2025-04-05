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
import { RunOnce } from "./RunOnce";

addStyles();
const container = document.getElementById("root"); // npx tailwindcss -i ./src/index.css -o ./src/output.css --watch

const theme = createTheme({
    palette: {
        mode: "dark"
    }
})

if (container) {
    const root = createRoot(container)
    RunOnce.run();

    root.render(
        <React.StrictMode>
            <MUI.ThemeProvider theme={theme}>
                <MUI.CssBaseline />
                <RouterProvider router={BROWSER_ROUTER} />
            </MUI.ThemeProvider>
        </React.StrictMode>,
    )
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )
}
