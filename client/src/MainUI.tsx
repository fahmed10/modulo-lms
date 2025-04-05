import * as MUI from "@mui/material";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

export default function MainUI() {
    return (
        <>
            <MUI.Box className="flex">
                <Topbar />
                <MUI.Toolbar />
                <Sidebar />
            </MUI.Box>
            <MUI.Box className="flex mt-4 pl-[140px]">
                <MUI.Toolbar />
                <Outlet />
            </MUI.Box>
        </>
    );
}